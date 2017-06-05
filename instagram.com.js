// ==UserScript==
// @name               IGHelper: download Instagram pic & vids
// @name:zh-CN         IGHelper: 下载 Instagram 图片和视频
// @version            1.7.0
// @namespace          InstagramHelper
// @homepage           https://github.com/mittya/instagram-helper
// @description        Easily download Instagram pictures and videos.
// @description:zh-cn  轻松下载 Instagram 的图片和视频。
// @author             mittya
// @require            https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js
// @match              https://www.instagram.com/*
// @match              https://*.cdninstagram.com/*
// @license            MIT License
// ==/UserScript==
// Modified by @captn3m0 to suit .js/.css

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
var saveAs =
  saveAs ||
  (function(e) {
    'use strict';
    if (
      typeof e === 'undefined' ||
      (typeof navigator !== 'undefined' &&
        /MSIE [1-9]\./.test(navigator.userAgent))
    ) {
      return;
    }
    var t = e.document,
      n = function() {
        return e.URL || e.webkitURL || e;
      },
      r = t.createElementNS('http://www.w3.org/1999/xhtml', 'a'),
      o = 'download' in r,
      a = function(e) {
        var t = new MouseEvent('click');
        e.dispatchEvent(t);
      },
      i = /constructor/i.test(e.HTMLElement) || e.safari,
      f = /CriOS\/[\d]+/.test(navigator.userAgent),
      u = function(t) {
        (e.setImmediate || e.setTimeout)(function() {
          throw t;
        }, 0);
      },
      s = 'application/octet-stream',
      d = 1e3 * 40,
      c = function(e) {
        var t = function() {
          if (typeof e === 'string') {
            n().revokeObjectURL(e);
          } else {
            e.remove();
          }
        };
        setTimeout(t, d);
      },
      l = function(e, t, n) {
        t = [].concat(t);
        var r = t.length;
        while (r--) {
          var o = e['on' + t[r]];
          if (typeof o === 'function') {
            try {
              o.call(e, n || e);
            } catch (a) {
              u(a);
            }
          }
        }
      },
      p = function(e) {
        if (
          /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
            e.type
          )
        ) {
          return new Blob([String.fromCharCode(65279), e], { type: e.type });
        }
        return e;
      },
      v = function(t, u, d) {
        if (!d) {
          t = p(t);
        }
        var v = this,
          w = t.type,
          m = w === s,
          y,
          h = function() {
            l(v, 'writestart progress write writeend'.split(' '));
          },
          S = function() {
            if ((f || (m && i)) && e.FileReader) {
              var r = new FileReader();
              r.onloadend = function() {
                var t = f
                  ? r.result
                  : r.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
                var n = e.open(t, '_blank');
                if (!n) e.location.href = t;
                t = undefined;
                v.readyState = v.DONE;
                h();
              };
              r.readAsDataURL(t);
              v.readyState = v.INIT;
              return;
            }
            if (!y) {
              y = n().createObjectURL(t);
            }
            if (m) {
              e.location.href = y;
            } else {
              var o = e.open(y, '_blank');
              if (!o) {
                e.location.href = y;
              }
            }
            v.readyState = v.DONE;
            h();
            c(y);
          };
        v.readyState = v.INIT;
        if (o) {
          y = n().createObjectURL(t);
          setTimeout(function() {
            r.href = y;
            r.download = u;
            a(r);
            h();
            c(y);
            v.readyState = v.DONE;
          });
          return;
        }
        S();
      },
      w = v.prototype,
      m = function(e, t, n) {
        return new v(e, t || e.name || 'download', n);
      };
    if (typeof navigator !== 'undefined' && navigator.msSaveOrOpenBlob) {
      return function(e, t, n) {
        t = t || e.name || 'download';
        if (!n) {
          e = p(e);
        }
        return navigator.msSaveOrOpenBlob(e, t);
      };
    }
    w.abort = function() {};
    w.readyState = w.INIT = 0;
    w.WRITING = 1;
    w.DONE = 2;
    w.error = w.onwritestart = w.onprogress = w.onwrite = w.onabort = w.onerror = w.onwriteend = null;
    return m;
  })(
    (typeof self !== 'undefined' && self) ||
      (typeof window !== 'undefined' && window) ||
      this.content
  );
if (typeof module !== 'undefined' && module.exports) {
  module.exports.saveAs = saveAs;
} else if (
  typeof define !== 'undefined' &&
  define !== null &&
  define.amd !== null
) {
  define('FileSaver.js', function() {
    return saveAs;
  });
}

(function() {
  'use strict';
  var observer = new MutationObserver(init);
  var config = {
    childList: true,
    subtree: true,
  };
  observer.observe(document.body, config);

  var downloadImage = function(src, title) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      var canvas = document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);

      // Save image
      canvas.toBlob(
        function(blob) {
          saveAs(blob, title);
        },
        'image/jpeg',
        0.8
      );

      canvas = null;
    };

    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src =
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      img.src = src;
    }
  };

  /*
      Main
  */
  init();

  function init() {
    if (window.location.pathname === '/') {
      //  Home page
      var _box_home = document.querySelector(
        '#react-root > section > main > section > div'
      );
      if (_box_home) {
        findMedia(_box_home);
      }
    } else if (window.location.pathname.match('/p/')) {
      console.log('111');
      // Detail page
      var _box_detail = '';
      if (document.querySelector('div[role="dialog"]')) {
        _box_detail = document
          .querySelector('div[role="dialog"]')
          .querySelector('article');
      } else {
        _box_detail = document.querySelector(
          '#react-root > section > main article'
        );
      }
      findMedia(_box_detail);
    }
  }

  function findMedia(box) {
    var _box = box;
    var _parent, _url, _title, _username;

    _box.addEventListener('mouseover', function(event) {
      event.stopPropagation();

      if (event.target.className === '_icyx7') {
        _parent = event.target.parentNode;
        _url = event.target.src;
        _title = _url.match(/[a-zA-Z0-9_]+.jpg/g);
        _url = _url.replace(/[a-zA-Z][0-9]+x[0-9]+\//, '');
        _username = $(_parent).parents('article')[0].querySelector('._4zhc5')
          .title;

        addBtn(_parent, _url, _title, _username);
      }

      if (event.target.className === '_c2kdw') {
        _parent = event.target.parentNode;
        _url = _parent.querySelector('._c8hkj').src;
        _title = _url.match(/[a-zA-Z0-9_]+.mp4/g);
        _url = _url.replace(/[a-zA-Z][0-9]+x[0-9]+\//, '');
        _username = $(_parent).parents('article')[0].querySelector('._4zhc5')
          .title;

        addBtn(_parent, _url, _title, _username);
      }
    });
  }

  function addBtn(parent, url, title, username) {
    if (!parent.querySelector('.downloadBtn')) {
      var _parent = parent;
      var _url = url.replace(/\?ig_cache_key=[a-zA-Z0-9%.]+/, '');
      var _title = title[0];
      var _filename =
        username + '_' + _url.substring(_url.lastIndexOf('/') + 1, _url.length);
      var _btn = document.createElement('button');
      var _ua = navigator.userAgent.toLowerCase();

      var removeBtn = function() {
        if (_parent.querySelector('.downloadBtn')) {
          _parent.removeChild(_parent.querySelector('.downloadBtn'));
        }
      };

      _btn.className = 'downloadBtn';

      // Download
      _btn.addEventListener(
        'click',
        function(event) {
          event.stopPropagation();

          downloadImage(_url, _filename);
        },
        false
      );

      _parent.appendChild(_btn);

      // More media on one box
      if (
        _parent.querySelector('.coreSpriteRightPaginationArrow') ||
        _parent
          .parents('article')[0]
          .querySelector('.coreSpriteRightPaginationArrow')
      ) {
        var _btn_right = _parent.querySelector(
          '.coreSpriteRightPaginationArrow'
        )
          ? _parent.querySelector('.coreSpriteRightPaginationArrow')
          : _parent
              .parents('article')[0]
              .querySelector('.coreSpriteRightPaginationArrow');
        _btn_right.addEventListener('click', removeBtn, false);
      }

      if (
        _parent.querySelector('.coreSpriteLeftPaginationArrow') ||
        _parent
          .parents('article')[0]
          .querySelector('.coreSpriteLeftPaginationArrow')
      ) {
        var _btn_left = _parent.querySelector('.coreSpriteLeftPaginationArrow')
          ? _parent.querySelector('.coreSpriteLeftPaginationArrow')
          : _parent
              .parents('article')[0]
              .querySelector('.coreSpriteLeftPaginationArrow');
        _btn_left.addEventListener('click', removeBtn, false);
      }
    }
  }
})();
