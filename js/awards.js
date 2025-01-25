const endpoint = "http://localhost:3030/publications_dataset1/sparql";

async function fetchAwards() {
    const query = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX mo: <http://www.papersontology.org/>
    SELECT ?awardTitle ?paperTitle ?awardYear
    WHERE {
        ?award rdf:type mo:Award ;
            mo:hasTitle ?awardTitle ;
            mo:awardedToPaper ?paper ;
            mo:hasAwardYear ?awardYear .

        ?paper mo:hasTitle ?paperTitle .
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
        displayAwards(json);
    } catch (error) {
        console.error("Error fetching awards:", error.message);
        displayError("Failed to load awards. Please check the server or endpoint.");
    }
}

function displayAwards(data) {
    const tableBody = document.getElementById("awardsTableBody");
    tableBody.innerHTML = "";

    if (data.results.bindings.length === 0) {
        displayError("No awards found.");
        return;
    }

    data.results.bindings.forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.awardTitle?.value || "N/A"}</td>
            <td>${row.paperTitle?.value || "N/A"}</td>
            <td>${row.awardYear?.value ? new Date(row.awardYear.value).getFullYear() : "N/A"}</td>
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
    const tableBody = document.getElementById("awardsTableBody");
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4;
    td.textContent = message;
    td.style.color = "red";
    td.style.textAlign = "center";
    tr.appendChild(td);
    tableBody.appendChild(tr);
}

fetchAwards();