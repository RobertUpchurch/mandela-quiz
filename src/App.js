import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Quiz  from './pages/quiz';
import Scoreboard  from './pages/scoreboard';

const App = () => {

    return (
        <div>
            <Switch >
                <Route exact path="/"><Quiz /></Route>
                <Route path="/quiz"><Quiz /></Route>
                <Route path="/scoreboard"><Scoreboard /></Route>
            </Switch>
        </div>
    )
}

export default App;