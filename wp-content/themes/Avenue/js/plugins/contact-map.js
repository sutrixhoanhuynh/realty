/**
 *  @name contact-map
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

  var pluginName = 'contact-map';

  var initMap = function() {

    var that = this,
        opts = that.options;

    that.map = new google.maps.Map(that.element[0], {
      zoom: opts.zoom,
      center: opts.location,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    that.marker = new google.maps.Marker({
      map: that.map,
      position: opts.location,
      animation: google.maps.Animation.DROP,
      icon: opts.markerIcon,
      title: opts.title
    });

    that.infoWindow = new google.maps.InfoWindow({
      content: $(opts.content).html(),
      maxWidth: 260
    });

  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {

      var that = this;
      initMap.call(that);

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
    zoom: 18,
    location: {
      lat: 10.791628,
      lng: 106.637023
    }
  };


}(jQuery, window));
