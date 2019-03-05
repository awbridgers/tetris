import React, {Component} from 'react';
import { connect } from 'react-redux'

class Canvas extends Component{
  constructor(){
    super();
    this.canvas = null;
  }
  componentDidUpdate(){
    this.colorSquares();
  }
  componentDidMount(){
    this.colorSquares();
  }
  colorSquares = () =>{
    let tetronimo = this.props.currentTetro;
    const ctx = this.canvas.getContext('2d');
    //clear the canvas before redrawing
    ctx.clearRect(0,0,350,560)
    //draw in the sqaures already on the board
    this.props.board.forEach((row,y)=>{
      row.forEach((square,x)=>{
        ctx.beginPath();
        ctx.rect(x*36,y*36,35,35);
        //if it is a 0, nothing in square, color grey
        if(square === 0){
          ctx.fillStyle = 'grey';
          ctx.fill();
        }
        //if its a tetris piece, color it in
        else if (square === 1){
          ctx.fillStyle = 'red';
          ctx.fill();
        }
      })
    })
    // now we need to color in the current tetris piece that is coming down the board
    tetronimo.shape.forEach((row,i) =>{
      row.forEach((col,j)=>{
        ctx.beginPath();
        ctx.rect((j + tetronimo.topLeft.col)*36, (i + tetronimo.topLeft.row) * 36, 35,35)
        ctx.fillStyle = 'red';
        if(row !==0 && col !==0){
          ctx.fill();
        }
        ctx.closePath();
      })
    })

  }
  render(){
    return(
      <div className = 'board'>
        <canvas width = '360' height = "576" ref = {(ref)=> this.canvas = ref}></canvas>
      </div>
    )
  }
}
const mapStateToProps = state =>({
  board: state.board,
  currentTetro: state.currentTetro
})
export default connect(mapStateToProps) (Canvas)
