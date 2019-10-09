var ip = location.hostname;

function getNumPlaces(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var numPlaces = getNumPlaces('http://'+ip+':8000/placesfront');
var numPlantes = getNumPlaces('http://'+ip+':8000/plantesfront');
var placesOcupades = getNumPlaces('http://'+ip+':8000/places_ocupades');

var numReserves = getNumPlaces('http://'+ip+':8000/update_reserves');
console.log('Numero de reserves', numReserves)

var placesLliures = numPlaces - placesOcupades;
console.log('Places lliures', placesLliures)

numPlaces = numPlaces * numPlantes;

console.log( (placesOcupades/numPlaces) * 100)

var placesLliures = numPlaces - placesOcupades;
console.log('Places lliures', placesLliures)

var reservesPossibles = Math.round((numReserves/placesLliures) * 100);
console.log('Reserves possibles', reservesPossibles)

var ocupacio = Math.round((placesOcupades/numPlaces) * 100);

console.log('ocupacio%', ocupacio)


var vehiclesComputen = getNumPlaces('http://'+ip+':8000/vehiclesQueComputen');
var porcentatgeComputen = Math.round((vehiclesComputen/numPlaces) * 100);
console.log('vehicles que computen', porcentatgeComputen);

/*function display_cpu() {
  axios.get('http://'+ip+':8000/get_cpu').then(response => {
    let humy = response.data
    //console.log(humy)
    /*humy.forEach(e => {
      if (e === null) e = 0;
    }) 
    let myChart = document.getElementById('myChart1').getContext('2d');
    let parkingChart = new Chart(myChart, {
      scaleOverride : true,
      type:'bar',
      data:{
        labels:['A1', 'A2', 'A3'],
        datasets:[{
          label:'% CPU',
          data:[
            humy['A1'],
            //humy['A2'],
            0,
            //humy['A3']
            0
          ],
          backgroundColor:[
            '#c90631',
            '#c90631',
            '#c90631'
          ],

        }]
      },
      options:{
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max : 100
                }
            }]
        },
        responsive: false,
        animation: {
          duration: 0
        }
      }
    });

  }).catch(e => {
    console.log("Error",e)
  }) 
} */


function formatDate(date){
  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear();
  if(dd<10) {dd='0'+dd}
  if(mm<10) {mm='0'+mm}
  date = dd+'/'+mm;
  return date
}

var dies = [];

function Last7Days () {
    var result = [];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push( formatDate(d) )
        dies.push( formatDate(d) )
    }

    return(result.join(','));
}

Last7Days()

var diesbona = [];
for(var i = 0; i <= dies.length; i++){
  diesbona.push(dies[dies.length-i]);
}

diesbona.shift(); // treu primer element

function display2() {
  axios.get('http://'+ip+':8000/fitxers7dies').then(response => {
    let humy = response.data
    console.log('nene', humy)
    let myChart = document.getElementById('myChart2').getContext('2d');
    let parkingChart = new Chart(myChart, {
      scaleOverride : true,
      type:'bar',
      data:{
        labels: diesbona,
        datasets:[{
          label:'Nº fitxers',
          data:[
            humy[0]['fitxers'],
            humy[1]['fitxers'],
            humy[2]['fitxers'],
            humy[3]['fitxers'],
            humy[4]['fitxers'],
            humy[5]['fitxers'],
            humy[6]['fitxers']
          ],
          backgroundColor:[
            '#247474',
            '#247474',
            '#247474',
            '#247474',
            '#247474',
            '#247474',
            '#247474',
          ],

        }]
      },
      options:{
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max : 50
                }
            }]
        },
        responsive: false,
        animation: {
            duration: 0
        }
      }
    });

  }).catch(e => {
    console.log("Error",e)
  })
}



// Serveis en execucio
function display3() {
  axios.get('http://'+ip+':8000/serveis_execucio').then(response => {
    let humy = response.data
    console.log('serveis en execucio', humy)
    if(humy.length == 0){
      document.getElementById('label3').innerHTML = 'No hi han programes en execució'.bold();
      return;
    }

    var deita = []

    for(var i = 0; i < humy.length; i++){
      deita.push(1/humy.length);
    }

    let myChart = document.getElementById('myChart3').getContext('2d');
    let parkingChart = new Chart(myChart, {
      scaleOverride : true,
      type:'pie',
      data:{
        labels: humy,
        datasets:[{
          label:'Serveis en execució',
          data: deita,
          backgroundColor:[
            '#7db49e',
            '#7d9eb4',
            '#b47d9e'
          ],

        }]
      },
      options:{
        responsive: false,
        animation: {
          duration: 0
        }
      }
    });
    /*var i = 0;
    while(i < humy.length){
      parkingChart.data.labels.push(humy[i])
    }
    parkingChart.update() */

  }).catch(e => {
    console.log("Error",e)
  })
}

function display4() {
  axios.get('http://'+ip+':8000/update_reserves').then(response => {
    let humy = response.data
    let myChart = document.getElementById('myChart4').getContext('2d');
    let parkingChart = new Chart(myChart, {
      scaleOverride : true,
      type:'horizontalBar',
      data:{
        labels:['Reserves', 'Ocupacio', 'Computacio'],
        datasets:[{
          label:'%',
          data:[
            reservesPossibles,
            ocupacio,
            porcentatgeComputen
          ],
          backgroundColor:[
            '#e6e600',
            '#e6e600',
            '#e6e600'
          ],

        }]
      },
      options:{
        scales: {
            xAxes: [{
                ticks: {
                    precision : 0,
                    beginAtZero: true,
                    max : 100
                }
            }]
        },
        responsive: false,
        animation: {
          duration: 0
        }
      }
    });

  }).catch(e => {
    console.log("Error",e)
  })
}

function display5() {
  axios.get('http://'+ip+':8000/resourcesGraphic').then(response => {
    let humy = response.data
    let myChart = document.getElementById('myChart5').getContext('2d');
    let parkingChart = new Chart(myChart, {
      scaleOverride : true,
      type:'bar',
      data:{
        labels:[' '],
        datasets:[{
          label:'Total CPUs disponible (Nº)',
          data:[humy[0]['CPU']],backgroundColor:['orange',],}, 
          {
          label:'Total RAM disponible (GB)',
          data:[humy[0]['RAM']],backgroundColor:['blue',],}]
      },
      options:{
        scales: {
            yAxes: [{
                ticks: {
                    precision : 0,
                    beginAtZero: true,
                    max : 3000,
                    stepSize: 300
                }
            }]
        },
        responsive: false,
        animation: {
          duration: 0
        }
      }
    });

  }).catch(e => {
    console.log("Error",e)
  })
}





function display6() {
  axios.get('http://'+ip+':8000/update_reserves').then(response => {
    let humy = response.data
    let myChart = document.getElementById('myChart6').getContext('2d');
    let parkingChart = new Chart(myChart, {
      scaleOverride : true,
      type:'bar',
      data:{
        labels:['Reserves'],
        datasets:[{
          label:'Nº reserves per avui',
          data:[
            humy
          ],
          backgroundColor:[
            'purple',
          ],

        }]
      },
      options:{
        scales: {
            yAxes: [{
                ticks: {
                    precision : 0,
                    beginAtZero: true,
                    max : 4,
                    stepSize: 32
                }
            }]
        },
        responsive: false,
        animation: {
          duration: 0
        }
      }
    });

  }).catch(e => {
    console.log("Error",e)
  })
}