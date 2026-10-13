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