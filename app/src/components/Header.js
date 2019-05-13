import React, {Component} from 'react';

import hamburger from '../assets/img/menu.svg';
import profile from '../assets/img/profile.png';

class Header extends Component {
    render() {
	return (
    	<div className="header">
            <img src={hamburger} alt=""/>
            <img src={profile} alt=""/>
        </div>
	);
    }
}

export default Header;
