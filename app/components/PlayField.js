import React from 'react';
import PropTypes from 'prop-types';

const Grid = props => {
    return (
        <div className="cell" onClick={props.onClick}>
            <div>{Number.isInteger(props.value) ? '' : props.value}</div>
        </div>
    )
};
Grid.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    onClick: PropTypes.func.isRequired
};


class PlayField extends React.Component {
    renderSquare(i) {
        return (
            <Grid
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div className="game">
                <div className="game-title">Try to win me!</div>
                <div className="play-field">
                    <div className="row">
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className="row">
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className="row">
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = PlayField;