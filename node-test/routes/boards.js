const express = require('express');

const router = express.Router();
const moment = require('moment');

const multer = require('multer');

const connection = require('../mysqlConnection');

const upload = multer({ dest: './public/images/uploads/' });
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'shinonome',
  api_key: '183642231461541',
  api_secret: 'Vk5UMzpW5XaOKXVV3h9mVdz_IVo'
});

router.get('/:board_id', (req, res) => {
  const boardId = req.params.board_id;
  const getBoardQuery = `
    SELECT * 
    FROM boards 
    WHERE board_id = ${boardId}
  `;
  const getMessagesQuery = `
    SELECT M.message, 
           M.image_path, 
           ifnull(U.user_name, '名無し') AS user_name, 
           DATE_FORMAT(M.created_at, '%Y年%m月%d日 %k時%i分%s秒') AS created_at 
    FROM messages M LEFT 
                  OUTER JOIN users U 
                          ON M.user_id = U.user_id 
    WHERE M.board_id = ${boardId} 
    ORDER BY M.created_at ASC
  `;
  connection.query(getBoardQuery, (getBoardQueryErr, board) => {
    connection.query(getMessagesQuery, (getMessagesQueryErr, messages) => {
      res.render('board', {
        title: board[0].title,
        board: board[0],
        messageList: messages
      });
    });
  });
});


router.post('/:board_id', upload.single('image_file'), (req, res) => {
  const path = req.file.path;
  const message = req.body.message;
  const boardId = req.params.board_id;
  const userId = req.session.user_id ? req.session.user_id : 0;
  const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  cloudinary.uploader.upload(path, (result) => {
    const imagePath = result.url;
    const query = `
        INSERT INTO messages
                   (image_path,
                    message,
                    board_id,
                    user_id,
                    created_at)
        VALUES    ('${imagePath}',
                   '${message}',
                   '${boardId}',
                   '${userId}',
                   '${createdAt}')
    `;
    connection.query(query, () => {
      res.redirect(`/boards/${boardId}`);
    });
  });
});

module.exports = router;
