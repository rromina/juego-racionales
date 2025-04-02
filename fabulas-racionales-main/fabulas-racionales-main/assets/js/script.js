// Función para generar un número aleatorio entre min y max, inclusive
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para generar un desafío de simplificación de fracciones
function generateSimplificationChallenge() {
  let numerator, denominator, originalNumerator, originalDenominator, gcdValue;

  do {
    // Generar dos números aleatorios para numerator y denominator
    numerator = getRandomInt(2, 20); // Empezamos en 2 para asegurar numerator < denominator
    denominator = getRandomInt(2, 20);

    // Guardar los valores originales para comparación posterior
    originalNumerator = numerator;
    originalDenominator = denominator;

    // Calcular el máximo común divisor (MCD) usando el algoritmo de Euclides
    gcdValue = gcd(numerator, denominator);

    // Simplificar la fracción dividiendo por el MCD
    numerator /= gcdValue;
    denominator /= gcdValue;

    // Repetir si la fracción no es simplificable o si ya está en su forma más simple
  } while (
    gcdValue === 1 ||
    (numerator === originalNumerator && denominator === originalDenominator)
  );

  return {
    challenge: `Simplifica la fracción: ${originalNumerator}/${originalDenominator}`,
    answer: `Resultado: ${numerator}/${denominator}`,
  };
}

// Función para calcular el máximo común divisor (GCD) usando el algoritmo de Euclides
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

// Función para generar un desafío de suma de fracciones
function generateSumChallenge() {
  let num1 = getRandomInt(1, 10);
  let den1 = getRandomInt(1, 10);
  let num2 = getRandomInt(1, 10);
  let den2 = getRandomInt(1, 10);
  let commonDenominator = den1 * den2;
  let sumNumerator = num1 * den2 + num2 * den1;

  // Calcular el máximo común divisor (MCD) para simplificar la fracción
  let gcdValue = gcd(sumNumerator, commonDenominator);
  let simplifiedNumerator = sumNumerator / gcdValue;
  let simplifiedDenominator = commonDenominator / gcdValue;

  return {
    challenge: `Suma las fracciones: ${num1}/${den1} + ${num2}/${den2}`,
    answer:
      gcdValue === 1
        ? `Resultado: ${sumNumerator}/${commonDenominator}`
        : `Resultado: ${sumNumerator}/${commonDenominator} Versión simplificada: ${simplifiedNumerator}/${simplifiedDenominator}`,
  };
}

// Función para generar un desafío de resta de fracciones
function generateSubtractionChallenge() {
  let num1, den1, num2, den2;

  // Generar las fracciones asegurando que num1/den1 sea mayor que num2/den2
  do {
    num1 = getRandomInt(1, 10);
    den1 = getRandomInt(2, 10); // den1 >= 2 para evitar denominador 1
    num2 = getRandomInt(1, 10);
    den2 = getRandomInt(2, 10); // den2 >= 2 para evitar denominador 1
  } while (num1 / den1 <= num2 / den2); // Asegurar que num1/den1 > num2/den2

  // Calcular la resta de fracciones
  let commonDenominator = den1 * den2;
  let differenceNumerator = num1 * den2 - num2 * den1;

  // Ajustar si el numerador es negativo para mantener la fracción positiva
  if (differenceNumerator < 0) {
    differenceNumerator = -differenceNumerator;
  }

  // Simplificar la fracción resultado usando el máximo común divisor (MCD)
  let gcdValue = gcd(differenceNumerator, commonDenominator);
  let simplifiedNumerator = differenceNumerator / gcdValue;
  let simplifiedDenominator = commonDenominator / gcdValue;

  return {
    challenge: `Resta las fracciones: ${num1}/${den1} - ${num2}/${den2}`,
    answer:
      gcdValue === 1
        ? `Resultado: ${differenceNumerator}/${commonDenominator}`
        : `Resultado: ${differenceNumerator}/${commonDenominator} Versión simplificada: ${simplifiedNumerator}/${simplifiedDenominator}`,
  };
}

// Función para generar un desafío de multiplicación de fracciones
function generateMultiplicationChallenge() {
  let num1 = getRandomInt(1, 10);
  let den1 = getRandomInt(1, 10);
  let num2 = getRandomInt(1, 10);
  let den2 = getRandomInt(1, 10);
  let productNumerator = num1 * num2;
  let productDenominator = den1 * den2;

  // Calcular el máximo común divisor (MCD) para simplificar la fracción
  let gcdValue = gcd(productNumerator, productDenominator);
  let simplifiedNumerator = productNumerator / gcdValue;
  let simplifiedDenominator = productDenominator / gcdValue;

  return {
    challenge: `Multiplica las fracciones: ${num1}/${den1} * ${num2}/${den2}`,
    answer:
      gcdValue === 1
        ? `Resultado: ${productNumerator}/${productDenominator}`
        : `Resultado: ${productNumerator}/${productDenominator} Versión simplificada: ${simplifiedNumerator}/${simplifiedDenominator}`,
  };
}

// Función para mostrar un desafío en la tarjeta
function showChallenge(challengeObj) {
  const cardText = document.getElementById("cardText");
  cardText.textContent = challengeObj.challenge;

  const answerText = document.getElementById("answerText");
  const answer = challengeObj.answer;

  // Expresión regular para dividir la respuesta en respuesta secreta y versión simplificada
  const regex = /Resultado: ([\d\/]+)(?:\s*Versión simplificada: ([\d\/]+))?/;
  const match = answer.match(regex);

  if (match) {
    let html = `Resultado: ${match[1]}`;
    if (match[2]) {
      html += `<br>Versión simplificada: ${match[2]}`;
    }
    answerText.innerHTML = html;
  } else {
    answerText.textContent = answer;
  }

  // Animación de tomar una carta
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.classList.add("draw");
  setTimeout(() => {
    cardContainer.classList.remove("draw");
  }, 500);
}

function loadMode(mode) {
  const container = document.getElementById("app");
  if (mode === "casual") {
    renderCasualMode(container);
  } else if (mode === "aleatorio") {
    renderRandomMode(container);
  }
}

function renderCasualMode(container) {
  container.innerHTML = `
    <h1>Modo Casual</h1>
    <div class="deck-container">
      <button class="deck" id="simplificationDeck">Simplificación</button>
      <button class="deck" id="sumDeck">Suma</button>
      <button class="deck" id="subtractionDeck">Resta</button>
      <button class="deck" id="multiplicationDeck">Multiplicación</button>
    </div>
    <div id="cardContainer" class="card">
      <p id="cardText">Selecciona un mazo para obtener un desafío</p>
    </div>
    <div id="secretAnswerContainer" class="secret-answer">
      <p>Respuesta secreta</p>
      <div class="answer" id="answerText"></div>
    </div>
  `;

  document
    .getElementById("simplificationDeck")
    .addEventListener("click", () => {
      const challenge = generateSimplificationChallenge();
      showChallenge(challenge);
    });

  document.getElementById("sumDeck").addEventListener("click", () => {
    const challenge = generateSumChallenge();
    showChallenge(challenge);
  });

  document.getElementById("subtractionDeck").addEventListener("click", () => {
    const challenge = generateSubtractionChallenge();
    showChallenge(challenge);
  });

  document
    .getElementById("multiplicationDeck")
    .addEventListener("click", () => {
      const challenge = generateMultiplicationChallenge();
      showChallenge(challenge);
    });
}

function renderRandomMode(container) {
  container.innerHTML = `
    <h1>Modo Aleatorio</h1>
    <button class="deck" id="randomDeck">Obtener Desafío Aleatorio</button>
    <div id="cardContainer" class="card">
      <p id="cardText">Haz clic en el botón para obtener un desafío aleatorio</p>
    </div>
    <div id="secretAnswerContainer" class="secret-answer">
      <p>Respuesta secreta</p>
      <div class="answer" id="answerText"></div>
    </div>
  `;

  document
    .getElementById("randomDeck")
    .addEventListener("click", showRandomChallenge);
}

function showRandomChallenge() {
  const challenges = [
    generateSimplificationChallenge,
    generateSumChallenge,
    generateSubtractionChallenge,
    generateMultiplicationChallenge,
  ];
  const randomChallenge =
    challenges[Math.floor(Math.random() * challenges.length)];
  showChallenge(randomChallenge());
}

// Inicializar en modo casual por defecto
loadMode("casual");
