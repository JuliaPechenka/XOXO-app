import React from 'react';
import PropTypes from 'prop-types';

class Popup extends React.Component {
    render() {
        return (
            <div className="popup">
                <div className="popup-container">
                    <div className="popup-title">{this.props.text}</div>
                    <div className="xo-button" onClick={this.props.restartGame}><span>Try again</span></div>
                </div>
            </div>
        )
    }
}
Popup.propTypes = {
    text: PropTypes.string.isRequired,
    restartGame: PropTypes.func.isRequired
};

module.exports = Popup;