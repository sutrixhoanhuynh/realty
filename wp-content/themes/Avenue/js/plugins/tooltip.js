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
