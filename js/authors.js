const endpoint = "http://localhost:3030/publications_dataset/sparql";
async function fetchAuthors() {
    const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX mo: <http://www.papersontology.org/>
    SELECT ?authorName ?institutionName ?fieldName
    WHERE {
        ?author rdf:type mo:Author ;
                mo:hasName ?authorName ;
                mo:affiliatedWith ?institution ;
                mo:hasResearchField ?field .

        ?institution mo:hasName ?institutionName .
        ?field mo:hasResearchFieldName ?fieldName .
    }
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
        displayAuthors(json);
    } catch (error) {
        console.error("Error fetching authors:", error.message);
        displayError("Failed to load authors. Please check the server or endpoint.");
    }
}

function displayAuthors(data) {
    const tableBody = document.getElementById("authorsTableBody");
    tableBody.innerHTML = ""; 

    if (data.results.bindings.length === 0) {
        displayError("No authors found.");
        return;
    }

    data.results.bindings.forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.authorName?.value || "N/A"}</td>
            <td>${row.institutionName?.value || "N/A"}</td>
            <td>${row.fieldName?.value || "N/A"}</td>
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
    const tableBody = document.getElementById("authorsTableBody");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 3;
    td.textContent = message;
    td.style.color = "red";
    td.style.textAlign = "center";
    tr.appendChild(td);
    tableBody.appendChild(tr);
}

fetchAuthors();