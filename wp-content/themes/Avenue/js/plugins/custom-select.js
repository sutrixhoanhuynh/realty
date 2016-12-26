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

  var pluginName = 'custom-select';

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
        selectList += '<li class="' + opts.selectedClass + '">';
        selectBox += optionContent + opts.icon + '</a>';
      } else {
        selectList += '<li>';
      }

      selectList += '<a href="javascript:;" data-value="' + optionValue + '">' +
      optionContent +'</a></li>';

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
          customSelect = el.closest('.' + pluginName);

      that.select = customSelect.length ? customSelect : initSelect.call(that);
      that.selectBox = $('.control', that.select);
      that.selectList = $('.select-list', that.select);
      that.selectedOpt = $('li.selected', that.select);

      that.selectBox.off('click.' + pluginName)
      .on('click.' + pluginName, function() {
        that.slideToggle();
        return false;
      });

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
    icon: '<span class="fa fa-angle-down" aria-hidden="true"></span>'
  };

  $(function() {

    $('[data-' + pluginName + ']')[pluginName]();

  });

}(jQuery, window));
