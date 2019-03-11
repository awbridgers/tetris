

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