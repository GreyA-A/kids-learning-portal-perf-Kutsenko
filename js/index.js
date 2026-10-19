/**
 * Лабораторна робота №4. Клієнтські скрипти для Головної сторінки (index.html)
 * Варіант №4
 */

document.addEventListener('DOMContentLoaded', () => {
    initTimeTheme();
    initFallingToys();
    initAuthorFlipCard();
});

/**
 * 1. Зміна теми за часом доби (Вимога 5):
 * Якщо користувач зайшов у період з 6:00 до 21:00 — фон на 40% світліший
 */
function initTimeTheme() {
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 6 && currentHour < 21;

    if (isDayTime) {
        document.body.classList.remove('theme-night');
        document.body.classList.add('theme-day');
        console.log(`[Тема]: Поточний час ${currentHour}:00 (денний період 6:00–21:00). Встановлено денну тему (фон на 40% світліший).`);
    } else {
        document.body.classList.remove('theme-day');
        document.body.classList.add('theme-night');
        console.log(`[Тема]: Поточний час ${currentHour}:00 (нічний період 21:00–6:00). Встановлено нічну тему.`);
    }
}

/**
 * 2. Падаючі іграшки на фоні блоку з назвою та логотипом (Вимога 1):
 * Висота іграшки перевищує подвоєну висоту великої літери у назві.
 */
function initFallingToys() {
    const brandBlock = document.querySelector('.brand-header');
    const titleElement = brandBlock ? brandBlock.querySelector('h1') : null;

    if (!brandBlock || !titleElement) return;

    // Створюємо фоновий шар для іграшок
    let toysLayer = brandBlock.querySelector('.toys-layer');
    if (!toysLayer) {
        toysLayer = document.createElement('div');
        toysLayer.className = 'toys-layer';
        brandBlock.prepend(toysLayer);
    }

    // Розрахунок висоти великої літери у заголовку
    const computedStyle = window.getComputedStyle(titleElement);
    const fontSize = parseFloat(computedStyle.fontSize) || 24;
    // Висота великої літери (Cap Height) становить приблизно 72% від розміру шрифту
    const capitalLetterHeight = fontSize * 0.72;

    // Висота іграшки ПЕРЕВИЩУЄ подвоєну висоту великої літери (беремо коефіцієнт 2.4)
    const toyHeight = Math.ceil(capitalLetterHeight * 2.4);

    console.log(`[Іграшки]: Висота шрифту = ${fontSize}px, висота літери = ${capitalLetterHeight.toFixed(1)}px. Розмір іграшки = ${toyHeight}px (перевищує 2x = ${(capitalLetterHeight * 2).toFixed(1)}px).`);

    // Набір розвиваючих іграшок (емодзі/іконки)
    const toyIcons = ['🧸', '🧩', '🪀', '🚂', '⚽', '🚗', '🎨', '🪁', '🔢'];

    // Функція генерації однієї падаючої іграшки
    function spawnToy() {
        const toy = document.createElement('div');
        toy.className = 'falling-toy';
        
        // Випадковий вибір іграшки
        toy.textContent = toyIcons[Math.floor(Math.random() * toyIcons.length)];

        // Задаємо розраховану висоту
        toy.style.height = `${toyHeight}px`;
        toy.style.fontSize = `${toyHeight * 0.85}px`;
        toy.style.lineHeight = `${toyHeight}px`;

        // Випадкове горизонтальне положення всередині блоку
        const containerWidth = brandBlock.clientWidth || 600;
        const randomLeft = Math.random() * (containerWidth - toyHeight);
        toy.style.left = `${Math.max(10, randomLeft)}px`;

        // Випадкова тривалість падіння (від 2.5 до 4.5 секунд)
        const duration = (2.5 + Math.random() * 2).toFixed(2);
        toy.style.animationDuration = `${duration}s`;

        toysLayer.appendChild(toy);

        // Видалення іграшки з DOM після завершення анімації
        setTimeout(() => {
            if (toy.parentNode) {
                toy.parentNode.removeChild(toy);
            }
        }, duration * 1000);
    }

    // Періодична генерація іграшок кожні 900 мс
    setInterval(spawnToy, 900);
}

/**
 * 3. Інтерактивна 3D фліп-картка автора курсу (Вимога 2):
 * При наведенні курсора на зображення/картку вона розгортається зворотним боком з цитатою
 */
function initAuthorFlipCard() {
    const authorCard = document.getElementById('authorCard');
    if (!authorCard) return;

    // Обробник наведення миші: розгортаємо картку
    authorCard.addEventListener('mouseenter', () => {
        authorCard.classList.add('is-flipped');
        console.log('[Фліп-карта]: Картка розгорнута (mouseenter). Відображено девіз автора.');
    });

    // Обробник відведення миші: повертаємо у вихідний стан
    authorCard.addEventListener('mouseleave', () => {
        authorCard.classList.remove('is-flipped');
        console.log('[Фліп-карта]: Картка повернута назад (mouseleave).');
    });
}