/* Navigation scroll behavior */
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);

  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

/* Mobile menu toggle */
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");
  });
});

/* Achievements Swiper */
const achievementsSwiper = new Swiper(".mySwiperAchievements", {
  loop: true,
  spaceBetween: 24,
  slidesPerView: 1,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".achievements-pagination",
    clickable: true,
  },
  speed: 600,
});

/* Scroll Reveal */
ScrollReveal({ distance: "30px", duration: 800, easing: "ease-out", reset: false });
ScrollReveal().reveal(".hero-content", { origin: "left", delay: 100 });
ScrollReveal().reveal(".hero-image", { origin: "right", delay: 200 });
ScrollReveal().reveal(".section-header", { origin: "top", interval: 100 });
ScrollReveal().reveal(".timeline-item", { origin: "left", interval: 150 });
ScrollReveal().reveal(".service-card", { origin: "bottom", interval: 100 });
ScrollReveal().reveal(".project-card", { origin: "bottom", interval: 100 });
ScrollReveal().reveal(".achievement-card", { origin: "bottom" });
ScrollReveal().reveal(".contact-info, .contact-form", { origin: "bottom", interval: 150 });

/* Send Mail */
async function sendMail() {
  const success = await fetch(
    "/send?name=" +
      document.getElementById("name").value +
      "&email=" +
      document.getElementById("email").value +
      "&phone=" +
      document.getElementById("phone").value +
      "&message=" +
      document.getElementById("message").value
  );
  if (success.status === 200) {
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "s.hariharaan.college@gmail.com",
      Password: "86DA580AD5A5A30A21005D01D81E2ADA95A6",
      From: "s.hariharaan.college@gmail.com",
      To: document.getElementById("email").value,
      Subject: "Successfully Submitted the Query",
      Body: "Thank you for reaching me. I will see to the query and turn in within 2 or 3 working days.",
    }).then(() => (window.location.href = "/"));
  }
}

/* Dynamic copyright year */
const year = new Date().getFullYear();
document.querySelector(".footer-text").innerHTML =
  `Copyright &copy; ${year} by Hariharaan S. All rights reserved.`;
