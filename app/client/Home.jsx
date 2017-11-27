import React from 'react'

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>View Live Game Info:</h2>
                <input placeholder='Search player in game...' />
                <button>Search</button>
                <hr/>
                <h2>Get user info</h2>
                <input placeholder='Summoner name...' />
                <button>Search</button>
            </div>
        );
    }
}

export default Home;