import './common.js';
import '../scss/index.scss';

$(document).ready(() => {
  // click to more btn
  const moreBtn = $('.js-more-btn');

  moreBtn.on('click', e => {
    e.preventDefault();

    // сохраняем расстояние до h1 в переменную
    let scrollToPromoBlock = $('.promo-block').offset().top;

    // скролим тело документа (html и body для кроссбраузерности) на расстояние scrollHight 500млс
    $('html, body').animate({ scrollTop: scrollToPromoBlock }, 500);
  });



  // // top-block height on mobile
  // const topBlock = $('.top-block');
  // let vh = window.innerHeight * 0.01;
  // topBlock.style.setProperty('--vh', `${vh}px`);

  // window.addEventListener('resize', () => {
  //   let vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty('--vh', `${vh}px`);
  // })
});
