const CLASS_LIMIT = 10;
function getLastClasses() {
  addHourglassToTable("last-classes-table");

  let classOffset = (parseInt($("#number-class-page").val()) - 1) * CLASS_LIMIT;
  fetch(`${API_ROOT}/classes/${CLASS_LIMIT}/${classOffset}`)
      .then(response => response.json())
      .then(data => {
        destroyHourglass("last-classes-table");
        generateLastClassesTable(data);
      })
      .catch(error => console.error(error));
}

function generateLastClassesTable(data) {
  for(let i = 0; i<data.classes.length; i++) {
    let row = $("<tr>");
    let dateTaught = new Date(data.classes[i].date_taught).toLocaleString().slice(0,10);
    let columnDate = $("<td>").text(dateTaught.replace(/,/g,''));
    columnDate.addClass("table-highlight");
    let columnClassTime = $("<td>").text(data.classes[i].class_time);
    columnClassTime.addClass("table-highlight");
    let columnStudent = $("<td>").text(data.classes[i].name);
    columnStudent.addClass("table-highlight");
    let columnNotes = $("<td>").text(data.classes[i].notes);

    row.append(columnDate);
    row.append(columnClassTime);
    row.append(columnStudent);
    row.append(columnNotes);

    $("#last-classes-table").find("tbody").append(row);
  }    
}

  getLastClasses();