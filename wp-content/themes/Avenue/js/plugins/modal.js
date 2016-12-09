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
