import React, { useState } from 'react';
import { API } from 'aws-amplify';

const Scoreboard = () => {

    const [ scores, set_scores ] = useState([]);

    API.get("mandelaApi", "/scores/getScores")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

    return (
        <div>
            Scoreboard
        </div>
    )
}

export default Scoreboard;