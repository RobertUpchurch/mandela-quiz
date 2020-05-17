import React, { useEffect, useContext } from 'react';
import AppContext from '../../../context/AppContext';
import { Link } from 'react-router-dom';
import { API } from 'aws-amplify';
import Answers from './Answers';

const Score = (props) => {
    const { score } = props;
    const { name } = useContext(AppContext);

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

    return (
        <div>
            <h1>Your Score: {score}</h1>
            <Link to="scoreboard" ><button className="btn-primary">Go To Scoreboard</button></Link>
            <hr />
            <Answers />
        </div>
    )
}

export default Score;