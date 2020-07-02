import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Button } from "antd";

// https://stackoverflow.com/questions/48156902/how-can-i-draw-red-horizontal-line-in-react
// need to move colors to CSS
const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
    }}
  />
);

/* In React, function components (like Square), 
   only contain a render() method and don't have their own state.
   The earlier version of this extended React.Component
 */
function Square(props) {
  return (
    <button
      className="square"
      onClick={() => {
        props.onClick();
        console.log("X hit");
      }}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      // it must return one div
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <ColoredLine color="blue" />
        <Button
          type="primary"
          onClick={() => alert("you clicked the antd button of type primary")}
        >
          antd 1
        </Button>

        <Button
          type="ghost"
          onClick={() => alert("you clicked the antd button of type ghost")}
        >
          antd 2
        </Button>

        <button onClick={() => alert("you clicked the html button")}>
          vanilla html
        </button>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
    };
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleSqClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }

  handleSqClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const sqsCopy = current.squares.slice();

    console.log("handleSqClick hit " + i);
    console.log("current = " + current);
    console.log("sqsCopy[i] = " + sqsCopy[i]);

    // Treat sqs as immutable so code is cleaner.
    const winner = calculateWinner(current.squares);

    if (winner || sqsCopy[i]) {
      console.log("return early, winner=", winner);
      return;
    }
    let symbol = this.state.xIsNext ? "X" : "0";
    sqsCopy[i] = symbol;
    this.setState({
      history: history.concat([
        {
          squares: sqsCopy,
        },
      ]),
      xIsNext: !this.state.xIsNext,
    });
  }
}

// ========================================

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById("root")
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
