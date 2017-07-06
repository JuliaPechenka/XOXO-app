import React from 'react';

export default class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
    }

    selectTeam(team) {
        this.setState({
            isActive: true
        })

        this.props.onClick(
            this.props.value
        );
    }

    render() {
        return (
            <div className="team">
                <div className={"item " + (this.state.isActive ? 'active' : 'hidden')} onClick={this.selectTeam.bind(this)}>{this.props.value}</div>
            </div>
        )
    }
}