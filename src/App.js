import React, { Component } from 'react';
import './App.css';
import Canvas from './containers/canvas.js';
import { connect } from 'react-redux';
import { updateTetro, updateBoard } from './actions/index.js';

class App extends Component {
  componentDidMount(){
    //focus on the game div so the keypress function will trigger
    this.gameDiv.focus();
  }
  addTetroToBoard = (tetro) => {
    //create a copy of the board
    let tempBoard = this.props.board.slice(0);
    //loop through the shape of the tetro and add it to the board
    //with topLeft as offset so shape starts where it is on the board already
    for(let row = 0; row < tetro.shape.length; row++){
      for(let col = 0; col < tetro.shape[row].length; col++){
        tempBoard[row + tetro.topLeft.row][col+ tetro.topLeft.col] = tetro.shape[row][col];
      }
    }
    //update the board in the store
    this.props.updateBoard(tempBoard);
    //TODO: SPAWN A NEW TETRO
  }
  moveTetro = direction => {
    //create a clone of current tetro so we can mutate it.
    let tempTetro = {...this.props.currentTetro};
    let movePiece = true;
    //set a newTopLeft according to the direction the tetro should move
    switch(direction){
      case 'left':
        tempTetro.newTopLeft = {row: tempTetro.topLeft.row, col: tempTetro.topLeft.col - 1}
        break;
      case 'right':
        tempTetro.newTopLeft = {row: tempTetro.topLeft.row, col: tempTetro.topLeft.col + 1}
        break;
      case 'down':
        tempTetro.newTopLeft = {row: tempTetro.topLeft.row + 1, col: tempTetro.topLeft.col}
        break;
      case 'up':
        tempTetro.newTopLeft = {row: tempTetro.topLeft.row - 1, col: tempTetro.topLeft.col}
        break;
      default:
        break;
    }
    //loop through all the tetro blocks and make sure it can move
    for(let row = 0; row < tempTetro.shape.length; row++){
      for(let col = 0; col < tempTetro.shape[row].length; col++){
        if(tempTetro.shape[row][col]!== 0){
          //keep it in bounds horizontally
          if(tempTetro.newTopLeft.col + col > 9 || tempTetro.newTopLeft.col + col < 0){
            movePiece = false;
            break;
          }
          //keep it in bounds vertically
          else if(tempTetro.newTopLeft.row + row > 15){
            movePiece = false;
            //the piece has hit the bottom of the board, and now must be added to the board array
            this.addTetroToBoard(tempTetro)

          }
          //keep the piece from moving through other pieces
          else if(this.props.board[row+tempTetro.newTopLeft.row][col+tempTetro.newTopLeft.col] !== 0) {
            //if the collision is due to moving right or left, don't move, but don't add to board either
            if(direction === 'right' || direction === 'left'){
              movePiece = false;
              break;
            }
            //if the collision is due to moving down, now the piece must be added to the board
            else{
              movePiece = false;
              this.addPieceToBoard(tempTetro);
              break;
            }
          }
        }
      }
    }
    //if the piece passes through all checks with no issue, move the piece
    if(movePiece){
      tempTetro.topLeft = tempTetro.newTopLeft;
      this.props.updateTetro(tempTetro)
    }
  }
  onKeyDown = (e) => {
    switch(e.keyCode){
      case 37:
        this.moveTetro("left")
        break;
      case 39:
        this.moveTetro('right');
        break;
      case 40:
        this.moveTetro('down')
        break;
      case 38:
        //testing purposed only
        // this.moveTetro('up')
        // break;
      default:
        //do nothing
    }
  }
  render() {
    return (
      <div ref = {(gameDiv) => this.gameDiv = gameDiv} className="App" onKeyDown = {this.onKeyDown} tabIndex = "1">
        <Canvas />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>({
  updateTetro: (tetro)=> dispatch(updateTetro(tetro)),
  updateBoard: (board)=> dispatch(updateBoard(board)),
})
const mapStateToProps = state => ({
  board: state.board,
  currentTetro: state.currentTetro
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
