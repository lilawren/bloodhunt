import React from 'react'

class GameInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userData: {}}
    }

    get username() {
        return this.props.match.params.name;
    }

    render() {
        return (
            <div>
                <h1>Game data for {this.username}</h1>
            </div>
        );
    }

    componentDidMount() {
        let name = this.props.match.params.name;
        fetch('/api/user/' + name).then((res) => res.json()).then((resJson) => {
            this.setState({userData: resJson})
        });
    }
}

export default GameInfo;