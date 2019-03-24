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
    let size = 36;
    if( window.screen.width< 667){     // change back to window.screen.width for deployment
      size = 24
      this.canvas.setAttribute('width', 240);
      this.canvas.setAttribute('height', 384);
    }
    //clear the canvas before redrawing
    ctx.clearRect(0,0,size*10,size*16)
    //draw in the squares already on the board
    this.props.board.forEach((row,y)=>{
      row.forEach((square,x)=>{
        ctx.beginPath();
        ctx.rect(x*size,y*size,size-1,size-1);
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
      ctx.closePath();
    })
    // now we need to color in the current tetris piece that is coming down the board
    if(this.props.gameStarted){
      tetronimo.shape.forEach((row,i) =>{
        row.forEach((square,j)=>{
          ctx.beginPath();
          ctx.rect((j + tetronimo.topLeft.col)*size, (i + tetronimo.topLeft.row) * size, size-1,size -1)
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
        <canvas height = '576' width = '360' ref = {(ref)=> this.canvas = ref}></canvas>
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
