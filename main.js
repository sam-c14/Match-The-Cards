const imgCols = document.querySelectorAll(".img-cols");
const imgArray = [
  "boot-image.jpg",
  "css-image.png",
  "git-image.png",
  "html-image.png",
  "js-image.png",
];
const imgMap = new Map();
const arr2 = [5, 6, 7, 8, 9];
const arr1 = shuffle(imgArray);
const arrEl = shuffle(arr2);
let seconds = 0;
let minutes = 5;
let timeInterval = "";

imgCols.forEach((el) => {
  arr1.forEach((img, index) => {
    if (parseInt(el.dataset.id) == index) imgMap.set(index, img);
    if (parseInt(el.dataset.id) > 4) {
      arrEl.forEach((number, ind) => {
        number == parseInt(el.dataset.id)
          ? imgMap.set(parseInt(el.dataset.id), imgArray[ind])
          : "";
      });
    }
  });
});
let count = 0;
imgCols.forEach((el) => {
  el.addEventListener("click", (element) => {
    el.style.background = `url("./images/${imgMap.get(
      parseInt(element.target.dataset.id)
    )}") center/cover no-repeat`;
    if (el.classList.contains("hide")) el.classList.remove("hide");
    el.classList.add("clicked");
    count++;
  });
});

imgCols.forEach((element) => {
  element.addEventListener("click", () => {
    countTime(false);
    if (count === 2) {
      let clickedEl = [];
      imgCols.forEach((el2) => {
        if (el2.classList.contains("clicked")) clickedEl.push(el2);
      });
      if (
        imgMap.get(parseInt(clickedEl[0].dataset.id)) ===
        imgMap.get(parseInt(clickedEl[1].dataset.id))
      ) {
        clickedEl[0].classList.remove("clicked");
        clickedEl[1].classList.remove("clicked");
        clickedEl[0].classList.add("achieved");
        clickedEl[1].classList.add("achieved");
        checkWinStatus(0, minutes, seconds);
      } else {
        setTimeout(function () {
          clickedEl[0].classList.remove("clicked");
          clickedEl[1].classList.remove("clicked");
          clickedEl[0].classList.add("hide");
          clickedEl[1].classList.add("hide");
        }, 500);
      }
      count = 0;
    }
  });
});
function countTime(gameOver) {
  const second = document.querySelector(".seconds");
  const minute = document.querySelector(".minute");
  const counter = document.querySelector(".counter");
  if (!gameOver) {
    if (timeInterval == "") {
      timeInterval = setInterval(function () {
        minutes === 0 && seconds === 1 ? timeUp(minutes, seconds) : "";
        if (seconds == 0) {
          seconds = 60;
          minutes--;
          minute.textContent = minutes;
        }
        checkTime();
        minutes == 2 ? counter.classList.add("red") : "";
        seconds--;
        seconds > 10
          ? (second.textContent = seconds)
          : (second.textContent = "0" + seconds);
      }, 100);
    }
  } else {
    clearInterval(timeInterval);
  }
}
function checkWinStatus(count2 = 0, minutes, seconds) {
  const winModal = document.querySelector(".win-modal");
  const gameTime = document.querySelector(".game-time");
  const yesBtn = document.querySelector(".yesBtn");
  const noBtn = document.querySelector(".noBtn");
  const load = document.querySelector(".load");
  const userTime = document.querySelector(".user-time");
  imgCols.forEach((element) => {
    element.classList.contains("achieved") ? count2++ : "";
  });
  if (count2 == 10 && minutes == 0 && seconds === 1) {
    countTime(true);
    userTime.innerHTML = "<h2>Sorry, You ran out of time!!</h2>";
    winModal.style.display = "block";
  } else if (count2 == 10 && minutes >= 0 && seconds > 1) {
    countTime(true);
    winModal.style.display = "block";
    gameTime.textContent = `${minutes} minutes ${seconds} seconds`;
  }
  yesBtn.addEventListener("click", () => {
    yesBtn.setAttribute("disabled", "true");
    noBtn.setAttribute("disabled", "true");
    load.style.display = "block";
    setTimeout(function () {
      load.style.display = "none";
      document.location.reload();
    }, 2000);
  });
  noBtn.addEventListener("click", () => {
    yesBtn.setAttribute("disabled", "true");
    noBtn.setAttribute("disabled", "true");
    load.style.display = "block";
    const userInput = document.querySelector(".user-input");
    setTimeout(function () {
      load.style.display = "none";
      userInput.innerHTML = "<h1>Thanks for Playing!!!</h1>";
    }, 2000);
  });
}
function welcomeUser() {
  const welcomeMessageContainer = document.querySelector(
    ".welcome-message-container"
  );
  const time5 = document.querySelector(".time-5");
  const time10 = document.querySelector(".time-10");
  const time15 = document.querySelector(".time-15");
  welcomeMessageContainer.style.display = "flex";
  time5.addEventListener("click", () => {
    seconds = 0;
    minutes = 5;
    welcomeMessageContainer.style.display = "none";
  });
  time10.addEventListener("click", () => {
    seconds = 0;
    minutes = 10;
    welcomeMessageContainer.style.display = "none";
  });
  time15.addEventListener("click", () => {
    seconds = 0;
    minutes = 15;
    welcomeMessageContainer.style.display = "none";
  });
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let randNum = Math.floor(Math.random() * arr.length);
    let temp = arr[i];
    arr[i] = arr[randNum];
    arr[randNum] = temp;
  }
  return arr;
}
function timeUp(minutes, seconds) {
  const counter = document.querySelector(".counter");
  imgCols.forEach((el) => {
    if (el.classList.contains("achieved")) el.classList.remove("achieved");
    if (!el.classList.contains("clicked")) {
      el.style.background = `url("./images/${imgMap.get(
        parseInt(el.dataset.id)
      )}") center/cover no-repeat`;
      el.classList.add("clicked");
    }
  });
  counter.classList.remove("red");
  checkWinStatus(10, minutes, seconds);
}
function checkTime() {
  if (minutes === 0 && seconds === 1) {
    clearInterval(timeInterval);
  }
}
window.onload = welcomeUser();
