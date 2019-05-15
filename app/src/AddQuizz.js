import React, { Component } from 'react';
import { HTTP_SERVER_PORT_PICTURES, HTTP_SERVER_PORT } from './constants.js';
import axios from 'axios';
import './assets/css/addQuizz.css';
import QuestionItem from './components/questionItem';
import PointsInput from './components/PointsInput';


const styles = {
    reponseTag: {
        textAlign: "center",
        marginTop: 50,
        fontSize: 20,
        marginBottom: 20
    }
}

class AddQuizz extends Component {

    state = {
        color: "red",
        status: "addAQuestion", // TODO definir le status comme initial
        name: null,
        icon: null,
        keywords: [],
        questions: [
            {
                question: "Where is the France ?"
            }, {
                question: "Where is Me ?"
            }
        ],
        published: true,
        ownerId: 1,
        scores: [],
        currentQuestion: {
            question: null,
            txtAnswers: [],
            points: 1
        }

    }
    upPointsHandle = () => {
        if(this.state.currentQuestion.points < 5){
            let currentQuestion = this.state.currentQuestion;
            currentQuestion.points = currentQuestion.points + 1;
            this.setState({ currentQuestion})
        }
    }
    downPointsHandle = () => {
        if(this.state.currentQuestion.points > 1){
            let currentQuestion = this.state.currentQuestion;
            currentQuestion.points = currentQuestion.points - 1;
            this.setState({ currentQuestion})
        }
    }
    deleteQuestion(e){
        let currentQuestion = this.state.currentQuestion;
        currentQuestion.txtAnswers = currentQuestion.txtAnswers.filter((element,index)=> index !== +e);
        this.setState({currentQuestion});
    }
    async submitQuizz(){
        let newQuizz = this.state;
        newQuizz.delete(name);
        newQuizz.delete(name);
        await axios.post('/user', {
            firstName: 'Fred',
            lastName: 'Flintstone'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    addQuestion(){
        let questions = this.state.questions;
        questions.push(this.state.currentQuestion);
        this.setState({questions});
    }
    render() {
        // Shorthand to use states
        let q = this.state;
        console.log("taille: ", q.questions.lenght);
        const questionsList = q.questions.map((q, index) => {
            return (
                <div key={index}>
                    <span className="questionIndex">Question {index + 1}</span>
                    <QuestionItem >{q.question}</QuestionItem>
                </div>
            )
        });
        const answersList = q.currentQuestion.txtAnswers.map((q, index) => {
            return (
                <QuestionItem deleteQuestion={id => this.deleteQuestion(index)} id={index} key={index} >{q}</QuestionItem>
            )
        });
        const addQuestionButton = (
            <button onClick={e => this.setState({ status: "addAQuestion" })} className="button add-question">Ajouter une question</button>
        )
        const addTxtAnswer = (event) => {
            if (event.key === 'Enter') {
                const newAnwser = event.target.value;
                let newCurrentQuestion = q.currentQuestion;
                newCurrentQuestion.txtAnswers.push(newAnwser);
                this.setState({ currentQuestion: newCurrentQuestion });
                event.target.value = null;
                event.target.blur();
                event.target.placeholder = "Ajouter une question";
            }
        }
        const addAnwserButton = (
            <input contentEditable 
            onKeyDown={e => {
                addTxtAnswer(e);
            }} 
            placeholder="Ajouter une question" 
            className="button add-question" 
            onFocus={e=> e.target.placeholder = ""}
            />
        )

        const initial = (
            <div>
                <input onChange={e => defineQuizzName(e)} className="custom-input" type="text" placeholder="Nom du quizz" />
            </div>
        )
        const addQuestionInput = (
            <div>
                <input onChange={e => defineCurrentQuestion(e)} className="custom-input" type="text" placeholder={this.state.currentQuestion.question ? this.state.currentQuestion.question : `Quelle est la question ${q.questions.length + 1} ?`} />
            </div>
        )
        const etape2 = (
            <div>
                <h3>Question {q.currentEtape - 1}:</h3>
                <input type="text" placeholder="Intitulé" />
            </div>
        )
        const defineQuizzName = (event) => {
            this.setState({ name: event.target.value });
        }
        const defineCurrentQuestion = (event) => {
            let currentQuestion = this.state.currentQuestion;
            currentQuestion.question = event.target.value;
            this.setState({ currentQuestion });
        }
        if (q.status === "initial") {
            return (
                <div className="addQuizz">
                    <h2>Nouveau Quizz</h2>
                    {initial}
                    <button disabled={!this.state.name} className="next-step button" onClick={e => this.setState({ status: "questionsList" })}>Étape suivante</button>
                </div>
            )
        } else if (q.status === "questionsList") {
            return (
                <div className="addQuizz">
                    <h2>{q.name}</h2>
                    {questionsList}
                    {addQuestionButton}
                    <button className="next-step button" disabled={this.state.questions[0] ? false : true} onClick={e => this.setState({ status: "questionsList" })}>Valider le quizz</button>
                </div>
            )
        }
        else if (q.status === "addAQuestion") {
            console.log(q.currentQuestion.txtAnswers.length);
            return (
                <div className="addAQuestion">
                    <h2>Question {q.questions.length + 1}</h2>
                    {addQuestionInput}
                    <p style={styles.reponseTag} >Réponses</p>
                    {answersList}
                    {q.currentQuestion.txtAnswers.length < 4 && addAnwserButton}
                    <PointsInput downPoints={this.downPointsHandle} upPoints={this.upPointsHandle}>{q.currentQuestion.points}</PointsInput>
                    <button disabled={!this.state.currentQuestion.question || !this.state.currentQuestion.txtAnswers.length} className="next-step button" onClick={e => this.setState({ status: "questionsList" })}>Étape suivante</button>
                </div>
            )

        } else if (q.status === "addTxtAnswer") {

        }

    }
}

export default AddQuizz;
