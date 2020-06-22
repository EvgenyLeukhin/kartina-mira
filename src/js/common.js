// import izimodal
import iziModal from 'izimodal/js/iziModal';
$.fn.iziModal = iziModal;


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
    const modal = $('#modal-youtube');

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
