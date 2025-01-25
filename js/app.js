document.getElementById("runQueryButton").addEventListener("click", runQuery);
document.getElementById("predefinedQueriesButton").addEventListener("click", loadPredefinedQueries);

const endpoint = "http://localhost:3030/publications_dataset1/sparql";

async function runQuery() {
    const sparqlQuery = document.getElementById("sparqlQuery").value;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `query=${encodeURIComponent(sparqlQuery)}`,
        });

        if (!response.ok) throw new Error("SPARQL query failed.");

        const json = await response.json();
        displayResults(json);
    } catch (error) {
        alert("Error: " + error.message);
    }
}

function displayResults(json) {
    const resultsSection = document.getElementById("resultsSection");
    const headerRow = document.getElementById("resultsHeader");
    const body = document.getElementById("resultsBody");

    resultsSection.style.display = "block";

    headerRow.innerHTML = "";
    body.innerHTML = "";

    const vars = json.head.vars;
    vars.forEach((variable) => {
        const th = document.createElement("th");
        th.textContent = variable;
        headerRow.appendChild(th);
    });

    json.results.bindings.forEach((binding) => {
        const tr = document.createElement("tr");
        vars.forEach((variable) => {
            const td = document.createElement("td");
            td.textContent = binding[variable]?.value || "N/A";
            tr.appendChild(td);
        });
        body.appendChild(tr);
    });
}

function loadPredefinedQueries() {
    const predefined = getPredefinedQueries();
    const query = prompt(
        "Choose a query:\n" + predefined.map((q, i) => `${i + 1}. ${q.label}`).join("\n")
    );

    const selectedQuery = predefined[parseInt(query) - 1];
    if (selectedQuery) {
        document.getElementById("sparqlQuery").value = selectedQuery.query;
    } else {
        alert("Invalid selection!");
    }
}