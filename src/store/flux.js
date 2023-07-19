const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userShot: [],
      userGoodShot: [],
      userWrongShot: [],
      isGoodShot: false,
      start: false,
      selectedButton: [],
      isActive: false,
      class: ["boardBox", "boardBox2", "boardBox3", "boardBox4"],
      board: [],
      boardPositions: [],
      positionSelected: [],

    },
    actions: {
      getShot: (key) => {
        const { userShot, positionSelected, userGoodShot, userWrongShot, isGoodShot } = getStore();
        setStore({ userShot: [...userShot, key] })
        console.log(userShot, "estos son los disparos")
        for (let i = 0; i < positionSelected.length; i++) {
          if (key === positionSelected[i]) {
            setStore({ isGoodShot: true })
            setStore({ userGoodShot: [...userGoodShot, key] })
          } else if (userGoodShot.length === 13) {
            setStore({ showAlert: true })
          } else {
            setStore({ userWrongShot: [...userWrongShot, key] })
          }
        }

      },

      // User Board ---------------------------------------------------------

      handleClick: (key) => {
        const { selectedButton } = getStore();
        setStore({ selectedButton: [...selectedButton, key] })
        console.log(selectedButton, "estas son las posiciones")
      },
      // PC Board ---------------------------------------------------------
      selectFleetPositions: () => {
        const positionSelected = [];

        for (let j = 0; j < 5; j++) {
          const numbers = [];
          const integer = Math.floor(Math.random() * 10) + 1;
          let decimal = Math.floor(Math.random() * 7) + 1;
          const number = parseFloat(`${integer}.${decimal}`);
          let positions;

          if (j === 0) {
            positions = 4;
          } else if (j === 1 || j === 2) {
            positions = 3;
          } else if (j === 3) {
            positions = 2;
          } else if (j === 4) {
            positions = 1;
          }

          for (let i = 0; i < positions; i++) {
            let position;

            if (decimal === 9) {
              position = `${integer}.${decimal + 1}`;
            } else if (decimal === 10) {
              break;
            } else {
              position = number + i * 0.1;
              position = position.toFixed(1);
            }

            numbers.push(position);
          }

          positionSelected.push(...numbers);
        }

        console.log(positionSelected, "PC posiciones");
        setStore({ positionSelected });
      },


      changeVariable: () => {
        const { isActive } = getStore();
        setStore({ isActive: true });
      },
      start: () => {
        const { start } = getStore();
        setStore({ start: true });
        console.log(start, "este es start")
      },
    },
  };
};

export default getState;