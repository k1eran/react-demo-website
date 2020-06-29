import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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
    const status = "Next player: " + (this.state.xIsNext ? "X" : "0");

    return (
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

ReactDOM.render(<Game />, document.getElementById("root"));
