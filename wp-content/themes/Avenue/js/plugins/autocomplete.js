/**
 *  @name autocomplete
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

  var pluginName = 'autocomplete';

  var getLocation = function(address) {
    var that = this,
        geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': address }, function(results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        that.cadastral['cadastral']('setPosition', {
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng(),
          zoomLevel: 12
        });
      }
      else {
        console.log('Unable find geolocation from address');
      }
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
          el = that.element,
          opts = that.options,
          searchBox = $(opts.searchBox, el);

      that.cadastral = $(opts.cadastralMap);
      that.autocomplete = new google.maps.places.Autocomplete(searchBox[0]);

      el.off('submit.' + pluginName).on('submit.' + pluginName, function (e) {
        getLocation.call(that, searchBox.val());
        return false;
      });

      that.autocomplete.addListener('place_changed', function () {
        getLocation.call(that, searchBox.val());
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
    searchBox: '.search-box',
    cadastralMap: '[data-cadastral]'
  };

}(jQuery, window));
