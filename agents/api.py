import cherrypy
import cherrypy_cors
import json
import pymongo
import pprint
import json
import requests
from bson import json_util, ObjectId
from json import JSONEncoder
from flask import jsonify
import time
import datetime
from bson.json_util import dumps
import os
from bson import json_util
from pymongo import MongoClient
import uuid
import sys
import subprocess
import random
import socket
from topology import topology as trm
from sex import sex
from rt import rt
def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]


"""def get_ip_mongodocker():
	ip2 = subprocess.getoutput("docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nsp_mongo_1")
	return ip2 """

__requires__ = [
	'cherrypy_cors',
]

ipAPI = '0.0.0.0'
#ipAPI = 'localhost'

cherrypy_cors.install()

@cherrypy.expose
class API:
	############################ ATTR ########################################
	#IP_DB = str(get_ip_mongodocker())
	IP_DB = 'localhost'
	PORT_DB = 27017

	############################ INIT API #####################################

	def __init__(self, agent, host='0.0.0.0', port=int(sys.argv[1])):
		self.agent = agent
		self.host = host
		self.port = port
		client = pymongo.MongoClient(self.IP_DB, self.PORT_DB)
		
		self.agent_collection = client.topoDB.nodes
		self.service_catalogue = client.topoDB.service_catalogue
		self.cpuDB = client.topoDB.cpuDB
		self.vehicles_parquing = client.NSP.vehicles
		self.places = client.NSP.places
		self.plantes = client.NSP.plantes
		self.fitxers = client.NSP.fitxers
		self.historic = client.NSP.historic
		self.reserves = client.NSP.reserves
		self.historic_fitxers = client.NSP.historic_fitxers
		self.recursos_vehicles = client.NSP.recursos_vehicles
		self.testbed = client.testbed.vehicles_testbed
		self.places_testbed = client.testbed.places_testbed



	def start(self, silent_access=False):
		config = { '/': {
				'tools.response_headers.on': True,
				'tools.response_headers.headers': [('Access-Control-Allow-Origin', '*')],
				#'tools.response_headers.headers': [('Access-Control-Allow-Headers', 'application/json')],
				'tools.response.headers.headers': [('Access-Control-Allow-Methods', 'GET, POST')],
		}}
		cherrypy.server.socket_host = self.host
		cherrypy.server.socket_port = self.port
		cherrypy.config.update({'log.screen': not silent_access})
		cherrypy.config.update({'log.screen': not silent_access})
		cherrypy.quickstart(API(self.agent), '/', config=config)


	############################ topoDB ########################################

	# OK, registra un agent a la topoDB
	@cherrypy.expose
	@cherrypy.tools.json_in()
	@cherrypy.tools.json_out()
	def register_agent(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.json
			try:
				nodeID = self.agent_collection.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body['_id'] = str(int(nodeID))
				body['status'] = 1
				body['nodeID'] = str(uuid.uuid4())
				self.agent_collection.insert_one(body)
			except pymongo.errors.DuplicateKeyError as e:
				nodeID = post_topoDB(body)
			return str(int(nodeID))

	# Ok, registra un agent al parquing del testbed
	@cherrypy.expose
	@cherrypy.tools.json_in()
	@cherrypy.tools.json_out()
	def register_agent_testbed(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.json
			try:
				nodeID = self.testbed.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body['_id'] = str(int(nodeID))
				body['nodeID'] = str(uuid.uuid4())
				self.testbed.insert_one(body)
			except pymongo.errors.DuplicateKeyError as e:
				nodeID = post_topoDB(body)
			return str(int(nodeID))


	# OK, torna un array de diccionaris on cada diccionari es un agent de la topoDB
	@cherrypy.expose
	@cherrypy.tools.json_in()
	def get_agents(self):
		cursor = self.agent_collection.find({})
		all_data = list(cursor)
		output = []
		for document in all_data:
			print(document)
			output.append(document)
		output.pop(0) # Fem el pop per treure el primer element de la DB
		agent_json = json.dumps(output, default=json_util.default)
		return agent_json

	######## Get all agents that have given leaderIP from topoDB #########
	@cherrypy.expose
	@cherrypy.tools.json_in()
	# Obte els agents amb leaderIP = leaderIP OK
	# GET .../get_leader_agents/192.168.1.10
	def get_leader_agents(self, ide):
		cursor = self.agent_collection.find( { "leaderIP" : ide })
		all_data = list(cursor)
		output = []
		for document in all_data:
			if(str(document['role']) != 'leader' and str(document['role']) != 'cloud'):
				output.append(document)
		agent_json = json.dumps(output, default=json_util.default)
		return agent_json

	# on nodeID es el nodeID de un element i port es la info a actualitzar
	@cherrypy.expose
	@cherrypy.tools.json_in()
	# Update agent info to topoDB
	# Update agent info with json given
	# NO cal donar outputtots els parametres, nomes els que vulguem canviar
	# el nodeID es obligatori que correspongui amb algun nodeID del mongo
	def update_agent(self):
		if cherrypy.request.method == "PUT":
			body = cherrypy.request.json
			id = body['nodeID'].strip("0")
			self.agent_collection.update({'nodeID': id},{"$set":body},True)
		return 'Agent actualitzat'


	########### DELETE AGENT TOPODB ##############

	@cherrypy.expose
	@cherrypy.tools.json_in()
	# Request {"nodeID" : "ID"}
	def delete_agent(self):
		if cherrypy.request.method == "POST":
			selec = cherrypy.request.json
			self.agent_collection.delete_one(selec)

	@cherrypy.expose
	@cherrypy.tools.json_in()
	# Request {"nodeID" : "ID"}
	def alive(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.json
			# Abans de afegirlo comprovem si hi es
			try:
				nodeID = self.places_testbed.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body['_id'] = str(int(nodeID))
				self.places_testbed.insert_one(body)
			except pymongo.errors.DuplicateKeyError as e:
				nodeID = post_topoDB(body)
			return str(int(nodeID))


	# OK, torna un array de diccionaris on cada diccionari es un vehicle/agent del parquing
	@cherrypy.expose
	@cherrypy.tools.json_in()
	def get_vehicles(self):
		cursor = self.vehicles_parquing.find()
		all_data = list(cursor)
		#print(all_data)
		output = []
		for document in all_data:
			output.append(document)
		agent_json = json.dumps(output, default=json_util.default)
		return agent_json

	
	# OK, retorna info del vehicle aparcat a la plasa donada
	@cherrypy.expose
	@cherrypy.tools.json_in()
	def get_vehicle(self, plasa):
		cursor = self.vehicles_parquing.find( { 'plasa' : plasa } )
		all_data = list(cursor)
		output = []
		for document in all_data:
			output.append(document)
		agent_json = json.dumps(output, default=json_util.default)
		return agent_json


	# OK, retorna nombre de plantes del parquing
	@cherrypy.expose
	@cherrypy.tools.json_in()
	def get_numPlantes(self):
		cursor = self.plantes.find( { 'numPlantes' : 'numPlantes' } )
		all_data = list(cursor)
		output = []
		for document in all_data:
			output.append(document)
		agent_json = json.dumps(output, default=json_util.default)
		return agent_json

	########################### SEX ########################################

	@cherrypy.expose
	@cherrypy.tools.json_in()
	@cherrypy.tools.json_out()
	def execute_service(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.json
			agentID = body['agent_ip'] # agentID = ID agent que solicita
			serviceID = body['service_id'] # serviceID = identificador del servei a la BD
			# El agent que demana el servei es troba registrat a la topoDB
			if(self.agent_collection.find({'myIP': agentID}).count() > 0):
				# Cridem al SEX per que obtingui la informacio del servei
				info_servei = {}
				info_servei = self.agent._SEX.get_service_request(serviceID, agentID)
				extraParams = {}
				# Paràmetres necessaris pel servei de computació
				if(serviceID == 'computar'):
					extraParams['version'] = body['version']
					extraParams['paralel'] = body['paralel']
					extraParams['nom_fitxer'] = body['nom_fitxer']
					extraParams['ipAgent'] = body['ipAgent']
					extraParams['quiExecuta'] = body['quiExecuta']
				# Cridem al RT amb la informacio del servei obtinguda
				return self.agent._RT.executa_servei(agentID, info_servei, extraParams)
			else:
				return 'Agent no registrat a la topologia'


	# OK, demana servei al cotxe del testbed
	@cherrypy.expose
	def request_service(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.body.read()
			newBody = json.loads(body)
			print(newBody)
			req = requests.post('http://10.0.0.200:8000/request_service', json=newBody)
			return 'Request sent'


	# OK, comprova l'estat d'un fitxer executat: 0 OK, 1 no OK
	@cherrypy.expose
	def checkFileStatus(self, nom_fitxer):
		if cherrypy.request.method == "GET":
			print(nom_fitxer)
			cursor = self.fitxers.find({'nom_fitxer' : nom_fitxer})
			all_data = list(cursor)
			document = all_data[0]
			if(document['estat'] == 'Finalitzat'):
				if(document['status'] == 0):
					return '0'
				else:
					return '1'


	@cherrypy.expose
	@cherrypy.tools.json_in()
	@cherrypy.tools.json_out()
	def errorExecution(self):
		if cherrypy.request.method == "GET":
			cursor = self.fitxers.find({})
			outputJson = []
			all_data = list(cursor)
			all_data.pop(0)
			for item in all_data:
				if(item['estat'] == 'Finalitzat'):
					outputJson.append(item['status'])
			return outputJson
		if cherrypy.request.method == "POST":
			body = cherrypy.request.json
			#print("AIXO ES EL BODY", body)
			#print("NOM FITXER BODY", body['nom_fitxer'])
			myquery = { "nom_fitxer": body['nom_fitxer'] }
			newvalues = { "$set": { "status": body['status'] } }
			self.fitxers.find_one_and_update(myquery, newvalues)
			return 'hola'


	# Ens arriba peticio frontend
	# Pas previ a la gestio del servei (SEX)
	@cherrypy.expose
	def gestio_computacio(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.body.read()
			bodyJson = json.loads(body)
			try:
				# Afegim a la DB el fitxer
				nodeID = self.fitxers.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				bodyJson['_id'] = str(int(nodeID))
				bodyJson['data_entrada'] = str(datetime.datetime.now()).split('.')[0]
				self.fitxers.insert_one(bodyJson)

				# Fem la petició de servei computacio al leader del parking
				# Canviar url segons app client o nsp
				#url = '/home/aerie/TFG/apps/appclient/routes/uploads/'+bodyJson['nom_fitxer']
				url = '../apps/appclient/routes/uploads/'+bodyJson['nom_fitxer']
				#print("THIS IS URL", url)
				data = {}
				data['url'] = url
				data['nom_fitxer'] = bodyJson['nom_fitxer']
				data['paralel'] = bodyJson['paralel']
				data['version'] = bodyJson['version']
				agents_available = requests.get('http://'+ipAPI+':8000/get_leader_agents/192.168.1.46').json()
				#print(len(agents_available))
				randnum = random.randint(0,len(agents_available)-1)
				quiExecuta = agents_available[randnum]['device']
				print("El agent que executa el servei es", quiExecuta)
				os.system('sudo docker cp ' + url + ' ' + quiExecuta+':/'+str(data['nom_fitxer']))
				data['ipAgent'] = agents_available[randnum]['myIP']
				data['quiExecuta'] = quiExecuta
				print("IP del agent", data['ipAgent'])
				data['params'] = {
									'agent_id' : 'ID'
								}
				data['service_id'] = 'computar'
				req = requests.post('http://'+ipAPI+':8000/execute_service', json=data)

				time.sleep(1)
				response = os.system("ping -c 1 "+data['ipAgent'])
				if(response == 0):
					print('EL agent encarregat esta UP')
				else:
					print('EL agent encarregat esta DOWN')
					agents_available = requests.get('http://'+ipAPI+':8000/get_leader_agents/192.168.1.46').json()
					randnum = random.randint(0,len(agents_available)-1)
					quiExecuta = agents_available[randnum]['device']
					print("El NOU agent que executa el servei es", quiExecuta)
					os.system('sudo docker cp ' + url + ' ' + quiExecuta+':/'+str(data['nom_fitxer']))
					data['ipAgent'] = agents_available[randnum]['myIP']
					data['quiExecuta'] = quiExecuta
					print("IP del agent", data['ipAgent'])
					data['params'] = {
										'agent_id' : 'ID'
									}
					data['service_id'] = 'computar'
					req = requests.post('http://'+ipAPI+':8000/execute_service', json=data)

				nom_fitxer = bodyJson['nom_fitxer']
				cursor = self.fitxers.find( { 'nom_fitxer' : nom_fitxer } )
				all_data = list(cursor)
				date = all_data[0]['data_entrada']


				newBody2 = { 'nom_fitxer' : nom_fitxer, 'estat' : 'Finalitzat', 'data_entrada' : date}
				newBody2['data_finalitzacio'] = str(datetime.datetime.now()).split('.')[0]
				newBody2['output'] = 'log-'+os.path.splitext(nom_fitxer)[0]+'.txt'
				newBody2['paralel'] = data['paralel']
				newBody2['version'] = data['version']
				#print("ALL DATA", all_data[0])
				newBody2['status'] = all_data[0]['status']
				document = self.fitxers.find_and_modify(query= { 'nom_fitxer': nom_fitxer },update=newBody2, new=False )
			except pymongo.errors.DuplicateKeyError as e:
				nodeID = post_topoDB(bodyJson)
			return 'hola'



	# OK, get service info from service catalogue
	@cherrypy.expose
	@cherrypy.tools.json_in()
	@cherrypy.tools.json_out()
	def get_service(self, serviceID):
		if cherrypy.request.method == "GET":
			service = self.service_catalogue.find( { "id": serviceID } );
			reservada = self.places.find( { "id" : "1" } )
			for agent in service:
				agent_list = agent
				return agent_list


	@cherrypy.expose
	@cherrypy.tools.json_out()
	def fitxers7dies(self):
		if cherrypy.request.method == "GET":
			date = datetime.datetime.today()
			dia = str(date.day)+'/'+str(date.month)
			dia7 = str(date.day-6)+'/'+str(date.month)
			print(dia)
			print(dia7)
			#cursor = self.historic_fitxers.find({"$or":[ {'dia':{'$gte':dia7}, {'dia':{'$eq':dia}}}]})	
			#cursor = self.historic_fitxers.find( { 'dia' : { '$eq' : '1/10', '$gt' : dia7 } } )
			cursor = self.historic_fitxers.find( { 'dia' : { '$gte' : dia7 } } )
			data = list(cursor)
			cursor2 = self.historic_fitxers.find( { 'dia' : { '$eq' : dia } } )
			data2 = list(cursor2)
			data.append(data2[0])
			return data

	@cherrypy.expose
	def update7dies(self):
		if cherrypy.request.method == "GET":
			date = datetime.datetime.today()
			dia = str(date.day)+'/'+str(date.month)
			if(self.historic_fitxers.find( { "dia" : dia } ).count() > 0):
				self.historic_fitxers.update_one( { "dia": dia }, { "$inc": { "fitxers": 1 } })
			else:
				try:
					body = {}
					nodeID = self.historic_fitxers.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
					body['_id'] = str(int(nodeID))
					body['dia'] = dia
					body['fitxers'] = 1
					self.historic_fitxers.insert_one(body)
				except pymongo.errors.DuplicateKeyError as e:
					nodeID = post_topoDB(body)
			return 'holi'


	# OK, actualitza testbed cuan arriba el vehicle
	@cherrypy.expose
	@cherrypy.tools.json_in()
	@cherrypy.tools.json_out()
	def update_testbed(self):
		if cherrypy.request.method == "POST":
			info_agent = cherrypy.request.json
			print(info_agent)
			# ficar matricula nosaltres
			bodyVehicle = {}
			bodyVehicle['matricula'] = '1234ABC'
			bodyVehicle['data_entrada'] = str(datetime.datetime.now()).split('.')[0]
			bodyVehicle['plasa'] = 'A4'
			req = requests.post('http://'+ipAPI+':8000/register_agent_testbed', json=bodyVehicle)
			cursor = self.places_testbed.find( { 'nom' : 'A4' } )
			data = list(cursor)
			time.sleep(2)
			self.places_testbed.update_one( { "nom": 'A4' }, { "$set": { "status": 1 } })
			self.reserves.update_one( { "_id": "2" }, { "$set": { "total_reserves": 0 } })
			return 'Plasa actualitzada'


	# OK, retorna totes les places del testbed i el seu estat
	@cherrypy.expose
	@cherrypy.tools.json_out()
	def get_places_testbed(self):
		if cherrypy.request.method == "GET":
			cursor = self.places_testbed.find()
			data = list(cursor)
			data.pop(0)
			return data

	
	# OK, torna llistat de vehicles aparcats al parquing del testbed
	@cherrypy.expose
	@cherrypy.tools.json_out()
	def get_vehicles_testbed(self):
		if cherrypy.request.method == "GET":
			cursor = self.testbed.find()
			data = list(cursor)
			data.pop(0)
			return data


	@cherrypy.expose
	@cherrypy.tools.json_in()
	@cherrypy.tools.json_out()
	def update_reserves(self):
		if cherrypy.request.method == "GET":
			num_reserves = self.reserves.find({'id' : 'reserves'})
			for reserva in num_reserves:
				res = reserva
				return res['total_reserves']
		if cherrypy.request.method == "PUT":
			body = cherrypy.request.json
			body['id'] = 'reserves'
			self.reserves.update({'id': 'reserves'},{"$set":body},True)
			return 'Places actualitzat'


########################## ENTRADA PARQUING ##############################################

	@cherrypy.expose
	@cherrypy.tools.json_in()
	@cherrypy.tools.json_out()
	# Registrar vehicle a la DB parquing
	# Quan el vehicle entra al parquing
	def entrar_parquing(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.json
			try:
				nodeID = self.vehicles_parquing.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body['_id'] = str(int(nodeID))
				body['pagat'] = False
				body['data_entrada'] = str(datetime.datetime.now()).split('.')[0]
				self.vehicles_parquing.insert_one(body)
			except pymongo.errors.DuplicateKeyError as e:
				nodeID = post_topoDB(body)
			return str(int(nodeID))


	# OK, agafa llistat de places del parquing i torna la primer plaça disponible
	# Quan un vehicle arriba al parquing fem un GET aqui per a que se li assigni una plaça
	@cherrypy.expose
	@cherrypy.tools.json_out()
	def algorisme(self):
		if cherrypy.request.method == "GET":
			cursor = self.places.find({})
			all_data = list(cursor)
			all_data.pop(0)
			trobat = False
			for plasa in all_data:
				if(plasa['ocupada'] == False):
					if(plasa['nom'] != 'No hi han places'):
						output = plasa['nom']
						trobat = True
						break
			if(trobat):
				return output
			else:
				return 'No hi han places'

	@cherrypy.expose
	@cherrypy.tools.json_in()
	@cherrypy.tools.json_out()
	# body = { "matricula" : "matricula_valida" }
	def matricula(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.json
			matricula = body['matricula']
			busca = self.vehicles_parquing.find( { "matricula" : matricula})
			all_data = list(busca)
			self.places.update_one( { "nom": all_data[0]['plasa'] }, { "$set": { "ocupada": False } })
			self.vehicles_parquing.delete_one( { "matricula" : matricula} )
			return 'La plasa amb matricula '+matricula+' actualitzada'




	##################### DELEGACIONS #####################################
	# El agent rep peticio i la delega al seu leader
	@cherrypy.expose
	@cherrypy.tools.json_out()
	def delega_peticio(self):
		if cherrypy.request.method == "GET":
			req = requests.get('http://'+self.agent._nodeinfo['leaderIP']+':9000/get_agents').json()
			return req


	# El leader rep peticio i la delega al cloud
	@cherrypy.expose
	@cherrypy.tools.json_out()
	def delega_peticio_cloud(self):
		if cherrypy.request.method == "GET":
			req = requests.get('http://'+self.agent._nodeinfo['leaderIP']+':9000/get_agents').json()
			return req





	@cherrypy.expose
	@cherrypy.tools.json_out()
	def esborraFitxer(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.body.read()
			bodyJson = json.loads(body)
			print(bodyJson['nom'])
			self.fitxers.delete_one( { "nom_fitxer" : bodyJson['nom']} )
			return bodyJson


	# OK, torna el nombre de places ocupades del parquing
	@cherrypy.expose
	@cherrypy.tools.json_out()
	def places_ocupades(self):
		if cherrypy.request.method == "GET":
			numPlacesOcupades = self.vehicles_parquing.find().count()
			return numPlacesOcupades


	# OK, torna el nombre d'agents del parquing que computen
	@cherrypy.expose
	@cherrypy.tools.json_out()
	def vehiclesQueComputen(self):
		if cherrypy.request.method == "GET":
			numVehicles = self.vehicles_parquing.find( { 'computa' : True } ).count()
			return numVehicles



	@cherrypy.expose
	@cherrypy.tools.json_in()
	@cherrypy.tools.json_out()
	def historic_fitxer(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.json
			try:
				nodeID = self.historic_fitxers.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body['_id'] = str(int(nodeID))
				self.historic_fitxers.insert_one(body)
			except pymongo.errors.DuplicateKeyError as e:
				nodeID = post_topoDB(body)
		return 'hola'



	@cherrypy.expose
	@cherrypy.tools.json_in()
	@cherrypy.tools.json_out()
	def execute_servicee(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.json
			print(body)
			path = body['params']['code']
			output = subprocess.getoutput("python3 /home/aerie/"+path)
			clientIP = body['ip_address']
			data = { "output" : output }
			req = requests.post('http://'+clientIP+':8000/response_service', json=data)
			print(output)
			return 'Sha enviat el resultat'


	# OK, retorna recursos vehicles per al grafic dashboards
	@cherrypy.expose
	@cherrypy.tools.json_out()
	def resourcesGraphic(self):
		if cherrypy.request.method == "GET":
			cursor = self.recursos_vehicles.find( { '_id' : '1' } )
			data = list(cursor)
			return data


	# REQUESTS FRONT END
	# Afegeix les places al mongoDB
	@cherrypy.expose
	@cherrypy.tools.json_out()
	def inserta_places(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.body.read()
			bodyJson = json.loads(body)
			numPlaces = int(int(bodyJson['placesXplanta'])/4)
			numPlantes = 3
			print('El NUMERO DE PLACES es', numPlaces)

			for i in range(numPlaces):
				nom = 'NW'+str(i+1)+'-P0'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)

			for i in range(numPlaces):
				nom = 'NE'+str(i+1)+'-P0'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)

			for i in range(numPlaces):
				nom = 'SW'+str(i+1)+'-P0'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)

			for i in range(numPlaces):
				nom = 'SE'+str(i+1)+'-P0'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)


			for i in range(numPlaces):
				nom = 'NW'+str(i+1)+'-P1'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)

			for i in range(numPlaces):
				nom = 'NE'+str(i+1)+'-P1'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)

			for i in range(numPlaces):
				nom = 'SW'+str(i+1)+'-P1'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)

			for i in range(numPlaces):
				nom = 'SE'+str(i+1)+'-P1'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)



			for i in range(numPlaces):
				nom = 'NW'+str(i+1)+'-P2'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)

			for i in range(numPlaces):
				nom = 'NE'+str(i+1)+'-P2'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)

			for i in range(numPlaces):
				nom = 'SW'+str(i+1)+'-P2'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)

			for i in range(numPlaces):
				nom = 'SE'+str(i+1)+'-P2'
				#print("INSERTADA", i)
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				body2 = {}
				body2['_id'] = str(int(nodeID))
				body2['nom'] = nom
				body2['ocupada'] = False
				self.places.insert_one(body2)

			print(self.places.find().count())
			return 'hola'

	@cherrypy.expose
	@cherrypy.tools.json_out()
	def placesfront(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.body.read()
			bodyJson = json.loads(body)
			try:
				nodeID = self.places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				bodyJson['_id'] = str(int(nodeID))
				bodyJson['ocupada'] = False
				bodyJson['nom'] = 'No hi han places'
				self.vehicles_parquing.remove({'_id':{'$ne':'nodeID'}})
				self.places.remove({'_id':{'$ne':'nodeID'}})
				self.places.delete_one( { "numPlaces" : "numPlaces" } )
				self.places.insert_one(bodyJson)
				req = requests.post('http://'+ipAPI+':8000/inserta_places', json=bodyJson)
			except pymongo.errors.DuplicateKeyError as e:
				nodeID = post_topoDB(bodyJson)
			return 'hola'
		if cherrypy.request.method == "GET":
			cursor = self.places.find( { "numPlaces" : "numPlaces" } )
			all_data = list(cursor)
			return all_data[0]['placesXplanta']


	@cherrypy.expose
	@cherrypy.tools.json_out()
	def plantesfront(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.body.read()
			bodyJson = json.loads(body)
			try:
				nodeID = self.plantes.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				bodyJson['_id'] = str(int(nodeID))
				self.plantes.delete_one( { "numPlantes" : "numPlantes" } )
				self.plantes.insert_one(bodyJson)
			except pymongo.errors.DuplicateKeyError as e:
				nodeID = post_topoDB(bodyJson)
			return 'hola'
		if cherrypy.request.method == "GET":
			cursor = self.plantes.find( { "numPlantes" : "numPlantes" } )
			all_data = list(cursor)
			return all_data[0]['placesXplanta']


	# OK, servei aparcament, reserva una plasa qualsevol
	@cherrypy.expose
	@cherrypy.tools.json_in()
	def reserva_plasa(self):
		if cherrypy.request.method == "POST":
			body = cherrypy.request.json
			agentID = body['nodeID']
			parquingID = body['parquingID']
			if(self.reserves.find({'nodeID': agentID}).count() >= 0):
				print(self.reserves.find({'nodeID': agentID}).count())
				self.agent._reserves.append((agentID))
				res = requests.get('http://'+ipAPI+':8000/update_reserves').json()
				requests.put('http://'+ipAPI+':8000/update_reserves', json={'total_reserves' : res+1})
				
				newBody = {}
				nodeID = self.reserves.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
				newBody['_id'] = str(int(nodeID))
				newBody['nodeID'] = agentID
				newBody['parquingID'] = parquingID
				self.reserves.insert_one(newBody)
				return 'Plasa reservada al agent amb ID ' + agentID 
			else:
				return 'Ja tens una reserva'


	# TESTBED - SEMPRE RETORNEM MATEIX PARQUING
	@cherrypy.expose
	@cherrypy.tools.json_in()
	def troba_parquing(self):
		if cherrypy.request.method == "GET":
			# Retornem el tag del parquing
			return 'P1'

	# OK, retorna tots els fitxers en execucio (no finalitzats)
	# Grafic serveis en execucio
	@cherrypy.expose
	@cherrypy.tools.json_in()
	def serveis_execucio(self):
		if cherrypy.request.method == "GET":
			cursor = self.fitxers.find({ 'estat' : 'Pendent' })
			all_data = list(cursor)
			print(all_data)
			output = []
			for document in all_data:
				print(document)
				output.append(document['nom_fitxer'])
			agent_json = json.dumps(output, default=json_util.default)
			return agent_json
