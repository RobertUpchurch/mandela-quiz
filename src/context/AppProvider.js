import React, { useState, useEffect } from 'react';
import questionsJSON from '../questions.json';
import AppContext from './AppContext';

const AppProvider = (props) => {

    const [ name, set_name ] = useState("");
    const [ score, set_score ] = useState(0);
    const [ questions, set_questions] = useState(questionsJSON.questions)

    const app = {                
        APP_NAME: "Mandela Quiz",
        SLOGAN: "Can You Remember",
        BREAK_POINT: 800,
        DNS: "https://d1e6isb6acaf7p.cloudfront.net",
        API_NAME: "mandelaApi",
        PAGES: [
            { name: "Home", path: "/", side: "none" },
            { name: "Take Quiz Now!", path: "/quiz", side: "left" },
            { name: "Scoreboard", path: "/scoreboard", side: "right" }
        ]
    };

    useEffect(() => {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = questions[i]
            questions[i] = questions[j]
            questions[j] = temp
        }
        set_questions(questions)
    }, [set_questions, questions])

    return (
        <AppContext.Provider value={{
            app,
            questions,
            name, set_name,
            score, set_score
        }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppProvider;