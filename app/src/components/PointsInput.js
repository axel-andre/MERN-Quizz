import React, { Component } from 'react';

const localStyle = {
    span: {
        display: "inline-block",
        fontSize: 25,
        marginRight:10,
        height: "auto",
        marginBottom: 10,
        textAlign:"center"
    },
    buttons: {
        display: "block",
        textAlign:"center"

    },
    button: {
        display: "inline-block",
        boxSizing: "border-box",
        color:"white",
        backgroundColor: "#3BE24A",
        border: "1px solid white",
        borderRadius:"2px",
        minWidth: 30,
        height:30,
        cursor:"pointer"
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
        justifyContent:"center"
    }
}

class PointsInput extends Component {

    render() {
        return (
            <div style={localStyle.wrapper}>
                <span style={localStyle.span}>{this.props.children}</span>
                <div style={localStyle.buttons}>
                    <button style={localStyle.button} onClick={this.props.downPoints}>-</button>
                    <button style={localStyle.button} onClick={this.props.upPoints}>+</button>
                </div>
            </div>
        )
    }
}

export default PointsInput;