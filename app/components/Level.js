import React from 'react';

export default class Level extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        this.setState({
            value: event.target.value
        }, function() {
            this.props.onChange(
                this.state.value
            );
        });
    }

    render() {
        return (
            <div className="level">
                <label htmlFor="difficulty">Select the difficulty level: </label>
                <select className="difficulty-select" name="difficulty" value={this.state.value} onChange={this.handleChange}>
                    <option value="" disabled></option>
                    <option value="easy">Easy</option>
                    <option value="difficult">Difficult</option>
                </select>
            </div>
        )
    }
}