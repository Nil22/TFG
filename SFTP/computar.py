print('codi servei computacio')

import socket
import requests
import sys
import os
import json
import subprocess
# Obté l'adreça IP de l'agent leader del parquing
def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]

# Servei aparcament
# sys.argv[2] = agentID
# sys.argv[3] = URL fitxer a computar
# sys.argv[4] = versio Python
# sys.argv[5] = Paralel o no
# sys.argv[6] = agent que executa el servei
def servei_computacio():
	ipAPI = get_ip_address()
	agentID = sys.argv[1]
	nom_fitxer = sys.argv[2]
	versio = sys.argv[3]
	paralel = sys.argv[4]
	quiExecuta = sys.argv[5]
	if(versio == 'Python2'):
		print('Aixo es Python2')
		output = subprocess.getoutput("sudo docker exec -it " + quiExecuta +" python " + nom_fitxer + " origen > /home/aerie/LogsParquing/log-"+os.path.splitext(nom_fitxer)[0]+".txt")
		exitStatus = output.returncode
		print("ERROR?", exitStatus)
		body = {}
		body['nom_fitxer'] = nom_fitxer
		body['status'] = exitStatus
		error = requests.post('http://'+ipAPI+':8000/errorExecution', json=body)		
		#exitStatus = subprocess.getoutput("echo $?")
		# exitStatus = 0 OK, 1 NO OK
	elif(versio == 'Python3'):
		print('Aixo es Python3')
		# argument timeout
		output = subprocess.run("sudo docker exec -it " + quiExecuta +" python3 " + nom_fitxer + " origen > /home/aerie/LogsParquing/log-"+os.path.splitext(nom_fitxer)[0]+".txt", shell=True)
		"""if(os.stat("/home/aerie/LogsParquing/log-"+os.path.splitext(nom_fitxer)[0]+".txt").st_size == 0):
			request.get('http://'+ipAPI+':8000/agentcau') """
		#exitStatus = subprocess.getoutput("sudo docker exec -it "+ quiExecuta +" echo $?")
		exitStatus = output.returncode
		print("ERROR?", exitStatus)
		body = {}
		body['nom_fitxer'] = nom_fitxer
		body['status'] = exitStatus
		error = requests.post('http://'+ipAPI+':8000/errorExecution', json=body)
		# exitStatus = 0 OK, 1 NO OK
	# Fi de la execucio
	os.system("sudo docker cp /home/aerie/LogsParquing/log-"+os.path.splitext(nom_fitxer)[0]+".txt" + " nsp_appclient_1:/log-"+os.path.splitext(nom_fitxer)[0]+".txt")
	#req = requests.get('http://'+ipAPI+':8000/update7dies')


if __name__ == '__main__':
	print('0',sys.argv[0])
	print('1',sys.argv[1])
	print('2',sys.argv[2])
	print('3',sys.argv[3])
	print('4',sys.argv[4])
	print('5',sys.argv[5])
	agentID = sys.argv[1]
	nom_fitxer = sys.argv[2]
	versio = sys.argv[3]
	paralel = sys.argv[4]
	quiExecuta = sys.argv[5]
	servei_computacio()