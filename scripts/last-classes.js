function getLastClasses() {
    fetch('https://student-book.glitch.me/classes')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          generateLastClassesTable(data);
        })
        .catch(error => console.error(error));
  }

function generateLastClassesTable(data) {
    for(let i = 0; i<data.classes.length; i++) {
      let row = $("<tr>");
      let columnDate = $("<td>").text(data.classes[i].date_taught);
      let columnClassTime = $("<td>").text(data.classes[i].class_time);
      let columnStudent1 = $("<td>").text(data.classes[i].student_1);
      let columnStudent2 = $("<td>").text(data.classes[i].student_2);
      let columnStudent3 = $("<td>").text(data.classes[i].student_3);
      let columnStudent4 = $("<td>").text(data.classes[i].student_4);
      let columnNotes = $("<td>").text(data.classes[i].notes);
  
      row.append(columnDate);
      row.append(columnClassTime);
      row.append(columnStudent1);
      row.append(columnStudent2);
      row.append(columnStudent3);
      row.append(columnStudent4);
      row.append(columnNotes);
  
      $("#last-classes-table").find("tbody").append(row);
    }    
  }

  getLastClasses();