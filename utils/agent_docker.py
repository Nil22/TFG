import os
from random import randint
import string
import random
import pymongo
from pymongo import MongoClient
import time
import datetime
import sys
import requests
import socket
import subprocess

# Funcio per obtenir la IP local
def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]

ipAPI = '0.0.0.0'

def get_ip_mongodocker():
	#ip = subprocess.getoutput()
	ip2 = subprocess.getoutput("docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' nsp_mongo_1")
	return ip2

def numero():
	num_matricula = randint(1000, 9999)
	return num_matricula

def lletra(stringLength=3):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength)).upper()

def matricula():
	num_matricula = randint(1000, 9999)
	lletraa = lletra()
	matricula = str(num_matricula)+lletraa
	return matricula

def entrar_parquing(nomDocker):
	#IP_DB = str(get_ip_mongodocker())
	IP_DB = 'localhost'
	PORT_DB = 27017
	client = pymongo.MongoClient(IP_DB, PORT_DB)
	vehicles_parquing = client.NSP.vehicles
	places_parquing = client.NSP.places
	recursos_vehicles = client.NSP.recursos_vehicles
	nodeID = vehicles_parquing.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
	body = {}
	body['_id'] = str(int(nodeID))
	rand = randint(0,1)
	if(rand == 0):
		body['pagat'] = False
	else:
		body['pagat'] = True
	rand2 = randint(0,1)
	if(rand2 == 1):
		body['computa'] = False
	else:
		body['computa'] = True
	body['matricula'] = matricula()
	req = requests.get('http://'+str(ipAPI)+':8000/algorisme').json()
	body['plasa'] = req
	places_parquing.update_one( { "nom": req }, { "$set": { "ocupada": True } })

	body['agentIP'] = os.popen("docker inspect --format '{{ .NetworkSettings.IPAddress }}' "+ nomDocker).read()
	body['data_entrada'] = str(datetime.datetime.now()).split('.')[0]
	if(body['computa'] == True):
		body['resources'] = '8GB RAM - 4 CPUs'
	vehicles_parquing.insert_one(body)

	recursos_vehicles.update({'_id': '1'}, {'$inc': {'RAM': 8}})
	recursos_vehicles.update({'_id': '1'}, {'$inc': {'CPU': 4}})
	return str(int(nodeID))


if __name__ == '__main__':
	for i in range(int(sys.argv[1])):
		os.system("docker run -dit --name My"+str(i+10)+" nil/demobona")

	y = 0

	while(y < int(sys.argv[1])):
		os.system("docker exec My"+str(y+10)+" nohup python ppserver.py -a &")
		y = y + 1

	llista = []

	for i in range(int(sys.argv[1])):
		llista.append(os.popen("docker inspect --format '{{ .NetworkSettings.IPAddress }}' My"+str(i+10)).read())

	for i in llista:
		print(i)

	z = 0

	while(z < int(sys.argv[1])):
		data = {
			'myIP' : llista[z],
			'port' : 8000,
			'device' : 'My'+str(z+10),
			'role' : 'agent',
			'leaderIP' : '192.168.1.46',
			'IOT' : 'None'
		}
		req = requests.post('http://'+str(ipAPI)+':8000/register_agent', json=data)
		z = z + 1	

	for i in range(int(sys.argv[1])):
		entrar_parquing("My"+str(i+10))