// 厳格モード
'use strict';
// ルーターオブジェクト作成
const express = require('express');
const router = express.Router();

// 'debug'モジュール呼び出し
const debug = require('debug');
// デバッガーを作成する
const logoutJs_debugger = debug('debug:logout.js');

// /logoutにGETでアクセスされた時にログアウトをする処理
router.get('/', function (req, res, next) {
  logoutJs_debugger('GET処理開始');
  req.logout();
  res.redirect('/');
  logoutJs_debugger('GET処理完了');
});

// モジュールに登録する
module.exports = router;
