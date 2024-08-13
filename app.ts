/// DOM ELEMENT ///

const DelayInput = document.querySelector(".delay") as HTMLInputElement;
const RowInput = document.querySelector(".row-input") as HTMLInputElement;

const DrawButton: HTMLButtonElement = document.querySelector(
  ".draw"
) as HTMLButtonElement;
const StartButton: HTMLButtonElement = document.querySelector(
  ".start"
) as HTMLButtonElement;
const StopButton: HTMLButtonElement = document.querySelector(
  ".stop"
) as HTMLButtonElement;
const RestartButton: HTMLButtonElement = document.querySelector(
  ".restart"
) as HTMLButtonElement;
const ClearButton: HTMLButtonElement = document.querySelector(
  ".clear"
) as HTMLButtonElement;

const OutPutContainer: HTMLDivElement = document.querySelector(
  ".output"
) as HTMLDivElement;
const PatternCards: NodeListOf<HTMLDivElement> =
  document.querySelectorAll(".pattern-card");

/// VARIABLES ///

let SelectedPattern: string | undefined = "linear";

let Index: number = 1;
let Flag: boolean = true;
let Running: number = 0;
let SelectedId: number = 1;
let Intervel: number;
let RandomIndex: number;
let IntervelTime: number = +DelayInput.value;

/// FUNCTIONS ///

const SelectCard = (selectedcard: HTMLDivElement) => {
  PatternCards.forEach((card) => {
    card.classList.remove("selected-pattern-card");
  });
  selectedcard.classList.add("selected-pattern-card");
};

const displayCircle = (num: number) => {
  let htmlArray: string[] = [];
  for (let i = 1; i <= num; i++) {
    const numberOfCircle: number = 2 * (i - 1) + 1;

    for (let j = 1; j <= numberOfCircle; j++) {
      htmlArray.push(`<span class="circle" id='${i}'></span>`);
    }
    const rowHtml: string = `<span class="row">${htmlArray.join(" ")}</span>`;
    OutPutContainer.insertAdjacentHTML("beforeend", rowHtml);
    htmlArray = [];
  }
};

/// COMMON ///

const RestartPattern = () => {
  Index = 1;
  IntervelTime = +DelayInput.value;
  Running = 0;
};

const ClearAll = () => {
  Index = 1;
  Flag = true;
  Running = 0;
  SelectedId = 1;
  RowInput.value = "0";
  OutPutContainer.innerHTML = "";
  clearInterval(Intervel);
};

const clearData = () => {
  const AllCircle: NodeListOf<HTMLSpanElement> =
    document.querySelectorAll(".circle");
  AllCircle.forEach((span) => span.classList.remove("active"));
};

const fetchCircles = (row: number) => {
  return document.querySelectorAll(`.circle[id='${row}']`);
};

/// LINEAR ///

const activeLastCircle = (id: number) => {
  clearData();
  const circle: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
    `.circle[id='${id}']`
  );
  circle.forEach((span) => span.classList.add("active"));
  Running = 0;
  Index = id;
};

const activeCircle = (id: number) => {
  const circles: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
    `.circle[id='${id}']`
  );
  circles.forEach((circle) => {
    circle.classList.add("active");
    setTimeout(() => {
      circle.classList.remove("active");
    }, +DelayInput.value);
  });
};

const RunPattern = () => {
  Intervel = setInterval(() => {
    if (Flag) {
      activeCircle(Index);
      Index >= +RowInput.value ? (Index = 1) : Index++;
    } else {
      clearInterval(Intervel);
      activeLastCircle(Index);
      Flag = true;
    }
  }, IntervelTime);
};

/// RANDOM ///

const activeSingleLastCircle = (row: number, id: number) => {
  clearData();
  const circles: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
    `.circle[id='${row}']`
  );
  circles[id].classList.add("active");
  Running = 0;
  Index = row;
};

const activateRandomCircle = (id: number) => {
  clearData();
  const circles: NodeListOf<Element> = fetchCircles(id);
  const length: number = circles.length;
  const randomElementIndex = Math.floor(Math.random() * length);
  randomElementIndex && circles[randomElementIndex].classList.add("active");
  RandomIndex = randomElementIndex;
  setTimeout(() => {
    randomElementIndex &&
      circles[randomElementIndex].classList.remove("active");
  }, IntervelTime);
};

const RunRandomPattern = () => {
  console.log("running random pattern");

  Intervel = setInterval(() => {
    if (Flag) {
      activateRandomCircle(Index);
      Index = Math.floor(Math.random() * +RowInput.value) + 1;
    } else {
      clearInterval(Intervel);
      activeSingleLastCircle(Index, RandomIndex);
      Flag = true;
    }
  }, IntervelTime);
};

/// CENTER ///

const activateCenterCircle = (id: number) => {
  const circles: NodeListOf<Element> = fetchCircles(id);
  const centerElementIndex: number = Math.floor(circles.length / 2);
  circles[centerElementIndex].classList.add("active");
  RandomIndex = centerElementIndex + 1;
  setTimeout(() => {
    circles[centerElementIndex].classList.remove("active");
  }, IntervelTime);
};

const RunCenterPattern = () => {
  console.log("running center pattern");
  Intervel = setInterval(() => {
    if (Flag) {
      activateCenterCircle(Index);
      Index >= +RowInput.value ? (Index = 1) : Index++;
    } else {
      clearInterval(Intervel);
      activeSingleLastCircle(Index, RandomIndex);
      Flag = true;
    }
  }, IntervelTime);
};

/// BORDER ///

const activateBorderLastCircle = (row: number) => {
  clearData();
  const circles: NodeListOf<Element> = fetchCircles(row);
  circles[0].classList.add("active");
  circles[circles.length - 1].classList.add("active");
  Running = 0;
  Index = row;
};

const activateBorderCircle = (id: number) => {
  const circles: NodeListOf<Element> = fetchCircles(id);
  const lastIndex = circles.length - 1;
  circles[0].classList.add("active");
  circles[lastIndex].classList.add("active");
  setTimeout(() => {
    circles[0].classList.remove("active");
    circles[lastIndex].classList.remove("active");
  }, IntervelTime);
};

const RunBorderPattern = () => {
  console.log("running border pattern");
  Intervel = setInterval(() => {
    if (Flag) {
      activateBorderCircle(Index);
      Index >= +RowInput.value ? (Index = 1) : Index++;
    } else {
      clearInterval(Intervel);
      activateBorderLastCircle(Index);
      Flag = true;
    }
  }, IntervelTime);
};

/// BORDER CIRCLEING ///

const activateBorderCircleLastCircle = (
  row: number,
  isPositive: boolean,
  isLastElement: boolean
) => {
  clearData();
  const circles: NodeListOf<Element> = fetchCircles(row);
  if (isPositive) {
    circles[circles.length - 1].classList.add("active");
  } else {
    circles[0].classList.add("active");
  }
  if (isLastElement) {
    circles.forEach((circles) => circles.classList.add("active"));
  }
  Running = 0;
  Index = row;
};

const show = (circle: Element) => {
  circle.classList.add("active");

  setTimeout(() => {
    circle.classList.remove("active");
  }, IntervelTime);
};

const activateLastRow = (row: number) => {
  const circles: NodeListOf<Element> = fetchCircles(row);
  const length: number = circles.length - 1;
  circles.forEach((circle) => show(circle));
};

const activateSingleBorder = (row, isPositive) => {
  const circles: NodeListOf<Element> = fetchCircles(row);

  if (row === RowInput.value) {
    activateLastRow(row);
  }

  const activeIndex = isPositive ? circles.length - 1 : 0;
  circles[activeIndex].classList.add("active");

  setTimeout(() => {
    circles[activeIndex].classList.remove("active");
  }, IntervelTime);
};

const RunBorderCirclePattern = () => {
  console.log("running border rounding");
  let isPositive = true;
  let isLastElement = false;
  Intervel = setInterval(() => {
    if (Flag) {
      if (Index === +RowInput.value) {
        isLastElement = true;
        activateLastRow(Index);
      } else {
        activateSingleBorder(Index, isPositive);
      }
      if (isPositive) {
        Index++;
        isPositive = Index >= +RowInput.value ? false : true;
      } else {
        Index--;
        isPositive = Index <= 1 ? true : false;
      }
    } else {
      clearInterval(Intervel);
      // activateCircle(i);
      activateBorderCircleLastCircle(Index, isPositive, isLastElement);
      Flag = true;
    }
  }, IntervelTime);
};

/// EVENT HANDLERS ///

ClearButton.addEventListener("click", (e) => {
  ClearAll();
});

DelayInput.addEventListener("change", (e) => {
  IntervelTime = +DelayInput.value;
});

DrawButton.addEventListener("click", (e) => {
  OutPutContainer.innerHTML = "";
  displayCircle(+RowInput.value);
});

RestartButton.addEventListener("click", (e) => {
  RestartPattern();
});

StartButton.addEventListener("click", (e) => {
  Running++;
  if (+RowInput.value > 1 && Running === 1) {
    if (SelectedPattern === "linear") {
      RunPattern();
    } else if (SelectedPattern === "border") {
      //
      RunBorderPattern();
      console.log(SelectedPattern);
    } else if (SelectedPattern === "center") {
      //
      RunCenterPattern();
      console.log(SelectedPattern);
    } else if (SelectedPattern === "random") {
      RunRandomPattern();
    } else if (SelectedPattern === "border-circle") {
      console.log(SelectedPattern);
      RunBorderCirclePattern();
      //
    }
  }
});

StopButton.addEventListener("click", (e) => {
  Flag = false;
});

PatternCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    ClearAll();
    SelectedPattern = card.dataset.pattern;
    SelectCard(card);
  });
});
