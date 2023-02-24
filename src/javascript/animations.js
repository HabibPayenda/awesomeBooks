const headerImage = document.getElementById('headerImage');

const images = [
  './src/images/students1.png',
  './src/images/students2.png',
  './src/images/students3.png',
];

const { length } = images;
let i = 0;

const slider = () => {
  if (i > length - 1) {
    i = 0;
  }
  headerImage.src = images[i];
  i += 1;
  setTimeout(() => {
    slider();
  }, 5000);
};

slider();


const logo = document.getElementById('logo');
const navlinks = document.querySelectorAll('nav a');
const headerRight = document.getElementById('headerRight');
const headerLeft = document.getElementById('headerLeft');
const exploreText = document.getElementById('exploreText');
const mainHeading = document.getElementById('mainHeading');
const seachContainer = document.getElementById('searchContainer');
const headerLeftImg = document.getElementById('headerLeftImg');
const accountContainer = document.getElementById('accountContainer');
const graphics = document.getElementById('graphics');
const storiesContainer = document.getElementById('storiesContainer');

window.addEventListener('load', revealAnim);

function revealAnim () {
  const TLFADE = gsap.timeline();
  
  TLFADE
  .from(logo, {autoAlpha: 0, duration: 0.3, y: -50, delay: 0.2}, '-=0.20')
  .from(navlinks, {autoAlpha: 0, duration: 0.3, y: -50, delay: 0., stagger: 0.1}, '-=0.20')
  .from(exploreText, {autoAlpha: 0, duration: 0.3, y: -50, delay: 0.2}, '-=0.20')
  .from(mainHeading, {autoAlpha: 0, duration: 0.3, y: -50, delay: 0.2}, '-=0.20')
  .from(seachContainer, {autoAlpha: 0, duration: 0.3, x: -100, delay: 0.2}, '-=0.20')
  .from(storiesContainer, {autoAlpha: 0, duration: 0.3, x: -100, delay: 0.2}, '-=0.20')
  .from(headerLeftImg, {autoAlpha: 0, duration: 0.5, x: -200})
  .to(headerRight, {duration: 0.3, backgroundColor: 'purple'})
  .from(accountContainer, {autoAlpha: 0, duration: 0.3, x: -100, delay: 0.2}, '-=0.20')
  .from(graphics, {autoAlpha: 0, duration: 0.3, x: -100, rotation: -45, delay: 0.2}, '-=0.20')
}
