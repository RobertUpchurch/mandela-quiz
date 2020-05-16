import React, { useState, useContext } from 'react';
import AppContext from '../../context/AppContext';
import TextQuestion from './components/TextQuestion';
import ImageQuestion from './components/ImageQuestion';
import Instructions from './components/Instructions';
import Score from './components/Score';
import './index.scss';

const Quiz = () => {

    const  { questions, score, set_score, name } = useContext(AppContext);
    const [ num, set_num ] = useState(-1);
    const first_true = Math.ceil(Math.random() * 10) > 5;
    const len = questions.length;

    const handleStart = () => {
        if ( name ) {
            set_num(0);
        } else {
            alert("You must Enter Your Name")
        }
    }

    const handleCorrect = () => {
        const new_num = num + 1;
        const new_score = score + 1;
        set_num(new_num);
        set_score(new_score);
    };
    
    const handleIncorrect = () => {
        const new_num = num + 1;
        const new_score = score - 1;
        set_num(new_num);
        set_score(new_score)
    };

    const handleSkip = () => {
        const new_num = num + 1;
        set_num(new_num);
    }


    return (
        <div className="quiz pd-m">
            {
            num < 0 ? 
                <Instructions handleStart={handleStart}/> 
            :
            num >= len ?
                <Score questions={questions} score={score} />
            :
            questions[num].type === "text" ?
                <TextQuestion 
                    question={questions[num]} 
                    handleCorrect={handleCorrect} 
                    handleIncorrect={handleIncorrect} 
                    handleSkip={handleSkip}
                    num={num}
                    first_true={first_true}
                    /> :
                <ImageQuestion 
                    question={questions[num]} 
                    handleCorrect={handleCorrect} 
                    handleIncorrect={handleIncorrect} 
                    handleSkip={handleSkip}
                    num={num}
                    first_true={first_true}
                />
            }
        </div>
    )
}

export default Quiz;