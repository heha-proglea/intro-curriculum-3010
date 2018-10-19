'use strict';

// このjavascriptファイルは、タスク管理を行うパッケージです

// key: タスクの文字列 value: 完了しているかどうかの真偽値
let tasks = new Map();

const fs = require('fs'); // ファイルシステムのモジュールの読み込み
const fileName = './tasks.json'; // 書き込みを行うファイル名の宣言


// 同期的にファイルから復元
try { // try...catch文
    const data = fs.readFileSync(fileName, 'utf8'); // ファイルから文字列を読み込み、dataに渡す
    tasks = new Map(JSON.parse(data)); // 上記のdataをJSON.parse関数で解釈し、連想配列に変換する
} catch (ignore) { // ファイルが存在しないなどのエラーが発生した場合の処理。このignoreには、発生したエラーが渡される
    console.log(fileName + 'から復元できませんでした');
}

/**
 * タスクをファイルに保存する
 */
function saveTasks() {
    fs.writeFileSync(fileName, JSON.stringify(Array.from(tasks)), 'utf8');
    // 連想配列tasksをArray.formで配列に変換→JSON.stringifyでJSONの文字列に変換→同期的にファイル書き出し
}


/**
* TODOを追加する
* @param {string} task
*/
function todo(task) {
    tasks.set(task, false);
    saveTasks();
}

/**
 * タスクと完了したかどうかが含まれる配列を受け取り、完了したかを返す
 * @param {array} taskAndIsDonePair
 * @return {boolean} 完了したかどうか
 */
function isDone(taskAndIsDonePair) {
    return taskAndIsDonePair[1];
}

/**
 * タスクと完了したかどうかが含まれる配列を受け取り、完了していないかを返す
 * @param {array} taskAndIsDonePair
 * @return {boolean} 完了していないかどうか
 */
function isNotDone(taskAndIsDonePair) {
    return !isDone(taskAndIsDonePair);
}

/**
 * TODOの一覧の配列を取得する
 * @return {array}
 */
function list() {
    return Array.from(tasks) // 連想配列tasksを、配列に変換
        .filter(isNotDone)
        .map(t => t[0]);
}

/**
* TODOを完了状態にする
* @param {string} task
*/
function done(task) {
    if (tasks.has(task)) {
        tasks.set(task, true);
        saveTasks();
    }
}

/**
* 完了済みのタスクの一覧の配列を取得する
* @return {array}
*/
function donelist() {
    return Array.from(tasks)
        .filter(isDone)
        .map(t => t[0]);
}

/**
* TODOを削除する
* @param {string} task
*/
function del(task) {
    tasks.delete(task);
    saveTasks();
}

// npmパッケージにtodoメソッドを追加(=関数をモジュール化した)(←module.exportsオブジェクトのプロパティとして関数を登録してる)(todo関数、list関数をモジュールの関数として公開)
module.exports = {
    todo: todo,
    list: list,
    done: done,
    donelist: donelist,
    del: del
};