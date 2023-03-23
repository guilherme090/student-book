$("#class-save-btn").on("click", function() {
    addHourglassToPage();
    registerNewClass();
    destroyHourglassFromPage();
});

$("#class-return-btn").on("click", function() {
    showOnlyStudentTables();
});