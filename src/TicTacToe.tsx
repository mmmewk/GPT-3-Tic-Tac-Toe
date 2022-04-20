
import React from 'react';

interface GameState {
  board: Array<Array<string | null>>;
  player: string;
  winner: string | null;
}

function saveGameState(gameState: GameState) {
  localStorage.setItem('gameState', JSON.stringify(gameState))
}

function loadGameState() : GameState {
  const gameStateString = localStorage.getItem('gameState')
  if (gameStateString === null) {
      return {
          board: [
              [null, null, null],
              [null, null, null],
              [null, null, null]
          ],
          player: 'X',
          winner: null
      }
  }
  return JSON.parse(gameStateString)
}

const TicTacToe : React.FC = () => {
    const [gameState, setGameState] = React.useState<GameState>(loadGameState())

    const makeMove = (row: number, col: number) => {
      const board = gameState.board
      const player = gameState.player
      if (board[row][col] === null && gameState.winner === null) {
          board[row][col] = player
          const newGameState = {
              board: board,
              player: player === 'X' ? 'O' : 'X',
              winner: checkWinner(board, player)
          }
          setGameState(newGameState)
          saveGameState(newGameState)
      }
  }

    const checkWinner = (board: Array<Array<string | null>>, player: string) : string | null => {
        const winningLines = [
            [[0,0],[0,1],[0,2]],
            [[1,0],[1,1],[1,2]],
            [[2,0],[2,1],[2,2]],
            [[0,0],[1,0],[2,0]],
            [[0,1],[1,1],[2,1]],
            [[0,2],[1,2],[2,2]],
            [[0,0],[1,1],[2,2]],
            [[2,0],[1,1],[0,2]],
        ]

        for (let i=0; i < winningLines.length; i++) {
            const [[a1, b1], [a2, b2], [a3, b3]] = winningLines[i]
            if (board[a1][b1] === player && board[a2][b2] === player && board[a3][b3] === player) {
                return player
            }
        }
        return null
    }

    const resetGame = () => {
        setGameState({
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            player: 'X',
            winner: null
        })
        saveGameState({
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null]
            ],
            player: 'X',
            winner: null
        })
    }

    const renderSquare = (row: number, col: number) => {
        return (
            <button className="square" onClick={() => makeMove(row, col)}>
                {gameState.board[row][col]}
            </button>
        )
    }

    const renderBoard = () => {
        return (
            <div>
                <div className="board-row">
                    {renderSquare(0, 0)}
                    {renderSquare(0, 1)}
                    {renderSquare(0, 2)}
                </div>
                <div className="board-row">
                    {renderSquare(1, 0)}
                    {renderSquare(1, 1)}
                    {renderSquare(1, 2)}
                </div>
                <div className="board-row">
                    {renderSquare(2, 0)}
                    {renderSquare(2, 1)}
                    {renderSquare(2, 2)}
                </div>
            </div>
        )
    }

    const renderWinner = () => {
        return (
            <div>
                Winner: {gameState.winner}
            </div>
        )
    }

    const renderDraw = () => {
        return (
            <div>
                Draw
            </div>
        )
    }

    return (
        <div className="game">
            <div className="game-board">
                {renderBoard()}
            </div>
            <div className="game-info">
                {gameState.winner && renderWinner()}
                {gameState.winner === null && gameState.board.every(row => row.every(col => col !== null)) && renderDraw()}
                <button onClick={resetGame}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default TicTacToe;
