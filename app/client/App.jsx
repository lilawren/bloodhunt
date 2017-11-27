import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Home from './Home.jsx'
import UserInfo from './UserInfo.jsx'

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                    </ul>

                    <hr />

                    <Route exact path="/" component={Home} />
                    <Route path="/user/:name" component={UserInfo} />
                </div>
            </Router>
        );
    }
}

render(<App />, document.getElementById('app'));