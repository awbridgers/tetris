import React, { Component } from 'react';
import './App.css';
import Canvas from './containers/canvas.js';
import equals from 'array-equal';
import { connect } from 'react-redux';
import { updateTetro, updateBoard, newTetro } from './actions/index.js';

class App extends Component {
  componentDidMount(){
    //focus on the game div so the keypress function will trigger
    this.gameDiv.focus();
  }
  componentDidUpdate(){
    //if a new piece was spawned, check to see if it hit something on spawn
    if(this.landed){
      //check for any rows to be cleared
      let newBoard = this.props.board.filter(row => row.includes(0));
      const rowsCleared = 16 - newBoard.length;
      for(let i = 0; i< rowsCleared; i++){
        newBoard.unshift([0,0,0,0,0,0,0,0,0,0])
      }
      this.props.updateBoard(newBoard);

      //if there was a collision, the game is over
      if(!this.checkMove(this.props.currentTetro, 'spawn')){
        console.log('Game Over!')
        this.landed = false;
      }
      else{
        this.landed = false;
      }
    }
  }

  addTetroToBoard = (tetro) => {
    //create a copy of the board
    let tempBoard = this.props.board.slice(0);
    //loop through the shape of the tetro and add it to the board
    //with topLeft as offset so shape starts where it is on the board already
    for(let row = 0; row < tetro.shape.length; row++){
      for(let col = 0; col < tetro.shape[row].length; col++){
        //don't add to the board if its a 0, it could overwrite an already colored square
        if(tetro.shape[row][col]!==0){
          tempBoard[row + tetro.topLeft.row][col+ tetro.topLeft.col] = tetro.shape[row][col];
        }
      }
    }
    //update the board in the store
    this.props.updateBoard(tempBoard);
    this.props.newTetro();
    //set landed to true to check if a collision occurs when the tetro spawns
    this.landed = true;

  }
  arrayIsEqual = (array1,shape) => {
    let equal = true;
    //if the lenghts are equal, we need to see if they are the same
    if(array1.length === shape.length){
      //if the lengths are the same, loop through and evaluate each element
      for(let i = 0; i< array1.length; i++){
        //if the elements are different, set equal to false
        if(!equals(array1[i], shape[i])){
          equal = false;
        }
      }
    }
    //if the lengths aren't equal, the arrays aren't equal
    else{
      equal = false;
    }
    return equal;
  }
  rotate = () => {
    let tempTetro = {...this.props.currentTetro};
    //find the index of the current shape in the rotations array
    let index = tempTetro.rotations.findIndex(item =>this.arrayIsEqual(item,tempTetro.shape));
    //if the shape is the last one in the array, go back to the first one
    index = (index + 1 >= tempTetro.rotations.length) ? 0 : index + 1
    //check if rotate is legal and change shape to new shape
    tempTetro.newShape = tempTetro.rotations[index];
    if(this.checkMove(tempTetro, 'rotate')){
      tempTetro.shape = tempTetro.rotations[index];
      this.props.updateTetro(tempTetro);
    }
  }
  checkMove = (tempTetro, direction) => {
    /*This function will determine if the piece can move/rotate
      Simply by altering between newTopLeft/shape and newShape/topLeft, we can check
      both rotate AND moves without having to write the same double for loop twice
      with the exact same code other than the 2 variable pairs listed above*/
    let checkArray, checkTopLeft, movePiece, placePiece;
    movePiece = true;
    placePiece = false;
    //if the move is a rotate, check the new shape starting at topLeft for boundaries
    if(direction === 'rotate'){
      checkArray = tempTetro.newShape
      checkTopLeft = tempTetro.topLeft
    }
    else if(direction === 'spawn'){
      checkArray = tempTetro.shape;
      checkTopLeft = tempTetro.topLeft;
    }
    //if it is a directional move, check new top Left with the current shape for boundaries
    else{
      checkArray = tempTetro.shape
      checkTopLeft = tempTetro.newTopLeft
    }
    //loop through 2d array of shape or newShape
    for(let row = 0; row < checkArray.length; row++){
      for(let col = 0; col < checkArray[row].length; col++){
        if(checkArray[row][col]!== 0){
          //keep it in bounds horizontally
          if(checkTopLeft.col + col > 9 || checkTopLeft.col + col < 0){
            movePiece = false;
            break;
          }
          //keep it in bounds vertically
          else if(checkTopLeft.row + row > 15){
            movePiece = false;
            //the piece has hit the bottom of the board, and now must be added to the board array
            placePiece = true;

          }
          //keep the piece from moving through other pieces
          else if(this.props.board[row+checkTopLeft.row][col+checkTopLeft.col] !== 0) {
            //if the collision is due to moving right or left, don't move, but don't add to board either
            if(direction === 'right' || direction === 'left'){
              movePiece = false;
              break;
            }
            //if the collision is due to moving down, now the piece must be added to the board
            else{
              movePiece = false;
              placePiece = true;
              break;
            }
          }
        }
      }
    }
    if(direction === 'rotate' || direction === 'spawn'){
      return movePiece
    }
    else{
      return {movePiece, placePiece}
    }
  }
  moveTetro = direction => {
    //create a clone of current tetro so we can mutate it.
    let tempTetro = {...this.props.currentTetro};

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
    const allowMove = this.checkMove(tempTetro, direction);
    if(allowMove.movePiece){
      tempTetro.topLeft = tempTetro.newTopLeft;
      this.props.updateTetro(tempTetro)
    }
    else if (allowMove.placePiece){
      this.addTetroToBoard(tempTetro);
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
        //rotate the piece
        this.rotate();
        break;
      default:
        //do nothing
    }
  }
  render() {
    //console.log(this.props.currentTetro.shape)
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
  newTetro: () => dispatch(newTetro()),
})
const mapStateToProps = state => ({
  board: state.board,
  currentTetro: state.currentTetro
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
