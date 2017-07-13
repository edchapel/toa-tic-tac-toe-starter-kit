import _ from 'lodash';
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
            <Game /> :
            <Lobby games={games} onJoin={join} onCreate={create} />
        }
      </div>
    );
  }
}

function Game() {
  return null;
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
