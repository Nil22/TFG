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
import time
import ast

class rt:

	def __init__(self, agent):

		self._agent = agent

		self._services = []



	# Rep l'ID de l'agent sol·licitant del servei
	# i la informació del servei a executar
	def executa_servei(self, agentID, info_servei, extraParams):
		#print("RT executa el servei", type(info_servei))
		# URL o path complet del fitxer a executar
		codi_servei = '../SFTP/'+info_servei['code']
		# Com que cada servei necessita uns paràmetres diferents els haurem d'executar per separat
		if(info_servei['id'] == 'APARCAR'):
			print("RT executa el servei", codi_servei)
			output = subprocess.getoutput("sudo python3 "+codi_servei+" "+agentID)
			newJson = json.dumps(output)
			d = ast.literal_eval(output)
			print(d)
			#print('dumps', type(d))
			#print('output', output)
			#print('diccionario?', type(newJson))
			#print('newJson', newJson)
		if(info_servei['id'] == 'computar'):
			# canviar a newJson
			print("RT executa el servei", codi_servei)
			codi_a_computar = extraParams['nom_fitxer']
			print('codi a computar', codi_a_computar)
			versio = extraParams['version']
			pp = extraParams['paralel']
			quiExecuta = extraParams['quiExecuta']
			d = subprocess.getoutput("sudo python3 "+codi_servei+" "+agentID+" "+codi_a_computar+" "+versio+" "+pp+" "+quiExecuta)
		return d