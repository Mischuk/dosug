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
        alert($(this).select2("val"));
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

    //=include modules.js
});