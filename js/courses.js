/**
 * Лабораторна робота №4. Сторінка «Наші курси» (courses.html)
 * Варіант №4: Інтерактивний акордеон у лівому верхньому кутку
 */

document.addEventListener('DOMContentLoaded', () => {
    initTimeTheme();
    initCoursesAccordion();
});

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

function initCoursesAccordion() {
    const accordion = document.getElementById('coursesAccordion');
    if (!accordion) return;

    const items = accordion.querySelectorAll('.accordion-item');

    items.forEach((item) => {
        const header = item.querySelector('.accordion-header');
        const body = item.querySelector('.accordion-body');
        const navLink = item.querySelector('.accordion-link');

        if (!header || !body) return;

        // Обробник кліку на заголовок акордеона
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Закриваємо всі інші вкладки для компактності («один розгорнутий за раз»)
            items.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherHeader = otherItem.querySelector('.accordion-header');
                    const otherBody = otherItem.querySelector('.accordion-body');
                    if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                    if (otherBody) otherBody.style.maxHeight = '0px';
                }
            });

            // Перемикаємо стан поточної вкладки
            if (isActive) {
                item.classList.remove('active');
                header.setAttribute('aria-expanded', 'false');
                body.style.maxHeight = '0px';
                console.log(`[Акордеон]: Згорнуто блок "${header.innerText.trim()}"`);
            } else {
                item.classList.add('active');
                header.setAttribute('aria-expanded', 'true');
                // Встановлюємо точну висоту контенту через scrollHeight
                body.style.maxHeight = `${body.scrollHeight}px`;
                console.log(`[Акордеон]: Розгорнуто блок "${header.innerText.trim()}" (висота ${body.scrollHeight}px)`);
            }
        });

        // Плавний перехід до обраного курсу при кліку на посилання
        if (navLink) {
            navLink.addEventListener('click', (event) => {
                const targetId = navLink.getAttribute('href');
                if (targetId && targetId.startsWith('#')) {
                    event.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Додаткове підсвічування знайденої картки
                        targetElement.style.transition = 'outline 0.4s ease';
                        if (document.body.classList.contains('theme-night')) {
                            targetElement.style.outline = '3px solid #60008d';
                        }
                        else {
                            targetElement.style.outline = '3px solid #FF6F00';
                        }
                        setTimeout(() => {
                            targetElement.style.outline = 'transparent';
                        }, 1800);
                        console.log(`[Акордеон]: Швидкий перехід до ${targetId}`);
                    }
                }
            });
        }
    });

    // За замовчуванням відкриємо перший елемент для демонстрації роботи
    if (items.length > 0) {
        const firstItem = items[0];
        const firstHeader = firstItem.querySelector('.accordion-header');
        const firstBody = firstItem.querySelector('.accordion-body');
        firstItem.classList.add('active');
        if (firstHeader) firstHeader.setAttribute('aria-expanded', 'true');
        if (firstBody) firstBody.style.maxHeight = `${firstBody.scrollHeight}px`;
    }
}