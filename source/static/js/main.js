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

    /*!
     * IE10 viewport hack for Surface/desktop Windows 8 bug
     * Copyright 2014-2015 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     */

    // See the Getting Started docs for more information:
    // http://getbootstrap.com/getting-started/#support-ie10-width

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
      $(".mask-tel").mask("+7 (999) 999-99-99");
    };
    inputMask();

    // Custom select for all pages
    function select() {
      var $select = $("select");
      $select.on("change", function (e) {
        alert($(this).select2("val"));
      });
      $select.select2({
        minimumResultsForSearch: Infinity
      });
    };
    select();

    // Input[type="file"]
    function fileInput() {
      $('input[type="file"]').on('change', function(){
        if ( !$(this).val() == '' ) {
          var filename = $(this).val().split('\\').pop();
          $(this).next().find('.filename').text(filename);
          $(this).next().show();
          $(this).prev().hide();
          $(this).prev().prev().hide();
          $(this).hide();
        }
      });

      $('.clear-file-input').on('click', function(){
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

    //=include modules.js
});