var updateCache = function() {
  $('[href^="https://t.co/"][data-expanded-url]').each(function(e, v) {
    var shortlink = $(v).prop('href');
    var longlink  = $(v).data('expanded-url');

    localStorage.setItem(shortlink,longlink);
  });
};

var fixLink = function(e, v) {
  var shortlink = v.getAttribute('href');
  var longlink = localStorage.getItem(shortlink);

  if (longlink) {
    v.setAttribute('href', longlink);
  }
};

var fixLinks = function() {
  $('[href^="https://t.co/"]').each(fixLink);
};

setInterval(updateCache, 1000);
setInterval(fixLinks, 1000);