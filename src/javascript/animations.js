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
