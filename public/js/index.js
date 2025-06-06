/*============menu icon navbar================*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let menuBar = document.getElementById("navbar-items-container");
let darken = document.getElementById("darken");

/*================Toggle the Background and Menu Icon when click outside=====================*/
// function closeMenu(event) {
//   if (!menuBar.contains(event.target) && event.target !== menuIcon) {
//       menuBar.classList.remove('active');
//   }
// }

// document.addEventListener('click', closeMenu);

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
  navbar.classList.remove("active");
};
/*============swiper================*/
const projectsSwiper = new Swiper('.mySwiperProjects', {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  loopedSlides: 4, // Important: manually set number of slides to loop
  // autoplay: {
  //   delay: 3000,
  //   disableOnInteraction: false,
  // },
  navigation: {
    nextEl: '.projects-button-next',
    prevEl: '.projects-button-prev',
  },
  pagination: {
    el: '.projects-pagination',
    clickable: true,
  },
});



const achievementsSwiper = new Swiper('.mySwiperAchievements', {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  navigation: {
    nextEl: '.achievements-button-next',
    prevEl: '.achievements-button-prev',
  },
  pagination: {
    el: '.achievements-pagination',
    clickable: true,
  },
});


/*============Scroll Reveal================*/
ScrollReveal({ distance: "80px", duration: 2000, delay: 200 });
ScrollReveal().reveal(".home-content, .heading, .experience", {
  origin: "top",
});
ScrollReveal().reveal(
  ".home-img img, .services-container, .portfolio-box, .testimonial-wrapper, .contact .form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img img", { origin: "left" });
ScrollReveal().reveal(".home-content h3, .home-content p, .about-content", {
  origin: "right",
});

/*==============Send Mail=====================*/
async function sendMail() {
  var success = await fetch(
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
    }).then((window.location.href = "/"));
  }
}

var date = new Date();
var year = date.getFullYear();
document.querySelector(
  ".footer-text"
).innerHTML = `<p>Copyright &copy; ${year} by Hariharaan S | All rights reserved</p>`;


