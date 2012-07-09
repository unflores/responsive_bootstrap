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
    setContainerStyle: function(){
      var sheet,    // Stylesheet element
          styles;   // Styles from properties
      // create a stylesheet element
      sheet = _ta.make({
        style: {
          type: "text/css"
        }
      });
      
      // Insert gid to styles
      styles = _ta.pp.styles.join("\n ").replace(/#_/g, '.' + _ta.pp.gid + '_');

      // Attach the styles to the element and the element to the head
      if (sheet.styleSheet) {
        sheet.styleSheet.cssText = styles;
      } else {
        sheet.appendChild(_ta.dd.createTextNode(styles));
      }

      _ta.dd.h.appendChild(sheet);
    },
    init: function(){
      var buttonContainer,
          helpContainer;

      // Add shortcuts
      _ta.dd.b = _ta.dd.getElementsByTagName('body')[0];
      _ta.dd.h = _ta.dd.getElementsByTagName('head')[0];

      // Build button
      buttonContainer = _ta.make({
        div: {
          className: _ta.pp.gid + '_button_container'
        }
      });
      helpContainer = _ta.make({
        div: {
          className: _ta.pp.gid + '_help_container',
          innerHTML: _ta.pp.msg.hoverHelpText
        }
      });
      buttonContainer.appendChild(helpContainer);

      // Add button container to page
      _ta.taScript.parentNode.insertBefore(buttonContainer, _ta.pp.taScript);
      // Add events to button
      // Add styles to container
      _ta.setContainerStyle();
    }
  }

  _ta.init();
})(window, document, navigator, {
  gid: "TA_TRIP_WIDGET", //+ (new Date).getTime(), // If we want this to be unoverridable then add the timestamp
  msg:{
    hoverHelpText: "Sauvegardez cette addresse en click sur Travelavenue.com, votre carnet de voyage en line. Votre vous aide a centraliser et sauvegardez toutes vos trouvailles sur tous les sites web en un seul lieu."
  },
  // # will be replaced by '.' + _ta.gid
  styles:[
    '#_button_container {min-height: 100px; width: 200px; position: relative; border: solid black 1px;}',
    '#_help_container { bottom: -100px; left:0; padding: 5px; position: absolute; background: #f1f1f1; border: solid 3px #111; width: 300px; display:none;border: solid 2px #3295cf;-moz-border-radius: 3px; border-radius: 3px; box-shadow: 1px 1px 3px #999;}',
    '#_button_container:hover #_help_container {display:block;}'
  ]
});
