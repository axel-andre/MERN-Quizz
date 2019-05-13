import React, { Component } from 'react';

class QuestionItem extends Component {
    
    render() {
        return(
            <p className="questionListItem">
                {this.props.children}
                <span onClick={ this.props.deleteQuestion}> supprimer</span>
            </p>
        )
    }
}

export default QuestionItem;
