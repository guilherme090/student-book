let selectedStudent = {};
let selectedContract = {};

function getStudentsContracts() {
    fetch(`${API_ROOT}/students/contracts`)
      .then(response => response.json())
      .then(data => {
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
    
    let startDate = null;
    if(data.studentsContracts[i].start_date){
      startDate = new Date(data.studentsContracts[i].start_date).toLocaleDateString();
    }
    let columnStartDate = $("<td>").text(startDate);

    let endDate = null;
    if(data.studentsContracts[i].end_date){
      endDate = new Date(data.studentsContracts[i].end_date).toLocaleDateString();
    }
    let columnEndDate = $("<td>").text(endDate);
    
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

    let contractId = data.studentsContracts[i].id;
    seeContractBtn.on("click", function() {showSpecificContract(contractId)});
    
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
  fetch(`${API_ROOT}/student/${id}`)
      .then(response => response.json())
      .then(data => {
        selectedStudent.id = data.student.id;
        selectedStudent.name = data.student.name;
        selectedStudent.company = data.student.company;
        selectedStudent.level = data.student.level;
        if(data.student.birth_date != null){
          selectedStudent.birthDate = data.student.birth_date.substring(0,10);
        } else {
          selectedStudent.birthDate = null;
        }
        if(data.student.date_joined != null){
          selectedStudent.dateJoined = data.student.date_joined.substring(0,10);
        } else {
          selectedStudent.dateJoined = null;
        }
        selectedStudent.email = data.student.email;
        fillSpecificStudentForm(selectedStudent);
      })
      .catch(error => console.error(error));
}

function fillSpecificStudentForm(selectedStudent) {
  $("#student-name-input").val(selectedStudent.name);
  $("#student-company-input").val(selectedStudent.company);
  $("#student-level-input").val(selectedStudent.level);
  $("#student-birthdate-input").val(selectedStudent.birthDate);
  $("#student-email-input").val(selectedStudent.email);
  $("#student-date-joined-input").val(selectedStudent.dateJoined);

  showOnlyStudentInfo();
}

/*
--- Show information about specific contract
*/

function showSpecificContract(id) {
  fetch(`${API_ROOT}/contract/${id}`)
      .then(response => response.json())
      .then(data => {
        selectedContract.id = data.specificContract.id;
        selectedContract.student = data.specificContract.student;
        if(data.specificContract.start_date != null){
          selectedContract.startDate = data.specificContract.start_date.substring(0,10);
        } else {
          selectedContract.startDate = null;
        }
        if(data.specificContract.end_date != null){
          selectedContract.endDate = data.specificContract.end_date.substring(0,10);
        } else {
          selectedContract.endDate = null;
        }
        if(data.specificContract.termination_date != null){
          selectedContract.terminationDate = data.specificContract.termination_date.substring(0,10);
        } else {
          selectedContract.terminationDate = null;
        }
        selectedContract.hoursBought = data.specificContract.hours_bought;
        selectedContract.hoursUsed = data.specificContract.hours_used;
        selectedContract.isActive = data.specificContract.is_active;
        
        fillSpecificContractForm(data);
      })
      .catch(error => console.error(error));
}

function fillSpecificContractForm(data) {
  $("#student-input").val(selectedContract.student);
  $("#start-date-input").val(selectedContract.startDate);
  $("#end-date-input").val(selectedContract.endDate);
  $("#termination-date-input").val(selectedContract.terminationDate);
  $("#hours-bought-input").val(selectedContract.hoursBought);
  $("#hours-used-input").val(selectedContract.hoursUsed);
  if(selectedContract.isActive){
    $("#is-active-input").prop("checked", true);
  } else {
    $("#is-active-input").prop("checked", false);
  }
 
  showOnlyContractInfo();
}


function showOnlyStudentTables() {
  $(".contract-info").hide();
  $(".student-info").hide();
  $(".data-table").show();
}

function showOnlyStudentInfo() {
  $(".contract-info").hide();
  $(".student-info").show();
  $(".data-table").hide();
}

function showOnlyContractInfo() {
  $(".contract-info").show();
  $(".student-info").hide();
  $(".data-table").hide();
}

function eraseContractsTable() {
  $("#student-contract-table > tbody").children().remove();
}

function editStudent() {

  // update selected student to current form values

  selectedStudent.name = $("#student-name-input").val();
  selectedStudent.company = $("#student-company-input").val();
  selectedStudent.level = $("#student-level-input").val();
  selectedStudent.birthDate = $("#student-birthdate-input").val();
  selectedStudent.dateJoined = $("#student-date-joined-input").val();
  selectedStudent.email = $("#student-email-input").val();

  console.log("Estudante selecionado: ", selectedStudent)

  fetch(`${API_ROOT}/student/${selectedStudent.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      //'Accept': '*/*',
      'ADMIN_KEY': ADMIN_KEY
    },
    body: JSON.stringify(selectedStudent)
  })
    .then(response => {
      console.log("Response Status:", response.status);
      return response.json()
    })
    .then(data => {
      console.log("Data received:", data);
      eraseContractsTable();
      getStudentsContracts();
    })
    .catch(error => console.error(error));
}

function editContract() {

  // update selected contract to current form values
  
  selectedContract.student = $("#student-input").val();
  selectedContract.startDate = $("#start-date-input").val();
  selectedContract.endDate = $("#end-date-input").val();
  selectedContract.terminationDate = $("#termination-date-input").val();
  selectedContract.hoursBought = $("#hours-bought-input").val();
  selectedContract.hoursUsed = $("#hours-used-input").val();

  if($("#is-active-input").prop("checked")){
    selectedContract.isActive = '1';
  } else {
    selectedContract.isActive = '0';
  }

  console.log(selectedContract);

  fetch(`${API_ROOT}/contract/${selectedContract.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      //'Accept': '*/*',
      'ADMIN_KEY': ADMIN_KEY
    },
    body: JSON.stringify(selectedContract)
  })
    .then(response => {
      console.log("Response Status:", response.status);
      return response.json()
    })
    .then(data => {
      console.log("Data received:", data);
      eraseContractsTable();
      getStudentsContracts();
    })
    .catch(error => console.error(error));
}






getStudentsContracts(); 