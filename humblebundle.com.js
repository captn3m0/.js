var opacity = 0.1;

var getNonLinux = function(){
  jQuery('.storefront-grid-product, .storefront-list-product, .table-wrapper')
  .has('.hb-windows, .hb-osx')
  .not(function(){
    return jQuery(this).has(':not(.platform-unavailable) > .hb-linux').length
  });
};

getNonLinux().fadeTo(0, opacity)
  .css("position", "relative")
  .css("z-index", "100");

$('.search-view, .featured-view').on("mouseenter",function() {
  getNonLinux().fadeTo(200, opacity);
});