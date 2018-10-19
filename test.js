// test.jsの使い方→モジュールのディレクトリにてnode testを実行し、AssertionErrorが発生が発生しなければテストは無事成功
'use strict';

const fs = require('fs');

fs.unlink('./tasks.json', (err) => { // 指定したファイルを削除し、コールバック関数を呼ぶ。ファイルが存在しない場合、引数errにはエラーが渡される(今回は使わない)
    // 以下、ファイル削除後に呼び出されるテスト処理
    
    const assert = require('assert'); // node.jsに付属する簡易テスト用モジュールの、Assertモジュールを呼び出し。
    const todo = require('./index.js'); // モジュールindex.jsを、相対パスで直接呼び出す(ちなみに、npmパッケージとして呼び出す場合にはパッケージ名で呼び出す)
    // このrequireしたタイミングで、index.jsが読み込まれ、書いてあるプログラムが実行される。
    
    // todo と list のテスト
    todo.todo('ノートを買う');
    todo.todo('鉛筆を買う');
    assert.deepEqual(todo.list(), ['ノートを買う', '鉛筆を買う']);
    // assert.deepEqualは、第一引数と第二引数を比較する。成功すれと何も起こらない。失敗するとAssertionErrorが発生。
    
    // done と donelist のテスト
    todo.done('鉛筆を買う');
    assert.deepEqual(todo.list(), ['ノートを買う']);
    assert.deepEqual(todo.donelist(), ['鉛筆を買う']);
    
    // del のテスト
    todo.del('ノートを買う');
    todo.del('鉛筆を買う');
    assert.deepEqual(todo.list(), []); // タスク一覧がどちらも空になっていることを確認
    assert.deepEqual(todo.donelist(), []); // 同上
    
    console.log('テストが正常に完了しました');
});