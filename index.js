// DOM
const playground = document.querySelector(".playground > ul");

// setting
const GAME_ROWS = 20;
const GAME_COLM = 10;

// variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
  tree: [
    [
      [2, 1],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 2],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [1, 1],
      [0, 0],
      [2, 0],
      [1, 0],
    ],
    [
      [0, 2],
      [1, 1],
      [0, 0],
      [0, 1],
    ],
  ],
};

const movingItem = {
  type: "tree",
  direction: 3,
  top: 0,
  left: 0,
};

init();
/*
  1. init();이 실행되면
  2. 아래 init 함수가 호출됨
*/

// functions
function init() {
  tempMovingItem = { ...movingItem };

  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  renderBlocks();
}

function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < GAME_COLM; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
  /* 
    createElement를 사용해 html 안 ul 태그 아래에 li > ul > li 순으로 생성
    prepend를 사용해 각 생성 요소들이 포함되도록 설정
    반복문을 통해 가로 세로 길이 설정
  */
}

function renderBlocks() {
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove(type, "moving");
  });
  BLOCKS[type][direction].forEach((block) => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const isAvailable = checkEmpty(target);
    if (isAvailable) {
      target.classList.add(type, "moving");
    } else {
      tempMovingItem = { ...movingItem };
      setTimeout(() => {
        renderBlocks(); // 재귀함수 호출
        if (moveType === "top") {
          seizeBlock();
        }
      }, 0);
    }
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
}

function seizeBlock() {}

function checkEmpty(target) {
  if (!target) {
    return false;
  }
  return true;
}

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks();
}

// event handling
document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 39:
      moveBlock("left", 1);
      break;
    case 37:
      moveBlock("left", -1);
      break;
    case 40:
      moveBlock("top", 1);
      break;
    default:
      break;
  }
});
