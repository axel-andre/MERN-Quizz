import React, { Component } from 'react';
class QuestionItem extends Component {
    
    render() {
        return(
            <p className="questionListItem">
                {this.props.children}
                <span className="deleteButton"
                onClick={ this.props.deleteQuestion}
                >x</span>
            </p>
        )
    }
}

export default QuestionItem;
