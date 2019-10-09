import pymongo
import os
import sys
import datetime

if __name__ == '__main__':

	if(os.getuid() != 0):
		print("Please execute as root (sudo python3 dbconfig.py)")
		exit(1)

	os.system("sudo mongod --fork --logpath /var/log/mongod.log")

	client = pymongo.MongoClient("mongodb://localhost:27017/")
	# topoDB
	topoDB = client["topoDB"]
	nodes = topoDB["nodes"]
	service_catalogue = topoDB["service_catalogue"]

	# nsp

	NSP = client["NSP"]
	fitxers = NSP["fitxers"]
	historic_fitxers = NSP["historic_fitxers"]
	places = NSP["places"]
	plantes = NSP["plantes"]
	recursos_vehicles = NSP["recursos_vehicles"]
	reserves = NSP["reserves"]
	vehicles = NSP["vehicles"]

	# testbed
	testbed = client["testbed"]
	places_testbed = testbed["places_testbed"]
	vehicles_testbed = testbed["vehicles_testbed"]

	llistaDB = []

	llistaDB.append(nodes)
	llistaDB.append(service_catalogue)

	llistaDB.append(fitxers)
	llistaDB.append(historic_fitxers)
	llistaDB.append(places)
	llistaDB.append(plantes)
	llistaDB.append(recursos_vehicles)
	llistaDB.append(reserves)
	llistaDB.append(vehicles)
	llistaDB.append(places_testbed)
	llistaDB.append(vehicles_testbed)

	for db in llistaDB:
		myquery = { "_id": {"$ne": "nodeID"} }
		db.delete_many(myquery)

		body3 = {'seq' : 0}
		db.update({'_id': 'nodeID'},{"$set":body3},True)


	# Afegeix servei aparcar
	body = {}
	body['id'] = 'APARCAR'
	body['description'] = 'Servei aparcament intel·ligent'
	body['code'] = 'aparcar.py'
	body['arguments'] = 'Posicio Agent sol·licitant'
	body['agents_involved'] = ['Agent', 'Leader Agent', 'Agent cloud', 'Leader parquing']
	body['output'] = 'Posicio del parquing mes proper a l'+'agent que sol·licita el servei'
	try:
		nodeID = service_catalogue.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		body['_id'] = str(int(nodeID))
		service_catalogue.insert_one(body)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir servei')


	# Afegeix servei computar
	body2 = {}
	body2['id'] = 'computar'
	body2['description'] = 'Servei de computacio al cluster del parquing'
	body2['code'] = 'computar.py'
	body2['arguments'] = 'blabla'
	body2['agents_involved'] = ['Agent', 'Leader Agent', 'Agent cloud', 'Leader parquing']
	body2['output'] = 'Resultat de la execucio del fitxer'
	try:
		nodeID = service_catalogue.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		body2['_id'] = str(int(nodeID))
		service_catalogue.insert_one(body2)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir servei')



	# Afegeix element per guardar el nombre de plantes
	bodyPlantes = {}
	bodyPlantes['numPlantes'] = 'numPlantes'
	bodyPlantes['placesXplanta'] = 3
	try:
		nodeID = plantes.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		bodyPlantes['_id'] = str(int(nodeID))
		plantes.insert_one(bodyPlantes)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir nombre de plantes')




	# Afegeix element per guardar el nombre de places per planta
	bodyPlaces = {}
	bodyPlaces['numPlaces'] = 'numPlaces'
	bodyPlaces['placesXplanta'] = 64
	bodyPlaces['ocupada'] = False
	bodyPlaces['nom'] = 'No hi han places'
	try:
		nodeID = places.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		bodyPlaces['_id'] = str(int(nodeID))
		places.insert_one(bodyPlaces)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir nombre de places')
	

	# Afegeix element per guardar el nombre de reserves
	bodyReserva = {}
	bodyReserva['total_reserves'] = 0
	bodyReserva['id'] = 'reserves'
	try:
		nodeID = reserves.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		bodyReserva['_id'] = str(int(nodeID))
		reserves.insert_one(bodyReserva)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir reserva')



	# Afegeix places del parquing del testbed
	a1 = {'nom' : 'A1', 'status' : 0}
	a2 = {'nom' : 'A2', 'status' : 0}
	a3 = {'nom' : 'A3', 'status' : 0}
	a4 = {'nom' : 'A4', 'status' : 0}
	try:
		nodeID = places_testbed.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		a1['_id'] = str(int(nodeID))
		places_testbed.insert_one(a1)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir places testbed')

	try:
		nodeID = places_testbed.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		a2['_id'] = str(int(nodeID))
		places_testbed.insert_one(a2)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir places testbed')

	try:
		nodeID = places_testbed.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		a3['_id'] = str(int(nodeID))
		places_testbed.insert_one(a3)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir places testbed')

	try:
		nodeID = places_testbed.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		a4['_id'] = str(int(nodeID))
		places_testbed.insert_one(a4)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir places testbed')


	# Afegeix element recursos vehicles a la BD
	recursos = {'RAM' : 0, 'CPU' : 0}
	try:
		nodeID = recursos_vehicles.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		recursos['_id'] = str(int(nodeID))
		recursos_vehicles.insert_one(recursos)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir places testbed')



	# Afegeix historic de fitxers computats

	date = datetime.datetime.today()
	dia = str(date.day)+'/'+str(date.month)
	
	avui = {'dia' : dia, 'fitxers' : 4}
	dia6 = {'dia' : str(date.day-1)+'/'+str(date.month), 'fitxers' : 4}
	dia5 = {'dia' : str(date.day-2)+'/'+str(date.month), 'fitxers' : 2}
	dia4 = {'dia' : str(date.day-3)+'/'+str(date.month), 'fitxers' : 0}
	dia3 = {'dia' : str(date.day-4)+'/'+str(date.month), 'fitxers' : 6}
	dia2 = {'dia' : str(date.day-5)+'/'+str(date.month), 'fitxers' : 10}
	dia1 = {'dia' : str(date.day-6)+'/'+str(date.month), 'fitxers' : 8}

	try:
		nodeID = historic_fitxers.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		avui['_id'] = str(int(nodeID))
		historic_fitxers.insert_one(avui)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir historic_fitxers')

	try:
		nodeID = historic_fitxers.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		dia6['_id'] = str(int(nodeID))
		historic_fitxers.insert_one(dia6)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir historic_fitxers')

	try:
		nodeID = historic_fitxers.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		dia5['_id'] = str(int(nodeID))
		historic_fitxers.insert_one(dia5)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir historic_fitxers')

	try:
		nodeID = historic_fitxers.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		dia4['_id'] = str(int(nodeID))
		historic_fitxers.insert_one(dia4)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir historic_fitxers')

	try:
		nodeID = historic_fitxers.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		dia3['_id'] = str(int(nodeID))
		historic_fitxers.insert_one(dia3)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir historic_fitxers')

	try:
		nodeID = historic_fitxers.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		dia2['_id'] = str(int(nodeID))
		historic_fitxers.insert_one(dia2)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir historic_fitxers')

	try:
		nodeID = historic_fitxers.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		dia1['_id'] = str(int(nodeID))
		historic_fitxers.insert_one(dia1)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir historic_fitxers')



	# Afegeix agents cloud i leader a la topoDB

	cloud_agent = {'myIP' : '192.168.1.38', 'port' : 9000, 'device' : 'CloudAgent', 'role' : 'cloud', 
	'IOT' : 'IOT', 'leaderIP' : '192.168.1.38', 'nodeID' : '0', 'status' : 1}

	leader_agent = {'myIP' : '10.0.6.50', 'port' : 8000, 'device' : 'leader1', 'role' : 'leader', 
	'IOT' : 'IOT', 'leaderIP' : '192.168.1.38', 'status' : 1}

	try:
		nodeID = nodes.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		cloud_agent['_id'] = str(int(nodeID))
		nodes.insert_one(cloud_agent)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir agent cloud')

	try:
		nodeID = nodes.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
		leader_agent['_id'] = str(int(nodeID))
		nodes.insert_one(leader_agent)
	except pymongo.errors.DuplicateKeyError as e:
		print('Error al afegir agent leader')
