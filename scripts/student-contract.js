function getStudentsContracts () {
    fetch('https://student-book.glitch.me/students/contracts')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        generateStudentsContractTable(data);
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
    let registerClassTd = $("<td>");
    row.append(registerClassTd.append(registerClassBtn));

    // instantiate button to see/change student data
    let seeStudentBtn = $("<button>").text("See student");
    let seeStudentTd = $("<td>");
    row.append(seeStudentTd.append(seeStudentBtn));

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
        registerClassTd.addClass("alert");
        seeStudentTd.addClass("alert");
      }
      else if(endDate < criticalDate) {
        columnEndDate.addClass("alert");
        columnTime.addClass("alert");
      }
    }

    $("#student-contract-table").find("tbody").append(row);
  }    
}

getStudentsContracts();
//generateStudentContractTable({studentsContracts:[]});