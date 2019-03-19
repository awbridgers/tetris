(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(e,t,r){e.exports=r(33)},26:function(e,t,r){},27:function(e,t,r){},33:function(e,t,r){"use strict";r.r(t);var a=r(0),o=r.n(a),n=r(17),c=r.n(n),s=(r(26),r(14)),i=r(5),l=r(6),p=r(10),u=r(8),f=r(9),d=(r(27),r(3)),h=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(p.a)(this,Object(u.a)(t).call(this))).colorSquares=function(){var t=e.props.currentTetro,r=e.canvas.getContext("2d"),a=36;window.screen.width<667&&(a=24),r.clearRect(0,0,350,560),e.props.board.forEach(function(e,t){e.forEach(function(e,o){r.beginPath(),r.rect(o*a,t*a,a-1,a-1),0===e&&(r.fillStyle="#2E2E2E"),1===e?r.fillStyle="#FFFF00":2===e?r.fillStyle="#00FFFF":3===e?r.fillStyle="#00FF00":4===e?r.fillStyle="#FF0000":5===e?r.fillStyle="#8000FF":6===e?r.fillStyle="#FF8000":7===e&&(r.fillStyle="#0000FF"),r.fill()}),r.closePath()}),e.props.gameStarted&&t.shape.forEach(function(e,a){e.forEach(function(o,n){r.beginPath(),r.rect(36*(n+t.topLeft.col),36*(a+t.topLeft.row),35,35),0!==e&&0!==o&&(1===o?r.fillStyle="#FFFF00":2===o?r.fillStyle="#00FFFF":3===o?r.fillStyle="#00FF00":4===o?r.fillStyle="#FF0000":5===o?r.fillStyle="#8000FF":6===o?r.fillStyle="#FF8000":7===o&&(r.fillStyle="#0000FF"),r.fill()),r.closePath()})})},e.canvas=null,e}return Object(f.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(){this.colorSquares()}},{key:"componentDidMount",value:function(){this.colorSquares()}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"board"},o.a.createElement("canvas",{ref:function(t){return e.canvas=t}}))}}]),t}(a.Component),m=Object(d.b)(function(e){return{board:e.board,currentTetro:e.currentTetro,gameStarted:e.gameStarted,gameOver:e.gameOver}})(h),v=r(19),g=r.n(v),E=function(e){return o.a.createElement("div",null,o.a.createElement("h1",null,o.a.createElement("u",null,"Score")),o.a.createElement("h2",null,e.score))},w=function(e){return o.a.createElement("div",{className:"gameStart"},o.a.createElement("button",{onClick:e.startGame},"".concat(e.gameOn?"Pause":"Start")))},T=function(e){function t(){var e,r;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),n=0;n<a;n++)o[n]=arguments[n];return(r=Object(p.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).updateScore=function(e){var t=0;switch(e){case 1:t=40;break;case 2:t=100;break;case 3:t=300;break;case 4:t=1200;break;default:t=0}r.props.updateScore(r.props.score+t)},r.addTetroToBoard=function(e){for(var t=r.props.board.slice(0),a=0;a<e.shape.length;a++)for(var o=0;o<e.shape[a].length;o++)0!==e.shape[a][o]&&(t[a+e.topLeft.row][o+e.topLeft.col]=e.shape[a][o]);r.props.updateBoard(t),r.props.newTetro(),r.landed=!0},r.arrayIsEqual=function(e,t){var r=!0;if(e.length===t.length)for(var a=0;a<e.length;a++)g()(e[a],t[a])||(r=!1);else r=!1;return r},r.rotate=function(){var e=Object(s.a)({},r.props.currentTetro),t=e.rotations.findIndex(function(t){return r.arrayIsEqual(t,e.shape)});t=t+1>=e.rotations.length?0:t+1,e.newShape=e.rotations[t],r.checkMove(e,"rotate")&&(e.shape=e.rotations[t],r.props.updateTetro(e))},r.checkMove=function(e,t){var a,o,n,c;n=!0,c=!1,"rotate"===t?(a=e.newShape,o=e.topLeft):"spawn"===t?(a=e.shape,o=e.topLeft):(a=e.shape,o=e.newTopLeft);for(var s=0;s<a.length;s++)for(var i=0;i<a[s].length;i++)if(0!==a[s][i]){if(o.col+i>9||o.col+i<0){n=!1;break}if(o.row+s>15)n=!1,c=!0;else if(0!==r.props.board[s+o.row][i+o.col]){if("right"===t||"left"===t){n=!1;break}n=!1,c=!0;break}}return"rotate"===t||"spawn"===t?n:{movePiece:n,placePiece:c}},r.moveTetro=function(e){var t=Object(s.a)({},r.props.currentTetro);switch(e){case"left":t.newTopLeft={row:t.topLeft.row,col:t.topLeft.col-1};break;case"right":t.newTopLeft={row:t.topLeft.row,col:t.topLeft.col+1};break;case"down":t.newTopLeft={row:t.topLeft.row+1,col:t.topLeft.col};break;case"up":t.newTopLeft={row:t.topLeft.row-1,col:t.topLeft.col}}var a=r.checkMove(t,e);a.movePiece?(t.topLeft=t.newTopLeft,r.props.updateTetro(t)):a.placePiece&&r.addTetroToBoard(t)},r.onKeyDown=function(e){if(e.preventDefault(),r.props.gameOn)switch(e.keyCode){case 37:r.moveTetro("left");break;case 39:r.moveTetro("right");break;case 40:r.moveTetro("down");break;case 38:r.rotate()}},r.startGame=function(){r.props.gameOver?r.newGame():r.props.gameStarted?r.props.changeGameStatus(!r.props.gameOn):(r.props.startGame(!r.props.gameStarted),r.props.changeGameStatus(!r.props.gameOn),r.gameDiv.focus(),r.props.newTetro())},r.newGame=function(){r.props.resetGame()},r}return Object(f.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.gameDiv.focus()}},{key:"componentDidUpdate",value:function(){if(this.landed){for(var e=this.props.board.filter(function(e){return e.includes(0)}),t=16-e.length,r=0;r<t;r++)e.unshift([0,0,0,0,0,0,0,0,0,0]);this.updateScore(t),this.props.updateBoard(e),this.checkMove(this.props.currentTetro,"spawn")?this.landed=!1:(this.props.changeGameStatus(!1),this.props.changeGameOver(!0),this.landed=!1)}}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"app"},o.a.createElement("div",{ref:function(t){return e.gameDiv=t},className:"canvas",onKeyDown:this.onKeyDown,tabIndex:"1"},!this.props.gameOn&&this.props.gameStarted&&o.a.createElement("h1",{className:"paused"},"".concat(this.props.gameOver?"Game Over":"Game Paused")),o.a.createElement(m,null),o.a.createElement("div",{className:"score"},o.a.createElement(E,{score:this.props.score})),o.a.createElement("div",{className:"start"},o.a.createElement(w,{startGame:this.startGame,gameOn:this.props.gameOn}))))}}]),t}(a.Component),S=Object(d.b)(function(e){return{board:e.board,currentTetro:e.currentTetro,score:e.score,gameOn:e.gameOn,gameStarted:e.gameStarted,gameOver:e.gameOver}},function(e){return{updateTetro:function(t){return e(function(e){return{type:"UPDATE_TETRO",tetro:e}}(t))},updateBoard:function(t){return e(function(e){return{type:"UPDATE_BOARD",payload:e}}(t))},newTetro:function(){return e({type:"SPAWN_TETRO"})},updateScore:function(t){return e(function(e){return{type:"UPDATE_SCORE",payload:e}}(t))},changeGameStatus:function(t){return e(function(e){return{type:"SWITCH_GAME_ON",payload:e}}(t))},startGame:function(t){return e(function(e){return{type:"START_GAME",payload:e}}(t))},changeGameOver:function(t){return e(function(e){return{type:"SWITCH_GAME_OVER",payload:e}}(t))},resetGame:function(){return e({type:"RESET_GAME"})}}})(T);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var y=r(1),O=r(20),b=(r(32),[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]),F=[{name:"O",shape:[[1,1],[1,1]],rotations:[[[1,1],[1,1]]],topLeft:{row:0,col:4}},{name:"I",shape:[[2],[2],[2],[2]],rotations:[[[2],[2],[2],[2]],[[2,2,2,2]]],topLeft:{row:0,col:4}},{name:"Z",shape:[[3,3,0],[0,3,3]],rotations:[[[3,3,0],[0,3,3]],[[0,3],[3,3],[3,0]]],topLeft:{row:0,col:4}},{name:"S",shape:[[0,4,4],[4,4,0]],rotations:[[[0,4,4],[4,4,0]],[[4,0],[4,4],[0,4]]],topLeft:{row:0,col:4}},{name:"T",shape:[[5,5,5],[0,5,0]],rotations:[[[5,5,5],[0,5,0]],[[0,5],[5,5],[0,5]],[[0,5,0],[5,5,5]],[[5,0],[5,5],[5,0]]],topLeft:{row:0,col:4}},{name:"L",shape:[[0,6,0],[0,6,0],[0,6,6]],rotations:[[[0,6,0],[0,6,0],[0,6,6]],[[6,6,6],[6,0,0]],[[6,6],[0,6],[0,6]],[[0,0,6],[6,6,6]]],topLeft:{row:0,col:3}},{name:"J",shape:[[0,7,0],[0,7,0],[7,7,0]],rotations:[[[0,7,0],[0,7,0],[7,7,0]],[[7,0,0],[7,7,7]],[[7,7],[7,0],[7,0]],[[7,7,7],[0,0,7]]],topLeft:{row:0,col:4}}],G=Object(y.combineReducers)({board:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Array.from(b),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_BOARD":return t.payload;case"RESET_GAME":return[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];default:return e}},currentTetro:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_TETRO":return t.tetro;case"SPAWN_TETRO":case"RESET_GAME":return F[Math.floor(Math.random()*F.length)];default:return e}},score:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_SCORE":return t.payload;case"RESET_GAME":return 0;default:return e}},gameOn:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SWITCH_GAME_ON":return t.payload;case"RESET_GAME":return!0;default:return e}},gameStarted:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"START_GAME":return t.payload;case"RESET_GAME":return!0;default:return e}},gameOver:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SWITCH_GAME_OVER":return t.payload;case"RESET_GAME":return!1;default:return e}}}),k=Object(y.createStore)(G,void 0,Object(O.composeWithDevTools)());c.a.render(o.a.createElement(d.a,{store:k},o.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[21,1,2]]]);
//# sourceMappingURL=main.cf1778b6.chunk.js.map