
/* ========================================
   ПЕРЕВОД САЙТА EN / RU
======================================== */

// Словарь переводов с английского на русский

const ruTranslations = {
  // Меню и заголовки
  "Skills": "Навыки",
  "Portfolio": "Портфолио",
  "Video": "Видео",
  "Price": "Стоимость",
  "Contacts": "Контакты",

  // Главный экран
  "Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise":
    "Сохраните искренние эмоции, романтические чувства и счастливые моменты жизни вместе с профессиональным фотографом Алексой Райз",

  "Hire me": "Заказать съёмку",

  // Навыки
  "Digital photography": "Фотосъёмка",
  "High-quality photos in the studio and on the nature":
    "Качественные фотографии в студии и на природе",

  "Video shooting": "Видеосъёмка",
  "Capture your moments so that they always stay with you":
    "Сохраняю ваши моменты, чтобы они всегда оставались с вами",

  "Retouch": "Ретушь",
  "I strive to make photography surpass reality":
    "Я стремлюсь сделать фотографию прекраснее реальности",

  "Audio": "Звук",
  "Professional sounds recording for video, advertising, portfolio":
    "Профессиональная звукозапись для видео, рекламы и портфолио",

  // Сезоны
  "Winter": "Зима",
  "Spring": "Весна",
  "Summer": "Лето",
  "Autumn": "Осень",

  // Тарифы
  "Standard": "Стандарт",
  "Premium": "Премиум",
  "Gold": "Золотой",

  "One location": "Одна локация",
  "120 photos in color": "120 цветных фотографий",
  "12 photos in retouch": "12 фотографий с ретушью",
  "Readiness 2-3 weeks": "Готовность через 2–3 недели",
  "Make up, visage": "Макияж и визаж",

  "One or two locations": "Одна или две локации",
  "200 photos in color": "200 цветных фотографий",
  "20 photos in retouch": "20 фотографий с ретушью",
  "Readiness 1-2 weeks": "Готовность через 1–2 недели",

  "Three locations or more": "Три локации или больше",
  "300 photos in color": "300 цветных фотографий",
  "50 photos in retouch": "50 фотографий с ретушью",
  "Readiness 1 week": "Готовность через 1 неделю",
  "Make up, visage, hairstyle": "Макияж, визаж и причёска",

  "Order shooting": "Заказать съёмку",

  // Контакты
  "Contact me": "Связаться со мной",
  "Send message": "Отправить сообщение",
  "E-mail": "Эл. почта",
  "Phone": "Телефон",
  "Message": "Сообщение"
};

// Находим текстовые элементы сайта
const textElements = document.querySelectorAll(
  ".nav a, .hero-text, .hero-button, " +
  ".section-title h2, .skill-card h3, .skill-card p, " +
  ".portfolio-button, .price-card h3, .price-list li, " +
  ".price-button, .contacts-title, .contacts-button"
);

// Запоминаем английский текст каждого элемента
textElements.forEach(function (element) {
  const englishText = element.textContent.trim().replace(/\s+/g, " ");

  if (Object.hasOwn(ruTranslations, englishText)) {
    element.dataset.i18n = englishText;
  }
});

// Запоминаем исходные подсказки полей формы
const formFields = document.querySelectorAll(
  ".contacts-form input, .contacts-form textarea"
);

formFields.forEach(function (field) {
  field.dataset.i18nPlaceholder = field.placeholder;
});

// Кнопки выбора языка
const languageButtons = document.querySelectorAll(
  ".language-button"
);

// Функция переключения языка
function changeLanguage(lang) {

  // Переводим текст
  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    const englishText = element.dataset.i18n;

    element.textContent = lang === "ru"
      ? ruTranslations[englishText]
      : englishText;
  });

  // Переводим подсказки в контактной форме
  formFields.forEach(function (field) {
    const englishPlaceholder = field.dataset.i18nPlaceholder;

    field.placeholder = lang === "ru"
      ? (ruTranslations[englishPlaceholder] || englishPlaceholder)
      : englishPlaceholder;
  });

  // Подсвечиваем активную кнопку языка
  languageButtons.forEach(function (button) {
    const isActive = button.dataset.lang === lang;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  // Обновляем язык HTML-документа
  document.documentElement.lang = lang;

  // Сохраняем выбор в браузере
  localStorage.setItem("portfolio-language", lang);
}

// Обрабатываем нажатия EN / RU
languageButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    changeLanguage(button.dataset.lang);
  });
});

// Восстанавливаем язык после обновления страницы
const savedLanguage = localStorage.getItem("portfolio-language");

changeLanguage(savedLanguage === "ru" ? "ru" : "en");
