import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './base/Header';
import Footer from './base/Footer';
import Quiz  from './pages/quiz';
import Scoreboard  from './pages/scoreboard';

const App = () => {

    return (
        <div>
            <Header />
            <Switch >
                <Route exact path="/"><Quiz /></Route>
                <Route path="/quiz"><Quiz /></Route>
                <Route path="/scoreboard"><Scoreboard /></Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default App;