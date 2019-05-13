import React, { Component } from 'react';
import QuizzThumbnail from './components/QuizzThumbnail.js';
import axios from 'axios';
import {HTTP_SERVER_PORT} from './constants';




class Home extends Component {
    state = {
        searchedTag:null,
    }
    async componentDidMount() {
        let data = [];
        let url = `${HTTP_SERVER_PORT}quizzes`
        await axios.get(url)
        .then((res)=>{
            data=res.data;
            console.log(data);
        })
        .catch(err=>console.log(err));
        this.setState({quizzes:data,shownQuizzes:data});
    }

    filterList(e){
        let list = this.state.quizzes;
        let nameList = list.filter((i)=>{
            return i.name.toLowerCase().search(e.target.value.toLowerCase())!== -1
        });
        this.setState({shownQuizzes:nameList});
        let availablesKeywords = [nameList.map((e)=>{
            const k = e.keywords
            return k;
        })];
        availablesKeywords = [...availablesKeywords.flat(2)];
        availablesKeywords = [...new Set(availablesKeywords)]
        console.log(availablesKeywords);
    }
    render(){
        if(this.state.quizzes && this.state.shownQuizzes){
            const allQuizzes =  this.state.shownQuizzes.map(e => <QuizzThumbnail name={e.name} icon={e.icon} keywords={e.keywords}></QuizzThumbnail>)
            return (
                <div>
                    <div className="Searchbar appear">
                        <form className="search-container">
                            <input onChange={e=>this.filterList(e)} type="text" id="search-bar" placeholder="Rechercher un quizz"/>
                            {/* <select> */}
                                {/* <option value="kitchen">kitchen</option> */}
                            {/* </select> */}
                        </form>
                    </div>
                    <div className="quizz-list">
                        <h1 className="appear"><span aria-label="Sablier" role="img">⏳</span> Les derniers quizz publiés</h1>
                        <div className="content">
                        {allQuizzes}
                        </div>
                    </div>
                </div>
            );
        }else{
            return(
                <p>Loading ...</p>
            )
        }

    }
}

export default Home;
