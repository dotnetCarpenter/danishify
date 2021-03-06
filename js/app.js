/**
 * @author dotnetCarpenter <jon.ronnenberg@gmail.com>
 * @version 1.0.1
 */
  //TODO: detect paste ins by mouse only
  //http://assanka.net/content/tech/2009/05/04/auto-growing-textareas/#comments
  //TODO: Convert all px to em but the for window

'use strict'

import danishify from '../js/danishify.js'

function convertAction(input, output){
  output.value = danishify.convert(input.value);
  danishify.util.growToFit(output);
}
const $ = (function(){
  const cache = []
  return (el) => {
    if(cache[el]) return cache[el]
    cache[el] = document.getElementById(el)
    return cache[el]
  }
}())
function delay(fn, milliseconds) {
  return setTimeout(fn, milliseconds || 0);
}

danishify.util.addEvent(
  window,
  'DOMContentLoaded',
  function(){
    const input = $('input');
    const output = $('output');
    const status = $('status');
    let timeoutId;

    if(!status.defaultValue)
      status.defaultValue = status.innerHTML

    danishify.util.addEvent(
      input,
      'keyup',
      function(e){
        if(timeoutId){
          clearInterval(timeoutId);
        }
        timeoutId = setTimeout(function(){
          status.innerHTML = 'Konvertere...';
          delay(function() {
            convertAction(input, output);
            status.innerHTML = status.defaultValue;
          });
        }, 60);
      },
      function(e){
        danishify.util.growToFit(input);
      }
    );
  },
  function(){
    if(!$('input').autofocus){ $('input').focus(); }
  }
);
