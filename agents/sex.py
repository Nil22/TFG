# Importem llibreries
import socket
import time
import sys
import os
import subprocess
import json
import random
import pickle
import sqlite3
import requests
import pysftp
import pymongo

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]

output_cpu = {}
ipAPI = get_ip_address()

class sex:

	def __init__(self):
		self._services = []

	# Rep id del servei a executar i id del agent que demana el servei
	def get_service_request(self, serviceID, agentID):
		# service ID = aparcar
		# agentID = hola
		# Si el mateix agent ja ha demanat el servei rebutjem request
		#if((serviceID,agentID) in self._services):
		#	return 'Ja has demanat aquest servei'
		# sino ens l'afegim a la cua de serveis del SEX
		self._services.append((serviceID,agentID))
		print('Serveis SEX', self._services)
		# handle = diccionari amb info del servei
		handle = self.handle_request(serviceID)
		print('INFO del SERVEI', handle)
		# handle = json amb la info del servei aparcar
		service_code = self.get_code(serviceID)
		print('SERVICE CODE', type(service_code))
		handle['url'] = '../'+service_code
		return handle


	def handle_request(self, service):
		# service = aparcar
		req = requests.get('http://'+ipAPI+':8000/get_service/'+service).json()
		# req = json amb la info del servei aparcar
		#codi = req['code']
		# Return service info
		return req


	# Obte el codi del SFTP del servei donat
	def get_code(self, serviceID):
		localPath = '../'+str(serviceID.lower())+'.py'
		# POSAR PATH DEL DIRECTORI SFTP !!
		remotePath = '/home/nil/SFTP/'+str(serviceID.lower())+'.py'
		cnopts = pysftp.CnOpts()
		cnopts.hostkeys = None
		# CANVIAR PARAMETRE username i password
		s = pysftp.Connection(host='localhost', username="nil", password="hola123", cnopts=cnopts)
		s.get(remotePath, localPath)
		return str(serviceID)+'.py'