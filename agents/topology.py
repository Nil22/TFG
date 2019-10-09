# Importem llibreries
import socket
import time
import sys
import os
import subprocess
import json
import random
import pickle
import requests
import json
import pymongo
import uuid
from bson import json_util, ObjectId
from json import JSONEncoder
from flask import jsonify
import time
import datetime
from bson.json_util import dumps
import os



class topology:
	# Inicialització
	# Indiquem els endpoints on farem les peticions
	def __init__(self, ipDB, portDB):
		IP_DB = 'localhost'
		PORT_DB = 27017
		self._baseURL = "http://"+ipDB+":"+str(portDB)+"/"
		self._postURL = self._baseURL + "post_topoDB"
		self._updateURL = self._baseURL + "update_topoDB"
		self._getURL = self._baseURL + "get_topoDB"
		self._delURL = self._baseURL + "del_topoDB"
		self._resetURL = self._baseURL + "reset_topoDB"


	# Afegeix un node a la BD
	# Tornem un 200 si s'ha pogut afegir o un -1 en cas contrari
	def postDB(self, node_info):
		print(self._postURL)
		response = requests.post(url=self._postURL, data=node_info)
		id = response.text[1:len(response.text)-1]
		if(response.status_code == 200):
			return response.status_code, id
		else:
			return -1


	# Actualitza un node existent de la BD (si el node no existeix es crea)
	def update(self, node_info):
		response = requests.post(self._updateURL, data=node_info)
		return response.status_code



	# Retorna true si el agent amb ID donat es troba a la DB
	def existeix(self, nodeID):
		try:
			PARAMS = "selec={'nodeID':"+"'"+nodeID+"'}"
			response = requests.get(self._getURL, PARAMS)
			if response is not None:
				return True
			else:
				return False
		except Exception as e:
			print(e)
			return -1



	# Retorna true si el agent cloud es troba a la DB
	def existeix_cloud(self, node_info):
		try:
			PARAMS = "selec={'role':"+"'"+node_info+"'}"
			response = requests.get(self._getURL, PARAMS)
			if response is not None:
				return True
			else:
				return False
		except Exception as e:
			print(e)
			return -1

	# Obté el node de la topoDB amb el ID donat
	def getDB(self, nodeID):
		try:
			PARAMS = "selec={'role':"+"'"+nodeID+"'}"
			response = requests.get(self._getURL, PARAMS)
			if response is not None:
				print("200 OK")
				return response.json()
			else:
				print("El node amb ID donat no existeix")
				exit()
		except Exception as e:
			print(e)
			return -1


	# Esborra el node de la topoDB amb el ID donat
	def delDB(self, nodeID):
		try:
			PARAMS = "index={'myIP':"+"'"+nodeID+"'}"
			response = requests.get(self._delURL, PARAMS)
			if response.status_code == 200:
				return response.json()
			else:
				return None
		except Exception as e:
			print(e)
			return -1

	# Esborra el node agent cloud de la topoDB
	def delDB(self, agentCloud):
		try:
			PARAMS = "index={'role':"+"'"+agentCloud+"'}"
			response = requests.get(self._delURL, PARAMS)
			if response.status_code == 200:
				return response.json()
			else:
				return None
		except Exception as e:
			print(e)
			return -1

	# Esborra tots els nodes de la BD
	def resetDB(self):
		response = requests.get(self._resetURL)
		return response.status_code

	# Body = json amb info de l'agent
	def register(body):
		IP_DB = 'localhost'
		PORT_DB = 27017
		client = pymongo.MongoClient(IP_DB, PORT_DB)
		agent_collection = client.topoDB.nodes
		try:
			nodeID = agent_collection.find_and_modify(query= { '_id': 'nodeID' },update= { '$inc': {'seq': 1}}, new=True ).get('seq')
			body['_id'] = str(int(nodeID))
			body['status'] = 1
			body['nodeID'] = str(uuid.uuid4())
			agent_collection.insert_one(body)
		except pymongo.errors.DuplicateKeyError as e:
			nodeID = post_topoDB(body) 
		return 'Agent afegit'


	def get_all_agents():
		IP_DB = 'localhost'
		PORT_DB = 27017
		client = pymongo.MongoClient(IP_DB, PORT_DB)
		agent_collection = client.topoDB.nodes
		cursor = agent_collection.find({})
		all_data = list(cursor)
		print(all_data)
		output = []
		for document in all_data:
			print(document)
			output.append(document)
		output.pop(0) # Fem el pop per treure el primer element de la DB
		agent_json = json.dumps(output, default=json_util.default)
		return agent_json