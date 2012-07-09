(function(window, document, navigator, properties) {
  var _ta = {
    ww: window,       // DOM window
    dd: document,     // DOM document
    nn: navigator,    // Browser navigator object
    pp: properties,   // hash of properties
    // make: build an HTML element given a hash structure
    //  example: div_element = _ta.make({div: {id: 'id'}});
    make: function(obj) {
      var createdObject, elem, prop;

      for (elem in obj) {
        if (obj[elem].hasOwnProperty) {
          createdObject = tt.dd.createElement(elem);
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
      var buttonContainer,
      // Build button
      buttonContainer = _ta.make({
        div: {
          className: _ta.pp.gid + '_button_container'
        }
      });
      // Add button to page
      // Add events to button
    }
  }
})(window, document, navigator, {
  gid: "TA_TRIP_WIDGET_" + (new Date).getTime(),
  msg:{
    hoverHelpText: "Sauvegardez cette addresse en click sur Travelavenue.com, votre carnet de voyage en line. Votre vous aide a centraliser et sauvegardez toutes vos trouvailles sur tous les sites web en un seul lieu."
  }
});