import React from 'react';

class BicycleLine extends React.Component {

    render(){
        console.log("bicycleLine here")
        return(
            <line className="cls-1" x1={this.props.pointA.x} y1={this.props.pointA.y} x2={this.props.pointB.x} y2={this.props.pointB.y}/>
        )
    }

}


// Must export!
export default BicycleLine;

//{/* <line className="cls-1" x1="50" y1="117" x2="118" y2="183"/>
//<line className="cls-1" x1="60" y1="117" x2="118" y2="183"/>
//<line className="cls-1" x1="70" y1="117" x2="118" y2="183"/>
//<line className="cls-1" x1="80" y1="117" x2="118" y2="183"/>
//<line className="cls-1" x1="90" y1="117" x2="118" y2="183"/>
//<line className="cls-1" x1="100" y1="117" x2="118" y2="183"/>
//<line className="cls-1" x1="100" y1="117" x2="118" y2="183"/> */}
