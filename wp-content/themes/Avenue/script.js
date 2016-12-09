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

  function isMobile() {
    return window.Modernizr.mq('(max-width: 767px)');
  }

  return {
    isTouch: isTouch,
    isMobile: isMobile,
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
 *  @name favorites
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

  var pluginName = 'favorites';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  var getTotalLikes = function () {

    var that = this,
        el = that.element,
        postsId = el.data('posts-id');

    $.ajax({
      url: el.data('url'),
      method: 'POST',
      data: {
        action : 'process_simple_like',
        post_id : postsId,
        is_comment: '0'
      }
    }).done(function (response) {
      var totalLikes = response.totalLikes;
      el.attr('data-original-title', totalLikes + ' likes')
        .toggleClass('fa-heart-o fa-heart');
    });

  };

  Plugin.prototype = {
    init: function() {

      var that = this,
          el = that.element;

      el.off('click.' + pluginName).on('click.' + pluginName, function (e) {
        e.preventDefault();
        getTotalLikes.call(that);
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

    $('[data-' + pluginName + ']')[pluginName]();

  });

}(jQuery, window));

/**
 *  @name popup
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    onBeforeShow
 *    onAfterShow
 *    onBeforeHide
 *    onAfterHide
 *  @methods
 *    init
 *    initOverlay
 *    show
 *    hide
 *    openPopup
 *    closePopup
 *    destroy
 */
;(function($, window, undefined) {

  'use strict';

  var pluginName = 'popup',
      win = $(window),
      body = $('body'),
      doc = $(document),
      container = $('#container'),
      scroll = 0;

  var resize = function(){
    var MARGINMIN = !Site.isMobile() ? 20 : 0,
      wrap = this.popup,
      dialog = wrap.find('.modal-dialog'),
      hPopup =  dialog.outerHeight(),
      wPopup = dialog.outerWidth(),
      hWrap = wrap.outerHeight(),
      wWrap = wrap.outerWidth(),
      minHWrap = hWrap - MARGINMIN,
      space = MARGINMIN / 2;

    dialog.css('margin', '' +
      '' + ((hWrap > hPopup) ? (hWrap - hPopup)/2 : space) + 'px ' +
      '' + ((wWrap > wPopup) ? 'auto ' : space + 'px ') +
      '' + ((minHWrap > hPopup) ? '0': space + 'px') );
  };

  var initOverlay = function() {
    var opt = this.options,
      selector = opt.overlay.replace(/ /g,'.'),
      overlay = $(selector, body);

    if(!overlay.length){
      overlay = $('<div class="' + $.trim(opt.overlay) + ' ' + opt.hidden + '"></div>');
      body.append(overlay);
    }

    return overlay;
  };

  var openPopup = function() {
    var that = this,
      opts = that.options,
      overlay = initOverlay.call(that);

    scroll = win.scrollTop();
    that.element.addClass(opts.open);

    container.css('marginTop', -scroll);

    body.addClass(opts.freeze);

    that.overlay.removeClass(opts.hidden);

    $.isFunction(opts.onBeforeShow) && opts.onBeforeShow(that);

    that.popup.fadeIn(opts.duration, function(){
      $.isFunction(opts.onAfterShow) && opts.onAfterShow(that);
    });
  };

  var closePopup = function() {
    var that = this,
      opt = that.options;

    $.isFunction(opt.onBeforeHide) && opt.onBeforeHide(that);

    that.popup.fadeOut(opt.duration, function(){
      $.isFunction(opt.onAfterHide) && opt.onBeforeHide(that);
    });

  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        opts = this.options,
        el = this.element;

      that.popup = $(el.attr('href') || el.data('href'));
      that.popupBody = $(opts.popupBody, that.popup);
      that.scrollable = $(opts.scrollable, body);
      that.overlay = initOverlay.call(that);

      el.off('click.' + pluginName).on('click.' + pluginName, function(e){
        e.preventDefault();
        that.show();
      });

      $(opts.closeBtn, that.popup).off('click.' + pluginName).on('click.' + pluginName, function(e){
        e.preventDefault();
        that.hide();
      });

      win.on('resize.' + pluginName, function(){
        that.popup.css('padding-left', 0);
        resize.call(that);
      });

      that.popup.off('click.' + pluginName).on('click.' + pluginName, function(e){
        !$(e.target).closest(that.popupBody).length && that.hide();
      });
    },
    show: function(){
      var that = this,
        el = that.element,
        data = el.data(),
        opts = that.options;

      switch(true) {
        case !!data.content:
          opts.type === 'video' ? that.popupBody.wrapInner(opts.wrapper).find('.embed-responsive').html(data.content) : that.popupBody.html(data.content);
          openPopup.call(that); resize.call(that);
        break;
        case !!data.link:
          $.get(data.link, function(res){
            that.popupBody.html(res);
            openPopup.call(that); resize.call(that);
          });
        break;
        default:
          openPopup.call(that); resize.call(that);
      }
    },
    hide: function(){
      var that = this,
        opts = that.options;

      body.removeClass(opts.freeze);
      that.element.removeClass(opts.open);

      closePopup.call(that);

      container.removeAttr('style');
      win.scrollTop(scroll);
      that.overlay.addClass(opts.hidden);
      that.popupBody.html('');

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
    freeze: 'lock-position',
    hidden: 'hidden',
    closeBtn: '.close',
    duration: 500,
    type: 'video',
    popupBody: '.modal-body',
    scrollable: '.scrollable-popup',
    overlay: ' modal-backdrop fade in',
    wrapper: '<div class="embed-responsive embed-responsive-4by3"></div>'
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
