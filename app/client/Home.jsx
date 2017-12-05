import React from 'react'

import { Route } from 'react-router-dom'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liveUsername : '',
            username : ''
        }
    }

    render() {
        return (
            <div>
                <h2>View Live Game Info:</h2>
                <input
                    value={this.state.liveUsername}
                    placeholder='Search player in game...'
                    onChange={ (e) => {this.setState({liveUsername: e.target.value})} }/>

                <Route render={({history}) => (
                    <button onClick={() => { history.push('/live/' + this.state.liveUsername) }}>
                        Search User
                    </button>
                )} />

                <hr/>

                <h2>Get user info</h2>
                <input
                    value={this.state.username}
                    placeholder='Summoner name...'
                    onChange={ (e) => {this.setState({username: e.target.value})} }/>

                <Route render={({history}) => (
                    <button onClick={() => { history.push('/user/' + this.state.username) }}>
                        Search User
                    </button>
                )} />

            </div>
        );
    }


}

export default Home;