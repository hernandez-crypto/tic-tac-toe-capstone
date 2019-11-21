export default class ComputerPlayer {
  constructor(setChoice) {
    this.setChoice = setChoice;
  }
  makeMove = (difficulty, board, maximizing) => {
    switch (difficulty) {
      case 1:
        return this.easyMode(board);
      case 2:
        return this.mediumMode(board);
      case 3:
        return this.hardMode(board, maximizing, 0);
      default:
        this.easyMode(board);
    }
  };

  easyMode = board => {
    let options = [];
    board.forEach((square, index) => {
      if (typeof square === 'number') {
        options = [...options, index];
        return;
      }
    });
    let choice = options[Math.floor(Math.random() * options.length)];
    this.setChoice(choice);
  };

  mediumMode = () => {
    // computer bot that chooses from the available spots on the board randomly & with the hard algorithm
  };
  hardMode = (board, maximizing, depth) => {
    board.forEach((square, index) => {
      if (typeof square === 'number') {
        let newBoard = [...board];
        newBoard[index] = maximizing === true ? 1 : 0;
        return this.hardMode;
      }
    });

    // computer bot that chooses from the available spots on the board and finds the best spot on the board to win
  };
}
