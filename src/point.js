import React from 'react';

class Point extends React.Component {
    render(){
        return(
            <circle cx={this.props.x} cy={this.props.y} r="5" stroke="black" strokeWidth="3" fill="red" />
        )
    }
}

export default Point;