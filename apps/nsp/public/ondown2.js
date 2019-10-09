// API REQUESTS

var ip = location.hostname;

function getNumPlaces2(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


// Click CANVAS

function onDown2(event){
  var rect = document.getElementById("canvas2").getBoundingClientRect();
  console.log('canvas 2 clicked')
  cx = event.clientX - rect.left;
  cy = event.clientY - rect.top;
  // NW
  if(cx < amplePlasa && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW1-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW1');
    $('#myModal').modal('show');
  }

  venus = 2

  if(cx > amplePlasa && cx < amplePlasa*venus && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW2-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 3

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW3-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 4

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW4-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 5

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW5-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 6

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW6-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 7

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW7-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 8

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW8-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 9

  if(cx < amplePlasa && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW9-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 10

  if(cx > amplePlasa && cx < amplePlasa*2 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW10-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 11

  if(cx > amplePlasa*2 && cx < amplePlasa*3 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW11-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 12

  if(cx > amplePlasa*3 && cx < amplePlasa*4 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW12-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 13

  if(cx > amplePlasa*4 && cx < amplePlasa*5 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW13-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 14

  if(cx > amplePlasa*5 && cx < amplePlasa*6 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW14-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 15

  if(cx > amplePlasa*6 && cx < amplePlasa*7 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW15-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }

  venus = 16

  if(cx > amplePlasa*7 && cx < amplePlasa*8 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NW16-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW'+venus);
    $('#myModal').modal('show');
  }


  // NE


  if(cx < 560+amplePlasa && cx > 560 && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE1-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*2 && cx > 560+amplePlasa && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE2-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE2');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE2');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*3 && cx > 560+amplePlasa*2 && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE3-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE3');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE3');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*4 && cx > 560+amplePlasa*3 && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE4-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE4');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE4');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*5 && cx > 560+amplePlasa*4 && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE5-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE5');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE5');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*6 && cx > 560+amplePlasa*5 && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE6-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE6');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE6');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*7 && cx > 560+amplePlasa*6 && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE7-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE7');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE7');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*8 && cx > 560+amplePlasa*7 && cy < 100){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE8-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE8');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE8');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa && cx > 560 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE9-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE9-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE9-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*2 && cx > 560+amplePlasa && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE10-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE10-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE10-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*3 && cx > 560+amplePlasa*2 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE11-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE11-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE11-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*4 && cx > 560+amplePlasa*3 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE12-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE12-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE12-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*5 && cx > 560+amplePlasa*4 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE13-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE13-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE13-P1');
    $('#myModal').modal('show');
  }


  if(cx < 560+amplePlasa*6 && cx > 560+amplePlasa*5 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE14-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE14-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE14-P1');
    $('#myModal').modal('show');
  }

    if(cx < 560+amplePlasa*7 && cx > 560+amplePlasa*6 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE15-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE15-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE15-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*8 && cx > 560+amplePlasa*7 && cy > 100 && cy < 200){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE16-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NE16-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NE16-P1');
    $('#myModal').modal('show');
  }



  // SW

  if(cx < amplePlasa && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW1-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW1');
    $('#myModal').modal('show');
  }

  venus = 2

  if(cx > amplePlasa && cx < amplePlasa*venus && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW2-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 3

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW3-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 4

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW4-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 5

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW5-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 6

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW6-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 7

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW7-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 8

  if(cx > amplePlasa*(venus-1) && cx < amplePlasa*venus && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW8-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 9

  if(cx < amplePlasa && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW9-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus+'-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 10

  if(cx > amplePlasa && cx < amplePlasa*2 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW10-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 11

  if(cx > amplePlasa*2 && cx < amplePlasa*3 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW11-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 12

  if(cx > amplePlasa*3 && cx < amplePlasa*4 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW12-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 13

  if(cx > amplePlasa*4 && cx < amplePlasa*5 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW13-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 14

  if(cx > amplePlasa*5 && cx < amplePlasa*6 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW14-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 15

  if(cx > amplePlasa*6 && cx < amplePlasa*7 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW15-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }

  venus = 16

  if(cx > amplePlasa*7 && cx < amplePlasa*8 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SW16-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SW'+venus);
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SW'+venus);
    $('#myModal').modal('show');
  }








  // SE


  if(cx < 560+amplePlasa && cx > 560 && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE1-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE1-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE1-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*2 && cx > 560+amplePlasa && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE2-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE2-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE2-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*3 && cx > 560+amplePlasa*2 && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE3-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE3-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE3-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*4 && cx > 560+amplePlasa*3 && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE4-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE4-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE4-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*5 && cx > 560+amplePlasa*4 && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE5-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE5-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE5-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*6 && cx > 560+amplePlasa*5 && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE6-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE6-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE6-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*7 && cx > 560+amplePlasa*6 && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE7-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE7-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE7-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*8 && cx > 560+amplePlasa*7 && cy > 300 && cy < 400){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE8-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE8-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE8-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa && cx > 560 && cy > 100 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/NE9-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE9-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE9-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*2 && cx > 560+amplePlasa && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE10-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE10-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE10-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*3 && cx > 560+amplePlasa*2 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE11-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE11-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE11-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*4 && cx > 560+amplePlasa*3 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE12-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE12-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE12-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*5 && cx > 560+amplePlasa*4 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE13-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE13-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE13-P1');
    $('#myModal').modal('show');
  }


  if(cx < 560+amplePlasa*6 && cx > 560+amplePlasa*5 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE14-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE14-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE14-P1');
    $('#myModal').modal('show');
  }

    if(cx < 560+amplePlasa*7 && cx > 560+amplePlasa*6 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE15-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE15-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE15-P1');
    $('#myModal').modal('show');
  }

  if(cx < 560+amplePlasa*8 && cx > 560+amplePlasa*7 && cy > 400 && cy < 500){
    vehicle = getNumPlaces2('http://'+ip+':8000/get_vehicle/SE16-P1')
    console.log('vehicle',JSON.parse(vehicle))
    jotason = JSON.parse(vehicle)
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça SE16-P1');
    reso='Matrícula : '+jotason[0]['matricula']+'<br>IP : '+jotason[0]['agentIP']+'<br>Recursos : '+jotason[0]['resources']+'<br>Data entrada : '+jotason[0]['data_entrada'];
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça SE16-P1');
    $('#myModal').modal('show');
  }
















  /*if(cx < ampleNou*8 && cy < 100){
    $('#modalBody').text('');
    $('#exampleModalLabel').text('Plaça NW1');
    reso='Matrícula : '+'hola1'+'<br>Student Name:'+'hola2'+'<br>Department:'+'hola3'+'<br>Yop:'+'hola4';
    $("#modalBody").append(reso);
    $('#exampleModalLabel').text('Plaça NW1');
    $('#myModal').modal('show');   
    alert(cx + " " + cy)
  } */
}