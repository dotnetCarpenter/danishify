/**
 * @author dotnetCarpenter <jon.ronnenberg@gmail.com>
 * @version 1.0.1
 * REMARKS:
 * Use Google Closure Compiler for production http://closure-compiler.appspot.com/home
 */
var danishify = function(){
	var _blackList = ['soen', 'aalborg'];
	return {
		convert: function(text){
								// find any word that contains 'ae' or 'oe' or 'aa'
			return text.replace(/\b\w*(ae|oe|aa)\w*\b/gi, function(match){
				if(_blackList.indexOf(match.toLowerCase())!== -1){ return match; }
									// find the æ ø å substitutes
				return match.replace(/ae|oe|aa/i, function(match){
					switch(match){
						case 'ae':	return 'æ';
						case 'Ae':
						case 'AE':	return 'Æ';
						case 'oe':	return 'ø';
						case 'Oe':
						case 'OE':	return 'Ø';
						case 'aa':	return 'å';
						case 'Aa':
						case 'AA':	return 'Å';
						default:
							return match;
					}
				})
			});
		},
		util: {
			/**
			 * Add an event.
			 * @param {Object} element DOM element, e.g. window, to bind the event to.
			 * @param {String} type Any type supported by the DOM element.
			 * @param {Function} ... One or several functions to execute.
			 */
			addEvent: function(element, type){
				for (var i = 2; i < arguments.length; i++) {
					if (element.addEventListener) {
						element.addEventListener(type, arguments[i], false);
					}
					else { // IE
						alert("Internet Explorer 8 and below are not supported.");
					}
				}
			},
			growToFit: function(elem, lineheight){
				if(elem.clientHeight < elem.scrollHeight){
					elem.style.height = elem.scrollHeight + 5 * (lineheight || 16) + 'px';
				}
			}
		}
	}
}();
