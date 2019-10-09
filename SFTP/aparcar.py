import socket
import requests
import sys
import json
# Obté l'adreça IP de l'agent leader del parquing
def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]

# Retornem sempre P1 perque nomes hi ha un parquing
def troba_parquing():
	return 'P1'

# Servei aparcament
def aparcament():
	ipAPI = get_ip_address()
	# 1 - Troba parquing
	posicioParquing = troba_parquing()
	# 2 - Fa reserva
	reserva = {}
	reserva['nodeID'] = sys.argv[1]
	reserva['parquingID'] = posicioParquing
	req = requests.post('http://'+ipAPI+':8000/reserva_plasa', json=reserva)
	if(req.text == 'Ja tens una reserva'):
		return 'Ja tens una reserva'
	# Retornem la posicio del parquing en un format adequat per a
	# posteriorment l'equip de conduccio pugui calcular la ruta
	dades = {}
	dades['status'] = 'success'
	dades['type'] = 'service_result'
	# La url indica on l'agent ha de fer l'avis quan arriba al parquing
	dades['output'] = {
		'Final' : 'P1',
		'url' : 'http://'+ipAPI+':8000/update_testbed'
	}
	dades['output'] = json.dumps(dades['output'])
	print(json.dumps(dades))
	return json.dumps(dades)

if __name__ == '__main__':
	aparcament()


