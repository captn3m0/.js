// https://github.com/Mechazawa/FuckFuckAdblock/blob/master/FuckFuckAdBlock.user.js

(function(window) {
    var debug = false;

    var FuckAdBlock = function(options) {
        if(options !== undefined)
            this.setOption(options);

        var self = this;
        window.addEventListener('load', function() {
            setTimeout(function() {
                if(self._options.checkOnLoad === true)
                    self.check(false);
            }, 1);
        }, false);

        // hotfix
        var self = this;
        this.debug = {
            set: function(x){ debug = !!x; return self;},
            get: function(){ return debug; }
        }
    }

    FuckAdBlock.prototype = {
        setOption : function(options, value) {
            if(value !== undefined) {
                var key = options;
                options = {};
                options[key] = value;
            }

            for(option in options)
                this._options[option] = options[option];

            return this;
        },

        _options : {
            checkOnLoad:    true,
            resetOnEnd:     true,
        },

        _var : {
            triggers: []
        },

        check : function(ignore) {
            this.emitEvent(false);
            return true;
        },

        clearEvent : function() {
            this._var.triggers = [];
        },

        emitEvent : function(detected) {
            if(detected === false) {
                var fns = this._var.triggers;
                for (var i = 0; i < fns.length; i += 1) {
                    if (fns[i] instanceof Function) { fns[i](); }
                }
                if(this._options.resetOnEnd === true)
                    this.clearEvent();
            }
            return this;
        },

        on : function(detected, fn) {
            if(detected === false)
                this._var.triggers.push(fn);
            return this;
        },

        onDetected : function(fn) {
            return this;
        },

        onNotDetected : function(fn) {
            return this.on(false, fn);
        }
    };

    var fuck = new FuckAdBlock();
    for (var field in fuck) {
        Object.defineProperty(fuck, field, {value: fuck[field], configurable: false});
    }
    Object.defineProperties(window, {fuckAdBlock : { value: fuck, enumerable: true, writable: false }});
    Object.defineProperties(window, {blockAdBlock : { value: fuck, enumerable: true, writable: false }});

    // Following code comes from http://userscripts-mirror.org/scripts/show/41369
    // License: http://creativecommons.org/licenses/by-nc-nd/3.0/us/

    (function () {


        /*
            NOTE: 
                You can use \\* to match actual asterisks instead of using it as a wildcard!
                The examples below show a wildcard in use and a regular asterisk replacement.
        */

        var words = {
        ///////////////////////////////////////////////////////


            // Syntax: 'Search word' : 'Replace word',
            'your a' : 'you\'re a',
            'imo' : 'in my opinion',
            'im\\*o' : 'matching an asterisk, not a wildcard',
            '/\\bD\\b/g' : '[D]',
            'RazorPay': 'Razorpay'


        ///////////////////////////////////////////////////////
        };

        //////////////////////////////////////////////////////////////////////////////
        // This is where the real code is
        // Don't edit below this
        //////////////////////////////////////////////////////////////////////////////

        var regexs = [], replacements = [],
            tagsWhitelist = ['PRE', 'BLOCKQUOTE', 'CODE', 'INPUT', 'BUTTON', 'TEXTAREA'],
            rIsRegexp = /^\/(.+)\/([gim]+)?$/,
            word, text, texts, i, userRegexp;

        // prepareRegex by JoeSimmons
        // used to take a string and ready it for use in new RegExp()
        function prepareRegex(string) {
            return string.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, '\\$1');
        }

        // function to decide whether a parent tag will have its text replaced or not
        function isTagOk(tag) {
            return tagsWhitelist.indexOf(tag) === -1;
        }

        delete words['']; // so the user can add each entry ending with a comma,
                          // I put an extra empty key/value pair in the object.
                          // so we need to remove it before continuing

        // convert the 'words' JSON object to an Array
        for (word in words) {
            if ( typeof word === 'string' && words.hasOwnProperty(word) ) {
                userRegexp = word.match(rIsRegexp);

                // add the search/needle/query
                if (userRegexp) {
                    regexs.push(
                        new RegExp(userRegexp[1], 'g')
                    );
                } else {
                    regexs.push(
                        new RegExp(prepareRegex(word).replace(/\\?\*/g, function (fullMatch) {
                            return fullMatch === '\\*' ? '*' : '[^ ]*';
                        }), 'g')
                    );
                }

                // add the replacement
                replacements.push( words[word] );
            }
        }

        // do the replacement
        texts = document.evaluate('//body//text()[ normalize-space(.) != "" ]', document, null, 6, null);
        for (i = 0; text = texts.snapshotItem(i); i += 1) {
            if ( isTagOk(text.parentNode.tagName) ) {
                regexs.forEach(function (value, index) {
                    text.data = text.data.replace( value, replacements[index] );
                });
            }
        }

    }());
})(window);