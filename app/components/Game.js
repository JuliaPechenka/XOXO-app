import React from 'react';

import PlayField from './PlayField';
import Team from './Team';
import Level from './Level';
import Popup from './Popup';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [0, 1, 2, 3, 4, 5, 6, 7, 8]
        };

        this.selectTeam = this.selectTeam.bind(this);
        this.selectLevel = this.selectLevel.bind(this);
        this.cleanField = this.cleanField.bind(this);
    }

    selectTeam(value) {
        setTimeout(() => {
            this.setState({
                team: value
            })
        }, 200);
    }

    selectLevel(value) {
        setTimeout(() => {
            this.setState({
                level: value
            })
        }, 200);
    }

    userStep(i) {
        if (Number.isInteger(this.state.squares[i])) {
            const squares = this.state.squares;
            const opponent = this.state.team === 'X' ? 'O' : 'X';
            squares[i] = this.state.team;
            round++;

            this.setState({
                squares: squares
            });

            if (winning(squares, this.state.team)) {
                this.setState({
                    showPopup: true,
                    popupText: 'you win!'
                });
                return;
            } else if (round > 8) {
                this.setState({
                    showPopup: true,
                    popupText: 'tie!'
                });
                return;
            } else {
                var index = this.state.level === 'easy' ? random(squares, opponent) : minimax(squares, opponent).index;
                squares[index] = opponent;
                round++;

                this.setState({
                    squares: squares
                });
                if (winning(squares, opponent)) {
                    this.setState({
                        showPopup: true,
                        popupText: 'you lose!'
                    });
                    return;
                } else if (round === 0) {
                    this.setState({
                        showPopup: true,
                        popupText: 'tie!'
                    });
                    return;
                }
            }
        }
    }

    cleanField() {
        round = 0;
        this.setState({
            team: undefined,
            level: undefined,
            squares: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            showPopup: false
        });
    }

    render() {
        const squares = this.state.squares;

        return (
            <div className="container">
                {(!this.state.team || !this.state.level) &&
                    <div className="settings-container">
                        <div className="title">Choose your side</div>
                        <Team onClick={this.selectTeam.bind(this)}/>
                        <Level onChange={this.selectLevel.bind(this)}/>
                    </div>
                }

                {this.state.team && this.state.level &&
                    <div className="game-container">
                        <PlayField squares={squares} onClick={i => this.userStep(i)} />
                        <div onClick={this.cleanField.bind(this)} className="reset-button">&#8635;<span>reset</span></div>
                    </div>
                }

                {this.state.showPopup &&
                    <Popup text={this.state.popupText} restartGame={this.cleanField.bind(this)}/>
                }
            </div>

        );

    }
}

module.exports = Game;



/* MINIMAX algorithm */
var huPlayer = "X";
var aiPlayer = "O";
var iter = 0;
var round = 0;

function random(reboard, player) {
    var emptyFields = [];
    for (var i = 0; i < reboard.length; i++) {
        if (Number.isInteger(reboard[i])) {
            emptyFields.push(reboard[i]);
        }
    }

    var randomField = emptyFields[Math.floor(Math.random() * emptyFields.length)];

    return reboard.indexOf(randomField);
}

function minimax(reboard, player) {
    iter++;
    let array = avail(reboard);
    if (winning(reboard, huPlayer)) {
        return {
            score: -10
        };
    } else if (winning(reboard, aiPlayer)) {
        return {
            score: 10
        };
    } else if (array.length === 0) {
        return {
            score: 0
        };
    }

    var moves = [];
    for (var i = 0; i < array.length; i++) {
        var move = {};
        move.index = reboard[array[i]];
        reboard[array[i]] = player;

        if (player == aiPlayer) {
            var g = minimax(reboard, huPlayer);
            move.score = g.score;
        } else {
            var g = minimax(reboard, aiPlayer);
            move.score = g.score;
        }
        reboard[array[i]] = move.index;
        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}

function avail(reboard) {
    return reboard.filter(s => s != "X" && s != "O");
}

function winning(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
    ) {
        return true;
    } else {
        return false;
    }
}