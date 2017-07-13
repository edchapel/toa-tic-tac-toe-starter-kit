import React from 'react';
import withTicTacToe from '../withTicTacToe';
import './style.css';

// A sample game object that is received as props in the TicTacToe component
//
// {
//   gameUid: 'someId',
//   players: ['max', 'moritz'],
//   turn: 'moritz',
//   board: [
//     ['max', 'moritz', ''],
//     ['', 'max', ''],
//     ['', '', '']
//   ],
//   status: {
//     type: 'ONGOING',
//     winner: null
//   }
// }

class TicTacToe extends React.Component {
  render() {
    const { game, games, isInGame, hasPendingGame, actions, username } = this.props;
    const { create, join, leave, move } = actions;

    return (
      <div>
        <h1>
          Hello {username}!
        </h1>

        { isInGame ?
            <Game username={username} game={game} onMove={move} onLeave={leave} /> :
            <Lobby games={games} onJoin={join} onCreate={create} />
        }
      </div>
    );
  }
}

function Game({ game, username, onMove, onLeave }) {
  const showGameStatus = () => {
    switch(game.status.type) {
      case 'WAITING':
        return (<div>Waiting for a player to join...</div>);
        
      case 'ONGOING':
        return username === game.turn
          ? (<div>Your turn</div>)
          : (<div>Waiting for {game.turn}</div>);
   
      case 'FINISHED':
        return game.status.winner === 'DRAW'
          ? (<div>Draw... lame.</div>)
          : (<div>The winner is {game.status.winner}!</div>);

      default:
        return (<div className="error">Unknown game state: {game.status.type}</div>);
    }
  };

  return (
    <div>
      { showGameStatus() }
      <div>
        { game.board.map((row, y) => (
            <div key={y} className="board-row">
              {
                row.map((col, x) => {
                  let mark = '';
                  if (game.players[0] === col) { mark = 'X'; }
                  if (game.players[1] === col) { mark = 'O'; }
                  const onClick = mark ? () => {} : () => onMove({ y, x });
                  return (
                    <div key={x} className="board-cell" onClick={onClick}>{ mark }</div>
                  );
                })
              }
            </div>
          )
        )}
      </div>
      <div>
        <button onClick={() => onLeave()}>Leave</button>
      </div>
    </div>
  );
}

function Lobby({ games, onJoin, onCreate }) {
  const gameList = games.map(game => (
    <div key={game.gameUid}>
      <button onClick={() => onJoin(game.gameUid)}>
        {game.status.type}: {game.players[0]}
      </button>
    </div>)
  );

  return (
    <div>
      <button onClick={() => onCreate()}>
        Create a game
      </button>
      <ul>
        {gameList}
      </ul>
    </div>
  );
}

export default withTicTacToe(TicTacToe);
