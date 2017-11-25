import React from 'react'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickCount : 0
        }
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    render() {
        return (
            <div>
                What's good? # {this.state.clickCount}
                <button onClick={this.onButtonClick}>BUMP</button>
            </div>                
        );
    }

    onButtonClick() {
        this.setState((prevState) => ({
            clickCount : prevState.clickCount + 1
        }));    
    }
}

export default Home;