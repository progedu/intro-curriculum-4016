// 厳格モード
'use strict';
// ルーターオブジェクト作成
const express = require('express');
const router = express.Router();

// 'debug'モジュール呼び出し
const debug = require('debug');
// デバッガーを作成する
const loginJs_debugger = debug('debug:login.js');

// GETアクセスが送られてきた場合に行う処理
router.get('/', (req, res, next) => {
  loginJs_debugger('GET処理開始');
  // login.jadeテンプレートに
  // パラメータを与えて表示する
  res.render('login', { user: req.user });
  loginJs_debugger('GET処理完了');
});

// モジュールに登録する
module.exports = router;