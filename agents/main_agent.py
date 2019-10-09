import socket
import time
import sys
import socket
import os
import subprocess
import threading
from threading import Thread
from _thread import *
import sys
import datetime
import sqlite3
import random
import time
from agent import agent
from topology import topology
from sex import sex
import requests

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]

# Programa principal que s'executa
if __name__ == "__main__":
	myIP = get_ip_address()
	leader = agent(myIP, 6000, 'device', 'leader', 'leaderIP', 'IOT')