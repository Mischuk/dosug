function sidebar() {
  var $trigger = $('.mobile-sidebar-trigger');
  $trigger.on('click', function(){
    $(this).toggleClass('open');
    $('.m_sidebar').toggleClass('open');
    $('.background-layout').toggleClass('zindex-large open');
  });
};
sidebar();

function profileImages() {
  $('.profile-sidebar .images .item').magnificPopup({
    type: 'image',
    gallery:{
      enabled:true
    }
  });
};
profileImages();