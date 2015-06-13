'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Videos = new Module('videos');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Videos.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Videos.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Videos.menus.add({
    title: 'Videos',
    link: 'all videos',
    roles: ['authenticated'],
    menu: 'main'
  });

  Videos.menus.add({
    'roles': ['admin'],
    'title': 'Gửi video',
    'link': 'create video'
  });

  Videos.aggregateAsset('css', 'videos.css');
  Videos.aggregateAsset('js', '../ckeditor/ckeditor.js');
  Videos.aggregateAsset('css', '../lib/videojs/dist/video-js/video-js.min.css');
  Videos.aggregateAsset('js', '../lib/videojs/dist/video-js/video.js');
  Videos.aggregateAsset('js', '../dirPagination.js');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Videos.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Videos.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Videos.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Videos;
});
