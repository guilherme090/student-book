$("#class-save-btn").on("click", function() {
    addHourglassToPage();
    let classTime = registerNewClass();
    //console.log("class time: ", classTime);
    //addToContractHours(classTime);
    destroyHourglassFromPage();
});

$("#class-return-btn").on("click", function() {
    showOnlyStudentTables();
});