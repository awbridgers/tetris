import React, { Component } from 'react';
import './App.css';
import Canvas from './containers/canvas.js';
import equals from 'array-equal';
import MediaQuery from 'react-responsive'
import { connect } from 'react-redux';
import { updateTetro, updateBoard, newTetro, updateScore, changeGameStatus } from './actions/index.js';
import { startGame, changeGameOver, resetGame } from './actions/index.js'
import Score from './components/score.js'
import GameStart from './components/gameStart.js'

class App extends Component {
  constructor(){
    super();
    this.speed = 750;
  }
  componentDidMount(){
    //focus on the game div so the keypress function will trigger
    this.gameDiv.focus();
    this.beginGameProcess = false;
  }
  componentDidUpdate(){
    //start an interval so the tetro moves down on an interval when the game starts
    if(this.beginGameProcess){
      this.gameInterval = setInterval(()=>this.moveTetro('down'),this.speed);
      this.beginGameProcess = false;
    }
    //if a piece hits the bottom or collides with another piece, check for game events
    if(this.landed){
      //check for any rows to be cleared
      //if a row doesn't have any 0's it must be filled and needs to be cleared
      let newBoard = this.props.board.filter(row => row.includes(0));
      const rowsCleared = 16 - newBoard.length;
      //add the number of removed rows to the top as 0s
      if(rowsCleared > 0){
        for(let i = 0; i< rowsCleared; i++){
          newBoard.unshift([0,0,0,0,0,0,0,0,0,0])
        }

        //update the board and score
        this.updateScore(rowsCleared);
        this.props.updateBoard(newBoard, false);
      }

      //if there was a collision when the current piece spawns, the game is over
      if(this.checkMove(this.props.currentTetro, 'spawn').placePiece){
        clearInterval(this.gameInterval);
        this.props.changeGameStatus(false);
        this.props.changeGameOver(true);
        this.landed = false;
      }

      else{
        this.landed = false;
      }
    }
  }
  updateScore = (rowsCleared) =>{
    let scoreAdder = 0;
    switch(rowsCleared){
      case 1:
        scoreAdder = 40;
        break;
      case 2:
        scoreAdder = 100;
        break;
      case 3:
        scoreAdder = 300;
        break;
      case 4:
        scoreAdder = 1200;
        break;
      default:
        scoreAdder = 0;
        break;
    }
    this.props.updateScore(this.props.score + scoreAdder);
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
    //update the board in the store and spawn a new tetro
    this.landed = true;
    this.props.updateBoard(tempBoard, true);



  }
  //a function to test if 2 2D arrays are equal to one another
  arrayIsEqual = (array1,shape) => {
    //if the lenghts are equal, we need to see if they are the same
    if(array1.length === shape.length){
      //if the lengths are the same, loop through and evaluate each element
      for(let i = 0; i< array1.length; i++){
        if(!equals(array1[i], shape[i])){
          return false;
        }
      }
    }
    //if the lengths aren't equal, the arrays aren't equal
    else{
      return false;
    }
    return true;
  }
  rotate = () => {
    let tempTetro = {...this.props.currentTetro};
    //find the index of the current shape in the rotations array
    let index = tempTetro.rotations.findIndex(item =>this.arrayIsEqual(item,tempTetro.shape));
    //if the shape is the last one in the array, go back to the first one, else go to the next shape
    index = (index + 1 >= tempTetro.rotations.length) ? 0 : index + 1
    //check if rotate is legal and change shape to new shape
    tempTetro.newShape = tempTetro.rotations[index];
    if(this.checkMove(tempTetro, 'rotate').movePiece){
      tempTetro.shape = tempTetro.rotations[index];
      this.props.updateTetro(tempTetro);
    }
  }
  checkMove = (tempTetro, direction) => {
    /*This function will determine if the piece can move/rotate
      Simply by altering between newTopLeft/shape and newShape/topLeft, we can check
      both rotate AND moves without having to write the same double for loop twice
      with the exact same code other than the 2 variable pairs listed above*/
    let checkArray, checkTopLeft;
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
    //return an object of {movePiece, placePiece} with 2 bool in order to check if piece can move
    //and if it needs to be placed to the board
    for(let row = 0; row < checkArray.length; row++){
      for(let col = 0; col < checkArray[row].length; col++){
        if(checkArray[row][col]!== 0){
          //keep it in bounds horizontally
          if(checkTopLeft.col + col > 9 || checkTopLeft.col + col < 0){
            //don't move, and don't place it
            return {movePiece:false, placePiece:false}
          }
          //keep it in bounds vertically
          else if(checkTopLeft.row + row > 15){
            //if its at the bottom, don't move it, and place it to the board
            return {movePiece:false, placePiece:true}

          }
          //keep the piece from moving through other pieces
          else if(this.props.board[row+checkTopLeft.row][col+checkTopLeft.col] !== 0) {
            //if the collision is due to moving right or left, don't move, but don't add to board either
            if(direction === 'right' || direction === 'left'){
              return {movePiece:false, placePiece:false}
            }
            //if the collision is due to moving down, now the piece must be added to the board
            else{
              return { movePiece: false, placePiece: true}
            }
          }
        }
      }
    }
    return {movePiece: true, placePiece: false}
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
  onKeyDown = (e,mobile) => {
    e.preventDefault();
    let direction = (mobile) ? parseInt(e.target.id,10) : e.keyCode;

    if(this.props.gameOn)
      switch(direction){
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
  startGame = () =>{
    //if the game is over, start a new game
    if(this.props.gameOver){
      this.newGame()
    }
    //if the game has been started
    else if(this.props.gameStarted){
      //if the game is ongoing, pause the game
      if(this.props.gameOn){
        this.props.changeGameStatus(false)
        clearInterval(this.gameInterval);
      }
      //if the game is paused, resume the game
      else{
        this.props.changeGameStatus(true);
        this.beginGameProcess = true;
      }
    }
    //the game has not been started, so start it!
    else{
      this.props.startGame(!this.props.gameStarted);
      this.props.changeGameStatus(!this.props.gameOn);
      this.gameDiv.focus();
      this.props.newTetro();
      this.beginGameProcess = true;
    }
  }

  newGame = () => {
    //reset everything back to the start
    this.props.resetGame();
    this.beginGameProcess = true;
  }

  render() {
    //console.log(this.props.currentTetro.shape)
    return (
      <div className = 'app'>
        <div ref = {(gameDiv) => this.gameDiv = gameDiv} className="canvas" onKeyDown = {(e)=>this.onKeyDown(e,false)} tabIndex = "1">
          {!this.props.gameOn && this.props.gameStarted &&  <h1 className = 'paused'>{`${this.props.gameOver ? 'Game Over': 'Game Paused'}`}</h1>}
          <Canvas />
            <div className = 'score'>
              <Score score = {this.props.score} />
            </div>
            <div className = 'start'>
              <GameStart startGame = {this.startGame} gameOn = {this.props.gameOn}/>
            </div>
        </div>
        <MediaQuery maxDeviceWidth = {1224}>
          <div className = 'controlDiv'>
            <div className = 'left'><button id = '37' onClick = {(e)=>this.onKeyDown(e,true)}>&#9664;&#xfe0e;</button></div>
            <div className = 'middle'>
              <button id = '38' onClick = {(e)=>this.onKeyDown(e,true)}>&#9650;&#xfe0e;</button>
              <button id = '40' onClick = {(e)=>this.onKeyDown(e,true)}>&#9660;&#xfe0e;</button>
            </div>
            <div className = 'right'><button id = '39' onClick = {(e)=>this.onKeyDown(e,true)}>&#9654;&#xfe0e;</button></div>
          </div>
        </MediaQuery>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch =>({
  updateTetro: (tetro)=> dispatch(updateTetro(tetro)),
  updateBoard: (board,spawn)=> dispatch(updateBoard(board,spawn)),
  newTetro: () => dispatch(newTetro()),
  updateScore: (score) => dispatch(updateScore(score)),
  changeGameStatus: (status) => dispatch(changeGameStatus(status)),
  startGame: (started)=> dispatch(startGame(started)),
  changeGameOver: (gameOver) => dispatch(changeGameOver(gameOver)),
  resetGame: () => dispatch(resetGame()),
})
const mapStateToProps = state => ({
  board: state.board,
  currentTetro: state.currentTetro,
  score: state.score,
  gameOn: state.gameOn,
  gameStarted: state.gameStarted,
  gameOver: state.gameOver,
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
