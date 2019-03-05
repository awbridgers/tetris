const tetroArray = [
  {
    name:'O',
    shape: [[1,1],
            [1,1]],
    topLeft: {row:0, col: 4}
  },
  {
    name:'I',
    shape: [[1,1],[1,1]],
    topLeft: {row:0, col: 4}},
  {
    name:'Z',
    shape: [[1,1,0],
            [0,1,1]],
    topLeft: {row:0, col: 4}
  },
  {
    name:'S',
    shape: [[0,1,1],
            [1,1,0]],
    topLeft: {row:0, col: 4}
  },
  {
    name:'T',
    shape: [[1,1,1],
            [0,1,0]],
    topLeft: {row:0, col: 4}
  },
  {
    name:'L',
    shape: [[0,1,0],
            [0,1,0],
            [0,1,1]] ,
    topLeft: {row:0, col: 3}
  },
  {
    name:'J',
    shape: [[0,1,0],
            [0,1,0],
            [1,1,0]],
    topLeft: {row:0, col: 3}
  }
]

export default tetroArray;
