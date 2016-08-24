function vipCarousel() {
  var $carousel = $('.vip-carousel');
  $carousel.on('init', function(event, slick, direction){
    $(this).css('opacity', '1');
  });
  $carousel.slick({
    slidesToShow: 8,
    arrows: false,
    dots: false,
    swipeToSlide: true,
    speed: 150,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 6
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });
};
vipCarousel();