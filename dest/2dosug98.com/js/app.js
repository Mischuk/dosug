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

    

    

    console.log('Layout generated');

    

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

    

    function subwaySort() {

      $('.m_subway-list li').each(function(){

        $(this).find('a b').parents('li').prev().css('display', 'block');

      });

    };

    subwaySort();
});