import BLOCKS from "./blocks.js";

// DOM
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");

// setting
const GAME_ROWS = 20;
const GAME_COLM = 10;

// variables
let score = 0;
let duration = 500;
let downInterval; // 초기화 null 값 선언
let tempMovingItem; // 초기화 null 값 선언 - 실행 전 잠깐 데이터를 담아두는 용도

const movingItem = {
  type: "",
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
  // movingItem 안의 값만 잠깐 담아두는 용도 (값을 복사하는 개념)
  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  generateNewBlock();
}

function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < GAME_COLM; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  li.prepend(ul); // ul을 li에 넣는다
  playground.prepend(li); // li를 playground에 넣는다.
  /* 
    createElement를 사용해 html 안 ul 태그 아래에 li > ul > li 순으로 생성
    prepend를 사용해 각 생성 요소들이 포함되도록 설정
    반복문을 통해 가로 세로 길이 설정
  */
}

function renderBlocks(moveType = "") {
  const { type, direction, top, left } = tempMovingItem; // tempMovingItem 안 각 프로퍼티들을 변수로 사용
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    // moving 클래스를 갖고 있는 요소 반복문을 돌림
    moving.classList.remove(type, "moving");
    // moving 클래스를 지워서 해당 요소 css 효과 삭제
    // 테트리스 블록이 움직일 때, 이전 요소 위치의 컬러(CSS 효과)를 없앤다.
  });
  BLOCKS[type][direction].some((block) => {
    // forEach를 사용할 경우, 반복문을 중간에 멈출 수 없기 때문에 some을 사용
    // BLOCK -> type -> dirention
    const x = block[0] + left;
    const y = block[1] + top;
    // 삼항 연산자 사용, 아래 방향 움직임 오류가 나는 것을 방지하기 위함
    const target = playground.childNodes[y]
      ? playground.childNodes[y].childNodes[0].childNodes[x]
      : null;
    const isAvailable = checkEmpty(target); // 가능 여부 checkEmpty
    if (isAvailable) {
      target.classList.add(type, "moving"); // type을 클래스로 지정
    } else {
      tempMovingItem = { ...movingItem }; // 빈 공간이 있다면, 재귀함수 호출
      if (moveType === "retry") {
        clearInterval(downInterval);
        showGameoverText();
      }
      setTimeout(() => {
        // call stack error 발생 방지 위해 따로 빼내어서 setTimeout 안에 renderBlocks를 넣음
        renderBlocks("retry"); // 재귀함수 호출
        if (moveType === "top") {
          seizeBlock();
        }
      }, 0);
      return true;
      // 만약에 빈값이 있게 되면, return true;를 시켜서 나머지는 굳이 돌리지 않고, 새롭게 renderBlocks를 시작할 수 있게 함
    }
  });
  // 제대로 작동한다면
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
}

function seizeBlock() {
  // 바닥에 블록이 닿으면 멈추게 하는 함수
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove("moving");
    moving.classList.add("seized");
  });
  checkMatch();
}

function checkMatch() {
  const childNodes = playground.childNodes;
  childNodes.forEach((child) => {
    let matched = true;
    child.children[0].childNodes.forEach((li) => {
      if (!li.classList.contains("seized")) {
        // 하나라도 빈 칸이 있다면 false
        matched = false;
      }
    });
    if (matched) {
      // 한 줄이 완성되면
      child.remove();
      prependNewLine();
      score++;
      scoreDisplay.innerText = score;
    }
  });

  generateNewBlock();
}

function generateNewBlock() {
  clearInterval(downInterval);
  // 진행 중인 인터벌을 꺼 주기 위함
  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, duration);

  const blockArr = Object.entries(BLOCKS);
  // object 반복문 돌리기 위해 사용 - Object.entries()
  // object로 돼 있기 때문에 BLOCKS를 직접 사용할 수 없음
  const randomIndex = Math.floor(Math.random() * blockArr.length);

  movingItem.type = blockArr[randomIndex][0];
  movingItem.top = 0;
  movingItem.left = 3;
  movingItem.direction = 0;
  tempMovingItem = { ...movingItem };
  renderBlocks();
}

function checkEmpty(target) {
  // 가능 여부 확인 후, isAvilable에 전달
  if (!target || target.classList.contains("seized")) {
    // contains 클래스 유무 여부를 확인해 주는 메서드
    return false;
    // target에 seized 클래스를 갖고 있음을 확인하면,
    // '빈 값이 아니다'라고 알리는 false를 넘겨서
    // '가능하지 않다'를 할 수 있도록 함 (블록이 바닥에 닿으면 멈추게 함)
  }
  return true;
}

function moveBlock(moveType, amount) {
  // moveType: left 값을 받는다.
  // tempMovingItem을 통해서 렌더링하기 때문에 tempMovingItem의 값을 바꿔준다.
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}

function changeDirection() {
  const direction = tempMovingItem.direction;
  direction === 3
    ? (tempMovingItem.direction = 0) // 3이면 0으로 초기화
    : (tempMovingItem.direction += 1); // 아니라면 1씩 증가
  renderBlocks(); // 다시 실행해 줘야 작동함
}

function dropBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock("top", 1);
  }, 10);
}

function showGameoverText() {
  gameText.style.display = "flex";
}

// event handling
document.addEventListener("keydown", (e) => {
  switch (
    e.keyCode // switch 문 사용
  ) {
    case 39: // 오른쪽
      moveBlock("left", 1);
      break;
    case 37: // 왼쪽
      moveBlock("left", -1);
      break;
    case 40: // 아래
      moveBlock("top", 1);
      break;
    case 38: // 위
      changeDirection();
      break;
    case 32:
      dropBlock();
      break;
    default:
      break;
  }
});

restartButton.addEventListener("click", () => {
  playground.innerHTML = "";
  gameText.style.display = "none";
  init();
});
