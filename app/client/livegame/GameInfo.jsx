import React from 'react'
import TeamList from './TeamList.jsx'

const SIDES = {
    BLUE: 100,
    RED: 200
}

class GameInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {gameData: {}}
    }

    get username() {
        return this.props.match.params.name;
    }

    get userIsInGame() {
        return Object.keys(this.state.gameData).length != 0 && !(this.state.gameData.status && this.state.gameData.status.status_code == 404);
    }

    render() {
        if (!this.userIsInGame) {
            return <h1>{this.username} is not in a game</h1>;
        }

        let participants = this.state.gameData.participants;
        let blueSide = participants.filter(player => player.teamId == SIDES.BLUE);
        let redSide = participants.filter(player => player.teamId == SIDES.RED);

        let mode = this.state.gameData.gameMode;
        let gameType = this.state.gameData.gameType;
        let secondsPassed = this.state.gameData.gameLength;

        return (
            <div>
                <h1>Game data for {this.username}</h1>
                <p>Game Mode: {mode} </p>
                <p>Game Type: {gameType} </p>
                <p>Time passed: {gameLength} </p>
                <TeamList side={'BLUE'} participants={blueSide} username={this.username} />
                <hr/>
                <TeamList side={'RED'} participants={redSide} username={this.username} />
            </div>
        );
    }

    async componentDidMount() {
        let name = this.props.match.params.name;
        let summonerInfo = await fetch('/api/user/' + name).then((res) => res.json());

        fetch('/api/live/' + summonerInfo.id).then((res) => res.json()).then((resJson) => {
            this.setState({gameData: resJson})
        });
    }
}

export default GameInfo;