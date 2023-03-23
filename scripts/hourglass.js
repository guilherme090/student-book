function addHourglassToTable(tableId) {
    let hourglassRow = $("<tr>").addClass("hourglass");
    let hourglassTd = $("<td>").attr("colspan", 99);
    let hourglassImg = $("<img>")
                        .addClass("hourglass")
                        .attr("src", "pictures/hourglass.png")
                        .attr("width", "80px")
                        .attr("height", "80px")
                        .attr("alt", "loading table...");

    hourglassTd.append(hourglassImg);
    hourglassRow.append(hourglassTd);

    $(`#${tableId}`).find("tbody").append(hourglassRow);
}

function destroyHourglass(tableId) {
    $(`#${tableId}`).find(".hourglass").remove();
}

function addHourglassToPage() {
    let hourglassImg = $("<img>")
                        .addClass("hourglass")
                        .attr("src", "pictures/hourglass.png")
                        .attr("width", "80px")
                        .attr("height", "80px")
                        .attr("alt", "loading table...");
    $(`body`).append(hourglassImg);
}

function destroyHourglassFromPage() {
    $(`body`).find(".hourglass").remove();
}