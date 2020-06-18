$(document).ready(() => {

  // toggle header menu
  const burgerIcon = $('.js-burger');

  burgerIcon.on('click', e => {
    e.preventDefault();

    burgerIcon.toggleClass('open');
  });



  // click to more btn
  const moreBtn = $('.js-more-btn');

  moreBtn.on('click', e => {
    e.preventDefault();

    // сохраняем расстояние до h1 в переменную
    let scrollToPromoBlock = $('.promo-block').offset().top;

    // скролим тело документа (html и body для кроссбраузерности) на расстояние scrollHight 500млс
    $('html, body').animate({ scrollTop: scrollToPromoBlock }, 500);
  });
});
