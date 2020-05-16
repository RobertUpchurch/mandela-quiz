import React from 'react';

const TextQuestion = (props) => {

    const { question, handleCorrect, handleIncorrect, handleSkip, num, first_true } = props;
    const url = "https://d1e6isb6acaf7p.cloudfront.net/text";
    
    return (
        <div className="text-question brdr bs-light pd-m">
            <div>
                <h4>Question: {num + 1}</h4>
                <p>{question.question}</p>
            </div>
            <div className="image">
                <img 
                    className="bs-light" 
                    src={url + question.img_path} 
                    alt="" 
                />        
            </div>
            <div 
                onClick={first_true ? handleCorrect : handleIncorrect} 
                className="option pd-s brdr bs-light br-s"
            >
                <p>{first_true ? question.true : question.false}</p>
            </div>
            <div 
                onClick={first_true ? handleIncorrect : handleCorrect} 
                className="option pd-s brdr bs-light br-s"
            >
                <p>{first_true ? question.false : question.true}</p>
            </div>
            <div onClick={handleSkip} className="option pd-s brdr bs-light br-s">
                Skip
            </div>
        </div>
    )
}

export default TextQuestion;