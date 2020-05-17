import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {


    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="pd-m mg-m brdr bs-light" style={{maxWidth: "400px"}}>
                <h2>Welcome To The Quiz</h2>
                <Link to="/quiz"><button className="btn-primary fluid mg-s">Take Quiz</button></Link>
                <hr />
                <Link to="/scoreboard"><button className="btn-secondary fluid mg-s">See Scoreboard</button></Link>
                <Link to="/answers"><button className="btn-secondary fluid mg-s">Review Questions & Answers</button></Link>
            </div>
        </div>
    )
}

export default Home;