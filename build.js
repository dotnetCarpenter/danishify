System.register('js/danishify.js', [], function (_export) {
	/**
  * @author dotnetCarpenter <jon.ronnenberg@gmail.com>
  * @version 2.0.0
  */
	'use strict';

	return {
		setters: [],
		execute: function () {
			_export('default', (function () {
				//TODO: handle 'kanaanæer'
				var _blackList = ['aalborg', 'afrikaans', 'ekstraarbejde', 'aabenraa', 'grenaa'];
				return {
					convert: function convert(text) {
						// find any word that contains 'ae' or 'oe' or 'aa'
						return text.replace(/\b\w*(ae|oe|aa)+\w*\b/gi, function (match) {
							if (_blackList.indexOf(match.toLowerCase()) !== -1) {
								return match;
							}
							// find the æ ø å substitutes
							return match.replace(/ae|oe|aa/ig, function (match) {
								switch (match) {
									case 'ae':
										return 'æ';
									case 'Ae':
									case 'AE':
										return 'Æ';
									case 'oe':
										return 'ø';
									case 'Oe':
									case 'OE':
										return 'Ø';
									case 'aa':
										return 'å';
									case 'Aa':
									case 'AA':
										return 'Å';
									default:
										return match;
								}
							});
						});
					},
					util: {
						/**
       * Add an event.
       * @param {Object} element DOM element, e.g. window, to bind the event to.
       * @param {String} type Any type supported by the DOM element.
       * @param {Function} ... One or several functions to execute.
       */
						addEvent: function addEvent(element, type) {
							for (var i = 2; i < arguments.length; i++) {
								if (element.addEventListener) {
									if (type === 'DOMContentLoaded' && document.readyState === 'complete') arguments[i]();else element.addEventListener(type, arguments[i], false);
								} else {
									// IE
									alert("Internet Explorer 8 and below are not supported.");
								}
							}
						},
						growToFit: function growToFit(elem, lineheight) {
							if (elem.clientHeight < elem.scrollHeight) {
								elem.style.height = elem.scrollHeight + 5 * (lineheight || 16) + 'px';
							}
						}
					}
				};
			})());
		}
	};
});
System.register('js/app.js', ['js/danishify.js'], function (_export) {
  /**
   * @author dotnetCarpenter <jon.ronnenberg@gmail.com>
   * @version 1.0.1
   */
  //TODO: detect paste ins by mouse only
  //http://assanka.net/content/tech/2009/05/04/auto-growing-textareas/#comments
  //TODO: Convert all px to em but the for window

  'use strict';

  var danishify;

  function convertAction() {
    danishify.output.value = danishify.convert(danishify.input.value);
    danishify.util.growToFit(danishify.output);
  }
  function $(el) {
    return document.getElementById(el);
  }
  function delay(fn, milliseconds) {
    return setTimeout(fn, milliseconds || 0);
  }
  return {
    setters: [function (_jsDanishifyJs) {
      danishify = _jsDanishifyJs['default'];
    }],
    execute: function () {

      window.setTimeout(function () {
        console.log(document.readyState);
        window.addEventListener('DOMContentLoaded', function (e) {
          alert("jon");
        }, false);
      }, 1000);danishify.input = $('input');
      danishify.output = $('output');
      danishify.status = $('status');
      danishify.util.addEvent(window, 'DOMContentLoaded', function () {
        var timeoutId;

        if (!danishify.status.defaultValue) danishify.status.defaultValue = danishify.status.innerHTML;

        danishify.util.addEvent(danishify.input, 'keyup', function (e) {
          if (timeoutId) {
            clearInterval(timeoutId);
          }
          timeoutId = setTimeout(function () {
            danishify.status.innerHTML = 'Konvertere...';
            delay(function () {
              convertAction();
              danishify.status.innerHTML = danishify.status.defaultValue;
            });
          }, 60);
        }, function (e) {
          danishify.util.growToFit(danishify.input);
        });
      }, function () {
        if (!danishify.input.autofocus) {
          danishify.input.focus();
        }
      });
    }
  };
});
//# sourceMappingURL=build.js.map