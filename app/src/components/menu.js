import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/menu.css';
import clock from '../assets/icons/icon-clock.svg';
import add from '../assets/icons/icon-add.svg';
import home from '../assets/icons/icon-home.svg';


class Menu extends Component {

    render() {
        return (


            <ul className='menu__container'>
                <li><Link to={'/'}><img src={home} alt="" /><span>Home</span></Link></li>
                <li><Link to={'/add-quizz'}><img src={add} alt="" /> <span>Nouveau</span></Link></li>
                <li><Link to={'/'}><img src={clock} alt="" /> <span>Historique</span></Link></li>
            </ul>

        );
    }
}

export default Menu;
