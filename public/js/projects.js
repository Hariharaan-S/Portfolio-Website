// //learn how this was made at https://www.youtube.com/watch?v=ersN5fk8py0 
// gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, GSDevTools);

// gsap.defaults({ease: "none"});

// const pulses = gsap.timeline({
//   defaults: {
//     scale: 2,
//     autoAlpha:1,
//     transformOrigin: 'center', 
//     ease: "elastic(2.5, 1)"
//   }})
// .to(".ball02, .text01", {}, 0.84) 
// .to(".ball03, .text02", {}, 1.36)
// .to(".ball04, .text03", {}, 1.92)

// const main = gsap.timeline({
//   scrollTrigger: {
//     trigger: "#svg",
//     scrub: true,
//     start: "top center",
//     end: "bottom center"
//   }
// })
// .to(".ball01", {autoAlpha:1, duration:0.05})
// .from(".theLine", {drawSVG:0, duration:4}, 0)
// .to(".ball01", {motionPath:{
//   path:".theLine",
//   align:".theLine",
//   alignOrigin:[0.5, 0.5],
// }, duration:4}, 0)
// .add(pulses, 0)


// GSDevTools.create({animation:main})

// // const pulses = gsap.timeline({
// //   defaults: {
// //     duration: 0.05, 
// //     autoAlpha: 1, 
// //     scale: 2, 
// //     transformOrigin: 'center', 
// //     ease: "elastic(2.5, 1)"
// //   }})
// // .to(".ball02, .text01", {}, 0.2) 
// // .to(".ball03, .text02", {}, 0.33)
// // .to(".ball04, .text03", {}, 0.46)

// // const main = gsap.timeline({defaults: {duration: 1},
// //   scrollTrigger: {
// //     trigger: "#svg",
// //     scrub: true,
// //     start: "top center",
// //     end: "bottom center"
// //   }})
// // .to(".ball01", {duration: 0.01, autoAlpha: 1})
// // .from(".theLine", {drawSVG: 0}, 0)
// // .to(".ball01", {motionPath: {
// //   path: ".theLine", 
// //   align:".theLine",
// //   alignOrigin: [0.5, 0.5],
// // }}, 0)
// // .add(pulses, 0);