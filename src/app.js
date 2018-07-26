import React from 'react';
import Bicycle from './bicycle.js';
import LHT from './lht';
var algebra = require('algebra.js');
var paper = require('paper');
var math = require('math');


var dimensions = LHT;

// Convert degrees to radians
const toRadians = (angle) => {
    return angle * (Math.PI / 180);
};

//
class App extends React.Component {

    constructor() {
        super();

        var canvas = document.getElementById("myCanvas");
        // paper.install(window);
        paper.setup(canvas);

        // Define dimensions object
        var d = {"a": {}, "l": {}};
        d.a.x = dimensions.a.headtubeangle;
        d.a.y = dimensions.a.seattubeangle;
        d.l.a = dimensions.l.chainstay;
        d.l.b = dimensions.l.seattube;
        d.l.c = dimensions.l.toptube;
        d.l.d = dimensions.l.headtube;
        d.l.e = dimensions.l.forklength;
        d.l.f = dimensions.l.bbdrop;
        d.l.g = dimensions.l.wheelbase;
        d.l.i = dimensions.l.reach;
        d.l.s = dimensions.l.stack;
        d.l.t = dimensions.l.forkoffset;

        // Using initial dimensions, find full dimensions list
        var d = this.heavyLifting(d);
        console.log(d)

        var points = this.generatePoints(d);


        // Scale Points

        var windowDimensions = {
            "h": window.innerHeight, 
            "w": window.innerWidth
        }

        this.state = {
            dimensions: d,
            windowDimensions: windowDimensions,
            points: points
        }


    }

    generatePoints(fullDimensions){
        var points = {};

        // perform wizardry

        //////////////////////////////////////////////
        // Define some constants
        //////////////////////////////////////////////
        let l = fullDimensions.l;



        // Create easy points
        points.point1 = {"x": 0, "y": l.f, "id": "point1"};
        points.point2 = {"x": l.k, "y": l.f, "id": "point2"};
        points.point3 = {"x": l.k + l.r, "y": 0, "id": "point3"};
        points.point4 = {"x": l.q, "y": (l.f + l.h), "id": "point4"};
        points.point5 = {"x": l.k + l.r + l.i, "y": (l.s), "id": "point5"};
        points.point6 = {"x": l.g, "y": l.f, "id": "point6"};
        points.point7 = {"x": l.g - l.ab - l.ah, "y":  (l.f + l.ag), "id": "point7"};


        // Create point8 using paper.js
        /////////////////


        // var circle1 = new paper.Path.Circle(point1, 5);
        // console.log("circle", circle1);
        // circle1.fillColor = 'black';


        // /////////////////////////////
        // // Create headtube
        var point5 = new paper.Point(points.point5.x, points.point5.y);
        var point7 = new paper.Point(points.point7.x, points.point7.y);
        
        var headtubePath = new paper.Path.Line(point5, point7);

        // // Find point where headtube and toptube intersect
        // // 1: Create circle centered on seatpost point with radius of toptube length
        // // 2: Create point at intersection
        var point4 = new paper.Point(points.point4.x, points.point4.y);
        var circle4 = new paper.Path.Circle(point4, 5);
        circle4.fillColor = 'black';
        console.log("point4", point4);
        

        var topTubeRadius = new paper.Path.Circle(point4, l.c);
        console.log("headtubepath", headtubePath);
        console.log("toptuberadius", topTubeRadius);

        console.log(topTubeRadius.getIntersections(headtubePath));
        // var point8 = topTubeRadius.getIntersections(headtubePath)[0].point;
        // console.log("point8", point8)
        // var circle8 = new Path.Circle(point8, 5);
        // circle8.fillColor = 'black';


        // // Location lower headtube intersection
        // headtubeUpperSegmentLength = point5.getDistance(point8);
        // helperHypotenuse = headtubeUpperSegmentLength + l.af;
        // helperX = Math.cos(a.y) * helperHypotenuse;
        // helperY = Math.sin(a.y) * helperHypotenuse;

        // lowerHeadtubeIntersection = new Point(l.g - l.ab - helperX, height - (l.f + helperY) );

        // point9 = lowerHeadtubeIntersection;
        // var circle9 = new Path.Circle(point9, 5);
        // circle9.fillColor = 'black';

        //////////////////////////////////////////////
        // Voila
        //////////////////////////////////////////////









        // Create headtube line equation
        // var slope = (points.point7.y - points.point5.y) / (points.point7.x - points.point5.x);
        // var expr1 = algebra.parse("y - " + points.point5.y);
        // var expr2 = algebra.parse(slope + " (x- " + points.point5.x + ")");
        // var headtubeLine = new algebra.Equation(expr1, expr2);
        // headtubeLine = headtubeLine.solveFor("y");
        // console.log("headtubeline", headtubeLine.toString())

        // // Create circle of toptube radius from seatpost to find intersection
        // var leftsideA =             algebra.parse("(x-" + points.point4.x + ")^2");
        // var leftsideB =             algebra.parse("(y-" + points.point4.y + ")^2");
        // var leftside =          leftsideA.add(leftsideB);
        // var rightside =         algebra.parse("(" + l.c + "^2)");
        // var toptubeCircle =     leftside.subtract(rightside);
        // var toptubeCircle =     new algebra.Equation(leftside, 0);
        // console.log("toptubecircle1", toptubeCircle.toString());
        // toptubeCircle =         toptubeCircle.solveFor("y");    /////// This returns UNDEFINED
        // console.log("toptubecircle2", toptubeCircle);
        // var intersectionQuad =  new algebra.Equation(headtubeLine, toptubeCircle);
        // console.log("quad", intersectionQuad.toString());

        // var solutions =         intersectionQuad.solveFor("x");

        // console.log("x = " + solutions.toString());






        


        return points;
    }

    // Apply scale to our dimensions
    // Lets worry about this later.
    scaleDimensions(){

        // Check if scaled flag is true?

        let scale = this.state.canvasWidth / this.state.dimensions.wheelbase;

        const newDimensions = this.state.dimensions.map(dim => {
            return dim * scale;
        });
        // Always update state through this.setState
        this.setState({
            dimensions: newDimensions
        });

    }


    heavyLifting(initialDimensions) {

        let nd = Object.assign({}, initialDimensions);    //creating copy of object


        // Convert to radians
        nd.a.x = toRadians(nd.a.x);
        nd.a.y = toRadians(nd.a.y);

        //////////////////////////////////////////
        // Trigonometry
        // Angles are stored in nd.a
        // Lengths are stored in nd.l
        //////////////////////////////////////////
        nd.a.z = Math.PI - nd.a.x; // ANGLE
        nd.a.v = Math.PI / 2 - nd.a.x; // ANGLE
        nd.l.j = nd.l.f / Math.sin(nd.a.x); //
        nd.l.n = nd.l.b - nd.l.j; //
        nd.a.w = Math.asin( nd.l.j * Math.sin(nd.a.z) / nd.l.a); // ANGLE
        nd.a.u = Math.PI - nd.a.w - nd.a.z; // ANGLE
        nd.l.k = nd.l.a * Math.sin(nd.a.u) / Math.sin(nd.a.z); //
        nd.l.p = nd.l.n * Math.sin(nd.a.v); //
        nd.l.h = Math.sqrt(nd.l.n**2 - nd.l.p**2) //
        nd.l.m = math.sqrt( nd.l.k**2 + nd.l.n**2 - 2 * nd.l.k * nd.l.n * Math.cos(nd.a.x) ); //
        nd.l.q = nd.l.k - nd.l.p; //
        nd.l.r = math.sqrt(nd.l.j**2 - nd.l.f**2); // 
        nd.l.beta = math.sqrt(nd.l.b**2 + nd.l.s**2 - 2 * nd.l.b * nd.l.s * Math.cos(nd.a.v));
        nd.a.psi = Math.asin(nd.l.s * Math.sin(nd.a.v) / nd.l.beta); // ANGLE
        nd.a.phi = Math.atan(nd.l.i/nd.l.s); // ANGLE
        nd.a.aa = Math.PI / 2 - nd.a.y; // ANGLE
        nd.l.ab = nd.l.t / Math.sin(nd.a.y);
        nd.a.ac = Math.PI - nd.a.y; // ANGLE
        nd.a.ad = Math.asin(Math.sin(nd.a.ac) * nd.l.ab / nd.l.e); // ANGLE
        nd.a.ae = Math.PI - nd.a.ad - nd.a.ac; // ANGLE
        nd.l.af = nd.l.e * Math.sin(nd.a.ae) / Math.sin(nd.a.ac);
        nd.l.ag = Math.sin(nd.a.y) * nd.l.af;
        nd.l.ah = Math.cos(nd.a.y) * nd.l.af;



        return nd; // New Dimensions
    }




    render(){

        return(
            <div>
                <Bicycle 
                    dimensions={this.state.dimensions}
                    windowDimensions={this.state.windowDimensions}
                    points={this.state.points}
                />
                <div id="container">
                <canvas width="1000" height="600" id="canvas" ></canvas></div>

            </div>
        )
    }

}


// Must export!
export default App;