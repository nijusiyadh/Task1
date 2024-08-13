/// DOM ELEMENT ///
var DelayInput = document.querySelector(".delay");
var RowInput = document.querySelector(".row-input");
var DrawButton = document.querySelector(".draw");
var StartButton = document.querySelector(".start");
var StopButton = document.querySelector(".stop");
var RestartButton = document.querySelector(".restart");
var ClearButton = document.querySelector(".clear");
var OutPutContainer = document.querySelector(".output");
var PatternCards = document.querySelectorAll(".pattern-card");
/// VARIABLES ///
var SelectedPattern = "linear";
var Index = 1;
var Flag = true;
var Running = 0;
var SelectedId = 1;
var Intervel;
var RandomIndex;
var IntervelTime = +DelayInput.value;
/// FUNCTIONS ///
var SelectCard = function (selectedcard) {
    PatternCards.forEach(function (card) {
        card.classList.remove("selected-pattern-card");
    });
    selectedcard.classList.add("selected-pattern-card");
};
var displayCircle = function (num) {
    var htmlArray = [];
    for (var i = 1; i <= num; i++) {
        var numberOfCircle = 2 * (i - 1) + 1;
        for (var j = 1; j <= numberOfCircle; j++) {
            htmlArray.push("<span class=\"circle\" id='".concat(i, "'></span>"));
        }
        var rowHtml = "<span class=\"row\">".concat(htmlArray.join(" "), "</span>");
        OutPutContainer.insertAdjacentHTML("beforeend", rowHtml);
        htmlArray = [];
    }
};
/// COMMON ///
var RestartPattern = function () {
    Index = 1;
    IntervelTime = +DelayInput.value;
    //   activeLastCircle(0);
    Running = 0;
};
var ClearAll = function () {
    Index = 1;
    Flag = true;
    Running = 0;
    SelectedId = 1;
    RowInput.value = "0";
    OutPutContainer.innerHTML = "";
    clearInterval(Intervel);
};
var clearData = function () {
    var AllCircle = document.querySelectorAll(".circle");
    AllCircle.forEach(function (span) { return span.classList.remove("active"); });
};
var fetchCircles = function (row) {
    return document.querySelectorAll(".circle[id='".concat(row, "']"));
};
/// LINEAR ///
var activeLastCircle = function (id) {
    clearData();
    var circle = document.querySelectorAll(".circle[id='".concat(id, "']"));
    circle.forEach(function (span) { return span.classList.add("active"); });
    Running = 0;
    Index = id;
};
var activeCircle = function (id) {
    var circles = document.querySelectorAll(".circle[id='".concat(id, "']"));
    circles.forEach(function (circle) {
        circle.classList.add("active");
        setTimeout(function () {
            circle.classList.remove("active");
        }, +DelayInput.value);
    });
};
var RunPattern = function () {
    Intervel = setInterval(function () {
        if (Flag) {
            activeCircle(Index);
            Index >= +RowInput.value ? (Index = 1) : Index++;
        }
        else {
            clearInterval(Intervel);
            activeLastCircle(Index);
            Flag = true;
        }
    }, IntervelTime);
};
/// RANDOM ///
var activeSingleLastCircle = function (row, id) {
    clearData();
    var circles = document.querySelectorAll(".circle[id='".concat(row, "']"));
    circles[id].classList.add("active");
    Running = 0;
    Index = row;
};
var activateRandomCircle = function (id) {
    clearData();
    var circles = fetchCircles(id);
    var length = circles.length;
    var randomElementIndex = Math.floor(Math.random() * length);
    randomElementIndex && circles[randomElementIndex].classList.add("active");
    RandomIndex = randomElementIndex;
    setTimeout(function () {
        randomElementIndex &&
            circles[randomElementIndex].classList.remove("active");
    }, IntervelTime);
};
var RunRandomPattern = function () {
    console.log("running random pattern");
    Intervel = setInterval(function () {
        if (Flag) {
            activateRandomCircle(Index);
            Index = Math.floor(Math.random() * +RowInput.value) + 1;
        }
        else {
            clearInterval(Intervel);
            activeSingleLastCircle(Index, RandomIndex);
            Flag = true;
        }
    }, IntervelTime);
};
/// CENTER ///
var activateCenterCircle = function (id) {
    var circles = fetchCircles(id);
    var centerElementIndex = Math.floor(circles.length / 2);
    circles[centerElementIndex].classList.add("active");
    RandomIndex = centerElementIndex + 1;
    setTimeout(function () {
        circles[centerElementIndex].classList.remove("active");
    }, IntervelTime);
};
var RunCenterPattern = function () {
    console.log("running center pattern");
    Intervel = setInterval(function () {
        if (Flag) {
            activateCenterCircle(Index);
            Index >= +RowInput.value ? (Index = 1) : Index++;
        }
        else {
            clearInterval(Intervel);
            activeSingleLastCircle(Index, RandomIndex);
            Flag = true;
        }
    }, IntervelTime);
};
/// BORDER ///
var activateBorderLastCircle = function (row) {
    clearData();
    var circles = fetchCircles(row);
    circles[0].classList.add("active");
    circles[circles.length - 1].classList.add("active");
    Running = 0;
    Index = row;
};
var activateBorderCircle = function (id) {
    var circles = fetchCircles(id);
    var lastIndex = circles.length - 1;
    circles[0].classList.add("active");
    circles[lastIndex].classList.add("active");
    setTimeout(function () {
        circles[0].classList.remove("active");
        circles[lastIndex].classList.remove("active");
    }, IntervelTime);
};
var RunBorderPattern = function () {
    console.log("running border pattern");
    Intervel = setInterval(function () {
        if (Flag) {
            activateBorderCircle(Index);
            Index >= +RowInput.value ? (Index = 1) : Index++;
        }
        else {
            clearInterval(Intervel);
            activateBorderLastCircle(Index);
            Flag = true;
        }
    }, IntervelTime);
};
/// BORDER CIRCLEING ///
var activateBorderCircleLastCircle = function (row, isPositive, isLastElement) {
    clearData();
    var circles = fetchCircles(row);
    if (isPositive) {
        circles[circles.length - 1].classList.add("active");
    }
    else {
        circles[0].classList.add("active");
    }
    if (isLastElement) {
        circles.forEach(function (circles) { return circles.classList.add("active"); });
    }
    Running = 0;
    Index = row;
};
var show = function (circle) {
    circle.classList.add("active");
    setTimeout(function () {
        circle.classList.remove("active");
    }, IntervelTime);
};
var activateLastRow = function (row) {
    var circles = fetchCircles(row);
    var length = circles.length - 1;
    circles.forEach(function (circle) { return show(circle); });
};
var activateSingleBorder = function (row, isPositive) {
    var circles = fetchCircles(row);
    if (row === RowInput.value) {
        activateLastRow(row);
    }
    var activeIndex = isPositive ? circles.length - 1 : 0;
    circles[activeIndex].classList.add("active");
    setTimeout(function () {
        circles[activeIndex].classList.remove("active");
    }, IntervelTime);
};
var RunBorderCirclePattern = function () {
    console.log("running border rounding");
    var isPositive = true;
    var isLastElement = false;
    Intervel = setInterval(function () {
        if (Flag) {
            if (Index === +RowInput.value) {
                isLastElement = true;
                activateLastRow(Index);
            }
            else {
                activateSingleBorder(Index, isPositive);
            }
            if (isPositive) {
                Index++;
                isPositive = Index >= +RowInput.value ? false : true;
            }
            else {
                Index--;
                isPositive = Index <= 1 ? true : false;
            }
        }
        else {
            clearInterval(Intervel);
            // activateCircle(i);
            activateBorderCircleLastCircle(Index, isPositive, isLastElement);
            Flag = true;
        }
    }, IntervelTime);
};
/// EVENT HANDLERS ///
ClearButton.addEventListener("click", function (e) {
    ClearAll();
});
DelayInput.addEventListener("change", function (e) {
    IntervelTime = +DelayInput.value;
});
DrawButton.addEventListener("click", function (e) {
    OutPutContainer.innerHTML = "";
    displayCircle(+RowInput.value);
});
RestartButton.addEventListener("click", function (e) {
    RestartPattern();
});
StartButton.addEventListener("click", function (e) {
    Running++;
    if (+RowInput.value > 1 && Running === 1) {
        if (SelectedPattern === "linear") {
            RunPattern();
        }
        else if (SelectedPattern === "border") {
            //
            RunBorderPattern();
            console.log(SelectedPattern);
        }
        else if (SelectedPattern === "center") {
            //
            RunCenterPattern();
            console.log(SelectedPattern);
        }
        else if (SelectedPattern === "random") {
            RunRandomPattern();
        }
        else if (SelectedPattern === "border-circle") {
            console.log(SelectedPattern);
            RunBorderCirclePattern();
            //
        }
    }
});
StopButton.addEventListener("click", function (e) {
    Flag = false;
});
PatternCards.forEach(function (card) {
    card.addEventListener("click", function (e) {
        ClearAll();
        SelectedPattern = card.dataset.pattern;
        SelectCard(card);
    });
});
