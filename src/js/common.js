$(document).ready(() => {

  // toggle header menu
  const burgerIcon = $('.js-burger');

  burgerIcon.on('click', e => {
    e.preventDefault();

    burgerIcon.toggleClass('open');
  });
});
