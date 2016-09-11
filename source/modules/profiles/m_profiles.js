function profilesLength(){
  var sum = 0;
  $('input[name="profiles-select"]').on('change', function(){
    if ( $(this).is(':checked') ) {
      sum++;
      $('#profiles-selected').text(sum);
      $('.profiles-options button').prop('disabled', false);
    } else {
      sum--;
      $('#profiles-selected').text(sum);
      if (sum == 0) {
        $('.profiles-options button').prop('disabled', true);
      }
    }
  });
};
profilesLength();

