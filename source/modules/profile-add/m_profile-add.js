// Add banner price calculation
function partnershipPriceCalc() {
  var $select = $('.select-date select');
  $select.on('change', function(e){
    var i = 0;
    $select.each(function(){
      var val = $(this).select2("val");
      if ( val == '' ) {
      } else {
        i++;
      }
    });
    if ( i == 3) {
      var day = $('[name="date-day"]').select2("val");
      var month = $('[name="date-month"]').select2("val");
      var year = $('[name="date-year"]').select2("val");
      $('#date-end').val(month+'/'+day+'/'+year);
      daydiffs = daydiff(parseDate($('#date-start').val()), parseDate($('#date-end').val()));
      if ( daydiffs*bannerPrice > -1 ) {
        $('#total-sum').text(daydiffs*bannerPrice).number( true, 0, '.', ' ' );
      } else {
        $('#total-sum').text('0');
      }
    }
  });


  function currentDate() {
    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    var output =  ((''+month).length<2 ? '0' : '') + month + '/' + ((''+day).length<2 ? '0' : '') + day + '/' + d.getFullYear() + '/';
    $('#date-start').val(output);
  };
  currentDate();

  function parseDate(str) {
      var mdy = str.split('/');
      return new Date(mdy[2], mdy[0]-1, mdy[1]);
  }

  function daydiff(first, second) {
      return Math.round((second-first)/(1000*60*60*24));
  }

  function selectPrice() {
    bannerPrice = $('select[name="select-price"]').select2("val");

    $('.select-place select').on('change', function(e){
      bannerPrice = $('select[name="select-price"]').select2("val");

      var i = 0;
      $('.select-date select').each(function(){
        var val = $(this).select2("val");
        if ( val == '' ) {
        } else {
          i++;
        }
      });
      if ( i == 3) {
        if ( daydiffs*bannerPrice > -1 ) {
          $('#total-sum').text(daydiffs*bannerPrice).number( true, 0, '.', ' ' );
        } else {
          $('#total-sum').text('0');
        }
      }


    });
  };
  selectPrice();
};
partnershipPriceCalc();

// Map for profile add
if ( $('#map').length ) {
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
      center: [59.22, 39.89],
      zoom: 13,
      controls: ['zoomControl']
    }),
    // Создаем экземпляр класса ymaps.control.SearchControl
    mySearchControl = new ymaps.control.SearchControl({
      options: {
        float: 'right',
        floatIndex: 100,
        noPlacemark: true,
        placeholderContent: 'Введите станцию метро',
        kind: 'metro'
      }
    }),
    // Результаты поиска будем помещать в коллекцию.
    mySearchResults = new ymaps.GeoObjectCollection(null, {
      hintContentLayout: ymaps.templateLayoutFactory.createClass('$[properties.name]')
    });
    myMap.controls.add(mySearchControl);
    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects.add(mySearchResults);
    // При клике по найденному объекту метка становится красной.
    mySearchResults.events.add('click', function (e) {
      e.get('target').options.set('preset', 'islands#redIcon');
    });
    // Выбранный результат помещаем в коллекцию.
    mySearchControl.events.add('resultselect', function (e) {
      var index = e.get('index');
      mySearchControl.getResult(index).then(function (res) {
        mySearchResults.add(res);
      });
    }).add('submit', function () {
      mySearchResults.removeAll();
    })
  });
}