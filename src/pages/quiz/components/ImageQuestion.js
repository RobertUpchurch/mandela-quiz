import React from "react";

const ImageQuestion = (props) => {

    const { question, handleCorrect, handleIncorrect, handleSkip, score, num, first_true } = props;
    const url = "https://d1e6isb6acaf7p.cloudfront.net/image";

    console.log(first_true);

    return (
        <div className="image-question brdr bs-light pd-m">
            <div>
                <h4>Question: {num} | Score: {score}</h4>
            </div>
            <div className="image-comp">
                <div>
                    <img 
                        className="bs-light brdr" 
                        src={url + (first_true ? question.img_path_true : question.img_path_false)} 
                        alt="" 
                        key={question.num}
                        onClick={first_true ? handleCorrect : handleIncorrect}
                    />
                </div>
                <div>
                    <h2>Or</h2>
                </div>
                <div>
                    <img 
                        className="bs-light brdr" 
                        src={url + (first_true ? question.img_path_false : question.img_path_true)} 
                        alt=""
                        key={question.num}
                        onClick={first_true ? handleIncorrect : handleCorrect}
                    />
                </div>
            </div>
            <div onClick={handleSkip} className="option pd-s brdr bs-light br-s">
                Skip
            </div>
        </div>
    )
}

export default ImageQuestion;