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
          el = that.element,
          opts = that.options,
          captcha = null;

      captcha = grecaptcha.render(that.element[0], {
        'sitekey': opts.sitekey,
        'theme': opts.theme
      });

      el.data('captcha', captcha);

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
    theme: 'light',
    error: 'error',
    success: 'success',
    wrapper: '.form-group',
    icon: '<i class="fa fa-warning" aria-hidden="true"></i>'
  };

  $(function() {

    window.loadCaptcha = function () {
      $('[data-' + pluginName + ']')[pluginName]();
    };

  });

}(jQuery, window));
