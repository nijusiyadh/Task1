// /// DOM ELEMENTS ///

// const delayInput = document.querySelector(".delay");
// const rowInput = document.querySelector(".row-input");

// const drawBtn = document.querySelector(".draw");
// const startBtn = document.querySelector(".start");
// const stopBtn = document.querySelector(".stop");
// const RestartBtn = document.querySelector(".restart");
// const ClearBtn = document.querySelector(".clear");

// const outputContainer = document.querySelector(".output");
// const patternCards = document.querySelectorAll(".pattern-card");

// /// VARIABLES ///
// let SelectedPattern = "linear";
// let index = 1;
// let flag = true;
// let runninng = 0;
// let selectedId = 1;
// let intervel;
// let randomIndex;

// /// FUNCTIONS ///

// const SelectCard = (selectedcard) => {
//   patternCards.forEach((card) => {
//     card.classList.remove("selected-pattern-card");
//   });
//   selectedcard.classList.add("selected-pattern-card");
// };

// const displayCircle = (num) => {
//   let htmlArray = [];
//   for (let i = 1; i <= num; i++) {
//     const numberOfCircle = 2 * (i - 1) + 1;

//     for (let j = 1; j <= numberOfCircle; j++) {
//       htmlArray.push(`<span class="circle" id='${i}'></span>`);
//     }
//     const rowHtml = `<span class="row">${htmlArray.join(" ")}</span>`;
//     outputContainer.insertAdjacentHTML("beforeend", rowHtml);
//     htmlArray = [];
//   }
// };

// /// COMMON ///

// const RestartPattern = () => {
//   index = 1;
//   intervalTime = delayInput.value;
//   activeLastCircle(0);
//   runninng = 0;
// };

// const ClearAll = () => {
//   index = 1;
//   flag = true;
//   runninng = 0;
//   selectedId = 1;
//   rowInput.value = 0;
//   outputContainer.innerHTML = "";
//   clearInterval(intervel);
// };

// /// LINEAR ///

// const activeLastCircle = (id) => {
//   const AllCircle = document.querySelectorAll(".circle");
//   AllCircle.forEach((span) => span.classList.remove("active"));
//   const circle = document.querySelectorAll(`.circle[id='${id}']`);
//   console.log(circle);
//   circle.forEach((span) => span.classList.add("active"));
//   runninng = 0;
//   index = id;
// };

// const activateCircle = (id) => {
//   const circle = document.querySelectorAll(`.circle[id='${id}']`);
//   circle.forEach((circle) => {
//     circle.classList.add("active");
//     setTimeout(() => {
//       circle.classList.remove("active");
//     }, delayInput.value);
//   });
// };

// const RunPattern = () => {
//   console.log(intervalTime);

//   intervel = setInterval(() => {
//     if (flag) {
//       activateCircle(index);
//       index >= rowInput.value ? (index = 1) : index++;
//     } else {
//       clearInterval(intervel);
//       // activateCircle(i);
//       activeLastCircle(index);
//       flag = true;
//     }
//   }, intervalTime);
// };

// /// RANDOM ///

// const activeSingleLastCircle = (row, id) => {
//   const AllCircle = document.querySelectorAll(".circle");
//   AllCircle.forEach((span) => span.classList.remove("active"));
//   const circle = document.querySelectorAll(`.circle[id='${row}']`);
//   console.log(circle[id]);
//   circle[id].classList.add("active");
//   runninng = 0;
//   index = row;
// };

// const activateRandomCircle = (id) => {
//   const AllCircle = document.querySelectorAll(".circle");
//   AllCircle.forEach((span) => span.classList.remove("active"));
//   const circle = document.querySelectorAll(`.circle[id='${id}']`);
//   const lenght = circle.length;
//   const randomElement = Math.floor(Math.random() * lenght);
//   // console.log(` ${lenght} - ${randomElement} - ${circle[randomElement]}`);
//   randomElement && circle[randomElement].classList.add("active");
//   randomIndex = randomElement;
//   setTimeout(() => {
//     randomElement && circle[randomElement].classList.remove("active");
//   }, delayInput.value);
// };

// const RunRandomPattern = () => {
//   intervel = setInterval(() => {
//     if (flag) {
//       activateRandomCircle(index);
//       index = Math.floor(Math.random() * rowInput.value) + 1;
//     } else {
//       clearInterval(intervel);
//       // activateCircle(i);
//       activeSingleLastCircle(index, randomIndex);
//       flag = true;
//     }
//   }, intervalTime);
// };

// /// CENTER ///

// const activateCenterCircle = (id) => {
//   const circle = document.querySelectorAll(`.circle[id='${id}']`);
//   const centerElement = parseInt(circle.length / 2);
//   // console.log(circle[centerElement - 1]);

//   circle[centerElement].classList.add("active");
//   randomIndex = centerElement + 1;
//   setTimeout(() => {
//     circle[centerElement].classList.remove("active");
//   }, intervalTime);
// };

// const RunCenterPattern = () => {
//   intervel = setInterval(() => {
//     if (flag) {
//       activateCenterCircle(index);
//       index >= rowInput.value ? (index = 1) : index++;
//     } else {
//       clearInterval(intervel);
//       // activateCircle(i);
//       activeSingleLastCircle(index, randomIndex);
//       flag = true;
//     }
//   }, intervalTime);
// };

// /// BORDER ///

// const activeBorderLastCircle = (row) => {
//   const AllCircle = document.querySelectorAll(".circle");
//   AllCircle.forEach((span) => span.classList.remove("active"));
//   const circle = document.querySelectorAll(`.circle[id='${row}']`);
//   circle[0].classList.add("active");
//   circle[circle.length - 1].classList.add("active");
//   runninng = 0;
//   index = row;
// };

// const activateBorderCircle = (id) => {
//   const circle = document.querySelectorAll(`.circle[id='${id}']`);
//   const lastindex = circle.length - 1;
//   circle[0].classList.add("active");
//   circle[lastindex].classList.add("active");
//   setTimeout(() => {
//     circle[0].classList.remove("active");
//     circle[lastindex].classList.remove("active");
//   }, intervalTime);
// };

// const RunBorderPattern = () => {
//   intervel = setInterval(() => {
//     if (flag) {
//       activateBorderCircle(index);
//       index >= rowInput.value ? (index = 1) : index++;
//     } else {
//       clearInterval(intervel);
//       // activateCircle(i);
//       activeBorderLastCircle(index);
//       flag = true;
//     }
//   }, intervalTime);
// };

// /// BORDER CIRCLING ///

// const show = (circle) => {
//   circle.classList.add("active");

//   setTimeout(() => {
//     circle.classList.remove("active");
//   }, intervalTime);
// };

// const activateLastRow = (row) => {
//   const circle = document.querySelectorAll(`.circle[id='${row}']`);
//   let length = circle.length - 1;

//   circle.forEach((span) => show(span));
// };

// const activateSingleBorder = (row, isPositive) => {
//   // console.log(row);

//   const circle = document.querySelectorAll(`.circle[id='${row}']`);
//   // console.log(circle.length);
//   // console.log(row);
//   // console.log(row);

//   // if (row === rowInput.value) {
//   //   activateLastRow(row);
//   // }

//   const activeIndex = isPositive ? circle.length - 1 : 0;
//   // console.log(activeIndex);

//   // console.log(`${activeIndex} - ${circle[activeIndex]}`);

//   circle[activeIndex].classList.add("active");

//   setTimeout(() => {
//     circle[activeIndex].classList.remove("active");
//   }, intervalTime);
// };

// const RunBorderCirclePattern = () => {
//   let isPositive = true;
//   let isLastElement = false;
//   intervel = setInterval(() => {
//     if (flag) {
//       console.log(index);

//       if (index === +rowInput.value) {
//         isLastElement = true;
//         activateLastRow(index);
//       } else {
//         activateSingleBorder(index, isPositive);
//       }
//       if (isPositive) {
//         index++;
//         isPositive = index >= rowInput.value ? false : true;
//       } else {
//         index--;
//         isPositive = index <= 1 ? true : false;
//       }
//     } else {
//       clearInterval(intervel);
//       // activateCircle(i);
//       activeBorderLastCircle(index);
//       flag = true;
//     }
//   }, intervalTime);
// };

// /// EVENT HANDLERS ///

// let intervalTime = +delayInput.value;

// ClearBtn.addEventListener("click", (e) => {
//   ClearAll();
// });

// RestartBtn.addEventListener("click", (e) => {
//   RestartPattern();
// });

// drawBtn.addEventListener("click", (e) => {
//   outputContainer.innerHTML = "";
//   displayCircle(rowInput.value <= 20 && rowInput.value);
// });

// stopBtn.addEventListener("click", (e) => {
//   flag = false;
// });

// delayInput.addEventListener("change", (e) => {
//   intervalTime = delayInput.value;
// });

// startBtn.addEventListener("click", (e) => {
//   runninng = runninng + 1;

//   if (rowInput.value > 1 && runninng === 1) {
//     if (SelectedPattern === "linear") {
//       RunPattern();
//     } else if (SelectedPattern === "border") {
//       RunBorderPattern();
//     } else if (SelectedPattern === "center") {
//       RunCenterPattern();
//     } else if (SelectedPattern === "random") {
//       RunRandomPattern();
//     } else if (SelectedPattern === "border-circle") {
//       RunBorderCirclePattern();
//     }
//   }
// });

// patternCards.forEach((card) => {
//   card.addEventListener("click", (e) => {
//     ClearAll();
//     SelectedPattern = card.dataset.pattern;
//     SelectCard(card);
//   });
// });

