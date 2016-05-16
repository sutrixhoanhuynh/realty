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
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Previous" role="button"><span class="flaticon-previous11"></span></button>',
    nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Next" role="button"><span class="flaticon-next15"></span></button>',
    responsive: [{
      breakpoint: 480,
      settings: {
        arrows: false
      }
    }]
  };

  $(function() {

    $('[data-' + pluginName + ']')[pluginName]();

  });

}(jQuery, window));
