import React, { useContext } from 'react';
import AppContext from '../../../context/AppContext';

const Answers = () => {

    const { questions } = useContext(AppContext);
    const url = "https://d1e6isb6acaf7p.cloudfront.net/image";

    const render_questions = () => {
        return questions.map(q => {
            if (q.type === "text") {
                return (
                    <div key={q.num} className="brdr bs-light pd-s mg-s">
                        <h4>{q.question}</h4>
                        <div>
                            <h4>Correct</h4>
                            {q.true}
                        </div>
                        <div>
                            <h4>Incorrect</h4>
                            {q.false}
                        </div>
                        <div>
                            <h4>
                                <a href={q.link} target="__blank">
                                    <button className="btn-primary mg-s">Show Me The Proof!</button>
                                </a>
                            </h4>
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
        <div className="pd-s" style={{maxWidth: "600px", display: "flex", flexDirection: "column"}}>
            {render_questions()}
        </div>
    )
}

export default Answers