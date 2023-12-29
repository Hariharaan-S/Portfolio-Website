/*============menu icon navbar================*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-solid fa-xmark");
  navbar.classList.toggle("active");
};

/*============scroll section active link================*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  /*============sticky navbar================*/
  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 100);

  /*============remove menu icon navbar when click navbar link (scroll)================*/
  menuIcon.classList.remove("fa-solid fa-xmark");
  navbar.classList.remove("active");
};
/*============swiper================*/
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 50,
  loop: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

/*============dark mode================*/
let darkMode = document.querySelector("#darkMode-icon");

darkMode.onclick = () => {
  darkMode.classList.toggle("bx-sun");
  document.body.classList.toggle("dark-mode");
};

/*============Scroll Reveal================*/
ScrollReveal({ distance: "80px", duration: 2000, delay: 200 });
ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact .form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img img", { origin: "left" });
ScrollReveal().reveal(".home-content h3, .home-content p, .about-content", {
  origin: "right",
});

/*==============Send Mail=====================*/
document.getElementById("submit_btn").addEventListener("click", async () => {
  await fetch(
    "/send?name=" +
      document.getElementById("name").value +
      "&email=" +
      document.getElementById("email").value +
      "&phone=" +
      document.getElementById("phone").value +
      "&message=" +
      document.getElementById("message").value
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        Email.send({
          Host: "smtp.elasticemail.com",
          Username: "s.hariharaan.college@gmail.com",
          Password: "2A0E9CD2A6226649FB9FDDA3FA283594C8D0",
          From: 's.hariharaan.college@gmail.com',
          To: document.getElementById('email').value,
          Subject: `Successfully submitted your query`,
          Body: `Thank you for contacting me. Surly, will see to the query and get back to you.`,
        });
        Swal.fire({
          title: "Success",
          text: "Successfully submitted query",
          icon: "success",
        });
      }
    });
    clear()
});

const clear = () =>{
  document.getElementById("name").innerHTML = "";
  document.getElementById("phone").innerHTML = "";
  document.getElementById("message").innerHTML = "";
  document.getElementById("email").innerHTML = "";
}
