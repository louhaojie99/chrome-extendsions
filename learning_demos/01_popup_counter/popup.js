console.log("popup.js 开始执行");

const countElement = document.querySelector("#count");
const incrementButton = document.querySelector("#incrementButton");
const resetButton = document.querySelector("#resetButton");

let count = 0;

incrementButton.addEventListener("click", () => {
  count = count + 1;
  countElement.textContent = count;
  console.log("增加后的计数：", count);
});

resetButton.addEventListener("click", () => {
  count = 0;
  countElement.textContent = count;
  console.log("重置后的计数：", count);
});
