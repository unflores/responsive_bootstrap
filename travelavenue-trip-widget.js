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
    domain: function(){
      var environment = _ta.taScript.getAttribute('data-environment') || 'production';
      
      if(environment == 'production'){
        return 'http://travelavenue.fr';
      }else if(environment == 'staging'){
        return 'http://travelavenue.staging.com';
      }else if(environment == 'development'){
        return 'http://travelavenue.local.com';
      }

    },
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
    loadLoginFrame: function(){
      var url = _ta.domain() + _ta.pp.landing_path + '?' + _ta.buildQueryString(_ta.pp.product);
      a = url;
      window.open(url, _ta.pp.loginTitle, config='width=660, height=724, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no')
    },
    buildQueryString: function(params){
      var query_variables = [];
      for (var p in params){
        if (params.hasOwnProperty(p)) {
          query_variables.push(p + "=" + encodeURIComponent(params[p]));
        }
      }
      return query_variables.join('&');
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
          helpContainer,
          button_wrapper,
          button;

      // Add shortcuts
      _ta.dd.b = _ta.dd.getElementsByTagName('body')[0];
      _ta.dd.h = _ta.dd.getElementsByTagName('head')[0];

      // Build button
      buttonContainer = _ta.make({
        div: {
          className: _ta.pp.gid + '_button_container'
        }
      });

      buttonWrapper = _ta.make({
        span: {
          className: _ta.pp.gid + '_button_wrapper'
        }
      });
      buttonContainer.appendChild(buttonWrapper);

      button = _ta.make({
        span: {
          className: _ta.pp.gid + '_add_to_trip_button',
          innerHTML: _ta.pp.msg.addToTrip
        }
      });
      buttonWrapper.appendChild(button);
      
      helpContainer = _ta.make({
        div: {
          className: _ta.pp.gid + '_help_container',
          innerHTML: _ta.pp.msg.hoverHelpText
        }
      });
      buttonContainer.appendChild(helpContainer);

      // Add button container to page
      _ta.taScript.parentNode.insertBefore(buttonContainer, _ta.taScript);
      
      // Add events to button
      button.addEventListener('click', _ta.loadLoginFrame, false);

      // Add styles to container
      _ta.setContainerStyle();
    }
  }

  _ta.init();
  window.bai = _ta.pp;
})(window, document, navigator, {
  gid: "TA_TRIP_WIDGET", //+ (new Date).getTime(), // If we want this to be unoverridable then add the timestamp
  landing_path: '/register/',
  product: window._ta.product,
  msg:{
    addToTrip: "Ajouter à mon voyage",
    hoverHelpText: "Sauvegardez cette addresse en click sur Travelavenue.com, votre carnet de voyage en line. Votre vous aide a centraliser et sauvegardez toutes vos trouvailles sur tous les sites web en un seul lieu.",
    loginTitle: "Travelavenue - Carnet de Voyage"
  },
  // # will be replaced by '.' + _ta.gid
  styles:[
    '#_button_wrapper {display: inline-block; height: 25px;background: #0094da;border: 1px #1b769f;-moz-border-radius: 4px; border-radius: 4px;color: #ffeff6;box-shadow: 1px 1px 1px #999; cursor: pointer;}',
    '#_add_to_trip_button { padding: 0 4px;background: url("icon_small_logo.png") no-repeat 3px 3px; text-align: left; height: 23px; line-height:25px;-moz-border-radius: 4px; border-radius: 4px;box-shadow: inset 0px 0px 3px #fff; display:inline-block;margin:1px; text-align:center;font-size: 12px;text-indent:20px;}',
    '#_button_container { width: 200px; position: relative; font-family: Arial;}',
    '#_help_container { top: 27px; left:0; padding: 5px; position: absolute; background: #f1f1f1; border: solid 3px #111; width: 300px; display:none;border: solid 2px #3295cf;-moz-border-radius: 3px; border-radius: 3px; box-shadow: 1px 1px 3px #999;}',
    '#_button_container:hover #_help_container {display:block;}'
  ]
});
