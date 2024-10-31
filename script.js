const numberDraw = document.getElementById("content-form");
const numberDrawResults = document.getElementById("div-result");

const drawButton = document.getElementById("btn-draw");
const drawButtonAgain = document.getElementById("btn-draw-again");
const drawNumbersContainer = document.getElementById("draw-numbers-container");


const numbersQuantity = document.getElementById("numbers-quantity");
const minNumber = document.getElementById("min-number")
const maxNumber = document.getElementById("max-number")


numbersQuantity.oninput = () => {
  const value = numbersQuantity.value.replace(/[^0-9]/g, '')
  numbersQuantity.value = value
}
console.log("numbersQuantity", numbersQuantity.value)


minNumber.oninput = () => {
  const value = minNumber.value.replace(/[^0-9]/g, '')
  minNumber.value = value
}

maxNumber.oninput = () => {
  const value = maxNumber.value.replace(/[^0-9]/g, '')
  maxNumber.value = value
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function buildRandomNumber(min, max, isNotRepeatNumber, uniqueNumbers) {
  const numberContainer = document.createElement("div");
  numberContainer.classList.add("number-container");
  const h3 = document.createElement("h3");


  let randomNumber;
  if (isNotRepeatNumber) {
    let isNotNewNumber;
    do {
      randomNumber = getRandomIntInclusive(min, max);
      isNotNewNumber = uniqueNumbers.includes(randomNumber);
    } while (isNotNewNumber);

    uniqueNumbers.push(randomNumber);
  } else {
    randomNumber = getRandomIntInclusive(min, max);
  }

  console.log(randomNumber)

  h3.innerText = String(randomNumber);
  numberContainer.appendChild(h3);
  drawNumbersContainer.appendChild(numberContainer);
}

function changeQuantityOfDraws() {
  const resultNumber = document.getElementById("result-number");
  resultNumber.innerText = Number(resultNumber.innerText) + 1;
}

function drawNumbers() {
  changeQuantityOfDraws();

  // let numbersQuantity = document.getElementById("numbers-quantity").value.replace(/[^0-9]/g, '');
  // const minNumber = Number(document.getElementById("min-number").value.replace(/[^0-9]/g, ''));
  // const maxNumber = Number(document.getElementById("max-number").value.replace(/[^0-9]/g, ''));

  const uniqueNumbers = [];
  const isNotRepeatNumber = document.getElementById("switch").checked;

  if (isNotRepeatNumber && numbersQuantity > maxNumber) {
    numbersQuantity.value = maxNumber.value;
  }

  buildRandomNumber(minNumber.value, maxNumber.value, isNotRepeatNumber, uniqueNumbers);

  console.log(minNumber.value, maxNumber.value, isNotRepeatNumber, uniqueNumbers)

  const delayInMilliseconds = 2500; // 2.5 seconds
  console.log("minNumber", minNumber)
  console.log("maxNumber", maxNumber)
  for (let index = 2; index <= numbersQuantity.value; index++) {

    setTimeout(
      () =>
        buildRandomNumber(
          minNumber.value,
          maxNumber.value,
          isNotRepeatNumber,
          uniqueNumbers
        ),
      delayInMilliseconds * (index - 1)
    );
  }

  setTimeout(
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    () => (drawButtonAgain.style.display = "flex"),
    numbersQuantity.value * delayInMilliseconds
  );
}

drawButton.onclick = (event) => {
  event.preventDefault();

  numberDraw.style.display = "none";
  numberDrawResults.style.display = "flex";

  drawNumbers();
};

drawButtonAgain.onclick = (event) => {
  event.preventDefault();

  drawButtonAgain.style.display = "none";
  drawButtonAgain.style.opacity = 0;
  drawNumbersContainer.innerHTML = "";
  drawNumbers();
};
