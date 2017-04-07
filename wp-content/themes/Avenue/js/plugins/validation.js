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
      validator = L10n.validation,
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
              regex =  /^([a-z0-9.]+)([a-z0-9]+)@(([a-z0-9]+)(\.)([a-z]+))+$/i;
          return regex.test($.trim(el.val()));
        },
        captcha: function() {
          var el = this,
              captcha = el.data('captcha');
          return grecaptcha.getResponse(captcha);
        }
      };

  var hideError = function (el, options) {

    var wrapper = el.closest(options.wrapper);

    wrapper.addClass(options.success).removeClass(options.error);

    return true;
  };

  var showError = function (el, options, msg) {

    var wrapper = el.closest(options.wrapper);

    el.focus();

    wrapper.addClass(options.error)
    .removeClass(options.success)
    .find('.tooltip')
    .html(options.icon + ' ' + msg);

    return false;
  };

  var validation = function (el, options) {

    var rules = el.data('rule'),
        message = el.data('msg'),
        name = el.attr('name');

    for (var i = 0, len = rules.length; i < len; i++) {
      var msg = message ? message[i] : validator[rules[i]][name];
      if (!isValid[rules[i]].call(el)) {
        return showError(el, options, msg);
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
    wrapper: '.form-group',
    icon: '<i class="fa fa-warning" aria-hidden="true"></i>'
  };

  $(function() {

    $('[data-' + pluginName + ']')[pluginName]();

  });

}(jQuery, window));
