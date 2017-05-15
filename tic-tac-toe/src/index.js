import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
	renderSquare(i) {
  	/*modify to take squares via props and have its own onClick prop specifiead by Game*/
    return (
    	<Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} /> );
  }

  render() {
    return (
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
      </div>
    );
  }
}

class Game extends React.Component {
	/*display the list of moves*/
	constructor(){
		super();
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			xIsNext: true,
		};
	}

	handleClick(i){
		const history = this.state.history;
		const current = current.squares.slice();
		const squares = current.squares.slice();
		/*ignores click if someone has won or if the square is full*/
		if (calculateWinner(squares) || squares[i]){
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history : history.concat([{
				squares: squares
			}]),
			xIsNext: !this.state.xIsNext,
		});
	}

  render() {

  	/*look at the most recent history and take over calculating game status */
  	const history = this.state.history;
  	const current = history[history.length-1];
  	/* tells whose turn or winner */
    const winner = calculateWinner(current.squares);
    let status;
    if (winner){
    	status = 'Winner: '+ winner;
    } else {
    	status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

/*helper function */
function calculateWinner(squares){
	const lines = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6],
	];

	for (let i = 0; i < lines.length; i++){
		const [a,b,c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
			return squares[a];
		}
	}
	return null;
}