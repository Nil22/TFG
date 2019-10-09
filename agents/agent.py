# Llibreries i importacions altres programes
import socket
import time
import sys
import socket
import os
import subprocess
import threading
from threading import Thread
import _thread
from uuid import uuid4
import sys
import sqlite3
import random
import time
import datetime
import pickle
import pysftp
import pymongo

# Importem moduls i API
from topology import topology
from sex import sex
from rt import rt
from api import API
import cherrypy

import requests


class agent:

	# Inicialitzem el leader
	def __init__(self, host, port, device, role, leaderIP, IOT):
		# IP i port del leader
		self._host = host
		self._port = port

		# Info del leader per a la topoDB
		self._nodeinfo = {
			'device' : device,
			'role' : role,
			'status' : 1,
			'myIP' : host,
			'leaderIP' : leaderIP,
			'port' : port,
			'IOT' : IOT,
		}

		# TRM
		self._TRM = topology('localhost', 27017)

		# SEX
		self._SEX = sex()

		# RT
		self._RT = rt(self)

		# API
		self._api = API(self)
		self._api.start()