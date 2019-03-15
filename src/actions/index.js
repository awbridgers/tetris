

export const newTetro = () => ({
  type: 'SPAWN_TETRO',
})

export const updateTetro = tetro =>({
  type: 'UPDATE_TETRO',
  tetro: tetro
})

export const updateBoard = board =>({
  type: 'UPDATE_BOARD',
  payload: board
})

export const updateScore = score => ({
  type: 'UPDATE_SCORE',
  payload: score
})

export const changeGameStatus = status => ({
  type: 'SWITCH_GAME_ON',
  payload: status
})

export const startGame = started =>({
  type: 'START_GAME',
  payload: started
})

export const changeGameOver = gameOver => ({
  type: 'SWITCH_GAME_OVER',
  payload: gameOver
})

export const resetGame = () => ({
  type: 'RESET_GAME'
})
