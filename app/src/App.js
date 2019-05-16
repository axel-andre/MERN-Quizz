import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './assets/css/common.css';


import Home from "./Home.js";
import About from "./About.js"
import Header from './components/Header'
import Menu from './components/menu'
import './assets/css/global.css';
import './assets/css/header.css';
import QuizzPage from "./QuizzPage.js"
import AddQuizz from "./AddQuizz.js"




class App extends Component {
	render() {
		console.table(process.env.ASSETS);
		return (
			<div>
				<BrowserRouter>
					<div>
						<div className="page-container">
							<Header />
							<Switch>
								<Route exact={true} path="/" component={Home} />
								<Route exact={true} path="/about" component={About} />
								<Route exact={true} path="/quizz/:slug" component={QuizzPage} />
								<Route exact={true} path="/add-quizz" component={AddQuizz} />
								<Route path="*" component={() => <p>Page Not Found</p>} />
							</Switch>
						</div>
						<Menu/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
