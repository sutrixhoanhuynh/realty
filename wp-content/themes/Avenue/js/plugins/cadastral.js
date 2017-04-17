/**
 *  @name cadastral
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

  var pluginName = 'cadastral',
      locations = [{
        lat: 10.7578883,
        lng: 106.6734077
      }, {
        lat: 10.7853553,
        lng: 106.6363401
      }, {
        lat: 10.7674616,
        lng: 106.6862603
      }, {
        lat: 10.7673595,
        lng: 106.6409665
      }, {
        lat: 10.8002226,
        lng: 106.6962682
      }, {
        lat: 10.7498568,
        lng: 106.6430855
      }, {
        lat: 10.7595379,
        lng: 106.661273
      }, {
        lat: 10.7814764,
        lng: 106.6928304
      }, {
        lat: 10.8022553,
        lng: 106.6791665
      }, {
        lat: 10.7551374,
        lng: 106.629322
      }];

  var initMap = function() {

    var that = this,
        opts = that.options,
        styles = [
          {
            'featureType': 'landscape',
            'elementType': 'labels',
            'stylers': [{
              'visibility': 'on'
            }]
          },
          {
            'featureType': 'transit',
            'elementType': 'labels',
            'stylers': [{
              'visibility': 'on'
            }]
          },
          {
            'featureType': 'poi',
            'elementType': 'labels',
            'stylers': [{
              'visibility': 'on'
            }]
          },
          {
            'featureType': 'water',
            'elementType': 'labels',
            'stylers': [{
              'visibility': 'off'
            }]
          },
          {
            'featureType': 'road',
            'elementType': 'labels.icon',
            'stylers': [{
              'visibility': 'off'
            }]
          },
          {
            'stylers': [{
              'hue': '#00aaff'
            }, {
              'saturation': -100
            }, {
              'gamma': 2.15
            }, {
              'lightness': 12
            }]
          },
          {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [{
              'visibility': 'on'
            }, {
              'lightness': 24
            }]
          },
          {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [{
              'lightness': 57
            }]
        }];

    that.map = new google.maps.Map(that.element[0], {
      zoom: opts.zoom,
      center: opts.location,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    that.map.setOptions({styles: styles});

    that.markers = locations.map(function (location, index) {
      return new google.maps.Marker({
        position: location,
        icon: opts.markerIcon
      });
    });

    that.markerCluster = new MarkerClusterer(that.map, that.markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m2'
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
    zoom: 8,
    location: {
      lat: 10.791628,
      lng: 106.637023
    }
  };


}(jQuery, window));
