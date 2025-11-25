// const data = {
//     read: { python: 40, spark: 70, llm: 55 },
//     code: { python: 60, spark: 80, llm: 30 },
//     quiz: { python: 90, spark: 50, llm: 75 }
// };

let rawData = `[ReadScore]:&&&rohitagarwal :STAGE: 1
[CodeScore]:|python->40||spark->20|
[ReadScore]:|python->90||trending->10||Analytics->10||AgenticAI->10|`;

function getLatestBlock(rawData, type) {
    let lines = rawData.split("\n");
    let matches = [];
    let marker = `[${type}Score]:`;

    lines.forEach(line => {
        let trimmed = line.trim();
        if (trimmed.startsWith(marker)) {
            matches.push(trimmed.substring(marker.length));
        }
    });

    if (matches.length === 0) return "";
    return matches[matches.length - 1];
}

function parseBlock(block) {
    if (!block) block = "";
    let parts = block.split("|");

    let temp = {};

    parts.forEach(part => {
        if (part.includes("->")) {
            let [key, value] = part.split("->");

            key = key.trim().toLowerCase();
            value = parseInt(value.trim());

            if (!isNaN(value)) {
                temp[key] = value;
            }
        }
    });

    return {
        python: temp.python || 0,
        spark: temp.spark || 0,
        llm: temp.llm || 0,
    };
}


function convertRawToFinal(rawData) {
    let readBlock = getLatestBlock(rawData, "Read");
    let codeBlock = getLatestBlock(rawData, "Code");
    let quizBlock = getLatestBlock(rawData, "Quiz");

    return {
        read: parseBlock(readBlock),
        code: parseBlock(codeBlock),
        quiz: parseBlock(quizBlock)
    };
}



const data = convertRawToFinal(rawData)


function getGlobalMax(data) {
    let allValues = [];

    for (let section in data) {
        for (let skill in data[section]) {
            allValues.push(data[section][skill]);
        }
    }
    
    return Math.max(...allValues, 1);
}

const GLOBAL_MAX = getGlobalMax(data);



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
        let scaledWidth = (value / GLOBAL_MAX) * 100;

        html += `
            <div class="barRow">
                <div class="barLabel">${skill.toUpperCase()} : ${value}</div>
                <div class="barOuter">
                    <div class="barFill"
                         style="width:0%; background:${colors[skill]};"
                         data-width="${scaledWidth}%"></div>
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