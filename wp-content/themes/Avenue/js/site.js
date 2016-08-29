var Site = (function($, window, undefined) {

  function isTouch() {
    return Modernizr.touch;
  }

  function initTooltip() {
    !isTouch() && $('[data-toggle="tooltip"]').tooltip();
  }

  return {
    isTouch: isTouch,
    initTooltip: initTooltip
  };

})(jQuery, window);

jQuery(function() {
  Site.initTooltip();
});
