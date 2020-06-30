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
   The earlier versioj of this extended React.Component
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
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      sqs: Array(9).fill(null),
    };
  }
  renderSquare(i) {
    return (
      <Square value={this.state.sqs[i]} onClick={() => this.handleSqClick(i)} />
    );
  }

  handleSqClick(i) {
    console.log("handleSqClick hit " + i);
    // Treat sqs as immutable so code is cleaner.
    const sqsCopy = this.state.sqs.slice();

    let symbol = this.state.xIsNext ? "X" : "0";
    sqsCopy[i] = symbol;
    this.setState({
      sqs: sqsCopy,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const winner = calculateWinner(this.state.sqs);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      // it must return one div
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
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
