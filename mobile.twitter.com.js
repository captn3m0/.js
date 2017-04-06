var updateCache = function() {
  $('a[href^="https://t.co/"] span[aria-hidden=true]').each(function(e, v) {
    var longlink  = $(v).text().match(/\(link: (.*?)\)/)[1];
    var shortlink = $(v).parent().attr('href');

    localStorage.setItem(shortlink, longlink);
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