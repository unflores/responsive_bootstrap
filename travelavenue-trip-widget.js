(function(window, document, navigator, properties) {
  var _ta = {
    ww: window,       // DOM window
    dd: document,     // DOM document
    nn: navigator,    // Browser navigator object
    pp: properties,   // Hash of properties
    // Finds the this script tag from within the page
    // It is called here as a function to insure it will only be called once
    taScript: function(){
      var objs    = document.getElementsByTagName('script'), 
          i       = 0;
      for(; i < objs.length; i++){ 
        if(objs[i].src.search('travelavenue-trip-widget') > 0){
          return objs[i];
        }
      }
    }(),
    // make: build an HTML element given a hash structure
    //  example: div_element = _ta.make({div: {id: 'id'}});
    make: function(obj) {
      var createdObject, elem, prop;

      for (elem in obj) {
        if (obj[elem].hasOwnProperty) {
          createdObject = _ta.dd.createElement(elem);
          // assign the attributes
          for (attr in obj[elem]) {
            if (obj[elem][attr].hasOwnProperty) {
              if (typeof obj[elem][attr] === "string") {
                createdObject[attr] = obj[elem][attr];
              }
            }
          }
          break;
        }
      }
      return createdObject;
    },
    init: function(){
      var buttonContainer;
      // Build button
      buttonContainer = _ta.make({
        div: {
          className: _ta.pp.gid + '_button_container'
        }
      });
      
      // Add button container to page
      _ta.taScript.parentNode.insertBefore(buttonContainer, _ta.pp.taScript);
      // Add events to button
    }
  }

  _ta.init();
})(window, document, navigator, {
  gid: "TA_TRIP_WIDGET_" + (new Date).getTime(),
  msg:{
    hoverHelpText: "Sauvegardez cette addresse en click sur Travelavenue.com, votre carnet de voyage en line. Votre vous aide a centraliser et sauvegardez toutes vos trouvailles sur tous les sites web en un seul lieu."
  }
});
