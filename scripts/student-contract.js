function getStudentContracts () {
    fetch('https://student-book.glitch.me/student/1/contracts')
      .then(response => response.json())
      .then(data => {
        generateStudentContractTable(data);
        console.log(data);
      })
      .catch(error => console.error(error));
}

function generateStudentContractTable(data) {
  for(let i = 0; i<data.studentContracts.length; i++) {
    let row = $("<tr>");
    let columnStudent = $("<td>").text(data.studentContracts[i].name);
    let columnStartDate = $("<td>").text(data.studentContracts[i].start_date);
    let columnEndDate = $("<td>").text(data.studentContracts[i].end_date);
    let columnTime = $("<td>").text(data.studentContracts[i].hours_bought - data.studentContracts[i].hours_used);
    let columnStatus = $("<td>").text(data.studentContracts[i].is_active? "active":"inactive");

    row.append(columnStudent);
    row.append(columnStartDate);
    row.append(columnEndDate);
    row.append(columnTime);
    row.append(columnStatus);

    // instantiate button to register class for that particular student

    let registerClassBtn = $("<button>");
    registerClassBtn.text("Register class");
    row.append($("<td>").append(registerClassBtn));

    $("#student-contract-table").find("tbody").append(row);
  }    
}

getStudentContracts();