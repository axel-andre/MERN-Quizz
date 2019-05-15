import React, { Component } from 'react';
import { HTTP_SERVER_PORT_PICTURES,HTTP_SERVER_PORT } from './constants.js';
import Results from './components/Results';
import axios from 'axios';
class QuizzPage extends Component {

    constructor(props) {
        super(props);
        // Get the higher score possible
        //const maxScore = currentQuizz.questions.map((e) => e.points).reduce((accumulator, currentItem) => accumulator + currentItem);
        this.state = {
            currentQuestion: 0,
            //currentQuizz: currentQuizz,
            //maxQuestions: currentQuizz.questions.length,
            solutions: [],
            pointsAvailable: 0,
            score: 0,
            //maxScore: maxScore
        }
    }
    async componentDidMount(){
        let data = [];
        let url = `${HTTP_SERVER_PORT}quizz/${this.props.match.params.slug}`;
        await axios.get(url)
        .then((res)=>{
            data=res.data[0];
        })
        .catch(err=>console.log(err));
        this.setState({
            currentQuizz:data,
            maxQuestions:data.questions.length,
            maxScore: data.questions.map((e) => e.points).reduce((accumulator, currentItem) => accumulator + currentItem)
        });
        this.loadPointsAvailable();
        this.loadSolutions();
    }
    // Add the points to the score corresponding to the current question
    addPoint(event, solutionIndex) {
        const pointsEarned = this.state.pointsAvailable;
        if (this.state.solutions.includes(solutionIndex)) {
            this.setState({ score: this.state.score + pointsEarned })
            event.target.classList.add('good-one');
        } else
            event.target.classList.add('wrong-one');
    }
    // Go to the next question
    nextQuestion(event, index) {
        this.addPoint(event, index);
        setTimeout(() => {
            this.setState(
                { currentQuestion: this.state.currentQuestion + 1 }
            )
            if (this.state.currentQuestion < this.state.maxQuestions - 1) {
                this.loadSolutions(this.state.currentQuestion + 1);
                this.loadPointsAvailable(this.state.currentQuestion + 1);
            }
        }, 300);
    }
    // Load the solutions for the current question
    loadSolutions(id = this.state.currentQuestion) {
        const solutions = this.state.currentQuizz.questions[id].solutions;
        this.setState({
            solutions: solutions
        });
    }
    // Load the points available for the current question
    loadPointsAvailable(id = this.state.currentQuestion) {
        const points = this.state.currentQuizz.questions[id].points;
        this.setState({
            pointsAvailable: points
        });
    }
    componentWillMount() {
        
    }
    
    render() {
        // Shorthand to use states
        let q = this.state;
        if (q.currentQuizz && q.maxQuestions && q.maxScore) {

            const currentQuestion = q.currentQuizz.questions[q.currentQuestion];
            if (q.currentQuestion < q.maxQuestions) {
                const isTextQuestion = currentQuestion.txtAnswers.length;
                // Transfom to image function base on a map use
                const transformToImg = (a, i) => {
                    const call = e => this.nextQuestion(e, i);
                    return (
                        <div className="quizz-grid__img appear" key={i} onTouchStart={call} >
                            <img alt="" src={HTTP_SERVER_PORT_PICTURES + a} />
                        </div>
                    )
                }
                const tranformToText = (a, i) => {
                    return (
                        <button className="appear" key={i} onTouchStart={e => this.nextQuestion(e, i)}>
                            {a}
                        </button>
                    )
                }
                const ImgAnswer = currentQuestion.imgAnswers
                    .map(transformToImg);
                const TextAnswer = currentQuestion.txtAnswers.map(tranformToText);
                if (q.currentQuizz.length === 0)
                    return (<p>Page Not Found</p>)
                return (
                    <div className="quizzpage">
                        <h2 className="appear">{q.currentQuizz.questions[q.currentQuestion].question}</h2>
                        <div className={isTextQuestion ? "quizz-flex" : "quizz-grid"}>
                            {
                                isTextQuestion ?
                                    TextAnswer :
                                    ImgAnswer
                            }
                        </div>

                    </div>

                );
            } else {
                return (
                    <Results type={"success"} score={q.score} maxscore={q.maxScore} />
                )
            }
        }else{
            return(
                <p>Loading...</p>
            )
        }

    }
}

export default QuizzPage;
