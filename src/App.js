import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Quiz  from './pages/quiz';
import Scoreboard  from './pages/scoreboard';
import Answers from './pages/quiz/components/Answers';

const App = () => {

    return (
        <div>
            <Switch >
                <Route exact path="/"><Quiz /></Route>
                <Route path="/quiz"><Quiz /></Route>
                <Route path="/scoreboard"><Scoreboard /></Route>
                <Route path="/answers"><Answers /></Route>
            </Switch>
        </div>
    )
}

export default App;