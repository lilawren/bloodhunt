import React from 'react'
import PlayerInfo from './PlayerInfo.jsx'


class TeamList extends React.Component {
    constructor(props) {
        super(props);
    }

    get side() {
        return this.props.side;
    }

    get participants() {
        return this.props.participants;
    }

    get username() {
        return this.props.username;
    }

    render() {
        return (
            <div>
                <h2>{this.side}</h2>
                {this.participants.map(player => <PlayerInfo key={player.summonerName} name={player.summonerName} isSelf={player.summonerName.toLowerCase() == this.username.toLowerCase()} />)}
            </div>
        );
    }
}

export default TeamList;