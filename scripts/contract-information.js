$("#contract-save-btn").on("click", function() {
    addHourglassToPage();
    editContract();
    destroyHourglassFromPage();
});

$("#contract-return-btn").on("click", function() {
    showOnlyStudentTables();
});