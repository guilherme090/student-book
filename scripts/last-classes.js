function getLastClasses() {
  addHourglassToTable("last-classes-table");
  fetch(`${API_ROOT}/classes`)
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
    let columnClassTime = $("<td>").text(data.classes[i].class_time);
    let columnStudent = $("<td>").text(data.classes[i].name);
    let columnNotes = $("<td>").text(data.classes[i].notes);

    row.append(columnDate);
    row.append(columnClassTime);
    row.append(columnStudent);
    row.append(columnNotes);

    $("#last-classes-table").find("tbody").append(row);
  }    
}

  getLastClasses();