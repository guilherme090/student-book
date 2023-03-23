$("#student-save-btn").on("click", function() {
    addHourglassToPage();
    editStudent();
    destroyHourglassFromPage();
});

$("#student-return-btn").on("click", function() {
    showOnlyStudentTables();
});