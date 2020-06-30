import AOS from 'aos';

import iziModal from 'izimodal/js/iziModal';
$.fn.iziModal = iziModal;


import lozad from 'lozad';
// images lazy-loading + show preloader
const observer = lozad('.lozad', {
  rootMargin: '10px 0px',
  threshold: 0.1,
});


// initialize lozad
observer.observe();


$(document).ready(() => {
  // toggle header menu
  const burgerIcon = $('.js-burger');

  burgerIcon.on('click', e => {
    e.preventDefault();

    burgerIcon.toggleClass('open');
  });

  // open modals
  const openModalLink = $('.open-modal-click');

  openModalLink.on('click', function(e) {
    e.preventDefault();

    // clicked link data
    const openModalLinkData = $(this).data();

    // modal element
    const modal = $('#modal-vimeo');

    // to reset initial iframeURL !!!
    modal.iziModal('destroy');

    modal.iziModal({
      title: openModalLinkData.izimodalTitle,
      subtitle: openModalLinkData.izimodalSubtitle,
      headerColor: 'black',
      background: 'black',
      borderBottom: false,
      closeButton: true,
      transitionIn: 'fadeInDown',
      iframe: true,
      iframeHeight: 315,
      width: 560,
      fullscreen: true,
      iframeURL: openModalLinkData.izimodalIframeurl,
      history: false,
      loop: false,

      // to reset fullscreen state
      onClosing: function () {
        modal.iziModal('setFullscreen', false);
      },
    });
  });
});


// AOS
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 600, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});
