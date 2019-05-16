import React, { Component } from 'react';
import { HTTP_SERVER_PORT_PICTURES } from '../constants.js';
import { Link } from 'react-router-dom';
import QuizzTag from './QuizzTag';


class QuizzThumbnail extends Component {

    insetIcon(path){
        return HTTP_SERVER_PORT_PICTURES + path;
    }
    render() {

        // Transformation des props en constantes pour plus de lisibilité
        const icon = this.props.icon;
        const name = this.props.name;
        const slug = this.props.slug;
        const allKeywords = this.props.keywords.map(k => <QuizzTag name={k}/>);
        return (
            <Link to={'/quizz/' + slug} className="appear">
                <div className="quizz-bloc">
                    {/* <img alt="" 
                    src={this.insetIcon(icon)} /> */}
                    <h>{name}</h>
                    <ul className="quizz-keywords">{allKeywords}</ul>

                </div>
            </Link>
        );
    }
}

export default QuizzThumbnail;
