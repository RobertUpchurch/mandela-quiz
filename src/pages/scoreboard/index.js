import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { API } from 'aws-amplify';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Scoreboard = () => {

    const [ scores, set_scores ] = useState([]);
    const [ graph_data, set_graph ] = useState([]);
    const [ average, set_average ] = useState(0);

    useEffect(() => {
        API.get("mandelaApi", "/scores/getScores")
            .then((res) => {
                let data = res.data.Items;
                data.sort((a, b) => { return parseInt(b.score) - parseInt(a.score) });
                set_scores(data)

                //Get Average
                let sum = 0;
                data.forEach((item) => {
                    sum += item.score;
                })
                set_average(Math.round(sum / data.length))

                let new_data = [];
                let count = 0;
                let obj = { value: null, count: null };
                data.forEach((item, index) => {
                    if (data[index + 1]) {
                        if (item.score !== data[index + 1].score) {
                            count += 1;
                            obj.value = item.score
                            obj.count = count
                            new_data.push(obj)
                            count = 0;
                            obj = { value: null, count: null }
                        } else {
                            count += 1
                        }
                    } else {
                        count += 1;
                        obj.value = item.score
                        obj.count = count
                        new_data.push(obj)
                        count = 0;
                        obj = { value: null, count: null }
                    }
                })
                set_graph(new_data);
            })
            .catch((err) => console.error(err));
    }, [set_scores])

    const renderPlace = (val) => {
        switch (val) {
            case 1:
                return "1st"
            case 2:
                return "2nd"
            case 3:
                return "3rd"
            default:
                return `${val}th`
        }
    }

    const renderScores = (scores) => {
        let place = 1;
        return scores.map((score, index) => {
            if (scores[index - 1]) {
                if (scores[index].score !== scores[index - 1].score) {
                    place += 1;
                    return (
                        <Table.Row key={score.sk}>
                            <Table.Cell>{renderPlace(place)}</Table.Cell>
                            <Table.Cell>{score.name}</Table.Cell>
                            <Table.Cell>{score.score}</Table.Cell>
                        </Table.Row>
                    );
                };
            };

            return (
                <Table.Row key={score.sk}>
                    <Table.Cell>{renderPlace(place)}</Table.Cell>
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
                <hr />
                <div style={{width: "100%", height: "400px"}}>
                    <ResponsiveContainer>
                        <AreaChart 
                            data={graph_data} 
                            margin={{
                                top: 0, right: 10, left: -40, bottom: 15,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <ReferenceLine x={average} stroke="green" label={{value: `Average Score: ${average}`, offset: 5, position: "insideBottom"}} />
                            <XAxis dataKey="value" label={{position: "bottom", value: "Score" }} />
                            <YAxis dataKey="count"  />
                            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                            <Tooltip />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
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