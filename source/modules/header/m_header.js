$(window).scroll(function(){
  var $header = $('.m_header');

  if ($(this).scrollTop() > 90) {
      $header.addClass('fixed');
  } else {
      $header.removeClass('fixed');
  }
});

// Close
function closeSubway() {
  $('.background-layout').removeClass('open');
  $('.subway a, .m_subway-list').removeClass('open');
};

function closeMenu() {
  $('.background-layout').removeClass('open');
  $('.mobile-menu-trigger').removeClass('open');
  $('.mobile-menu-trigger').next().removeClass('open');
};

function closeFilters() {
  $('.background-layout').removeClass('open');
  $('.mobile-filters-trigger').removeClass('open');
  $('.m_filters').removeClass('open');
};

// Menu
function mobileMenu() {
  $('.mobile-menu-trigger').on('click', function(){
    if ( $(this).hasClass('open') ) {
      $(this).removeClass('open');
      $(this).next().removeClass('open');
      $('.background-layout').removeClass('open');
    } else {
      closeSubway();
      closeFilters()
      $(this).addClass('open');
      $(this).next().addClass('open');
      $('.background-layout').addClass('open');
    }
  });
};
mobileMenu();

// Subway
function mobileSubway() {
  $('.subway a').on('click', function(){
    if ( $(this).hasClass('open') ) {
      $(this).removeClass('open');
      $('.m_subway-list').removeClass('open');
      $('.background-layout').removeClass('open');
    } else {
      closeMenu();
      closeFilters()
      $(this).addClass('open');
      $('.m_subway-list').addClass('open');
      $('.background-layout').addClass('open');
    }
  });
};
mobileSubway();

// Filters
function mobileFilters() {
  $('.mobile-filters-trigger').on('click', function(){
    if ( $(this).hasClass('open') ) {
      $(this).removeClass('open');
      $('.m_filters').removeClass('open');
      $('.background-layout').removeClass('open');
    } else {
      closeSubway();
      closeMenu();
      $(this).addClass('open');
      $('.m_filters').addClass('open');
      $('.background-layout').addClass('open');
    }
  });
};
mobileFilters();

$('.m_subway-list .close').on('click', function(){
  closeSubway()
});

// Background layout
function bgLayout() {
  $('.background-layout').on('click', function(){
      // This close
      $(this).removeClass('open');
      closeSubway();
      closeMenu();
      closeFilters();
  });
};
bgLayout();
