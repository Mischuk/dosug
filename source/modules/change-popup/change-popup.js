function changePopup() {
  $('.call-change').magnificPopup({
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

  if ( $('#slider-format').length ) {
    var sliderFormat = document.getElementById('slider-format');

    noUiSlider.create(sliderFormat, {
      start: [ 4 ],
      step: 1,
      range: {
        'min': [ 1 ],
        'max': [ 250 ]
      },
      format: wNumb({
        decimals: 0,
        thousand: ' ',
        postfix: '',
      })
    });
    $('#input-format').on('click', function () {
      $(this).select();
    });
    $('#input-format').on('keyup', function () {
      var val = $(this).val();
      sliderFormat.noUiSlider.set(val);
    });
    sliderFormat.noUiSlider.on('update', function(){
      var current = $('#input-format').val();
      var pos = $('#pos');
      if ( (current >= 24) && (current < 95)) {
        pos.text('113-118');
      } else if ( (current >= 95) && (current < 119)) {
        pos.text('3-116');
      } else if ( (current >= 119) && (current < 144)) {
        pos.text('1-6');
      } else if ( (current >= 144) && (current < 169)) {
        pos.text('1-5');
      } else if ( current >= 169) {
        pos.text('1-4');
      } else if ( current <= 94) {
        pos.text('116-222');
      }
    });


    var inputFormat = document.getElementById('input-format');

    sliderFormat.noUiSlider.on('update', function( values, handle ) {
      inputFormat.value = values[handle];
    });

    inputFormat.addEventListener('change', function(){
      sliderFormat.noUiSlider.set(this.value);
    });
  }
};
changePopup();