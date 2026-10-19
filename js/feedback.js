/**
 * Лабораторна робота №4. Сторінка «Зворотній зв'язок» (feedback.html)
 * Варіант №4: Тултіп та зміна стилів поля «Детально» при наведенні
 */

document.addEventListener('DOMContentLoaded', () => {
    initTimeTheme();
    initDetailsTooltip();
});

/**
 * 1. Підтримка темної/світлої теми за часом доби (6:00 – 21:00)
 */
function initTimeTheme() {
    const currentHour = new Date().getHours();
    const isDayTime = currentHour >= 6 && currentHour < 21;

    if (isDayTime) {
        document.body.classList.remove('theme-night');
        document.body.classList.add('theme-day');
    } else {
        document.body.classList.remove('theme-day');
        document.body.classList.add('theme-night');
    }
}

/**
 * 2. Обробка наведення на поле «Детально» (Вимога 4):
 * - Зміна фону поля;
 * - Поява рамки та тіні;
 * - Поява тултіпа праворуч із текстом за варіантом.
 */
function initDetailsTooltip() {
    const textarea = document.getElementById('feedback-details');
    if (!textarea) return;

    const parentContainer = textarea.closest('.form-details') || textarea.parentElement;

    // Створюємо елемент тултіпа через DOM API
    const tooltip = document.createElement('div');
    tooltip.className = 'details-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    // Текст суворо за вимогами варіанта 4
    tooltip.textContent = 'Ваша думка для нас важлива! Конкретизуйте мету звернення, будь ласка';

    parentContainer.appendChild(tooltip);

    // Обробник підведення курсора миші
    textarea.addEventListener('mouseenter', () => {
        // Застосовуємо зміну фону, появу рамки та тіні
        textarea.classList.add('details-hovered');

        // Показуємо підказку праворуч
        tooltip.classList.add('is-visible');

        console.log('[Зворотній зв\'язок]: Курсор наведено на поле "Детально". Відображено рамку, тінь та tooltip.');
    });

    // Обробник виведення курсора миші
    textarea.addEventListener('mouseleave', () => {
        // Повертаємо початкові стилі
        textarea.classList.remove('details-hovered');

        // Ховаємо тултіп
        tooltip.classList.remove('is-visible');

        console.log('[Зворотній зв\'язок]: Курсор відведено від поля "Детально". Тултіп сховано.');
    });
}