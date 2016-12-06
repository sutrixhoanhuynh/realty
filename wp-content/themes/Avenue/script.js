var L10n = {
  validation: {
    required: {
      username: 'Please enter your name',
      email: 'Please enter email address'
    }
  }
}

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

    window.loadMap = function () {
      $('[data-' + pluginName + ']')[pluginName]();
    };

  });

}(jQuery, window));

/**
 *  @name modal
 *  @description show specific content in layer top screen
 *  @version 1.0
 *  @options
 *    template: template of modal
 *    overlay: template of overlay
 *    holderSelector: selector of modal holder
 *    overlaySelector: selector of overlay
 *    closeButton: selector of close button modal
 *    contentSelector: selector of content modal
 *    activeClass: class to active show/hide overlay
 *    autoTrigger: whether auto trigger event on element itself or not
 *    closeButtonClass: optional custom class for close button
 *    closeByDocument: enable/disable closing popup by clicking document itself
 *    closeByEscape: enable/disable closing popup by 'Esc' keyboard
 *    content: content of modal (only appcept string value)
 *    duration: time animation when show or hide modal
 *  @events
 *    onBeforeShow: fire before modal show
 *    onAfterShow: fire after modal show completely
 *    onBeforeShow: fire before modal show
 *    onAfterHide: fire after modal hide completely
 *  @methods
 *    init
 *    show: show modal
 *    hide: hide modal
 *    changeContent: change content of modal
 *    destroy
 */
;
(function($, window, undefined) {

  'use strict';

  var pluginName = 'modal',
      ESCKey = 27;

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  var initModal = function() {
    var that = this,
        body = $('body'),
        opts = that.options;

    !$(opts.overlaySelector).length && body.append(opts.overlay);
    !$(opts.holderSelector).length && body.append(opts.template);

    return {
      modal: $(opts.holderSelector),
      overlay: $(opts.overlaySelector)
    };

  };

  var getPosition = function() {
    var that = this,
        win = $(window),
        winSize = {
          width: win.width(),
          height: win.height()
        },
        position = {
          top: winSize.height / 2 - that.vars.modal.outerHeight() / 2,
          left: winSize.width / 2 - that.vars.modal.outerWidth() / 2
        };

    return {
      left: position.left < 0 ? 0 : position.left + win.scrollLeft(),
      top: position.top < 0 ? 0 : position.top + win.scrollTop()
    };

  };

  var setPosition = function() {
    var that = this,
        postion = getPosition.call(this);

    that.vars.modal.css({
      'top': postion.top + 'px',
      'left': postion.left + 'px'
    });
  };


  Plugin.prototype = {
    init: function() {
      var that = this,
          opts = that.options,
          win = $(window);

      that.vars = initModal.call(this);

      that.vars.overlay.css('height', $(document).height());

      $(opts.closeButton, that.vars.modal)
      .off('click.' + pluginName)
      .on('click.' + pluginName, function(e) {
        e.preventDefault();
        that.hide();
      });

      win.on('resize.' + pluginName, function(e) {
        e.preventDefault();
        setPosition.call(that);
      })
      .on('scroll.' + pluginName, function(e) {
        e.preventDefault();
        setPosition.call(that);
      });

      if (opts.autoTrigger) {
        that.element.off('click.' + pluginName).on('click.' + pluginName, function(e) {
          e.preventDefault();
          that.show();
        });
      }

      if (opts.closeByEscape) {
        win.on('keyup.' + pluginName, function(e) {
          e.preventDefault();
          e.keyCode === ESCKey && that.hide();
        });
      }

      if (opts.closeByDocument) {
        win.on('click.' + pluginName, function(e) {
          e.preventDefault();
          e.stopPropagation();
          $(e.target).is(that.vars.overlay) && that.hide();
        });
      }
    },
    show: function() {
      var that = this,
          opts = that.options,
          modal = that.vars.modal;

      $.isFunction(opts.onBeforeShow) && opts.onBeforeShow();

      setPosition.call(that);
      $(opts.overlaySelector, 'body').addClass(opts.activeClass);

      that.changeContent(opts.content);

      modal.fadeIn(opts.duration, function() {
        $.isFunction(opts.onAfterShow) && opts.onAfterShow();
      });
    },
    hide: function() {
      var that = this,
          opts = that.options,
          modal = that.vars.modal;

      $.isFunction(opts.onBeforeHide) && opts.onBeforeHide();

      $(opts.overlaySelector, 'body').removeClass(opts.activeClass);

      that.changeContent('');

      modal.fadeOut(opts.duration, function() {
        $.isFunction(opts.onAfterHide) && opts.onAfterHide();
      });

    },
    changeContent: function(params) {
      var that = this,
          opts = that.options,
          content = $(opts.contentSelector, that.vars.modal);

      content.html(params);
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
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

    $.fn[pluginName].defaults = {
        template: '<div class="modal"><button type="button" class="close-button-modal">' +
        '<i class="fa fa-times" aria-hidden="true"></i></button>' +
        '<div class="modal-content"></div>',
        overlay: '<div class="background-overlay"></div>',
        holderSelector: '.modal',
        overlaySelector: '.background-overlay',
        closeButton: '.close-button-modal',
        contentSelector: '.modal-content',
        activeClass: 'active',
        autoTrigger: true,
        closeByDocument: false,
        content: '',
        duration: 500,
        closeByEscape: true,
        onBeforeShow: null,
        onAfterShow: null,
        onBeforeHide: null,
        onAfterHide: null
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
        },
        email: function () {
          var el = this,
              re =  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
          return re.test($.trim(el.val()));
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
