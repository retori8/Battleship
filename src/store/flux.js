const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      board: [], //board with available positions for the game
      start: false, //is true when player has chosen his thirteen locations

      //PC: position of the ships, successful shots, received shots, game move
      positionPC: [],
      hitPC: [],
      shotInPcBoard: [],
      random: "",
      positions: [],//stores and allows preflighting of the parameters at the ship's location

      //user: position of the ships, successful shots, received shots, game move
      positionsUser: [],
      hit: [],
      shotInUserBoard: [],
      checkUserPositions: [],//stores and allows pre-verification of order parameters and ship selection

      //appearance: appearance of the boxes according to status, light according to the state of the game, alerts
      class: ["boardBox", "boardBox2", "boardBox3", "boardBox4"],
      userLight: ["userLight"],
      pcLight: [""],
      alertSmall: {
        show: false,
        msn: ""
      },
      alert: {
        show: false,
        msn: "",
        text: "",
        button: ""
      },
      msn: "CHOOSE YOUR POSITIONS",
    },

    actions: {

      //Function linked to the start button in the Battle view and focused on verifying that the player has chosen   
      //his thirteen locations before being able to start the fight and, if so, communicate the start of the battle
      start: () => {
        const { positionsUser } = getStore();
        if (positionsUser.length > 12) {
          setStore({ start: true, msn: "ATTACK YOUR RIVAL", userLight: "", pcLight: "pcLight" });
        } else {
          setStore({ alert: { show: true, button: "TRY AGAIN", msn: "Sorry, we can't start the battle until you choose all thirteen positions for your fleet" } })
        }
      },

      //function that manages the onclick event in each square of the user's board, defining the order and the selection 
      //parameters of the positions chosen by the user on his board
      handleClickUser: (key, col, row) => {
        const { positionsUser, checkUserPositions } = getStore();
        const box = [row, col];

        //position 0, free choice, without conditions
        if (checkUserPositions.length === 0) {
          setStore({ checkUserPositions: [box], positionsUser: [...positionsUser, key] });
        } else {
          const [prevRow, prevCol] = checkUserPositions[checkUserPositions.length - 1];
          const isSameRow = prevRow === row;
          const isSameCol = prevCol === col;
          // checks that the position is adjacent having the coincidence in column or in row with the previous position
          const isAdjacent = (isSameRow && Math.abs(prevCol - col) === 1) || (isSameCol && Math.abs(prevRow - row) === 1);

          // from position 1 onwards we confirm that it complies or not with adjacency and that they are aligned
          if (checkUserPositions.length <= 3) {
            const isFirstRowAligned = isSameRow && checkUserPositions.every(pos => pos[0] === row);
            const isFirstColAligned = isSameCol && checkUserPositions.every(pos => pos[1] === col);

            if (isAdjacent && (isFirstRowAligned || isFirstColAligned)) {
              setStore({ positionsUser: [...positionsUser, key], checkUserPositions: [...checkUserPositions, box] });
            } else {
              setStore({ alertSmall: { show: true, msn: "The selected position is not aligned in column or row with the previous positions." } });
            }
            //check for stored positions from here, to prevent a repeated position from being stored
          } else if ((checkUserPositions.length === (4)) || (checkUserPositions.length === (7))) {
            const isPositionUnique = !checkUserPositions.some(pos => pos[0] === row && pos[1] === col);
            //initial positions of the next ship and to avoid immediate continuation of the previous ship, use !isAdjacent
            //it is possible that there is adjacency but not directly from the last selected position between one ship and another
            if (!isAdjacent && isPositionUnique) {
              setStore({ positionsUser: [...positionsUser, key], checkUserPositions: [...checkUserPositions, box] });
            } else {
              setStore({ alertSmall: { show: true, msn: "the next position must be at least one position away" } });
            }
          } else if ((checkUserPositions.length === (5)) || (checkUserPositions.length === (8))) {
            const isPositionUnique = !checkUserPositions.some(pos => pos[0] === row && pos[1] === col);
            if (isAdjacent && isPositionUnique) {
              setStore({ positionsUser: [...positionsUser, key], checkUserPositions: [...checkUserPositions, box] });
            }
          } else if ((checkUserPositions.length === (6)) || (checkUserPositions.length === (9))) {
            const isPositionUnique = !checkUserPositions.some(pos => pos[0] === row && pos[1] === col);
            //corroborates the alignment with the last two positions
            const rowAligned = isSameRow && checkUserPositions.slice(-2).every(pos => pos[0] === row);
            const colAligned = isSameCol && checkUserPositions.slice(-2).every(pos => pos[1] === col);
            if (isPositionUnique && isAdjacent && (rowAligned || colAligned)) {
              setStore({ positionsUser: [...positionsUser, key], checkUserPositions: [...checkUserPositions, box] });
            } else {
              setStore({ alertSmall: { show: true, msn: "The selected position is not aligned in column or row with the previous positions." } });
            }
          } else if ((checkUserPositions.length === (10)) || (checkUserPositions.length === (12))) {
            const isPositionUnique = !checkUserPositions.some(pos => pos[0] === row && pos[1] === col);
            if (!isAdjacent && isPositionUnique) {
              setStore({ positionsUser: [...positionsUser, key], checkUserPositions: [...checkUserPositions, box] });
            }
          } else if (checkUserPositions.length === (11)) {
            const isPositionUnique = !checkUserPositions.some(pos => pos[0] === row && pos[1] === col);
            if (isAdjacent && isPositionUnique) {
              setStore({ positionsUser: [...positionsUser, key], checkUserPositions: [...checkUserPositions, box] });
            }
          }
        }
      },

      //function that manages the onclick event in each square of the PC's board
      //defining the parameters and storage filters and reactive actions on the user's dashboard
      handleClickPc: (key) => {
        const { shotInPcBoard, positionPC, hit, shotInUserBoard, hitPC, positionsUser } = getStore();

        //actions related to PC
        setStore({ shotInPcBoard: [...shotInPcBoard, key] })
        // stores shot, compares with PC ship positions, matches are stored as hits 
        //and if more than 12 units, user win and the alert communicates it
        for (let i = 0; i < positionPC.length; i++) {
          if (key === String(positionPC[i])) {
            setStore({ hit: [...hit, key] })
            if (hit.length > 11) {
              setStore({ alert: { show: true, button: "PLAY AGAIN", msn: "Congratulations you have won this battle !!" } })
            }
          }
        }
        //actions related to User
        //reactively when clicking on the PC board, we receive the move from the PC on the user's board
        const play = getActions().pcPlay()
        setStore({ shotInUserBoard: [...shotInUserBoard, play] });
        for (let i = 0; i < positionsUser.length; i++) {
          if (play === positionsUser[i]) {
            setStore({ hitPC: [...hitPC, play] })
            if (hitPC.length > 11) {
              setStore({ alert: { show: true, button: "PLAY AGAIN", msn: "Sorry, you asked for this battle." } })
            }
          }
        }
      },

      //small alert closing function
      close: () => {
        setStore({ alertSmall: { show: false } });
      },

      //creation of board with available positions for the game, used for the PC game on the user board
      createBoard: () => {
        const { board } = getStore();
        const rows = 9;
        const cols = 9;
        for (let i = 1; i <= rows; i++) {
          for (let j = 1; j <= cols; j++) {
            board.push(`${i}.${j}`);
          }
        }
        board.splice(9, 0, '1.10')
        board.splice(19, 0, '2.10')
        board.splice(29, 0, '3.10')
        board.splice(39, 0, '4.10')
        board.splice(49, 0, '5.10')
        board.splice(59, 0, '6.10')
        board.splice(69, 0, '7.10')
        board.splice(79, 0, '8.10')
        board.splice(89, 0, '9.10')
        board.splice(90, 0, '10.1', '10.2', '10.3', '10.4', '10.5', '10.6', '10.7', '10.8', '10.9', '10.10')
        setStore({ board })
        return board;
      },

      //function that generates the moves of the PC game, keeping in the board variable
      //only the possibilities available for the next random choice
      pcPlay: () => {
        const { board, random } = getStore()
        const index = Math.floor(Math.random() * board.length);
        setStore({ random: board[index] })
        board.splice(index, 1)
        setStore({ board })
        return random
      },

      //general random function
      getRandom: (max, min) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },

      // function that randomly generates the position of PC ships
      // under the parameters and guidelines
      generatePositions: () => {
        const { positions } = getStore();
        
        while (positions.length < 13) {
          let row, col;
          
          
          // selection cycle of random numbers and then consecutive ones in column and row
          //interleaved, for each selection of ship positions
          if (positions.length === 0) {
            [row, col] = [getActions().getRandom(4, 10), getActions().getRandom(4, 10)];
          } else if (positions.length <= 3) {
            [row, col] = [positions[positions.length - 1][0], positions[positions.length - 1][1] - 1];
          } else if ((positions.length === 4) || (positions.length === 7)) {
            [row, col] = [getActions().getRandom(3, 10), getActions().getRandom(3, 10)];
          } else if (positions.length > 4 && positions.length < 7) {
            [row, col] = [positions[positions.length - 1][0] - 1, positions[positions.length - 1][1]];
          } else if (positions.length > 7 && positions.length < 10) {
            [row, col] = [positions[positions.length - 1][0], positions[positions.length - 1][1] - 1];
          } else if (positions.length === 10) {
            [row, col] = [getActions().getRandom(2, 10), getActions().getRandom(2, 10)];
          } else if (positions.length === 11) {
            [row, col] = [positions[positions.length - 1][0] - 1, positions[positions.length - 1][1]];
          } else if (positions.length === 12) {
            [row, col] = [getActions().getRandom(1, 10), getActions().getRandom(1, 10)];
          }
          positions.push([row, col]);
        }
        return positions;
      },

      selectPositionsPC: () => {
        const { positionPC } = getStore();
      
        //get the positions, change the format to check for repeated elements
        const allPositions = getActions().generatePositions(); 
        const stringifiedArrays = allPositions.map(JSON.stringify);
        const duplicates = new Set(stringifiedArrays).size < stringifiedArrays.length;
        //if there are repeated elements, the whole cycle is restarted 
        //to receive and store the positions
        if (duplicates) {
          setStore({positions:[]});
          getActions().generatePositions();
          getActions().selectPositionsPC();
          
        } else {
          //if there are no repeated elements, the format is adapted to allow comparison 
          //with the key of each box and it is saved in the variable
          allPositions.forEach(([row, col]) => {
            const positionStr = `${row}.${col}`;
            positionPC.push(positionStr);
          });
          setStore({ positionPC });
        }
      },
    }
  }
}


export default getState;