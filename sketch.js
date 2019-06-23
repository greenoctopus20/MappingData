
let mapimg ;
let loadedData ;
var clat = 0;
var clon = 0;

var lat = 35.1686;
var lon = -2.9276;

var zoom = 1;
var magColor;

var colors ;

function preload(){
  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoidWNlZnBpbmdvIiwiYSI6ImNqeDkwN2dtMzA4bnEzdGw4YXpjdHhnN3UifQ.AmvEPX5KnHaePiuBmJx5Bg");
  loadedData = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
  // format of csv file
  //time,latitude,longitude,depth,mag,magType,nst,gap,…r,magError,magNst,status,locationSource,magSource
}

function setup() {
 //setup colors for scales
  colors =[];
  magColor = 0;
  colors.push(color(255,255,255));
  colors.push(color(255,255,0));
  colors.push(color(255, 191, 0));
  colors.push(color(0,0,255));
  colors.push(color(0,255,0));
  colors.push(color(255,0,0));
  colors.push(color(255,255,255));

  createCanvas(1025,512);

  image(mapimg,0,0);  
  translate(width/2, height/2);
  imageMode(CENTER);
  var cx = mercatorX(clon);
  var cy = mercatorY(clat);

  for (var i = 0; i < loadedData.length ;i++){
    
      var data = loadedData[i].split(/,/);
      //console.log(data);
      lon = data[2];
      lat = data[1];
      magColor = magnitutude(float(data[4]))
      var x = mercatorX(lon) - cx;
      var y = mercatorY(lat) - cy;
      fill(colors[magColor]);
      ellipse(x,y,10,10);
      console.log(x + " , " + y);
      
    
  }
  

}
function draw() {
  //pieChart(300, angles);

}




function mercatorX(lon){
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b
}

function mercatorY(lat){
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


//function for magnitude scale
function magnitutude(value){
    if (value <= 2.5) {
      //scale 1 and 2 : White
     return 0;
    }
    if (value >= 2.5 && value <= 5.4) {
      //scale 3,4 and 5 : Yellow
      return 1;
    }
    if (value >= 5.5 && value <= 6) {
      //sclae 5 : Orange
      return 2;
    }
    if (value >= 6.1 && value <= 6.9) {
      //scale 6 : Green
     
      return 3;
    }

    if (value >= 7.0 && value <= 7.9) {
      //scale 7 : blue
      return 4;
    }

    if (value >= 8.0 ) {
      //scale 8 : red
      return 5;
    }
    else
    {
      return 0;
    }
}
