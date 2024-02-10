const game = document.querySelector('.game-section__container');
const startForm = document.querySelector('.game-section__container')

// Создаём элементы для стартового меню игры
let title = document.createElement('h2');
let form = document.createElement('form');
let input = document.createElement('input');
let button = document.createElement('button');

// Задаём классы и значения для элементов меню
title.classList.add('menu-title');
title.textContent = 'Choose number of pairs from 2 to 10 to set difficulty:'
form.classList.add('form-group');
input.classList.add('input');
input.setAttribute("type", "number");
input.setAttribute("min", 2);
input.setAttribute("max", 10);
button.classList.add('game-menu__level-btn');
button.textContent = 'Go!';

// Здесь исключаем возможность ввода цифр с клавиатуры
input.addEventListener('keypress', (e) => {
    if ("1234567890".indexOf(e.key) != -1)
      e.preventDefault();
})

form.append(input, button);
startForm.append(title, form);

// По клику начинаем игру
button.addEventListener('click', () => {
  // Исключаем возможность начала игры если в input пусто
  if (input.value === '') {
    return;
  }

  startForm.innerHTML = '';

  let cardsCount = input.value;

  const cardsNumberArray = [];

  let firstCard = null;
  let secondCard = null;

  // Заполняем пустой массив цифрами
  for (let i = 1; i <= cardsCount; i++) {
  cardsNumberArray.push(i, i);
  }

  // Алгоритм перемешивания массива
  for (let i = 0; i < cardsNumberArray.length; i++) {
  let randomIndex = Math.floor(Math.random() * cardsNumberArray.length);

  let temp = cardsNumberArray[i];
  cardsNumberArray[i] = cardsNumberArray[randomIndex];
  cardsNumberArray[randomIndex] = temp;
  }

  // Создание карточек и логика игры
  for (const cardNumber of cardsNumberArray) {
  let card = document.createElement('div');
  card.textContent = cardNumber;
  card.classList.add('card');

  // Клик по карточке
  card.addEventListener('click', () => {
    if (card.classList.contains('open') || card.classList.contains('pair')) {
      return;
    }

    if (firstCard !== null && secondCard !== null) {
      firstCard.classList.remove('open');
      secondCard.classList.remove('open');
      firstCard = null;
      secondCard = null;
    }

    card.classList.add('open');

    // Условия
    if (firstCard === null) {
    firstCard = card;
    } else {
    secondCard = card;
    }

    if (firstCard !== null && secondCard !== null) {
    let firstCardNumber = firstCard.textContent;
    let secondCardNumber = secondCard.textContent;


    if (firstCardNumber === secondCardNumber) {
        firstCard.classList.add('pair');
        secondCard.classList.add('pair');
    }
  }

  if (cardsNumberArray.length === document.querySelectorAll('.pair').length) {
    let resetButton = document.createElement('button');
    resetButton.classList.add('reset-btn');
    resetButton.textContent = 'Reset';

    document.querySelector('.reset').append(resetButton);

    resetButton.addEventListener('click', () => {
      game.innerHTML = '';
      form.append(input, button);
    startForm.append(title, form);
    document.querySelector('.reset').innerHTML = '';
    })
  }
  })

  game.append(card);
}
})

