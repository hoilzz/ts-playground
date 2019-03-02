interface ISquareConfig {
  color?: string;
  width?: number;
  necessary: boolean;
}

function createSquare(config: ISquareConfig): { color: string; area: number } {
  const newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  console.log("necessary: ", config.necessary);
  return newSquare;
}

// let mySquare = createSquare({ colour: "red", width: 100 });
let mySquare = createSquare({ necessary: true });

// let x = [1, 2, 3, null];
// console.log(x);
