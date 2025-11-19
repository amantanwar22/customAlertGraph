const data = {
    read: { python: 40, spark: 70, llm: 55 },
    code: { python: 60, spark: 80, llm: 30 },
    quiz: { python: 90, spark: 50, llm: 75 }
};



function renderGraph(title, graphData) {
    let colors = {
        python: "#00e676",
        spark: "#29b6f6",
        llm: "#ff7043"
    };

    let html = `
        <div class="graphContainer">
            <div class="graphTitle">${title}</div>
    `;

    for (let skill in graphData) {
        let value = graphData[skill];
        html += `
            <div class="barRow">
                <div class="barLabel">${skill.toUpperCase()} : ${value}</div>
                <div class="barOuter">
                    <div class="barFill" 
                         style="width:0%; background:${colors[skill]};"
                         data-width="${value}%"></div>
                </div>
            </div>
        `;
    }

    html += `</div>`;
    return html;
}



function openDataAlert(htmlContent) {
    $("#dataAlertContent").html(htmlContent);
    $("#dataAlertBox").fadeIn(300);
}

function closeDataAlert() {
    $("#dataAlertBox").fadeOut(300);
    $("#dataAlertContent").html("");
}

$(document).on("click", ".dataAlertCloseBtn", function () {
    closeDataAlert();
});

$(document).on("keydown", function (e) {
    if (e.key === "Escape") closeDataAlert();
});

$("#testDataAlertBtn").click(function () {

    let finalHTML = `
        ${renderGraph("Read", data.read)}
        ${renderGraph("Code", data.code)}
        ${renderGraph("Quiz", data.quiz)}
    `;

    openDataAlert(finalHTML);

    setTimeout(() => {
        $(".barFill").each(function () {
            $(this).css("width", $(this).data("width"));
        });
    }, 200);
});