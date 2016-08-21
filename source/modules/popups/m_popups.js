function popups() {
  $('.call-popup').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });

  $('.recovery-password-popup').on('click', function(){
    $.magnificPopup.close();
    setTimeout(function(){
      $('.recovery-trigger').trigger('click');
    }, 300);
  });

  $('.signin-popup').on('click', function(){
    $.magnificPopup.close();
    setTimeout(function(){
      $('.signin-trigger').trigger('click');
    }, 300);
  });
};
popups();