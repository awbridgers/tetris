(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,t,r){e.exports=r(32)},26:function(e,t,r){},27:function(e,t,r){},32:function(e,t,r){"use strict";r.r(t);var o=r(0),a=r.n(o),n=r(17),c=r.n(n),s=(r(26),r(14)),i=r(5),p=r(6),u=r(10),l=r(8),f=r(9),d=(r(27),r(3)),h=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(u.a)(this,Object(l.a)(t).call(this))).colorSquares=function(){e.props.currentTetro;var t=e.canvas.getContext("2d");t.lineWidth="0",t.clearRect(0,0,350,560),t.beginPath(),t.fillStyle="orange",t.rect(0,0,200,200),t.fill(),t.closePath()},e.canvas=null,e}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidUpdate",value:function(){this.colorSquares()}},{key:"componentDidMount",value:function(){this.colorSquares()}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"board"},a.a.createElement("canvas",{width:"360",height:"576",ref:function(t){return e.canvas=t}}))}}]),t}(o.Component),v=Object(d.b)(function(e){return{board:e.board,currentTetro:e.currentTetro,gameStarted:e.gameStarted,gameOver:e.gameOver}})(h),m=r(19),w=r.n(m),T=function(e){function t(){var e,r;Object(i.a)(this,t);for(var o=arguments.length,a=new Array(o),n=0;n<o;n++)a[n]=arguments[n];return(r=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(a)))).updateScore=function(e){var t=0;switch(e){case 1:t=40;break;case 2:t=100;break;case 3:t=300;break;case 4:t=1200;break;default:t=0}r.props.updateScore(r.props.score+t)},r.addTetroToBoard=function(e){for(var t=r.props.board.slice(0),o=0;o<e.shape.length;o++)for(var a=0;a<e.shape[o].length;a++)0!==e.shape[o][a]&&(t[o+e.topLeft.row][a+e.topLeft.col]=e.shape[o][a]);r.props.updateBoard(t),r.props.newTetro(),r.landed=!0},r.arrayIsEqual=function(e,t){var r=!0;if(e.length===t.length)for(var o=0;o<e.length;o++)w()(e[o],t[o])||(r=!1);else r=!1;return r},r.rotate=function(){var e=Object(s.a)({},r.props.currentTetro),t=e.rotations.findIndex(function(t){return r.arrayIsEqual(t,e.shape)});t=t+1>=e.rotations.length?0:t+1,e.newShape=e.rotations[t],r.checkMove(e,"rotate")&&(e.shape=e.rotations[t],r.props.updateTetro(e))},r.checkMove=function(e,t){var o,a,n,c;n=!0,c=!1,"rotate"===t?(o=e.newShape,a=e.topLeft):"spawn"===t?(o=e.shape,a=e.topLeft):(o=e.shape,a=e.newTopLeft);for(var s=0;s<o.length;s++)for(var i=0;i<o[s].length;i++)if(0!==o[s][i]){if(a.col+i>9||a.col+i<0){n=!1;break}if(a.row+s>15)n=!1,c=!0;else if(0!==r.props.board[s+a.row][i+a.col]){if("right"===t||"left"===t){n=!1;break}n=!1,c=!0;break}}return"rotate"===t||"spawn"===t?n:{movePiece:n,placePiece:c}},r.moveTetro=function(e){var t=Object(s.a)({},r.props.currentTetro);switch(e){case"left":t.newTopLeft={row:t.topLeft.row,col:t.topLeft.col-1};break;case"right":t.newTopLeft={row:t.topLeft.row,col:t.topLeft.col+1};break;case"down":t.newTopLeft={row:t.topLeft.row+1,col:t.topLeft.col};break;case"up":t.newTopLeft={row:t.topLeft.row-1,col:t.topLeft.col}}var o=r.checkMove(t,e);o.movePiece?(t.topLeft=t.newTopLeft,r.props.updateTetro(t)):o.placePiece&&r.addTetroToBoard(t)},r.onKeyDown=function(e){if(e.preventDefault(),r.props.gameOn)switch(e.keyCode){case 37:r.moveTetro("left");break;case 39:r.moveTetro("right");break;case 40:r.moveTetro("down");break;case 38:r.rotate()}},r.startGame=function(){r.props.gameOver?r.newGame():r.props.gameStarted?r.props.changeGameStatus(!r.props.gameOn):(r.props.startGame(!r.props.gameStarted),r.props.changeGameStatus(!r.props.gameOn),r.gameDiv.focus(),r.props.newTetro())},r.newGame=function(){r.props.resetGame()},r}return Object(f.a)(t,e),Object(p.a)(t,[{key:"componentDidMount",value:function(){this.gameDiv.focus()}},{key:"componentDidUpdate",value:function(){if(this.landed){for(var e=this.props.board.filter(function(e){return e.includes(0)}),t=16-e.length,r=0;r<t;r++)e.unshift([0,0,0,0,0,0,0,0,0,0]);this.updateScore(t),this.props.updateBoard(e),this.checkMove(this.props.currentTetro,"spawn")?this.landed=!1:(this.props.changeGameStatus(!1),this.props.changeGameOver(!0),this.landed=!1)}}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"app"},a.a.createElement("div",{ref:function(t){return e.gameDiv=t},className:"canvas",onKeyDown:this.onKeyDown,tabIndex:"1"},a.a.createElement(v,null)))}}]),t}(o.Component),g=Object(d.b)(function(e){return{board:e.board,currentTetro:e.currentTetro,score:e.score,gameOn:e.gameOn,gameStarted:e.gameStarted,gameOver:e.gameOver}},function(e){return{updateTetro:function(t){return e(function(e){return{type:"UPDATE_TETRO",tetro:e}}(t))},updateBoard:function(t){return e(function(e){return{type:"UPDATE_BOARD",payload:e}}(t))},newTetro:function(){return e({type:"SPAWN_TETRO"})},updateScore:function(t){return e(function(e){return{type:"UPDATE_SCORE",payload:e}}(t))},changeGameStatus:function(t){return e(function(e){return{type:"SWITCH_GAME_ON",payload:e}}(t))},startGame:function(t){return e(function(e){return{type:"START_GAME",payload:e}}(t))},changeGameOver:function(t){return e(function(e){return{type:"SWITCH_GAME_OVER",payload:e}}(t))},resetGame:function(){return e({type:"RESET_GAME"})}}})(T);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var E=r(1),O=r(20),b=[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],S=[{name:"O",shape:[[1,1],[1,1]],rotations:[[[1,1],[1,1]]],topLeft:{row:0,col:4}},{name:"I",shape:[[2],[2],[2],[2]],rotations:[[[2],[2],[2],[2]],[[2,2,2,2]]],topLeft:{row:0,col:4}},{name:"Z",shape:[[3,3,0],[0,3,3]],rotations:[[[3,3,0],[0,3,3]],[[0,3],[3,3],[3,0]]],topLeft:{row:0,col:4}},{name:"S",shape:[[0,4,4],[4,4,0]],rotations:[[[0,4,4],[4,4,0]],[[4,0],[4,4],[0,4]]],topLeft:{row:0,col:4}},{name:"T",shape:[[5,5,5],[0,5,0]],rotations:[[[5,5,5],[0,5,0]],[[0,5],[5,5],[0,5]],[[0,5,0],[5,5,5]],[[5,0],[5,5],[5,0]]],topLeft:{row:0,col:4}},{name:"L",shape:[[0,6,0],[0,6,0],[0,6,6]],rotations:[[[0,6,0],[0,6,0],[0,6,6]],[[6,6,6],[6,0,0]],[[6,6],[0,6],[0,6]],[[0,0,6],[6,6,6]]],topLeft:{row:0,col:3}},{name:"J",shape:[[0,7,0],[0,7,0],[7,7,0]],rotations:[[[0,7,0],[0,7,0],[7,7,0]],[[7,0,0],[7,7,7]],[[7,7],[7,0],[7,0]],[[7,7,7],[0,0,7]]],topLeft:{row:0,col:4}}],y=Object(E.c)({board:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Array.from(b),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_BOARD":return t.payload;case"RESET_GAME":return[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];default:return e}},currentTetro:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_TETRO":return t.tetro;case"SPAWN_TETRO":case"RESET_GAME":return S[Math.floor(Math.random()*S.length)];default:return e}},score:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_SCORE":return t.payload;case"RESET_GAME":return 0;default:return e}},gameOn:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SWITCH_GAME_ON":return t.payload;case"RESET_GAME":return!0;default:return e}},gameStarted:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"START_GAME":return t.payload;case"RESET_GAME":return!0;default:return e}},gameOver:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SWITCH_GAME_OVER":return t.payload;case"RESET_GAME":return!1;default:return e}}}),_=Object(E.e)(y,void 0,Object(E.d)(Object(E.a)(O.a),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()));c.a.render(a.a.createElement(d.a,{store:_},a.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[21,1,2]]]);
//# sourceMappingURL=main.5a5fea6e.chunk.js.map