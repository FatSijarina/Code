const endpoint = "http://localhost:3030/publications_dataset/sparql";

async function fetchPapers() {
    const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX mo: <http://www.papersontology.org/>
    SELECT ?title 
       (GROUP_CONCAT(DISTINCT ?authorName; SEPARATOR=", ") AS ?authors)
       (GROUP_CONCAT(DISTINCT ?doi; SEPARATOR=", ") AS ?dois)
       (GROUP_CONCAT(DISTINCT ?keywordLabel; SEPARATOR=", ") AS ?keywords)
       (GROUP_CONCAT(DISTINCT ?year; SEPARATOR=", ") AS ?years)
    WHERE {
        ?paper rdf:type mo:Paper ;
            mo:hasTitle ?title ;
            mo:writtenBy ?author ;
            mo:hasDOI ?doi ;
            mo:hasKeyword ?keyword ;
            mo:hasYear ?year .

        ?author mo:hasName ?authorName .
        ?keyword mo:hasKeywordLabel ?keywordLabel .
    }
    GROUP BY ?title
    `;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `query=${encodeURIComponent(query)}`,
        });

        if (!response.ok) {
            throw new Error(`SPARQL query failed with status ${response.status}`);
        }

        const json = await response.json();
        displayPapers(json);
    } catch (error) {
        console.error("Error fetching papers:", error.message);
        displayError("Failed to load papers. Please check the server or endpoint.");
    }
}

function displayPapers(data) {
    const tableBody = document.getElementById("papersTableBody");
    tableBody.innerHTML = "";

    if (data.results.bindings.length === 0) {
        displayError("No papers found.");
        return;
    }

    data.results.bindings.forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.title?.value || "N/A"}</td>
            <td>${row.authors?.value || "N/A"}</td>
            <td>${row.dois?.value || "N/A"}</td>
            <td>${row.keywords?.value || "N/A"}</td>
            <td>${row.years?.value ? Math.floor(row.years.value) : "N/A"}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function filterTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const table = document.querySelector("table");
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) { // Skip the header row
        const cells = rows[i].getElementsByTagName("td");
        let match = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().includes(filter)) {
                match = true;
                break;
            }
        }

        rows[i].style.display = match ? "" : "none";
    }
}

function displayError(message) {
    const tableBody = document.getElementById("papersTableBody");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = message;
    td.style.color = "red";
    td.style.textAlign = "center";
    tr.appendChild(td);
    tableBody.appendChild(tr);
}

fetchPapers();