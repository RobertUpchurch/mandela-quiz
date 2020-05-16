import React from 'react';

const Instructions = (props) => {
    return (
        <div className="brdr bs-light pd-m ">
            <h2>Instructions</h2>
            <div>
                <h3>Scoring</h3>
                <p>There are a total of 20 questions.</p>
                <p style={{color: "green"}}>Each question right is +1</p>
                <p style={{color: "red"}}>Each question wrong is -1.</p> 
                <p>Skipping will not affect your score</p>
                <p>You may not go back to skipped or answered questions</p>
            </div>
            <div>
                <h3>Question Types</h3>
                <h4>Type 1: Images</h4>
                <p>Image type questions will show you two images. You will select which image is the real image.</p>
                <h4>Type 2: Text</h4>
                <p>Text questions will give you two quotes or phrases from pop culture. You must select the accurate quote or phrase.</p>
            </div>
            <button className="btn-primary fluid" onClick={props.handleStart}>Start Quiz</button>
        </div>
    )
}

export default Instructions;