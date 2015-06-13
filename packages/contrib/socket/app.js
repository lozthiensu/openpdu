'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var MeanSocket = new Module('socket');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
MeanSocket.register(function(app, auth, database, http) {

    var io = require('./server/config/socketio')(http);
    MeanSocket.io = io;

    //We enable routing. By default the Package Object is passed to the routes
    MeanSocket.routes(io);

    //We are adding a link to the main menu for all authenticated users
    MeanSocket.menus.add({
        title: 'Chat',
        link: 'chatroom',
        roles: ['authenticated'],
        menu: 'main'
    });

    MeanSocket.aggregateAsset('js', '../ui-bootstrap-tpls-0.10.0.js');
    MeanSocket.aggregateAsset('js', '../ui-bootstrap-tpls-0.10.0.min.js');
    MeanSocket.aggregateAsset('js', '../bootstrap.min.js');
    MeanSocket.aggregateAsset('js', '../jquery-2.1.0.min.js');
   /* MeanSocket.aggregateAsset('js', '../bistri.conference.min.js');*/

    return MeanSocket;
});
