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
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Previous" role="button"><span class="fa fa-angle-left"></span></button>',
    nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Next" role="button"><span class="fa fa-angle-right"></span></button>',
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

  var initMap = function() {

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
 *  @name custom-select
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

  var doc = $(document),
    pluginName = 'custom-select';

  var initSelect = function() {

    var that = this,
        el = that.element,
        opts = that.options,
        listOpts = $('option', el),
        selectList = '<ul class="select-list">',
        selectBox = '<a href="javascript:;" class="control">';

    listOpts.each(function() {

      var optionTag = $(this),
          optionContent = $.trim(optionTag.text()),
          optionValue = optionTag.attr('value') ? optionTag.attr('value') : optionContent;

      if (optionTag.is(':selected')) {
        selectList += '<li class="' + opts.selectedClass +'">';
        selectBox += optionContent + opts.icon + '</a>';
      } else {
        selectList += '<li>';
      }

      selectList += '<a href="javascript:;" data-value="' + optionValue + '">' + optionContent +'</a></li>';

    });

    selectList += '</ul>';

    el.wrap(opts.template).parent()
      .css('width', opts.width === 'auto' ? el.outerWidth(true) : '')
      .append(selectBox).append(selectList).end().addClass(opts.hiddenClass);

    return el.parent();

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
          opts = that.options,
          customSelect = el.closest('.' + pluginName);

      that.select = customSelect.length ? customSelect : initSelect.call(that);
      that.selectBox = $('.control', that.select);
      that.selectList = $('.select-list', that.select);
      that.listOpts = $('li', that.selectList);

      that.selectBox.off('click.' + pluginName)
      .on('click.' + pluginName, function() {
        that.slideToggle();
        return false;
      });

      $('a', that.selectList).off('click.' + pluginName)
      .on('click.' + pluginName, function(e) {

        var clicked = $(this);

        that.selectOption(clicked);

        return false;

      });

      doc.on('click.' + pluginName, function(e) {

        var target = $(e.target);

        if (!target.closest(that.select).length &&
          that.select.hasClass(opts.activeClass)) {
          that.slideToggle();
        }
      });

    },
    selectOption: function(clicked) {

      var that = this,
          opts = that.options,
          content = $.trim(clicked.text()),
          selectedOpt = clicked.parent();

      that.selectBox.html(content + opts.icon);
      that.listOpts.removeClass(opts.selectedClass);
      selectedOpt.addClass(opts.selectedClass);
      that.slideToggle();

    },
    slideToggle: function() {

      var that = this,
          opts = that.options;

      that.select.toggleClass(opts.activeClass);
      that.selectBox.toggleClass(opts.activeClass);
      that.selectList.stop(true, true).slideToggle(opts.duration);
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
    duration: 300,
    hiddenClass: 'hidden',
    activeClass: 'active',
    selectedClass: 'selected',
    template: '<div class="custom-select"></div>',
    icon: '<i class="arrows-icon"></i>'
  };

  $(function() {

    $('[data-' + pluginName + ']')[pluginName]();

  });

}(jQuery, window));

/**
 *  @name isotope
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

  var pluginName = 'isotope';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {

      var that = this,
        el = that.element,
        opts = that.options;

      el.imagesLoaded(function () {
        el.isotope(opts);
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
    itemSelector: '.grid-item',
    layoutMode: 'masonry',
    percentPosition: true,
    masonry: {
      columnWidth: '.grid-sizer'
    }
  };

  $(function() {

    $('[data-' + pluginName + ']')[pluginName]();

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

  var pluginName = 'likes';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  var toggleLikes = function () {

    var that = this,
        el = that.element,
        opts = that.options,
        postsId = el.data('posts-id');

    $.ajax({
      url: el.data('url'),
      method: 'POST',
      data: {
        action : 'process_simple_like',
        post_id : postsId
      }
    }).done(function (response) {
      var totalLikes = response.totalLikes;

      el.toggleClass(opts.dislikeIcon + ' ' + opts.likeIcon);

      $.isFunction(opts.onSuccess) && opts.onSuccess(el, totalLikes);

    });

  };

  Plugin.prototype = {
    init: function() {

      var that = this,
          el = that.element;

      el.off('click.' + pluginName).on('click.' + pluginName, function (e) {
        e.preventDefault();
        toggleLikes.call(that);
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
    likeIcon: 'fa-heart',
    dislikeIcon: 'fa-heart-o',
    onSuccess: $.noop()
  };

  $(function() {

    $('[data-' + pluginName + ']')[pluginName]({
      onSuccess: function(el, totalLikes) {
        el['tooltip']('changeContent', totalLikes + ' likes');
      }
    });

  });

}(jQuery, window));

/**
 *  @name modal
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
 *    openModal
 *    closeModal
 *    destroy
 */
;(function($, window, undefined) {

  'use strict';

  var pluginName = 'modal',
      win = $(window),
      body = $('body'),
      container = $('#container'),
      scroll = 0;

  var resize = function() {
    var MARGINMIN = !Site.isMobile() ? 20 : 0,
      wrap = this.modal,
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
    var opts = this.options,
      selector = opts.overlay.replace(/ /g,'.'),
      overlay = $(selector, body);

    if(!overlay.length){
      overlay = $('<div class="' + $.trim(opts.overlay) + ' ' + opts.hidden + '"></div>');
      body.append(overlay);
    }

    return overlay;
  };

  var openModal = function() {
    var that = this,
      opts = that.options,
      overlay = initOverlay.call(that);

    scroll = win.scrollTop();
    that.element.addClass(opts.open);

    container.css('marginTop', -scroll);

    body.addClass(opts.freeze);

    that.overlay.removeClass(opts.hidden);

    $.isFunction(opts.onBeforeShow) && opts.onBeforeShow(that);

    that.modal.stop(true, true).fadeIn(opts.duration, function(){
      $.isFunction(opts.onAfterShow) && opts.onAfterShow(that);
    });
  };

  var closeModal = function() {
    var that = this,
      opt = that.options;

    $.isFunction(opt.onBeforeHide) && opt.onBeforeHide(that);

    that.modal.stop(true, true).fadeOut(opt.duration, function(){
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

      that.modal = $(el.attr('href') || el.data('href'));
      that.modalBody = $(opts.modalBody, that.modal);
      that.scrollable = $(opts.scrollable, body);
      that.overlay = initOverlay.call(that);

      el.off('click.' + pluginName).on('click.' + pluginName, function(e){
        e.preventDefault();
        that.show();
      });

      $(opts.closeBtn, that.modal).off('click.' + pluginName).on('click.' + pluginName, function(e){
        e.preventDefault();
        that.hide();
      });

      win.on('resize.' + pluginName, function(){
        that.modal.css('padding-left', 0);
        resize.call(that);
      });

      that.modal.off('click.' + pluginName).on('click.' + pluginName, function(e){
        !$(e.target).closest(that.modalBody).length && that.hide();
      });
    },
    show: function(){
      var that = this,
        el = that.element,
        data = el.data(),
        opts = that.options;

      switch(true) {
        case !!data.content:
          opts.type === 'video' ? that.modalBody.wrapInner(opts.wrapper).find('.embed-responsive').html(data.content) : that.modalBody.html(data.content);
          openModal.call(that); resize.call(that);
        break;
        case !!data.link:
          $.get(data.link, function(res){
            that.modalBody.html(res);
            openModal.call(that); resize.call(that);
          });
        break;
        default:
          openModal.call(that); resize.call(that);
      }
    },
    hide: function(){
      var that = this,
        opts = that.options;

      body.removeClass(opts.freeze);
      that.element.removeClass(opts.open);

      closeModal.call(that);

      container.removeAttr('style');
      win.scrollTop(scroll);
      that.overlay.addClass(opts.hidden);
      that.modalBody.html('');

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
    modalBody: '.modal-body',
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
 *  @name tooltip
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
    pluginName = 'tooltip',
    direction = ['top', 'bottom', 'left', 'right'];

  var initTooltip = function() {
    var that = this,
      body = $('body'),
      tooltip = $(that.options.selector);

    if (!tooltip.length) {
      tooltip = $(that.options.template);
      body.append(tooltip);
    }
    return tooltip;
  };

  var getPlacement = function(target, tooltip) {
    var that = this,
      opts = that.options,
      placement = [],
      docSize = {
        width: doc.width(),
        height: doc.height()
      },
      offset = {
        left: target.left - (tooltip.width / 2) + (target.width / 2),
        right: target.left + (tooltip.width / 2) + (target.width / 2),
        top: target.top - (tooltip.height / 2) + (target.height / 2),
        bottom: target.top + (tooltip.height / 2) + (target.height / 2)
      },
      position = {
        top: target.top - tooltip.height - opts.offset,
        bottom: target.top + target.height + tooltip.height + opts.offset,
        left: target.left - tooltip.width - opts.offset,
        right: target.left + target.width + opts.offset + tooltip.width
      },
      scroll = {
        left: opts.container ? that.container.scrollLeft() : 0,
        top: opts.container ? that.container.scrollTop() : 0
      };

    $.each(direction, function(value){
      switch(value) {
        case 'top':
          position.top >= 0 && offset.left >= 0 &&
          offset.right <= docSize.width && placement.push(value);
        break;
        case 'bottom':
          position.bottom <= docSize.height && offset.left >= 0 &&
          offset.right <= docSize.width && placement.push(value);
        break;
        case 'left':
          position.left >= 0 && offset.top >= 0 &&
          offset.bottom <= docSize.height && placement.push(value);
        break;
        case 'right':
          position.right <= docSize.width && offset.top >= 0 &&
          offset.bottom <= docSize.height && placement.push(value);
        break;
      }
    });

    if(placement.length) {
      opts.placement = $.inArray(opts.placement, placement) !== -1 ?
      opts.placement : placement[0];
    }
    return opts.placement;
  };

  var getPosition = function() {
    var that = this,
      opts = that.options,
      target = {
        top: that.triggers.offset().top,
        left: that.triggers.offset().left,
        width: that.triggers.outerWidth(true),
        height: that.triggers.outerHeight(true)
      },
      position = {
        top: 0,
        left: 0
      },
      tooltip = {
        width: that.tooltip.outerWidth(true),
        height: that.tooltip.outerHeight()
      },
      placement = getPlacement.call(that, target, tooltip);

    switch (placement) {
      case 'top':
        position.top = target.top - tooltip.height - opts.offset;
        position.left = target.left - (tooltip.width / 2) + (target.width / 2);
        break;
      case 'left':
        position.top = target.top - (tooltip.height / 2) + (target.height / 2);
        position.left = target.left - tooltip.width - opts.offset;
        break;
      case 'right':
        position.top = target.top - (tooltip.height / 2) + (target.height / 2);
        position.left = target.left + target.width + opts.offset;
        break;
      case 'bottom':
        position.top = target.top + target.height + opts.offset;
        position.left = target.left - (tooltip.width / 2) + (target.width / 2);
        break;
    }
    return position;
  };

  var setPosition = function() {
    var that = this,
      opts = that.options,
      position = getPosition.call(that);

    that.tooltip.removeClass(direction.join(' ')).addClass(opts.placement);

    that.tooltip.css({
      top: position.top,
      left: position.left
    });
  };

  var openTooltip = function() {
    var that = this,
      opts = that.options;

    $.isFunction(opts.onBeforeShow) && opts.onBeforeShow(that);

    that.tooltip.stop(true, true).fadeIn(opts.duration, function() {
      that.element.addClass(opts.active);
      $.isFunction(opts.onAfterShow) && opts.onAfterShow(that);
    });
  };

  var tooltip = function() {
    var that = this,
      el = that.element,
      opts = that.options;

    if (!el.hasClass(opts.active)) {
      setPosition.call(that);
      openTooltip.call(that);
    }
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
        opts = that.options,
        originWidth = win.width();

      that.tooltip = initTooltip.call(that);
      that.tooltipBody = $(opts.tooltipBody, that.tooltip);
      that.triggers = opts.triggers ? $(opts.triggers, el) : el;

      if(opts.container) {
        that.container = el.closest(opts.container);
      }

      el.on('close', function() {
        el.hasClass(opts.active) && el.removeClass(opts.active);
      });

      that.triggers
      .off('click.' + pluginName)
      .on('click.' + pluginName, function() {

        var isActive = el.hasClass(opts.active);

        switch (true) {
          case opts.toggle:
            isActive ? that.hide() : that.show();
            break;
          case !opts.toggle:
            that.show();
            break;
        }
        return false;
      });

      doc.on('click.' + pluginName, function(e) {
        var target = $(e.target);

        if (el.hasClass(opts.active)) {
          !target.closest(that.tooltip).length && !target.closest(el).length &&
          that.hide();
        }
      });

      win.on('resize.' + pluginName, function() {
        var winWidth = win.width();

        if(originWidth !== winWidth) {
          that.hide();
          originWidth  = winWidth;
        }
      });

    },
    show: function() {

      var that = this,
        el = that.element,
        opts = that.options;

      switch (true) {
        case !!opts.content:
          that.tooltipBody.html(opts.content);
          tooltip.call(that);
          break;
        case !!opts.link:
          $.get(opts.link, function(res) {
            that.tooltipBody.html(res);
            tooltip.call(that);
          });
          break;
        default:
          tooltip.call(that);
      }

    },
    hide: function() {
      var that = this,
        opts = that.options;

      that.element.removeClass(opts.active);

      $.isFunction(opts.onBeforeHide) && opts.onBeforeHide(that);

      that.tooltip.stop(true, true).fadeOut(opts.duration, function() {
        $.isFunction(opts.onAfterHide) && opts.onAfterHide(that);
      });
    },
    changeContent: function(content) {
      $.type(content) === 'string' && this.tooltipBody.html(content);
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
    offset: 10,
    toggle: false,
    duration: 150,
    active: 'active',
    placement: 'top',
    selector: '.tooltip',
    tooltipBody: '.tooltip-inner',
    template: '<div class="tooltip" role="tooltip">' +
    '<div class="tooltip-arrow"></div>' +
    '<div class="tooltip-inner"></div></div>'
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
