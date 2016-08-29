var Site = (function($, window, undefined) {

  function isTouch() {
    return Modernizr.touch;
  }

  function initTooltip() {
    !isTouch() && $('[data-toggle="tooltip"]').tooltip();
  }

  return {
    isTouch: isTouch,
    initTooltip: initTooltip
  };

})(jQuery, window);

jQuery(function() {
  Site.initTooltip();
});
/**
 *  @name carousel
 *  @description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'carousel';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {

      var that = this,
          el = that.element;

      el.slick(that.options);

    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    dots: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Previous" role="button"><span class="flaticon-previous11"></span></button>',
    nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Next" role="button"><span class="flaticon-next15"></span></button>',
    responsive: [{
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: false
      }
    }]
  };

  $(function() {

    $('[data-' + pluginName + ']')[pluginName]();

  });

}(jQuery, window));
/**
 *  @name back-to-top
 *  @description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var win = $(window),
      doc = $(document),
      htmlBody = $('html, body'),
      pluginName = 'back-to-top';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {

      var that = this,
          el = that.element,
          opts = that.options,
          footer = $(opts.footer);

        win.on('scroll.' + pluginName, function() {

          var scroll = win.scrollTop(),
              height = footer.length ? footer.height() : 0;

          scroll > opts.limit ? el.fadeIn() : el.fadeOut();

          if (scroll + win.height() < doc.height() - height) {
            el.removeClass(opts.fixed).addClass(opts.scrolling);
          } else {
            el.removeClass(opts.scrolling).addClass(opts.fixed);
          }

      });

      el.off('click.' + pluginName).on('click.' + pluginName, function() {

        htmlBody.animate({scrollTop: 0}, opts.duration);
        return false;

      });

    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    limit: 100,
    duration: 800,
    fixed: 'fixed',
    scrolling: 'scrolling',
    footer: 'footer .bottom-bar'
  };

  $(function() {

    $('[data-' + pluginName + ']')[pluginName]();

  });

}(jQuery, window));
/**
 *  @name validation
 *  @description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
 ;(function($, window, undefined) {
  'use strict';

  var pluginName = 'validation',
      isValid = {
        required: function () {
          var el = this;
          if (el.is(':checkbox, :radio')) {
              return el.is(':checkbox:checked, :radio:checked');
          }
          return !!$.trim(el.val()).length;
        }
      };

  var hideError = function (el, options) {

    var wrapper = el.closest(options.wrapper);

    wrapper.addClass(options.success).removeClass(options.error);

    return true;
  };

  var showError = function (el, options) {

    var wrapper = el.closest(options.wrapper);

    el.focus();

    wrapper.addClass(options.error).removeClass(options.success);

    return false;
  };

  var validation = function (el, options) {

    var rules = el.data('rule');

    for (var i = 0, len = rules.length; i < len; i++) {
      if (!isValid[rules[i]].call(el)) {
        return showError(el, options);
      }
    }
    return hideError(el, options);
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {

      var that = this,
        el = that.element,
        options = that.options,
        fields = $('[data-rule]', el);

      el.on('change.' + pluginName, '[data-rule]:checkbox, [data-rule]:radio, [data-rule]:file, select[data-rule]', function () {
        validation($(this), options);
      });

      el.on('submit.' + pluginName , function () {

        var isValid = true;

        fields.each(function () {
          isValid = validation($(this), options);
          return isValid;
        });

        return isValid;

      });

    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    error: 'error',
    success: 'success',
    wrapper: '.form-group'
  };

  $(function() {

    $('[data-' + pluginName + ']')[pluginName]();

  });

}(jQuery, window));
/**
 *  @name recaptcha
 *  @description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {

  'use strict';

  var pluginName = 'recaptcha';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {

      var that = this,
          opts = that.options;

      grecaptcha.render(that.element[0], {
        'sitekey': opts.sitekey,
        'theme': opts.theme
      });

    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    theme: 'light'
  };

  $(function() {

    window.loadCaptcha = function () {
      $('[data-' + pluginName + ']')[pluginName]();
    };

  });

}(jQuery, window));
/**
 *  @name contact-map
 *  @description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {

  'use strict';

  var pluginName = 'contact-map';

  var initMap = function () {

    var that = this,
        opts = that.options;

    that.map = new google.maps.Map(that.element[0], {
      zoom: opts.zoom,
      center: opts.location,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    that.marker = new google.maps.Marker({
      map: that.map,
      position: opts.location,
      animation: google.maps.Animation.DROP,
      icon: opts.markerIcon,
      title: opts.title
    });

    that.infoWindow = new google.maps.InfoWindow({
      content: $(opts.content).html(),
      maxWidth: 260
    });

  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {

      var that = this;
      initMap.call(that);

      //that.infoWindow.open(that.map, that.marker);

    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    zoom: 18,    
    location: {
      lat: 10.791628,
      lng: 106.637023
    }
  };

  $(function() {

    window.initMap = function () {
      $('[data-' + pluginName + ']')[pluginName]();
    };

  });

}(jQuery, window));
