$(function() {
    $('a[href="#"]').click(function(e){e.preventDefault(); });

    // Polyfill to remove click delays on browsers with touch UIs
    FastClick.attach(document.body);

    // Detect if the user's browser IE
    function detectIE() {
      var BrowserDetect = {
              init: function () {
                  this.browser = this.searchString(this.dataBrowser) || "Other";
                  this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
              },
              searchString: function (data) {
                  for (var i = 0; i < data.length; i++) {
                      var dataString = data[i].string;
                      this.versionSearchString = data[i].subString;

                      if (dataString.indexOf(data[i].subString) !== -1) {
                          return data[i].identity;
                      }
                  }
              },
              searchVersion: function (dataString) {
                  var index = dataString.indexOf(this.versionSearchString);
                  if (index === -1) {
                      return;
                  }

                  var rv = dataString.indexOf("rv:");
                  if (this.versionSearchString === "Trident" && rv !== -1) {
                      return parseFloat(dataString.substring(rv + 3));
                  } else {
                      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
                  }
              },

              dataBrowser: [
                  {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
                  {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
                  {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
                  {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
                  {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
                  {string: navigator.userAgent, subString: "OPR", identity: "Opera"},

                  {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
                  {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
              ]
          };

          BrowserDetect.init();
          if (BrowserDetect.browser == 'Explorer') {
            $('html').addClass('IE');
          };
    };
    detectIE();

    // IE10 viewport hack for Surface/desktop Windows 8 bug
    (function () {
      'use strict';
      if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement('style')
        msViewportStyle.appendChild(
          document.createTextNode(
            '@-ms-viewport{width:auto!important}'
          )
        )
        document.querySelector('head').appendChild(msViewportStyle)
      }
    })();

    // Mask for form's input
    function inputMask() {
      $(".mask-date").mask("99.99.9999",{placeholder:"__.__.____"});
      $(".mask-year").mask("9999",{placeholder:""});
      $(".mask-tel").mask("+7 (999) 999-99-99",{placeholder:"X"});
    };
    inputMask();

    // Custom select for all pages
    function select() {
      var $select = $("select");
      $select.on("change", function (e) {
        console.log($(this).select2("val"));
      });
      $select.select2({
        minimumResultsForSearch: Infinity
      });
    };
    select();

    // Input[type="file"]
    function fileInput() {
      $('input[type="file"].multiple').on('change', function(){
        if ( !$(this).val() == '' ) {
          var files = $('input[type="file"]')[0].files;
          for (var i = 0; i < files.length; i++) {
            console.log(files[i].name);
            var filename = files[i].name.split('\\').pop();
            $(this).next().prepend('<div class="attached-file"><span class="filename">'+filename+'</span><label class="radio-custom"><input name="profile-lead-image" type="radio"/><span class="radio-icon"></span><span class="radio-label">Основное</span></label><span class="clear-file-input">×</span></div>');
            $(this).next().show();
          }
        }
      });

      $('input[type="file"].single').on('change', function(){
        if ( !$(this).val() == '' ) {
          var filename = $(this).val().split('\\').pop();
          $(this).next().find('.filename').text(filename);
          $(this).next().show();
          $(this).prev().hide();
          $(this).prev().prev().hide();
          $(this).hide();
        }
      });



      $('body').on('click', '.clear-file-input', function(){
        var fileinput = $(this).parent().prev();
        fileinput.val('');
        $(this).parent().hide();
        fileinput.show();
        fileinput.prev().show();
        fileinput.prev().prev().show();
        return false;
      });
    };
    fileInput();

    // Custom scroll
    $('.custom-scrollbar').perfectScrollbar();

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

    

    // Close

    function closeSubway() {

      $('.background-layout').removeClass('open');

      $('.subway a, .m_subway-list').removeClass('open');

      $('body').css('overflow', 'auto');

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

    

    function closeSidebar() {

      $('.mobile-sidebar-trigger').removeClass('open');

      $('.m_sidebar').removeClass('open');

      $('.background-layout').removeClass('open zindex-large');

    }

    

    // Menu

    function mobileMenu() {

      $('.mobile-menu-trigger').on('click', function(){

        if ( $(this).hasClass('open') ) {

          $(this).removeClass('open');

          $(this).next().removeClass('open');

          $('.background-layout').removeClass('open');

          $('.mobile-sidebar-trigger').show();

        } else {

          closeSubway();

          closeFilters()

          $(this).addClass('open');

          $(this).next().addClass('open');

          $('.background-layout').addClass('open');

          $('.mobile-sidebar-trigger').hide();

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

          $('body').css('overflow', 'auto');

          $('.mobile-sidebar-trigger').show();

        } else {

          closeMenu();

          closeFilters()

          $(this).addClass('open');

          $('.m_subway-list').addClass('open');

          $('.background-layout').addClass('open');

          $('body').css('overflow', 'hidden');

          $('.mobile-sidebar-trigger').hide();

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

          $('.mobile-sidebar-trigger').show();

        } else {

          closeSubway();

          closeMenu();

          $(this).addClass('open');

          $('.m_filters').addClass('open');

          $('.background-layout').addClass('open');

          $('.mobile-sidebar-trigger').hide();

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

          closeSidebar();

          $('.mobile-sidebar-trigger').show();

      });

    };

    bgLayout();

    

    

    var str = "Is this enough?";

    var patt1 = new RegExp("[^A-J]");

    var result = str.match(patt1);

    alert(result);

    

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

    if ( $('.m_profile-add #map').length ) {

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

    

    function subwaySort() {

      $('.m_subway-list li').each(function(){

        $(this).find('a b').parents('li').prev().css('display', 'block');

      });

    };

    subwaySort();

    

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
});