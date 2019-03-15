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
    //draw in the squares already on the board
    this.props.board.forEach((row,y)=>{
      row.forEach((square,x)=>{
        ctx.beginPath();
        ctx.rect(x*36,y*36,35,35);
        //if it is a 0, nothing in square, color grey
        if(square === 0){
          ctx.fillStyle = '#2E2E2E';
        }
        if(square === 1){
          ctx.fillStyle = '#FFFF00';
        }
        else if (square === 2){
          ctx.fillStyle = '#00FFFF';
        }
        else if (square === 3){
          ctx.fillStyle = '#00FF00';
        }
        else if (square === 4){
          ctx.fillStyle = '#FF0000';
        }
        else if (square === 5){
          ctx.fillStyle = '#8000FF';
        }
        else if (square === 6){
          ctx.fillStyle = '#FF8000';
        }
        else if (square === 7){
          ctx.fillStyle = '#0000FF';
        }

        ctx.fill();
      })
    })
    // now we need to color in the current tetris piece that is coming down the board
    if(this.props.gameStarted){
      tetronimo.shape.forEach((row,i) =>{
        row.forEach((square,j)=>{
          ctx.beginPath();
          ctx.rect((j + tetronimo.topLeft.col)*36, (i + tetronimo.topLeft.row) * 36, 35,35)
          ctx.fillStyle = 'red';
          if(row !==0 && square !==0){
            //if its a tetris piece, color it in
            if(square === 1){
              ctx.fillStyle = '#FFFF00';
            }
            else if (square === 2){
              ctx.fillStyle = '#00FFFF';
            }
            else if (square === 3){
              ctx.fillStyle = '#00FF00';
            }
            else if (square === 4){
              ctx.fillStyle = '#FF0000';
            }
            else if (square === 5){
              ctx.fillStyle = '#8000FF';
            }
            else if (square === 6){
              ctx.fillStyle = '#FF8000';
            }
            else if (square === 7){
              ctx.fillStyle = '#0000FF';
            }
            ctx.fill();
          }
          ctx.closePath();
        })
      })
    }
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
  currentTetro: state.currentTetro,
  gameStarted: state.gameStarted,
  gameOver: state.gameOver
})
export default connect(mapStateToProps) (Canvas)
