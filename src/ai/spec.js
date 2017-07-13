import { move, isRowWin, isColumnWin } from '.';

describe('ai', () => {
  describe('move', () => {
    it('finds the best next move I', () => {
      const game = {
        players: ['x', 'o'],
        turn: 'o',
        board: [['x', '', ''], ['', '', ''], ['', '', '']]
      };
      const nextMove = move(game);
      expect(nextMove.y).toEqual(1);
      expect(nextMove.x).toEqual(1);
    });

    it('finds the best next move II', () => {
      const game = {
        players: ['x', 'o'],
        turn: 'o',
        board: [['x', 'x', 'o'], ['o', '', ''], ['x', 'o', 'x']]
      };
      const nextMove = move(game);
      expect(nextMove.y).toEqual(1);
      expect(nextMove.x).toEqual(1);
    });

    it('finds the best next move III', () => {
      const game = {
        players: ['x', 'o'],
        turn: 'o',
        board: [['x', 'o', 'x'], ['o', 'o', ''], ['x', 'x', '']]
      };
      const nextMove = move(game);
      expect(nextMove.y).toEqual(1);
      expect(nextMove.x).toEqual(2);
    });
  });

  describe('isRowWin', () => {
    it('should show row 1 win', () => {
      const isWin = isRowWin([['x', 'x', 'x'], ['o', 'o', ''], ['','','']], 'x');
      expect(isWin).toEqual(true);
    });
    it('should show row 2 win', () => {
      const isWin = isRowWin([['x', 'o', 'o'], ['x', 'x', 'x'], ['','','']], 'x');
      expect(isWin).toEqual(true);
    });
    it('should not win', () => {
      const isWin = isRowWin([['', 'o', 'o'], ['x', 'x', ''], ['','','']], 'x');
      expect(isWin).toEqual(false);
    });
  });

  describe('isColumnWin', () => {
    it('should show column win', () => {
      const isWin = isColumnWin([['x', 'o', ''], ['x', 'o', ''], ['','o','']], 'o');
      expect(isWin).toEqual(true);
    });
  });
});
