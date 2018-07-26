function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

function toDegrees (angle) {
    return angle * (180 / Math.PI);
}

var canvas = document.getElementById("myCanvas");

var toptubeDiameter = 28.6; // Pacer, value is 
var seatTube = 560; // center of the bottom bracket to the top of the seat tube/top tube junction
var newSeatTube = seatTube - toptubeDiameter / 2; // center of the bottom bracket to the center of the top tube/seat tube junction

// Define given lengths
var l = {
    a: 460, // Chainstay
    b: newSeatTube, // Corrected - see above
    c: 564.5, // Top tube
    d: 152, // Head tube
    e: 390, // Fork length
    f: 78, // BB Bottom bracket drop
    g: 1055.6, // Wheelbase
    h: 0, // 
    i: 389.3, // Reach
    s: 588, // Stack
    t: 45, // Fork offset
    toptubeDiameter: 28.6, // Front Derailleur Clamp Diameter
};

// Define given angles - convert to radians
var a = {
    y: toRadians(72), // Head tube angle
    x: toRadians(73), // Seat tube angle
};


// Scale our constants to the canvas using wheelbase as maximum
height = canvas.height;
width = canvas.width;
scale = width / l.g;

// Apply the scale

for (let key in l) {
    if (l.hasOwnProperty(key)) {
         l[key] *= scale;
    }
}   

////////////////////////


// Now the rest of the variables should be defined on this same scale
a.z = Math.PI - a.x; // ANGLE
a.v = Math.PI / 2 - a.x, // ANGLE
l.j = l.f / Math.sin(a.x), //
l.n = l.b - l.j, //
a.w = Math.asin( l.j * Math.sin(a.z) / l.a), // ANGLE
a.u = Math.PI - a.w - a.z, // ANGLE
l.k = l.a * Math.sin(a.u) / Math.sin(a.z), //
l.p = l.n * Math.sin(a.v), //
l.h = Math.sqrt(l.n**2 - l.p**2) //
l.m = math.sqrt( l.k**2 + l.n**2 - 2 * l.k * l.n * Math.cos(a.x) ), //
l.q = l.k - l.p, //
l.r = math.sqrt(l.j**2 - l.f**2), // 
l.beta = math.sqrt(l.b**2 + l.s**2 - 2 * l.b * l.s * Math.cos(a.v)),
a.psi = Math.asin(l.s * Math.sin(a.v) / l.beta), // ANGLE
a.phi = Math.atan(l.i/l.s), // ANGLE
a.aa = Math.PI / 2 - a.y, // ANGLE
l.ab = l.t / Math.sin(a.y),
a.ac = Math.PI - a.y, // ANGLE
a.ad = Math.asin(Math.sin(a.ac) * l.ab / l.e), // ANGLE
a.ae = Math.PI - a.ad - a.ac, // ANGLE
l.af = l.e * Math.sin(a.ae) / Math.sin(a.ac),
l.ag = Math.sin(a.y) * l.af,
l.ah = Math.cos(a.y) * l.af;


paper.install(window);
paper.setup(canvas);


point1 = new Point(0, height-l.f);
point2 = new Point(l.k, height-l.f);
point3 = new Point(l.k + l.r, height-0);
point4 = new Point(l.q, height-(l.f + l.h));
point5 = new Point(l.k + l.r + l.i, height-(l.s));
point6 = new Point(l.g, height-l.f);
point7 = new Point(l.g - l.ab - l.ah, height- (l.f + l.ag) );

var circle1 = new Path.Circle(point1, 5);
var circle2 = new Path.Circle(point2, 5);
var circle3 = new Path.Circle(point3, 5);
var circle4 = new Path.Circle(point4, 5);
var circle5 = new Path.Circle(point5, 5);
var circle6 = new Path.Circle(point6, 5);
var circle7 = new Path.Circle(point7, 5);

circle1.fillColor = 'black';
circle2.fillColor = 'black';
circle3.fillColor = 'black';
circle4.fillColor = 'black';
circle5.fillColor = 'black';
circle6.fillColor = 'black';
circle7.fillColor = 'black';

// Create headtube
headtubePath = new Path.Line(point5, point7);

// Find point where headtube and toptube intersect
// 1: Create circle centered on seatpost point with radius of toptube length
// 2: Create point at intersection
var topTubeRadius = new Path.Circle(point4, l.c);
var point8 = topTubeRadius.getIntersections(headtubePath)[0].point;
var circle8 = new Path.Circle(point8, 5);
circle8.fillColor = 'black';


// Location lower headtube intersection
headtubeUpperSegmentLength = point5.getDistance(point8);
helperHypotenuse = headtubeUpperSegmentLength + l.af;
helperX = Math.cos(a.y) * helperHypotenuse;
helperY = Math.sin(a.y) * helperHypotenuse;

lowerHeadtubeIntersection = new Point(l.g - l.ab - helperX, height - (l.f + helperY) );

point9 = lowerHeadtubeIntersection;
var circle9 = new Path.Circle(point9, 5);
circle9.fillColor = 'black';

// Assemble paths
bicycle = {
    headtubePath: headtubePath,
    chainstayPath: new Path.Line(point1, point3),
    seatTubePath: new Path.Line(point4, point3),
    toptubePath: new Path.Line(point4, point8),
    downtubePath: new Path.Line(point9, point3),
    seatstayPath: new Path.Line(point1, point4),
    forkPath: new Path.Line(point7, point6),
}

// Give paths black stroke
for (let path in bicycle) {
    if (bicycle.hasOwnProperty(path)) {
         bicycle[path].strokeColor = 'black';
    }
}   

