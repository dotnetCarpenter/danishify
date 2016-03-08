/**
 * @author dotnetCarpenter <jon.ronnenberg@gmail.com>
 * @version 1.0.1
 */
  //TODO: detect paste ins by mouse only
  //http://assanka.net/content/tech/2009/05/04/auto-growing-textareas/#comments
  //TODO: Convert all px to em but the for window

'use strict'

function convertAction(){
  danishify.output.value = danishify.convert(danishify.input.value);
  danishify.util.growToFit(danishify.output);
}
function $(el){
  return document.getElementById(el);
}
function delay(fn, milliseconds) {
  return setTimeout(fn, milliseconds || 0);
}
danishify.input = $('input');
danishify.output = $('output');
danishify.status = $('status');
danishify.util.addEvent(
  window,
  'DOMContentLoaded',
  function(){
    var timeoutId;

    if(!danishify.status.defaultValue)
      danishify.status.defaultValue = danishify.status.innerHTML

    danishify.util.addEvent(
      danishify.input,
      'keyup',
      function(e){
        if(timeoutId){
          clearInterval(timeoutId);
        }
        timeoutId = setTimeout(function(){
          danishify.status.innerHTML = 'Konvertere...';
          delay(function() {
            convertAction();
            danishify.status.innerHTML = danishify.status.defaultValue;
          });
        }, 60);
      },
      function(e){
        danishify.util.growToFit(danishify.input);
      }
    );
  },
  function(){
    if(!danishify.input.autofocus){ danishify.input.focus(); }
  }
);