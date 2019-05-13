import React, { Component } from 'react';
import '../assets/css/results.css';
import congrats from '../assets/img/congrats.svg';
import {Link} from 'react-router-dom';

class Results extends Component {
    render() {
        const isSuccessful = this.props.score >= (this.props.maxscore / 2);
        return (
            <div className={isSuccessful ? 'results success fadeUp' : 'results danger fadeUp'}>
                <div className="danger-content">
                    <img src={congrats} alt="congrats" />
                    <h1>{isSuccessful ? "Yess" : "NOO"}</h1>
                    <h><small>Ton score : </small>{this.props.score} <small>points</small></h>
                    <div>
                        <Link to="/"><button className="try-again">Accueil</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Results;
