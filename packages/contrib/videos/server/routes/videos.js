'use strict';

var videos = require('../controllers/videos');

// Xác nhận quyèn quản lý video
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.video.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Videos, app, auth) {

  app.route('/videos')
    .get(videos.all)
    .post(auth.requiresLogin, videos.create);
  app.route('/videos/:videoId')
    .get(auth.isMongoId, videos.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, videos.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, videos.destroy);

  // Cài đặt thông số articleId
  app.param('videoId', videos.video);
};
