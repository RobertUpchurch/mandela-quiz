import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

const Answers = () => {

    const { questions } = useContext(AppContext);
    const url = "https://d1e6isb6acaf7p.cloudfront.net";

    const render_questions = () => {
        return questions.map(q => {
            if (q.type === "text") {
                return (
                    <div key={q.num} className="brdr bs-light pd-s mg-s" style={{textAlign: "center"}}>
                        <h4>{q.question}</h4>
                        <div className="brdr pd-s mg-s" style={{display: "flex", textAlign: "left"}}>
                            <div style={{flex: 2}}>
                                <div>
                                    <h4>Correct</h4>
                                    {q.true}
                                </div>
                                <br />
                                <div>
                                    <h4>Incorrect</h4>
                                    {q.false}
                                </div>
                            </div>
                            <div style={{flex: 1}}>
                                <img src={url + "/text" + q.img_path} alt="img" style={{width: "100%"}} />
                            </div>
                        </div>
                        <h4>
                            <a href={q.link} target="__blank">
                                <button className="btn-primary mg-s">Show Me The Proof!</button>
                            </a>
                        </h4>
                    </div>
                )
            }

            if (q.type === "image") {
                return (
                    <div key={q.num} className="image-question" style={{width: "100%"}}>
                        <div className="brdr bs-light mg-s pd-s image-comp">
                            <div className="bs-light brdr">
                                <h4>Correct</h4>
                                <img src={url + "/image" + q.img_path_true} alt="" />
                            </div>
                            <div className="bs-light brdr">
                                <h4>Wrong</h4>
                                <img src={url + "/image" + q.img_path_false} alt="" />
                            </div>
                            <div>
                                <h4>
                                    <a href={q.link} target="__blank">
                                        <button className="btn-primary mg-s">Show Me The Proof!</button>
                                    </a>
                                </h4>
                            </div>
                        </div>
                    </div>
                )
            }
            return null
        })
    }

    return (
        <div className="pd-m" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <div className="pd-s brdr bs-light" style={{maxWidth: "600px", textAlign: "center"}}>
                <h1>Questions & Answers</h1>
                <Link to="/"><button className="btn-secondary mg-s">Go Home</button></Link>
                {render_questions()}
            </div>
        </div>
    )
}

export default Answers