var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

router.get('/:board_id', function(req, res, next) {
  var boardId = req.params.board_id;
  var query = 'SELECT * FROM boards WHERE board_id = ' + boardId;
  connection.query(query, function(err, board) {
    res.render('board', {
      title: board[0].title,
      board: board[0]
    });
  });
});

module.exports = router;