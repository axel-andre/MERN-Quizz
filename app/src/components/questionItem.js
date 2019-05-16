import React, { Component } from 'react';
class QuestionItem extends Component {
    
    render() {
        const cssClass = `questionListItem ${this.props.status}` 
        return(
            <p className={cssClass} onTouchEnd={this.props.addSolution}>
                {this.props.children}
                <span className="deleteButton"
                onClick={ this.props.deleteQuestion}
                >x</span>
            </p>
        )
    }
}

export default QuestionItem;
