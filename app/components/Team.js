import React from 'react';
import PropTypes from 'prop-types';

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTeam: ''
        };

        this.selectTeam = this.selectTeam.bind(this);
    }

    selectTeam(team) {
        this.setState({
            selectedTeam: team
        }, function() {
            this.props.onClick(
                this.state.selectedTeam
            );
        });
    }

    render() {
        var teams = ['X', 'O'];
        return (
            <div className="team">
                {teams.map((team) => {
                    return (
                        <div
                            className={"item " + (team === this.state.selectedTeam ? 'active' : 'hidden')}
                            onClick={this.selectTeam.bind(null, team)}
                            key={team}>
                                {team}
                        </div>
                    )
                }, this)}
            </div>
        )
    }
}
Team.propTypes = {
    onClick: PropTypes.func.isRequired
};

module.exports = Team;