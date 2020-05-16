import React, { useEffect, useContext } from 'react';
import AppContext from '../../../context/AppContext';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';

const Score = (props) => {
    const { score, questions } = props;
    const { name } = useContext(AppContext);
    const url = "https://d1e6isb6acaf7p.cloudfront.net/image";

    useEffect(() => {
        API.post("mandelaApi", "/scores/addScore", {
            body: {
                sk: score + "-" + name,
                name,
                score
            }
        })
            .then(res => alert(res.message))
            .catch(err => console.error(err))
    }, [name, score])

    const render_questions = () => {
        return questions.map(q => {
            if (q.type === "text") {
                return (
                    <div key={q.num} className="brdr bs-light pd-s ">
                        <h4>{q.question}</h4>
                        <div>
                            <h4>Correct</h4>
                            {q.true}
                        </div>
                        <div>
                            <h4>Incorrect</h4>
                            {q.false}
                        </div>
                    </div>
                )
            }

            if (q.type === "image") {
                return (
                    <div key={q.num} className="image-question">
                        <div className="brdr bs-light mg-m pd-s image-comp">
                            <div className="bs-light brdr">
                                <h4>Correct</h4>
                                <img src={url + q.img_path_true} alt="" />
                            </div>
                            <div className="bs-light brdr">
                                <h4>Wrong</h4>
                                <img src={url + q.img_path_false} alt="" />
                            </div>
                        </div>
                    </div>
                )
            }
            return null
        })
    }

    return (
        <div>
            <h1>Your Score: {score}</h1>
            {/* <Link to="scoreboard" ><button className="btn-primary">Go To Scoreboard</button></Link> */}
            <hr />
            {render_questions()}
        </div>
    )
}

export default Score;