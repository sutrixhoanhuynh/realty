var Site = (function($, window, undefined) {

  function isTouch() {
    return Modernizr.touch;
  }

  function initTooltip() {
    !isTouch() && $('[data-toggle="tooltip"]').tooltip();
  }

  function isMobile() {
    return window.Modernizr.mq('(max-width: 767px)');
  }

  return {
    isTouch: isTouch,
    isMobile: isMobile,
    initTooltip: initTooltip
  };

})(jQuery, window);

jQuery(function() {
  Site.initTooltip();
});
