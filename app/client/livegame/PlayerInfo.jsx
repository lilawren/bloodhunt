import React from 'react'

class PlayerInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    get name() {
        return this.props.name;
    }

    render() {
        return (
            <div>
                { this.props.isSelf ?
                    <span><b>{this.name}</b></span>
                    :
                    <span>{this.name}</span>
                }
            </div>
        );
    }
}

export default PlayerInfo;