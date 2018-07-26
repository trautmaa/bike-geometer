import React from 'react';
import Point from './point.js'
var paper = require('paper');


class Bicycle extends React.Component {

    constructor(){
        super();
        // var canvas = document.getElementById("myCanvas");
        // paper.install(window);
        // paper.setup(canvas);

        this.state={
            fluff: "fluff"
        }
    }

    // createPoints(){
    //     svgPointsList = [];
    //     for (var i = 0; i < this.props.points.length; i++){
    //         svgPointsList.append({

    //         });
    //     }
    // }

    createLines(){
        let linesList = [];

        // Define some constants
        let height = this.props.windowDimensions.h;
        let l = this.props.dimensions.l;



        // Create easy points
        let point1 = new paper.Point(0, height-l.f);
        let point2 = new paper.Point(l.k, height-l.f);
        let point3 = new paper.Point(l.k + l.r, height-0);
        let point4 = new paper.Point(l.q, height-(l.f + l.h));
        let point5 = new paper.Point(l.k + l.r + l.i, height-(l.s));
        let point6 = new paper.Point(l.g, height-l.f);
        let point7 = new paper.Point(l.g - l.ab - l.ah, height- (l.f + l.ag) );

        // var circle1 = new paper.Path.Circle(point1, 5);
        // console.log("circle", circle1);
        // circle1.fillColor = 'black';


        // /////////////////////////////
        // // Create headtube
        // headtubePath = new paper.Path.Line(point5, point7);

        // // Find point where headtube and toptube intersect
        // // 1: Create circle centered on seatpost point with radius of toptube length
        // // 2: Create point at intersection
        // var topTubeRadius = new paper.Path.Circle(point4, l.c);
        // var point8 = topTubeRadius.getIntersections(headtubePath)[0].point;
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

        // /////////////????////////////

        return
    }

    render(){

        // this.createPoints();

        // Need to assign keys
        // Need to create a list of lines (pointa, pointb)



        var svgPointsList = Object.keys(this.props.points).map((key, index) => {
            const point = this.props.points[key];
            return (
                < Point
                    key={point.id}
                    x={point.x}
                    y={point.y}
                />
            )
        });


        var w = this.props.windowDimensions.w;
        var h = this.props.windowDimensions.h;
        return(
            <svg width={w * 2} height={h*2}>
                {svgPointsList}
            </svg>
            // {/* <svg width={window.innerWidth} height={window.innerHeight / 2}>
            //     <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill="red" />
            // </svg> */}
        )
    }

}


// Must export!
export default Bicycle;