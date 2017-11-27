import React from 'react'

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userData: {}}
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Level</th>
                        </tr>
                        <tr>
                            <td>{ this.state.userData.name }</td>
                            <td>{ this.state.userData.summonerLevel }</td>
                        </tr>
                    </tbody>
                </table>

                <input />
                <button>Search</button>
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

export default UserInfo;