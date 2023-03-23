$("#class-save-btn").on("click", function() {
    addHourglassToPage();
    let classTime = registerNewClass();
    // addToContractHours(classTime);
    destroyHourglassFromPage();
});

$("#class-return-btn").on("click", function() {
    showOnlyStudentTables();
});