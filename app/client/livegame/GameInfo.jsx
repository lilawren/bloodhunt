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

    get summonerName() {
        return this.props.match.params.summonerName;
    }

    get userIsInGame() {
        return Object.keys(this.state.gameData).length != 0 && !(this.state.gameData.status && this.state.gameData.status.status_code == 404);
    }

    render() {
        if (!this.userIsInGame) {
            return <h1>{this.summonerName} is not in a game</h1>;
        }

        let participants = this.state.gameData.participants;
        let blueSide = participants.filter(player => player.teamId == SIDES.BLUE);
        let redSide = participants.filter(player => player.teamId == SIDES.RED);

        let mode = this.state.gameData.gameMode;
        let gameType = this.state.gameData.gameType;

        return (
            <div>
                <h1>Game data for {this.summonerName}</h1>
                <p>Game Mode: {mode} </p>
                <p>Game Type: {gameType} </p>
                <TeamList side={'BLUE'} participants={blueSide} username={this.summonerName} />
                <hr/>
                <TeamList side={'RED'} participants={redSide} username={this.summonerName} />
            </div>
        );
    }

    async componentDidMount() {
        let summonerInfo = await fetch('/api/user/' + this.summonerName).then((res) => res.json());
        let summonerIds = [summonerInfo.accountId];

        // get info about the game
        await fetch('/api/live/' + summonerInfo.id).then((res) => res.json()).then((resJson) => {
            this.setState({gameData: resJson})
        });

        if (!this.state.gameData.participants) {
            return;
        }

        let summonerNames = this.state.gameData.participants.map(participant => participant.summonerName);

        // get accountIds for each of the summoners
        for (let summonerName of summonerNames) {
            if (summonerName.toLowerCase() == this.summonerName.toLowerCase()) {
                continue;
            }
            let summonerInfo = await fetch('/api/user/' + summonerName).then((res) => res.json());
            summonerIds.push(summonerInfo.accountId);
        }

        // get past 20 games for each summoner, store in a hash table by summonerId -> matchlist
        let recentMatchlists = {};
        for (let i = 0; i < summonerIds.length; i++) {
            let summonerId = summonerIds[i];
            let matchlist = await fetch('/api/matchlists/' + summonerId).then((res) => res.json());

            recentMatchlists[summonerIds[i]] = matchlist;
        }

        // go through each matchlist and determine which were won and with which champions

    }
}

export default GameInfo;