function getStudentsContracts() {
    fetch('https://student-book.glitch.me/students/contracts')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        generateStudentsContractTable(data);
        showOnlyStudentTables();
      })
      .catch(error => console.error(error));
}

function generateStudentsContractTable(data) {
  for(let i = 0; i<data.studentsContracts.length; i++) {
    let row = $("<tr>");
    let columnStudent = $("<td>").text(data.studentsContracts[i].name);
    let columnCompany = $("<td>").text(data.studentsContracts[i].company);
    let columnStartDate = $("<td>").text(data.studentsContracts[i].start_date);
    let columnEndDate = $("<td>").text(data.studentsContracts[i].end_date);
    let columnTime = $("<td>").text(data.studentsContracts[i].hours_bought - data.studentsContracts[i].hours_used);
    let columnStatus = $("<td>").text(data.studentsContracts[i].is_active? "active":"inactive");

    row.append(columnStudent);
    row.append(columnCompany);
    row.append(columnStartDate);
    row.append(columnEndDate);
    row.append(columnTime);
    row.append(columnStatus);

    // instantiate button to register class for that particular student
    let registerClassBtn = $("<button>").text("Register class");
    if(columnStatus.text() != "active") {
      registerClassBtn.addClass("inactive");
    }
    
    // instantiate button to see/change student data
    let seeStudentBtn = $("<button>").text("See student");

    let studentId = data.studentsContracts[i].student;
    seeStudentBtn.on("click", function() {showSpecificStudent(studentId)});
    
    // instantiate button to see/change contract data
    let seeContractBtn = $("<button>").text("See contract");
    
    let actionsTd = $("<td>");
    row.append(actionsTd.append(registerClassBtn).append(seeStudentBtn).append(seeContractBtn));

    // check if active contract is expiring or expired
    if(columnStatus.text() === "active"){
      let endDate = new Date(columnEndDate.text());
      let criticalDate = new Date();
      criticalDate.setMonth(criticalDate.getMonth() + 2);
      if (new Date() > endDate){
        columnStudent.addClass("alert");
        columnCompany.addClass("alert");
        columnStartDate.addClass("alert");
        columnEndDate.addClass("alert");
        columnTime.addClass("alert");
        columnStatus.addClass("alert");
        actionsTd.addClass("alert");
      }
      else if(endDate < criticalDate) {
        columnEndDate.addClass("alert");
        columnTime.addClass("alert");
      }
    }

    $("#student-contract-table").find("tbody").append(row);
  }    
}

/*
--- Show information about specific student
*/

function showSpecificStudent(id) {
  fetch(`https://student-book.glitch.me/student/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fillSpecificStudentForm(data);
      })
      .catch(error => console.error(error));
}

function fillSpecificStudentForm(data) {
  $("#student-name-input").val(data.student.name);
  $("#student-company-input").val(data.student.company);
  $("#student-level-input").val(data.student.level);
  $("#student-birthdate-input").val(data.student.birth_date);
  $("#student-email-input").val(data.student.email);
  $("#student-date-joined-input").val(data.student.date_joined);

  showOnlyStudentInfo();
}

function showOnlyStudentTables() {
  $(".student-info").hide();
  $(".data-table").show();
}

function showOnlyStudentInfo() {
  $(".student-info").show();
  $(".data-table").hide();
}

getStudentsContracts();
// showSpecificStudent(1);