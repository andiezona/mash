// Required for async functions
import 'regenerator-runtime/runtime';

//GAME RULES POPUP ON BUTTON CLICK//
const rulesPopup = document.querySelector('.rulesPopup');
const rulesBtn = document.querySelector('.rulesBtn');
const closeRules = document.querySelector('.close');

rulesBtn.addEventListener('click', function () {
  rulesPopup.style.display = 'block';
});

closeRules.addEventListener('click', function () {
  rulesPopup.style.display = 'none';
});

window.addEventListener('click', function (event) {
  if (event.target == rulesPopup) {
    rulesPopup.style.display = 'none';
  }
});

//GENERATE MAGIC NUMBER//
const numArray = [3, 4, 6, 7, 8, 9, 11, 12, 13];
const magicNumber = numArray[Math.floor(Math.random() * numArray.length)];
const startBtn = document.querySelector('.startBtn');
const form = document.getElementById('form');
const mainText = document.querySelector('.mainText');

//GET DATA FROM INPUTS & MASH LETTERS//
let dataArr = [];
let inputValues = document.querySelectorAll('input');
let mashValues = document.querySelectorAll('.home');

startBtn.addEventListener('click', function () {
  mashValues.forEach(function (letter) {
    let home = '';
    switch (letter.innerText) {
      case 'M':
        home = 'mansion';
        break;
      case 'A':
        home = 'apartment';
        break;
      case 'S':
        home = 'shack';
        break;
      case 'H':
        home = 'house';
        break;
      default:
        break;
    }

    dataArr.push({
      value: home,
      node: letter, //keeping reference to DOM node
      category: 'home',
      outofplay: false,
    });
  });
  inputValues.forEach(function (input) {
    dataArr.push({
      value: input.value,
      node: input,
      category: input.name,
      outofplay: false,
    });
  });

  mainText.innerHTML = `Your magic number is ${magicNumber} !`;
  startBtn.disabled = true;
  console.log(dataArr);
  playGame();
});

// FUTURE STORY POPUP //
let future = {};

const futurePopup = document.querySelector('.future-popup');
const playAgainBtn = document.querySelector('.play-again-btn');
let futureSpouse = document.querySelector('.future-spouse');
let futureHoneymoon = document.querySelector('.future-honeymoon');
let futureHome = document.querySelector('.future-home');
let futureCity = document.querySelector('.future-city');
let futureYourJob = document.querySelector('.future-yourjob');
let futureSpouseJob = document.querySelector('.future-spousejob');
let futureKids = document.querySelector('.future-kids');
let futurePet = document.querySelector('.future-pet');
let futureVehicle = document.querySelector('.future-vehicle');

function displayFuture() {
  futureSpouse.innerText = ` ${future.spouse}`;
  futureHoneymoon.innerText = ` ${future.honeymoon}`;
  futureHome.innerText = ` ${future.home}`;
  futureCity.innerText = ` ${future.city}`;
  futureYourJob.innerText = ` ${future.yourjob}`;
  futureSpouseJob.innerText = ` ${future.spousejob}`;
  futureKids.innerText = ` ${future.kids}`;
  futurePet.innerText = ` ${future.pet}`;
  futureVehicle.innerText = ` ${future.vehicle}`;

  futurePopup.style.display = 'block';

  playAgainBtn.addEventListener('click', function () {
    futurePopup.style.display = 'none';
    window.location.reload();
  });
}

//PLAY THE GAME//
function sleep(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

async function playGame() {
  let i = 0; //index for object being evalated
  let j = 0; //magic number counter
  let stillPlaying = true;

  while (stillPlaying) {
    dataArr[i].node.classList.add('counting');
    await sleep(150);

    //iterate/loop through array continuously using the magic number
    //when magic # is reached check the following:
    if (dataArr.every((obj) => obj.outofplay === true)) {
      //if EVERY element in the data array has the outofplay: true, end the game & show future
      stillPlaying = false;
      displayFuture();
    }

    if (dataArr[i].outofplay === false) {
      j += 1;
      if (j >= magicNumber) {
        dataArr[i].outofplay = true;
        await sleep(500);
        dataArr[i].node.style.textDecoration = 'line-through';
        dataArr[i].node.style.textDecorationColor = 'hotpink';
        //if object is still in play: change to outofplay:true,
        //add text-decoration:linethrough to input value

        let sameCategory = dataArr.filter(function (obj) {
          return obj.category == dataArr[i].category;
        });
        //check all objects within the same category

        let numOfOutOfPlay = sameCategory.filter(function (obj) {
          return obj.outofplay === false;
        });

        if (numOfOutOfPlay.length === 1) {
          numOfOutOfPlay[0].outofplay = true;
          await sleep(500);
          numOfOutOfPlay[0].node.style.textDecoration = 'underline';
          numOfOutOfPlay[0].node.style.textDecorationStyle = 'double';
          numOfOutOfPlay[0].node.style.textDecorationColor = 'mediumturquoise';
          future[numOfOutOfPlay[0].category] = numOfOutOfPlay[0].value;
          console.log(future);
        }

        //if there is only one object remaining with outofplay:false change outofplay:true
        //underline the remaining answer
        j = 0;
        //reset magic number counter
      }
    }
    dataArr[i].node.classList.remove('counting');

    if (i >= dataArr.length - 1) {
      i = 0;
    } else {
      i += 1;
    }
  }
}

function testInputs() {
  let inputValues = document.querySelectorAll('.input');
  inputValues.forEach(function (input) {
    input.value = 'Phil';
  });
}
