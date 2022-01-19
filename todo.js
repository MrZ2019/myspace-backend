var SqliteDB = require("./sqlite").SqliteDB;

var file = "todo.db";

var sqliteDB = new SqliteDB(file);
 /// create table.
 String.prototype.format = function() {

    var args = arguments;
    var str = this;
    for (var i = 0; i < args.length; i++) {

        var val = args[i];

        var exp = new RegExp('\\{' + i + '\\}', 'g');

        str = str.replace(exp, val);
    }

    return str;
};
 var createTodoTableSql =
 "create table if not exists todo(id integer not null primary key autoincrement , title VARCHAR(128) NOT NULL, category_id INTEGER, start_time DATETIME, create_time DATETIME)";

 var createTodoCategoryTableSql =
 "create table if not exists todo_category(id integer not null primary key autoincrement , name VARCHAR(64) NOT NULL, create_time DATETIME)";

sqliteDB.createTable(createTodoTableSql);

sqliteDB.createTable(createTodoCategoryTableSql);

/// insert data.

var todoData = [['学习', '1', now(), now()]];

var insertTodoSql =
 "insert into todo(title, category_id, start_time, create_time) values(?, ?, ?, ?)";

sqliteDB.insertData(insertTodoSql, todoData);

var todoCategoryData = [['学习', now()], ['工作', now()]];

var insertTodoCategorySql =
 "insert into todo_category(name, create_time) values(?, ?)";

sqliteDB.insertData(insertTodoCategorySql, todoCategoryData);

/// query data.

var querySql =
 "select * from todo";

sqliteDB.queryData(querySql, dataDeal);
function dataDeal(objects){
 
    for(var i = 0; i < objects.length; ++i){
 
        console.log(objects[i]);
 
    }
 
}
var queryCategorySql =
 "select * from todo_category";

sqliteDB.queryData(queryCategorySql, dataDeal);
function dataDeal(objects){
 
    for(var i = 0; i < objects.length; ++i){
 
        console.log(objects[i]);
 
    }
 
}

function now(onlyDate,date) {
    var d = date || new Date();

    var month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var date = d.getDate();
    if (date < 10) {
        date = '0' + date;
    }
    var hour = d.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    var minute = d.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    }
    var second = d.getSeconds();
    if (second < 10) {
        second = '0' + second;
    }
    var str;
    if (onlyDate) {
        str = '{0}-{1}-{2}'.format(d.getFullYear(), month, date);
    } else {

        str = '{0}-{1}-{2} {3}:{4}:{5}'.format(d.getFullYear(), month, date, hour, minute, second);
    }

    return str;
}