const navBtn = document.getElementsByClassName('navBtns');
const navBurger = document.getElementById('navburger');
const navBurgerOptions = document.getElementById('navburgerOptions');
const burgerLine = document.getElementsByClassName('burgerline');

const containBox = document.getElementsByClassName('containbox');

function animateBurger() {
    navBurgerOptions.classList.toggle('navrightShow');
    // animation to burger lines go to X
    burgerLine[0].classList.toggle('burgerlineX1');
    burgerLine[1].classList.toggle('burgerlineX2');
    burgerLine[2].classList.toggle('burgerlineX3');
}
navBurger.addEventListener('click', () => {
    animateBurger();
});

for (let i = 0; i < navBtn.length; i++) {
    navBtn[i].addEventListener('click', () => {
        containBox[i].classList.add('navShow');
        animateBurger();
        for (let j = 0; j < navBtn.length; j++) {
            if (j != i) {
                containBox[j].classList.remove('navShow');
            }
        }
    });
}