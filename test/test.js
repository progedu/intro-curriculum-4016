'use strict';
const request = require('supertest');
const app = require('../app');
const passportStub = require('passport-stub');

describe('/login', () => {//ログイン時のテスト
  beforeAll(() => {
    passportStub.install(app);
    passportStub.login({ username: 'testuser' });//testuserでログイン
  });
  afterAll(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });
  test('ログインのためのリンクが含まれる', () => {//ログイン時のリンクテスト
    return request(app)
      .get('/login')
      .expect('Content-Type', 'text/html; charset=utf-8')//htmlのヘッダーがあるか？
      .expect(/<a href="\/auth\/github"/)//Github認証のURLあるか
      .expect(200);//200で通るか
  });
  test('ログイン時はユーザー名が表示される', () => {
    return request(app)
      .get('/login')
      .expect(/testuser/)//testuserが表示されているか
      .expect(200);//200で通っているか
  });

  describe('/logout', () => {
    test('/ にリダイレクトされる', () => {
      return request(app)
        .get('/logout')
        .expect('Location', '/')// リダイレクト先は正しいか
        .expect(302);//302になっているか
    });
  });

});