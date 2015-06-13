'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Hoithao, app, auth, database) {

  app.get('/hoithao/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/hoithao/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/hoithao/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/hoithao/', function(req, res, next) {
    Hoithao.render('index', {
      package: 'hoithao'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
