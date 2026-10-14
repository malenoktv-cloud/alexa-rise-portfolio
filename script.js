const portfolioButtons = document.querySelectorAll(".portfolio-button");
const portfolioImages = document.querySelectorAll(".portfolio-gallery img");

function changePortfolioSeason(season) {
  portfolioImages.forEach(function (image, index) {
    const imageNumber = index + 1;

    image.src = `images/portfolio/${season}/${season}-${imageNumber}.jpg`;
    image.alt = `${season} portfolio photo ${imageNumber}`;
  });
}

portfolioButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const season = button.dataset.season;

    portfolioButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    changePortfolioSeason(season);
  });
});
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const menuOverlay = document.querySelector(".menu-overlay");
const navLinks = document.querySelectorAll(".nav a");

function openMenu() {
  nav.classList.add("open");
  burger.classList.add("active");
  menuOverlay.classList.add("active");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  nav.classList.remove("open");
  burger.classList.remove("active");
  menuOverlay.classList.remove("active");
  document.body.classList.remove("menu-open");
}

burger.addEventListener("click", function () {
  if (nav.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

menuOverlay.addEventListener("click", closeMenu);

navLinks.forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

/* ========================================
   ПЕРЕКЛЮЧЕНИЕ ТЁМНОЙ И СВЕТЛОЙ ТЕМЫ
======================================== */

const themeToggle = document.querySelector(".theme-toggle");

// Получаем ранее выбранную тему или используем тёмную
const savedTheme = localStorage.getItem("portfolio-theme") || "dark";

// Функция применения темы
function applyTheme(theme) {
  const isLight = theme === "light";

  // Добавляем или убираем класс светлой темы
  document.body.classList.toggle("light-theme", isLight);

  // Меняем значок кнопки
  themeToggle.textContent = isLight ? "🌙" : "☀️";

  // Меняем описание кнопки
  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );

  // Запоминаем выбранную тему
  localStorage.setItem("portfolio-theme", theme);
}

// Применяем тему при загрузке страницы
if (themeToggle) {
  applyTheme(savedTheme);

  // Переключаем тему при нажатии
  themeToggle.addEventListener("click", function () {
    const currentTheme = document.body.classList.contains("light-theme")
      ? "dark"
      : "light";

    applyTheme(currentTheme);
  });
}

/* ========================================
   МОДАЛЬНОЕ ОКНО И СЛАЙДЕР ФОТОГРАФИЙ
======================================== */

// Получаем все фотографии Portfolio
const galleryPhotos = document.querySelectorAll(".portfolio-gallery img");

// Находим элементы модального окна
const photoDialog = document.querySelector("#photo-modal");
const modalPhotoImage = document.querySelector(".photo-modal-image");
const modalCounter = document.querySelector(".photo-modal-counter");

const modalCloseButton = document.querySelector(".photo-modal-close");
const modalPrevButton = document.querySelector(".photo-modal-prev");
const modalNextButton = document.querySelector(".photo-modal-next");

// Номер текущей фотографии
let currentPhotoIndex = 0;

// Функция показа фотографии
function showPhoto(index) {

  // При переходе за последнюю фотографию
  // возвращаемся к первой, и наоборот
  currentPhotoIndex =
    (index + galleryPhotos.length) % galleryPhotos.length;

  const selectedPhoto = galleryPhotos[currentPhotoIndex];

  // Берём актуальную фотографию выбранного сезона
  modalPhotoImage.src = selectedPhoto.src;
  modalPhotoImage.alt = selectedPhoto.alt;

  // Обновляем счётчик
  modalCounter.textContent =
    `${currentPhotoIndex + 1} / ${galleryPhotos.length}`;
}

// Открываем фотографию при нажатии
galleryPhotos.forEach(function (photo, index) {

  // Показываем, что фотография интерактивная
  photo.style.cursor = "zoom-in";

  // Позволяем выбрать фото с клавиатуры
  photo.tabIndex = 0;
  photo.setAttribute("role", "button");
  photo.setAttribute("aria-label", "Open " + photo.alt);

  function openPhoto() {
    showPhoto(index);
    photoDialog.showModal();
  }

  photo.addEventListener("click", openPhoto);

  photo.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPhoto();
    }
  });
});

// Кнопка "Следующая фотография"
modalNextButton.addEventListener("click", function () {
  showPhoto(currentPhotoIndex + 1);
});

// Кнопка "Предыдущая фотография"
modalPrevButton.addEventListener("click", function () {
  showPhoto(currentPhotoIndex - 1);
});

// Закрытие через крестик
modalCloseButton.addEventListener("click", function () {
  photoDialog.close();
});

// Закрытие при нажатии на затемнённый фон
photoDialog.addEventListener("click", function (event) {

  if (event.target !== photoDialog) {
    return;
  }

  const rect = photoDialog.getBoundingClientRect();

  const outside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (outside) {
    photoDialog.close();
  }
});

// Управление стрелками клавиатуры
document.addEventListener("keydown", function (event) {

  // Реагируем только когда окно открыто
  if (!photoDialog.open) {
    return;
  }

  if (event.key === "ArrowRight") {
    showPhoto(currentPhotoIndex + 1);
  }

  if (event.key === "ArrowLeft") {
    showPhoto(currentPhotoIndex - 1);
  }

  // Escape закрывается браузером автоматически
});

/* ========================================
   ВОСПРОИЗВЕДЕНИЕ ВИДЕО
======================================== */

const portfolioVideo = document.querySelector("#portfolio-video");
const portfolioPlayButton = document.querySelector(".video-play");

if (portfolioVideo && portfolioPlayButton) {

  // Запуск при нажатии на большую кнопку Play
  portfolioPlayButton.addEventListener("click", function () {
    console.log("Большая кнопка Play нажата!");
    
    portfolioVideo.play()
      .then(function () {
        portfolioPlayButton.hidden = true;
      })
      .catch(function (error) {
        console.error("Ошибка воспроизведения видео:", error);
      });
  });

  // Когда видео закончилось, снова показываем кнопку
  portfolioVideo.addEventListener("ended", function () {
    portfolioPlayButton.hidden = false;
  });
}
