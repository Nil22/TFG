// API REQUESTS

function httpGet(theUrl, data)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", theUrl, true);
    xhttp.setRequestHeader("Content-type", "text/plain");
    xhttp.send(data);
}

function getNumPlaces(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
// fi API REQUESTS

function handle_places(num_places){
  var factor = {};
  if(num_places == 16){
    factor = 2
    width = 440/factor
    //console.log(width)
  }
  if(num_places == 32){
    factor['factor'] = 4
    factor['width'] = 440/factor['factor']
  }
  if(num_places == 64){
    factor['factor'] = 8
    factor['width'] = 440/factor['factor']
  }
  if(num_places == 88){
    factor['factor'] = 10
    factor['width'] = 440/factor['factor']
  }
  if(num_places == 128){
    factor['factor'] = 16
    factor['width'] = parseInt(440/factor['factor'])
  }
  zona1 = { "x" : 440, "y" : 0}
  zona2 = { "x" : 560, "y" : 0}
  //console.log(zona1)
  //console.log(zona2)
  return factor;
}


// general params

var ip = '0.0.0.0';

hola = getNumPlaces('http://'+ip+':8000/placesfront')

vehiclesXplanta = hola

console.log("VehiclesXplanta", vehiclesXplanta)

placesXzona = vehiclesXplanta/4

console.log("VehiclesXzona", placesXzona)

var factor2 = handle_places(vehiclesXplanta)
console.log("FAC",factor2)

multiplicador = 88

factor = multiplicador/vehiclesXplanta

ample = 10
alt = 100
factorX = 4 * factor
factorY = 1 * factor

var amplePlasa;
var altPlasa = 100;
if(placesXzona == 2){
  console.log("2 places per zona")
  amplePlasa = 440;
}
if(placesXzona == 4){
  console.log("4 places per zona")
  amplePlasa = 220;
}
if(placesXzona == 8){
  console.log("8 places per zona")
  amplePlasa = 110;
}
if(placesXzona == 16){
  console.log("16 places per zona")
  amplePlasa = 55;
}
if(placesXzona == 22){
  console.log("AIXO ES MERDA")
  amplePlasa = 44;
}

console.log("Ample de cada plasa", amplePlasa)

// 2.2 = 50 places per zona
// 1.1 = 100 places per zona
// 5 = 22 places per zona
// 2.5 = 44 places per zona


altNou = 100
ampleNou = 10 // amplada de cada plaça

// fi general params






// llista places

var llistaPlaces = new Array(vehiclesXplanta);

for(i = 0; i <= placesXzona; i++){
  llistaPlaces[i] = 'NW'+(i+1).toString()+'-P0'
}

for(i = 0; i <= placesXzona; i++){
  llistaPlaces[i+placesXzona] = 'NE'+(i+1).toString()+'-P0'
}

for(i = 0; i <= placesXzona; i++){
  llistaPlaces[i+placesXzona*2] = 'SW'+(i+1).toString()+'-P0'
}

for(i = 0; i < placesXzona; i++){
  llistaPlaces[i+placesXzona*3] = 'SE'+(i+1).toString()+'-P0'
}

for(i = 0; i < llistaPlaces.length; i++){
  //console.log(llistaPlaces[i])
}

// fi llista places

// diccionari amb totes les places i coordenades de cada plasa
var llistaPlaces3 = {}

// NW
_x = 0
_y = 0

for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["NW"+(i+1).toString()+'-P0'] = {x:_x, y:_y};
  _x = _x + amplePlasa
}
_x = 0
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["NW"+(i+1).toString()+'-P0'] = {x:_x, y: 100};
  _x = _x + amplePlasa
}

// SW
_x = 0
for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["SW"+(i+1).toString()+'-P0'] = {x:_x, y: 300};
  _x = _x + amplePlasa
}
_x = 0
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["SW"+(i+1).toString()+'-P0'] = {x:_x, y: 400};
  _x = _x + amplePlasa
}

// NE
_x2 = 560

for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["NE"+(i+1).toString()+'-P0'] = {x:_x2, y:_y};
  _x2 = _x2 + amplePlasa
}
_x2 = 560
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["NE"+(i+1).toString()+'-P0'] = {x:_x2, y: 100};
  _x2 = _x2 + amplePlasa
}

// SE

_x2 = 560

for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["SE"+(i+1).toString()+'-P0'] = {x:_x2, y: 300};
  _x2 = _x2 + amplePlasa
}
_x2 = 560
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["SE"+(i+1).toString()+'-P0'] = {x:_x2, y: 400};
  _x2 = _x2 + amplePlasa
}

// -----------------------------------------

// NW
_x = 0
_y = 0

for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["NW"+(i+1).toString()+'-P1'] = {x:_x, y:_y};
  _x = _x + amplePlasa
}
_x = 0
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["NW"+(i+1).toString()+'-P1'] = {x:_x, y: 100};
  _x = _x + amplePlasa
}

// SW
_x = 0
for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["SW"+(i+1).toString()+'-P1'] = {x:_x, y: 300};
  _x = _x + amplePlasa
}
_x = 0
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["SW"+(i+1).toString()+'-P1'] = {x:_x, y: 400};
  _x = _x + amplePlasa
}

// NE
_x2 = 560

for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["NE"+(i+1).toString()+'-P1'] = {x:_x2, y:_y};
  _x2 = _x2 + amplePlasa
}
_x2 = 560
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["NE"+(i+1).toString()+'-P1'] = {x:_x2, y: 100};
  _x2 = _x2 + amplePlasa
}

// SE

_x2 = 560

for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["SE"+(i+1).toString()+'-P1'] = {x:_x2, y: 300};
  _x2 = _x2 + amplePlasa
}
_x2 = 560
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["SE"+(i+1).toString()+'-P1'] = {x:_x2, y: 400};
  _x2 = _x2 + amplePlasa
}




// -----------------------------------------

// NW
_x = 0
_y = 0

for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["NW"+(i+1).toString()+'-P2'] = {x:_x, y:_y};
  _x = _x + amplePlasa
}
_x = 0
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["NW"+(i+1).toString()+'-P2'] = {x:_x, y: 100};
  _x = _x + amplePlasa
}

// SW
_x = 0
for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["SW"+(i+1).toString()+'-P2'] = {x:_x, y: 300};
  _x = _x + amplePlasa
}
_x = 0
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["SW"+(i+1).toString()+'-P2'] = {x:_x, y: 400};
  _x = _x + amplePlasa
}

// NE
_x2 = 560

for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["NE"+(i+1).toString()+'-P2'] = {x:_x2, y:_y};
  _x2 = _x2 + amplePlasa
}
_x2 = 560
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["NE"+(i+1).toString()+'-P2'] = {x:_x2, y: 100};
  _x2 = _x2 + amplePlasa
}

// SE

_x2 = 560

for(i = 0; i <= placesXzona/2; i++){
  llistaPlaces3["SE"+(i+1).toString()+'-P2'] = {x:_x2, y: 300};
  _x2 = _x2 + amplePlasa
}
_x2 = 560
for(i = placesXzona/2; i < placesXzona; i++){
  llistaPlaces3["SE"+(i+1).toString()+'-P2'] = {x:_x2, y: 400};
  _x2 = _x2 + amplePlasa
}



// ---------------------



llistaPlaces3['placesXplanta'] = vehiclesXplanta




console.log("PEPE", llistaPlaces3)

llista_places3 = JSON.stringify(llistaPlaces3)
httpGet('http://'+ip+':8000/inserta_places', llista_places3)



numPlantes = getNumPlaces('http://'+ip+':8000/get_numPlantes')
numPlantesJson = JSON.parse(numPlantes)
console.log("NUM plantes : ", numPlantesJson[0]['placesXplanta'])

function add() {
  //Create an input type dynamically.   
  for(i = 0; i < numPlantesJson[0]['placesXplanta']; i++){
    var para = document.createElement("button");
    para.setAttribute("class","btn");
    para.setAttribute("id","btnid"+i);
    para.style.background = "#e7e7e7";
    para.style.width = '80px';
    para.style.height = '40px';
    para.innerHTML = "Planta "+i.toString();
    document.getElementById("myBtnContainer").appendChild(para);
  }
}



// filtre COMPUTACIO

function computacio3() {
  axios.get('http://'+ip+':8000/get_vehicles').then(response => {
    let humy = response.data

    c = document.getElementById("canvas3");
    var width = c.width;
    var height = c.height;
    c.addEventListener('mousedown', onDown3, false);
    ctx = c.getContext("2d");


    // pintem fons
    for(var x = 0; x <= 100; x=x+10){
      for(var y = 0; y <= 100; y=y+10){
          ctx.fillStyle = "#63ff01";
          ctx.fillRect(10*x, 10*y, 100, 100);
      }
    }

  // NW
  // i = vertical
              // fins on arribem  // amplada plaça
  for(i = 0; i <= 440; i = i + ampleNou*factorX){
    for(j = 0; j <= 500; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,0);
      ctx.lineTo(i,200);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0,j);
      ctx.lineTo(440,j);
      ctx.stroke();
    }
  }

  for(i = 0; i <= 440; i = i + ampleNou*factorX){
    for(j = 300; j <= 3000; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,300);
      ctx.lineTo(i,500);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0,j);
      ctx.lineTo(440,j);
      ctx.stroke();
    }
  }

  for(i = 560; i <= 1000; i = i + ampleNou*factorX){
    for(j = 0; j <= 1000; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,0);
      ctx.lineTo(i,200);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(560,j);
      ctx.lineTo(1000,j);
      ctx.stroke();
    }
  }

  for(i = 560; i <= 1000; i = i + ampleNou*factorX){
    for(j = 300; j <= 3000; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,300);
      ctx.lineTo(i,500);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(560,j);
      ctx.lineTo(1000,j);
      ctx.stroke();
    }
  }
    

    ctx.lineWidth=4; 

    // pinta carreteres WEST
    // sempre igual
    ctx.beginPath()
    ctx.strokeStyle='yellow'
    ctx.moveTo(0,200)
    ctx.lineTo(440, 200)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle='brown'
    ctx.moveTo(0,300)
    ctx.lineTo(440, 300)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle='yellow'
    ctx.moveTo(440,0)
    ctx.lineTo(440, 200)
    ctx.stroke() 

    ctx.beginPath()
    ctx.strokeStyle='brown'
    ctx.moveTo(440,300)
    ctx.lineTo(440, 500)
    ctx.stroke()

    // pinta carreteres EAST

    ctx.beginPath()
    ctx.strokeStyle='blue'
    ctx.moveTo(560,0)
    ctx.lineTo(560, 200)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle='blue'
    ctx.moveTo(560,200)
    ctx.lineTo(1000, 200)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle='orange'
    ctx.moveTo(560,300)
    ctx.lineTo(560, 500)
    ctx.stroke() 

    ctx.beginPath()
    ctx.strokeStyle='orange'
    ctx.moveTo(560,300)
    ctx.lineTo(1000, 300)
    ctx.stroke()

    c = document.getElementById("canvas3");
    ctx = c.getContext("2d");
    ctx.fillStyle = "#006400";

    for(i = 1; i < vehiclesXplanta; i++){
      console.log('oscar',llistaPlaces3['NE2'])
      nomPlasa = humy[i]['plasa']
      console.log(nomPlasa)
      if(humy[i+128]['computa']){
        if(humy[i+128]['computa'] == true){
        ctx.fillRect(llistaPlaces3[nomPlasa]["x"], llistaPlaces3[nomPlasa]["y"], amplePlasa-2, 99);
        }
      }
    }
  }).catch(e => {
    console.log("Error",e)
  })
}

// FI filtre computacio






// pinta places ocupades

function pintaocupades3() {
  axios.get('http://'+ip+':8000/get_vehicles').then(response => {
    let humy = response.data
    console.log('ISA333', humy[129])

    c = document.getElementById("canvas3");
    var width = c.width;
    var height = c.height;
    c.addEventListener('mousedown', onDown3, false);
    ctx = c.getContext("2d");


    // pintem fons
    for(var x = 0; x <= 100; x=x+10){
      for(var y = 0; y <= 100; y=y+10){
          ctx.fillStyle = "#63ff01";
          ctx.fillRect(10*x, 10*y, 100, 100);
      }
    }

  // NW
  // i = vertical
              // fins on arribem  // amplada plaça
  for(i = 0; i <= 440; i = i + ampleNou*factorX){
    for(j = 0; j <= 500; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,0);
      ctx.lineTo(i,200);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0,j);
      ctx.lineTo(440,j);
      ctx.stroke();
    }
  }

  for(i = 0; i <= 440; i = i + ampleNou*factorX){
    for(j = 300; j <= 3000; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,300);
      ctx.lineTo(i,500);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0,j);
      ctx.lineTo(440,j);
      ctx.stroke();
    }
  }

  for(i = 560; i <= 1000; i = i + ampleNou*factorX){
    for(j = 0; j <= 1000; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,0);
      ctx.lineTo(i,200);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(560,j);
      ctx.lineTo(1000,j);
      ctx.stroke();
    }
  }

  for(i = 560; i <= 1000; i = i + ampleNou*factorX){
    for(j = 300; j <= 3000; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,300);
      ctx.lineTo(i,500);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(560,j);
      ctx.lineTo(1000,j);
      ctx.stroke();
    }
  }
    

    ctx.lineWidth=4; 

    // pinta carreteres WEST
    // sempre igual
    ctx.beginPath()
    ctx.strokeStyle='yellow'
    ctx.moveTo(0,200)
    ctx.lineTo(440, 200)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle='brown'
    ctx.moveTo(0,300)
    ctx.lineTo(440, 300)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle='yellow'
    ctx.moveTo(440,0)
    ctx.lineTo(440, 200)
    ctx.stroke() 

    ctx.beginPath()
    ctx.strokeStyle='brown'
    ctx.moveTo(440,300)
    ctx.lineTo(440, 500)
    ctx.stroke()

    // pinta carreteres EAST

    ctx.beginPath()
    ctx.strokeStyle='blue'
    ctx.moveTo(560,0)
    ctx.lineTo(560, 200)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle='blue'
    ctx.moveTo(560,200)
    ctx.lineTo(1000, 200)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle='orange'
    ctx.moveTo(560,300)
    ctx.lineTo(560, 500)
    ctx.stroke() 

    ctx.beginPath()
    ctx.strokeStyle='orange'
    ctx.moveTo(560,300)
    ctx.lineTo(1000, 300)
    ctx.stroke()

    c = document.getElementById("canvas3");
    ctx = c.getContext("2d");
    ctx.fillStyle = "red";

    for(i = 1; i <= vehiclesXplanta; i++){
      if(humy[i+128]['plasa']){
        nomPlasa = humy[i]['plasa']
      }
      console.log(nomPlasa)
      ctx.fillRect(llistaPlaces3[nomPlasa]["x"], llistaPlaces3[nomPlasa]["y"], amplePlasa-1, 99);
    }
  }).catch(e => {
    console.log("Error",e)
  })
}









// CANVAS inicial

function draw3(){
  // get canvas params
  c = document.getElementById("canvas3");
  var width = c.width;
  var height = c.height;
  c.addEventListener('mousedown', onDown3, false);
  ctx = c.getContext("2d");


  // NORTH WEST

  var NW = []
  var NW2 = []

  var sumatori = 0

  for(i = 0; i < 11; i++){
    NW.push({x:sumatori, y:0})
    sumatori = sumatori + 40
  }

  var sumatori2 = 0

  for(i = 0; i < 11; i++){
    NW2.push({x:sumatori2, y:100})
    sumatori2 = sumatori2 + 40
  }

  
  // NORTH EAST

  var NE = []
  var NE2 = []

  var sumatori = 560

  for(i = 0; i < 11; i++){
    NE.push({x:sumatori, y:0})
    sumatori = sumatori + 40
  }

  var sumatori2 = 560

  for(i = 0; i < 11; i++){
    NE2.push({x:sumatori2, y:100})
    sumatori2 = sumatori2 + 40
  }

  // SOUTH WEST

  var SW = []
  var SW2 = []

  var sumatori = 0

  for(i = 0; i < 11; i++){
    SW.push({x:sumatori, y:300})
    sumatori = sumatori + 40
  }

  var sumatori2 = 0

  for(i = 0; i < 11; i++){
    SW2.push({x:sumatori2, y:400})
    sumatori2 = sumatori2 + 40
  }

  // SOUTH EAST

  var SE = []
  var SE2 = []

  var sumatori = 560

  for(i = 0; i < 11; i++){
    SE.push({x:sumatori, y:300})
    sumatori = sumatori + 40
  }

  var sumatori2 = 560

  for(i = 0; i < 11; i++){
    SE2.push({x:sumatori2, y:400})
    sumatori2 = sumatori2 + 40
  }

  // pintem fons
  for(var x = 0; x <= 100; x=x+10){
    for(var y = 0; y <= 100; y=y+10){
        ctx.fillStyle = "#c8c8c8";
        ctx.fillRect(10*x, 10*y, 100, 100);
    }
  }

  for(i = 0; i < 11; i++){
    ctx.fillStyle = "red";
    /*ctx.fillRect(NW[i]["x"], NW[i]["y"], 39, 100);
    ctx.fillRect(NW2[i]["x"], NW2[i]["y"], 39, 100);
    ctx.fillRect(NE[i]["x"], NE[i]["y"], 39, 100);
    ctx.fillRect(NE2[i]["x"], NE2[i]["y"], 39, 100);

    ctx.fillRect(SW[i]["x"], SW[i]["y"], 39, 100);
    ctx.fillRect(SW2[i]["x"], SW2[i]["y"], 39, 100);
    ctx.fillRect(SE[i]["x"], SE[i]["y"], 39, 100);
    ctx.fillRect(SE2[i]["x"], SE2[i]["y"], 39, 100);

    ctx.fillStyle = "blue";
    ctx.fillRect(NW[0]["x"], NW[0]["y"], 39, 100);
    ctx.fillRect(NE2[0]["x"], NE2[0]["y"], 39, 100);

    ctx.fillRect(SW2[10]["x"], SW2[10]["y"], 39, 100); */

  }



  // NW
  // i = vertical
              // fins on arribem  // amplada plaça
  for(i = 0; i <= 440; i = i + ampleNou*factorX){
    for(j = 0; j <= 500; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,0);
      ctx.lineTo(i,200);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0,j);
      ctx.lineTo(440,j);
      ctx.stroke();
    }
  }

  for(i = 0; i <= 440; i = i + ampleNou*factorX){
    for(j = 300; j <= 3000; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,300);
      ctx.lineTo(i,500);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0,j);
      ctx.lineTo(440,j);
      ctx.stroke();
    }
  }

  for(i = 560; i <= 1000; i = i + ampleNou*factorX){
    for(j = 0; j <= 1000; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,0);
      ctx.lineTo(i,200);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(560,j);
      ctx.lineTo(1000,j);
      ctx.stroke();
    }
  }

  for(i = 560; i <= 1000; i = i + ampleNou*factorX){
    for(j = 300; j <= 3000; j = j + alt){
      ctx.strokeStyle='white';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(i,300);
      ctx.lineTo(i,500);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(560,j);
      ctx.lineTo(1000,j);
      ctx.stroke();
    }
  }
  

  ctx.lineWidth=4; 

  // pinta carreteres WEST
  // sempre igual
  ctx.beginPath()
  ctx.strokeStyle='yellow'
  ctx.moveTo(0,200)
  ctx.lineTo(440, 200)
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle='brown'
  ctx.moveTo(0,300)
  ctx.lineTo(440, 300)
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle='yellow'
  ctx.moveTo(440,0)
  ctx.lineTo(440, 200)
  ctx.stroke() 

  ctx.beginPath()
  ctx.strokeStyle='brown'
  ctx.moveTo(440,300)
  ctx.lineTo(440, 500)
  ctx.stroke()

  // pinta carreteres EAST

  ctx.beginPath()
  ctx.strokeStyle='blue'
  ctx.moveTo(560,0)
  ctx.lineTo(560, 200)
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle='blue'
  ctx.moveTo(560,200)
  ctx.lineTo(1000, 200)
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle='orange'
  ctx.moveTo(560,300)
  ctx.lineTo(560, 500)
  ctx.stroke() 

  ctx.beginPath()
  ctx.strokeStyle='orange'
  ctx.moveTo(560,300)
  ctx.lineTo(1000, 300)
  ctx.stroke()

  // pintem noms

  /*ctx.font = "100px verdana, sans-serif";
  ctx.fillStyle = "black";
  ctx.fillText('NW', 100, 100);
  ctx.fillText('SW', 100, 400);
  ctx.fillText('NE', 700, 100);
  ctx.fillText('SE', 700, 400); */

}