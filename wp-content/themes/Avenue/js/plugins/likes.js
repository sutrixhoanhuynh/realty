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
