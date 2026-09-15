const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-nav');
const sectionLinks = [...document.querySelectorAll('.top-nav a[href^="#"], .mobile-nav a[href^="#"]')];
const sections = [...document.querySelectorAll('section[id], footer[id]')];

toggle?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-hidden', String(!isOpen));
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
}));

const achievementCards = [...document.querySelectorAll('.achievement-card')];
const achievementDots = [...document.querySelectorAll('.slider-dots button')];
const achievementTrack = document.querySelector('.unique-carousel-track');

if (achievementCards.length && achievementTrack) {
  let currentSlide = 0;

  const updateAchievementCarousel = (index) => {
    currentSlide = index;
    achievementTrack.style.transform = `translateX(-${index * 100}%)`;

    achievementDots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
      dot.setAttribute('aria-current', dotIndex === index ? 'true' : 'false');
    });
  };

  achievementDots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateAchievementCarousel(index));
  });

  setInterval(() => {
    const nextSlide = (currentSlide + 1) % achievementCards.length;
    updateAchievementCarousel(nextSlide);
  }, 4500);
}

const skillsWrap = document.querySelector('.skills-wrap');
const skillsBars = [...document.querySelectorAll('.skills-bar-dots button')];

if (skillsWrap && skillsBars.length) {
  const updateSkillsBars = (index) => {
    const maxIndex = skillsBars.length - 1;
    const maxScroll = Math.max(skillsWrap.scrollHeight - skillsWrap.clientHeight, 1);
    const targetScroll = (maxScroll / maxIndex) * index;

    skillsWrap.scrollTo({ top: targetScroll, behavior: 'smooth' });

    skillsBars.forEach((bar, barIndex) => {
      const isActive = barIndex === index;
      bar.classList.toggle('is-active', isActive);
      bar.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  skillsBars.forEach((bar, index) => {
    bar.addEventListener('click', () => updateSkillsBars(index));
  });

  skillsWrap.addEventListener('scroll', () => {
    const maxScroll = Math.max(skillsWrap.scrollHeight - skillsWrap.clientHeight, 1);
    const ratio = maxScroll === 0 ? 0 : skillsWrap.scrollTop / maxScroll;
    const activeIndex = Math.min(skillsBars.length - 1, Math.max(0, Math.round(ratio * (skillsBars.length - 1))));

    skillsBars.forEach((bar, index) => {
      const isActive = index === activeIndex;
      bar.classList.toggle('is-active', isActive);
      bar.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  });
}

const projectCarousel = document.querySelector('.projects-carousel');
const projectSlides = [...document.querySelectorAll('.project-slide')];
const projectDots = [...document.querySelectorAll('.project-dots span')];

if (projectCarousel && projectSlides.length && projectDots.length) {
  const updateProjectDots = () => {
    const lastScrollPosition = projectCarousel.scrollWidth - projectCarousel.clientWidth;
    const activeIndex = projectSlides.reduce((closestIndex, slide, index) => {
      const closestDistance = Math.abs(projectCarousel.scrollLeft - projectSlides[closestIndex].offsetLeft);
      const slideDistance = Math.abs(projectCarousel.scrollLeft - slide.offsetLeft);
      return slideDistance < closestDistance ? index : closestIndex;
    }, 0);
    const boundedIndex = projectCarousel.scrollLeft >= lastScrollPosition - 1
      ? projectSlides.length - 1
      : Math.min(activeIndex, projectDots.length - 1);

    projectDots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === boundedIndex);
    });
  };

  projectDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const targetSlide = projectSlides[index];
      if (!targetSlide) return;
      projectCarousel.scrollTo({ left: targetSlide.offsetLeft, behavior: 'smooth' });
      updateProjectDots();
    });
  });

  projectCarousel.addEventListener('scroll', updateProjectDots, { passive: true });
  updateProjectDots();
}

function setActiveSection(id) {
  sectionLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isCurrent);
    link.toggleAttribute('aria-current', isCurrent);
  });
}

function updateActiveSection() {
  const activationPoint = window.scrollY + 135;
  let activeSection = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= activationPoint) activeSection = section;
  });

  setActiveSection(activeSection.id);
}

window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('load', updateActiveSection);
updateActiveSection();
document.querySelector('#year').textContent = new Date().getFullYear();
