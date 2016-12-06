/**
 *  @name modal
 *  @description show specific content in layer top screen
 *  @version 1.0
 *  @options
 *    template: template of modal
 *    overlay: template of overlay
 *    holderSelector: selector of modal holder
 *    overlaySelector: selector of overlay
 *    closeButton: selector of close button modal
 *    contentSelector: selector of content modal
 *    activeClass: class to active show/hide overlay
 *    autoTrigger: whether auto trigger event on element itself or not
 *    closeButtonClass: optional custom class for close button
 *    closeByDocument: enable/disable closing popup by clicking document itself
 *    closeByEscape: enable/disable closing popup by 'Esc' keyboard
 *    content: content of modal (only appcept string value)
 *    duration: time animation when show or hide modal
 *  @events
 *    onBeforeShow: fire before modal show
 *    onAfterShow: fire after modal show completely
 *    onBeforeShow: fire before modal show
 *    onAfterHide: fire after modal hide completely
 *  @methods
 *    init
 *    show: show modal
 *    hide: hide modal
 *    changeContent: change content of modal
 *    destroy
 */
;
(function($, window, undefined) {

  'use strict';

  var pluginName = 'modal',
      ESCKey = 27;

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  var initModal = function() {
    var that = this,
        body = $('body'),
        opts = that.options;

    !$(opts.overlaySelector).length && body.append(opts.overlay);
    !$(opts.holderSelector).length && body.append(opts.template);

    return {
      modal: $(opts.holderSelector),
      overlay: $(opts.overlaySelector)
    };

  };

  var getPosition = function() {
    var that = this,
        win = $(window),
        winSize = {
          width: win.width(),
          height: win.height()
        },
        position = {
          top: winSize.height / 2 - that.vars.modal.outerHeight() / 2,
          left: winSize.width / 2 - that.vars.modal.outerWidth() / 2
        };

    return {
      left: position.left < 0 ? 0 : position.left + win.scrollLeft(),
      top: position.top < 0 ? 0 : position.top + win.scrollTop()
    };

  };

  var setPosition = function() {
    var that = this,
        postion = getPosition.call(this);

    that.vars.modal.css({
      'top': postion.top + 'px',
      'left': postion.left + 'px'
    });
  };


  Plugin.prototype = {
    init: function() {
      var that = this,
          opts = that.options,
          win = $(window);

      that.vars = initModal.call(this);

      that.vars.overlay.css('height', $(document).height());

      $(opts.closeButton, that.vars.modal)
      .off('click.' + pluginName)
      .on('click.' + pluginName, function(e) {
        e.preventDefault();
        that.hide();
      });

      win.on('resize.' + pluginName, function(e) {
        e.preventDefault();
        setPosition.call(that);
      })
      .on('scroll.' + pluginName, function(e) {
        e.preventDefault();
        setPosition.call(that);
      });

      if (opts.autoTrigger) {
        that.element.off('click.' + pluginName).on('click.' + pluginName, function(e) {
          e.preventDefault();
          that.show();
        });
      }

      if (opts.closeByEscape) {
        win.on('keyup.' + pluginName, function(e) {
          e.preventDefault();
          e.keyCode === ESCKey && that.hide();
        });
      }

      if (opts.closeByDocument) {
        win.on('click.' + pluginName, function(e) {
          e.preventDefault();
          e.stopPropagation();
          $(e.target).is(that.vars.overlay) && that.hide();
        });
      }
    },
    show: function() {
      var that = this,
          opts = that.options,
          modal = that.vars.modal;

      $.isFunction(opts.onBeforeShow) && opts.onBeforeShow();

      setPosition.call(that);
      $(opts.overlaySelector, 'body').addClass(opts.activeClass);

      that.changeContent(opts.content);

      modal.fadeIn(opts.duration, function() {
        $.isFunction(opts.onAfterShow) && opts.onAfterShow();
      });
    },
    hide: function() {
      var that = this,
          opts = that.options,
          modal = that.vars.modal;

      $.isFunction(opts.onBeforeHide) && opts.onBeforeHide();

      $(opts.overlaySelector, 'body').removeClass(opts.activeClass);

      that.changeContent('');

      modal.fadeOut(opts.duration, function() {
        $.isFunction(opts.onAfterHide) && opts.onAfterHide();
      });

    },
    changeContent: function(params) {
      var that = this,
          opts = that.options,
          content = $(opts.contentSelector, that.vars.modal);

      content.html(params);
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
        template: '<div class="modal"><button type="button" class="close-button-modal">' +
        '<i class="fa fa-times" aria-hidden="true"></i></button>' +
        '<div class="modal-content"></div>',
        overlay: '<div class="background-overlay"></div>',
        holderSelector: '.modal',
        overlaySelector: '.background-overlay',
        closeButton: '.close-button-modal',
        contentSelector: '.modal-content',
        activeClass: 'active',
        autoTrigger: true,
        closeByDocument: false,
        content: '',
        duration: 500,
        closeByEscape: true,
        onBeforeShow: null,
        onAfterShow: null,
        onBeforeHide: null,
        onAfterHide: null
    };

    $(function() {
        $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));
