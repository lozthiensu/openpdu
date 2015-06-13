'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Hoithao = new Module('hoithao');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Hoithao.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Hoithao.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Hoithao.menus.add({
    title: 'Hội thảo',
    link: 'hoithao example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Hoithao.aggregateAsset('css', 'hoithao.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Hoithao.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Hoithao.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Hoithao.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Hoithao;
});
