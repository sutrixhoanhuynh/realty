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
