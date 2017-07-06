import React from 'react';

export default class Popup extends React.Component {

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