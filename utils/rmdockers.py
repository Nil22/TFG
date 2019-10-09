import os
from random import randint
import string
import random
import pymongo
from pymongo import MongoClient
import datetime

# Dades de la topoDB
IP_DB = 'localhost'
PORT_DB = 27017

def esborraDockers():
	client = pymongo.MongoClient(IP_DB, PORT_DB)
	agent_collection = client.topoDB.nodes
	agent_collection.remove({'port':{'$eq':8000}})

	recursos_vehicles = client.NSP.recursos_vehicles
	#recursos_vehicles.update({'_id': '1'}, {'$inc': {'RAM': -8}})
	#recursos_vehicles.update({'_id': '1'}, {'$inc': {'CPU': -1}})


if __name__ == '__main__':
	# Comandes per a parar i esborrar tots els contenidors que estan corrent
	os.system("docker stop $(docker ps -a -q)")
	os.system("docker container prune")
	# Esborra els agents de la topoDB corresponents als contenidors que estaven corrent i que hem parat
	esborraDockers()
