# A Semantic Web-Based Academic Research Explorer

This App is a web application designed to showcase the power of semantic web technologies in managing and exploring academic research data. Built using SPARQL queries, an ontology-driven backend, and an intuitive user interface, the app provides tools for interacting with data about authors, papers, awards, and more.

---

## Features

- **Dynamic Data Fetching**: Fetch and display data from a SPARQL endpoint using predefined queries.
- **Interactive Navigation**:
  - **Papers**: Explore research papers with details like titles, authors, keywords, and publication years.
  - **Authors**: View authors along with their affiliations and research fields.
  - **Awards**: Explore academic awards, their recipients, and associated research papers.
- **Custom SPARQL Query Interface**: Write, execute, and view results of custom SPARQL queries.
- **Search Functionality**: Built-in search bars for filtering data in each section.
- **Responsive Design**: Fully responsive UI built with HTML, CSS, and JavaScript for seamless use across devices.

---

## Technologies Used

- **Frontend**: 
  - HTML, CSS, JavaScript
- **Ontology Development**: 
  - Protégé with HermiT reasoner for logical consistency
- **SPARQL Query Hosting**:
  - Apache Fuseki
- **Semantic Web Standards**:
  - RDF (Resource Description Framework)
  - OWL (Web Ontology Language)

---

## Installation

1. Clone the repository:
   ```bash
   https://github.com/FatSijarina/Code.git
2. Navigate to the project directory:
   ```bash
   cd Code
3. Ensure you have Apache Fuseki installed and running on http://localhost:3030. Upload the ontology dataset to a Fuseki dataset named publications_dataset.
4. Open the index.html file in a browser to launch the application.

## Usage
1. Home Page:
  - Navigate to different sections like Papers, Authors, Awards, or Custom SPARQL Queries.
2. Custom Query:
  - Write your own SPARQL queries in the provided text area and view the results dynamically.
3. Explore Data:
  - Use search bars in each section to filter the displayed data efficiently.
4. Understand Relationships:
  - Explore semantic connections between entities like authors, institutions, and research fields.

## Acknowledgments
- Protégé: For ontology creation and management.
- Apache Fuseki: For hosting SPARQL endpoints.
- SPARQL Protocol: For enabling advanced querying capabilities.
