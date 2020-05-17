import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Scoreboard = () => {

    const [ scores, set_scores ] = useState([]);

    useEffect(() => {
        API.get("mandelaApi", "/scores/getScores")
            .then((res) => {
                let data = res.data.Items;
                data.sort((a, b) => { return parseInt(b.score) - parseInt(a.score) });
                set_scores(data)
            })
            .catch((err) => console.error(err));
    }, [set_scores])

    const renderScores = (scores) => {
        let place = 1;
        return scores.map((score, index) => {
            if (scores[index - 1]) {
                if (scores[index].score !== scores[index - 1].score) {
                    place += 1;
                    return (
                        <Table.Row key={score.sk}>
                            <Table.Cell>{place}</Table.Cell>
                            <Table.Cell>{score.name}</Table.Cell>
                            <Table.Cell>{score.score}</Table.Cell>
                        </Table.Row>
                    );
                };
            };

            return (
                <Table.Row key={score.sk}>
                    <Table.Cell>{place}</Table.Cell>
                    <Table.Cell>{score.name}</Table.Cell>
                    <Table.Cell>{score.score}</Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="pd-s mg-s brdr bs-light" style={{maxWidth: "800px", flex: "1"}}>
                <h1>Scoreboard</h1>
                <Link to="/"><button className="btn-secondary mg-s">Go Home</button></Link>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Place</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {renderScores(scores)}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default Scoreboard;