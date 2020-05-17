import React, { useEffect, useContext } from 'react';
import AppContext from '../../../context/AppContext';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';


const Score = (props) => {
    const { score } = props;
    const { name } = useContext(AppContext);
    const now = new Date()

    useEffect(() => {
        API.post("mandelaApi", "/scores/addScore", {
            body: {
                sk: score + "-" + now.getTime(),
                name,
                score
            }
        })
            .then(res => alert(res.message))
            .catch(err => console.error(err))
    }, [name, score, now])

    return (
        <div>
            <h1>Your Score: {score}</h1>
            <hr />
            <Link to="scoreboard" ><button className="btn-primary">Go To Scoreboard</button></Link>
            <br />
            <Link to="answers" ><button className="btn-primary">Questions & Answers</button></Link>
        </div>
    )
}

export default Score;