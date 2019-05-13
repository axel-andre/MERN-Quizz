import React, { Component } from 'react';
import '../assets/css/quizzTag.css';




class QuizzTag extends Component {
    render() {
        let name = this.props.name;
        return (
            <li className="quizz-tag">
                {name}
            </li>
        );
    }
}

export default QuizzTag;
