import '../scss/pages/index.scss';
import './form';

// Initialise imported function as jQuery function
import iziModal from 'izimodal/js/iziModal';
$.fn.iziModal = iziModal;

// #modal-youtube
$(document).ready(() => {
  $('#modal-youtube').iziModal({
    title: 'What is GRC?',
    headerColor: 'black',
    background: 'black',
    borderBottom: false,
    closeButton: true,
    transitionIn: 'fadeInDown',
    iframe: true,
    iframeHeight: 315,
    width: 560,
    fullscreen: true,
    iframeURL: 'https://www.youtube.com/embed/F3TGcQWCH1g',
    history: false,
    loop: true
  });
});
