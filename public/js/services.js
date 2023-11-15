function goTo(name) {
    if (name == "Web Development") {
        window.location.href = "https://en.wikipedia.org/wiki/Web_development#:~:text=Web%20development%20is%20the%20work,businesses%2C%20and%20social%20network%20services.";
    }
    else if (name == "ML Development") {
        window.location.href = "https://www.techtarget.com/searchenterpriseai/definition/machine-learning-ML";
    }
    else {
        window.location.href = "https://www.geeksforgeeks.org/competitive-programming-a-complete-guide/";
    }
}

ScrollReveal({distance: '80px',duration: 2000, delay: 200});
ScrollReveal().reveal('#courses .course_head, #courses table',{origin: 'top'});
ScrollReveal().reveal('#projects .course_head, #projects table',{origin: 'bottom'});
ScrollReveal().reveal('#service_head .heading, #service_head .sub-heading, .know_more',{origin: 'left'});
ScrollReveal().reveal('#skills .course_head, .skill_names',{origin: 'right'});