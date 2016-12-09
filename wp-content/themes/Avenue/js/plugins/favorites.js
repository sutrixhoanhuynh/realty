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

  var pluginName = 'favorites';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  var getTotalLikes = function () {

    var that = this,
        el = that.element,
        postsId = el.data('posts-id');

    $.ajax({
      url: el.data('url'),
      method: 'POST',
      data: {
        action : 'process_simple_like',
        post_id : postsId,
        is_comment: '0'
      }
    }).done(function (response) {
      var totalLikes = response.totalLikes;
      el.attr('data-original-title', totalLikes + ' likes')
        .toggleClass('fa-heart-o fa-heart');
    });

  };

  Plugin.prototype = {
    init: function() {

      var that = this,
          el = that.element;

      el.off('click.' + pluginName).on('click.' + pluginName, function (e) {
        e.preventDefault();
        getTotalLikes.call(that);
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
    theme: 'light'
  };

  $(function() {

    $('[data-' + pluginName + ']')[pluginName]();

  });

}(jQuery, window));
