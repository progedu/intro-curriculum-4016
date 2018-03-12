// 厳格モード
'use strict';

console.log('テスト開始');

// テスト用モジュール読み込み
const request = require('supertest');

// app.js読み込み
const app = require('../app');

// passport-stubモジュール読み込み
// スタブ：テスト対象から呼び出される別のモジュールの代用品
const passportStub = require('passport-stub');

// mochaのテストの書式
// 第一引数：一連のテストの名前
// 第二引数：個々のテスト処理(it処理)を含む無名関数
describe('/login',
  () => {
    console.log('/login関連のテスト開始');
    // 一連のit処理の前に実行される処理
    before(
      () => {
        console.log('BEFORE処理開始');
        // passportStubをインストールする 
        passportStub.install(app);
        // usernameプロパティを指定する…のは
        // IncomingMessageクラスの仕様に従っている？
        passportStub.login({ username: 'testuser' });
        console.log('BEFORE処理終了');
      }
    );

    // 一連のit処理の後に実行される処理
    after(
      () => {
        console.log('AFTER処理開始');
        // ログアウト
        passportStub.logout();
        // ↓必要なのかどうかよくわからない
        passportStub.uninstall(app);
        console.log('AFTER処理完了');
      }
    );

    // 個々のテスト処理
    // 第一引数：個々のテストの名前
    // 第二引数：実際のテスト処理を行う関数(assert処理など)
    it('ログインのためのリンクが含まれる',
      // supertestモジュールの書式
      // ドキュメント：https://github.com/visionmedia/supertest
      (done) => {
        console.log('test1開始');
        // 対象のアプリを引数にオブジェクトを作成して
        request(app)
          // /loginにアクセスして
          .get('/login')
          // ヘッダの値をチェックして
          .expect('Content-Type', 'text/html; charset=utf-8')
          // <body>タグ内に
          // <a href="auth/github"という文字列があるかをチェックする
          .expect(/<a href="\/auth\/github"/)
          // 期待されるステータスコードと引数のCB関数を渡すと終了？
          .expect(200, done);
        console.log('test1完了');
      }
    );

    // 大体↑と一緒
    it('ログイン時はユーザー名が表示される',
      (done) => {
        console.log('test2開始');
        request(app)
          .get('/login')
          .expect(/testuser/)
          .expect(200, done);
        console.log('test2完了');
      }
    );
  }
);

describe('/logout',
  () => {
    console.log('/logout関連のテスト開始');

    // 個々のテスト処理
    // 第一引数：個々のテストの名前
    // 第二引数：実際のテスト処理を行う関数(assert処理など)
    it('/logout にアクセスした際に / にリダイレクトされる',
      (done) => {
        console.log('test3開始');
        request(app)
          .get('/logout')
          .expect(302, done);
        console.log('test3完了');
      }
    );
  }
);