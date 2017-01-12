/**
 * Created by felix on 2016/12/26.
 */

var fs = require('fs');
const path = require('path')
var filebuffer = fs.readFileSync(path.join(__dirname, '../tchli.db'));

var getStudentList = function () {
    var db = new SQL.Database(filebuffer);
    var res = db.exec("select name, course, remark from student;");
    var result = res[0] ? res[0].values :  {}
    var tableContent = '';
    for(var i=0; i < result.length; i++) {
        tableContent += "<tr><td>" + result[i][0] + "</td><td>" + result[i][1] + "</td><td>" + result[i][2] + "</td></tr>"
    }
    $(".table-content").html(tableContent);
    db.close()

};

$('#add-student-submit').click(function () {
    var student_name = $('.student-name').val();
    var student_course = $('.student-course').val();
    var student_remark = $('.student-remark').val();

    var db = new SQL.Database(filebuffer);
    db.run("insert into student (name, course, remark)values(?, ?, ?)", [student_name, student_course, student_remark])
    var data = db.export();
    var buffer = new Buffer(data);
    fs.writeFileSync(path.join(__dirname, '../tchli.db'), buffer);
    db.close()
    window.location.href="student.html";
})

