import _ from 'lodash';

export const isRowWin = (board, player) => {
  for (let y = 0; y < 3; y++) {
    if (board[y][0] === player && board[y][1] === player && board[y][2] === player) {
      return true;
    }
  }

  return false;
}

export const isColumnWin =  (board, player) => {
  for (let x = 0; x < 3; x++) {
    if (board[0][x] === player && board[1][x] === player && board[2][x] === player) {
      return true;
    }
  }

  return false;
}

function isDiagonalWin (board, player) {
  if (board[1][1] !== player) return false;

  return (board[0][0] === player && board[2][2] === player) ||
  (board[0][2] === player && board[2][0] === player);
}

function didPlayerWin (board, player) {
  return isRowWin(board, player) || isColumnWin(board, player) || isDiagonalWin(board, player);
}

function getUtility (board, players) {  
  return didPlayerWin(board, players[0])
    ? 10
    : didPlayerWin(board, players[1])
      ? -10
      : 0;
}

const createNode = (board, action) => ({board, action});

function applyAction(board, action, player) {
    const newBoard = board.map(x => x.slice());
    newBoard[action.y][action.x] = player;
    return newBoard;
};

function getSuccessors(board, player, players) { 
  const utility = getUtility(board, players);
  if (utility !== 0) return [];

  let successors = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y][x] === '') {
        let action = { x, y };
        var nextBoard = applyAction(board, action, player);
        
        var node = createNode(nextBoard, action);
        if (!node) continue;

        successors.push(node);
      }
    }
  }
  return successors;
}

function getOtherPlayer(players, myPlayer) {
  return players[0] === myPlayer ? players[1] : players[0];
}

export const minimax = (board, isMaxPlayer, players) => {
    let player = isMaxPlayer ? players[0] : players[1];
    let successors = getSuccessors(board, player, players);

    if (!successors || !successors.length) return getUtility(board, players);

    if (isMaxPlayer) {
      let bestValue = -9999;
      for (let successor of successors) {
          let value = minimax(successor.board, !isMaxPlayer, players);
          bestValue = Math.max(bestValue, value);
      }
      return bestValue;
    } else {
      let bestValue = 9999;
      for (let successor of successors) {
        let value = minimax(successor.board, !isMaxPlayer, players);
        bestValue = Math.min(bestValue, value);
      }
      return bestValue;
    }
};

export const move = game => {  
  let players = [game.turn, getOtherPlayer(game.players, game.turn)];
  let successors = getSuccessors(game.board, game.turn, game.players);
  let bestSuccessor = {value: -9999, action: null};
  for (let successor of successors) {
    let value = minimax(successor.board, false, players);
    if (value > bestSuccessor.value) {
        bestSuccessor = {value, action: successor.action};
    }
  }

  return bestSuccessor.action;
}

export default { move };
