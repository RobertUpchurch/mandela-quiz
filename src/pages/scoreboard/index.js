import React, { useState } from 'react';
import { API } from 'aws-amplify';
import { Table } from 'semantic-ui-react';

const Scoreboard = () => {

    const [ scores, set_scores ] = useState([]);

    API.get("mandelaApi", "/scores/getScores")
        .then((res) => {
            let data = res.data.Items;
            data.sort((a, b) => { return parseInt(b.score) - parseInt(a.score) });
            set_scores(data)
        })
        .catch((err) => console.error(err));

    return (
        <div className="pd-s mg-s brdr bs-light" style={{display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
            <div style={{maxWidth: "800px", flex: "1"}}>
                <h2>Scoreboard</h2>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {scores.map(score => {
                            return (
                                <Table.Row>
                                    <Table.Cell>{score.name}</Table.Cell>
                                    <Table.Cell>{score.score}</Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default Scoreboard;