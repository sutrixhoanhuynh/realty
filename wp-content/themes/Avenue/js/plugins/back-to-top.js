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
