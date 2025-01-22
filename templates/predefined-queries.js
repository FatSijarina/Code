function getPredefinedQueries() {
    return [
        {
            label: "Get all papers",
            query: `
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX mo: <http://www.papersontology.org/>
                SELECT ?paper
                WHERE {
                    ?paper rdf:type mo:Paper .
                }
            `,
        },
        {
            label: "Get authors with awards",
            query: `
                PREFIX mo: <http://www.papersontology.org/>
                SELECT ?author
                WHERE {
                    ?award rdf:type mo:BestPaperAward ;
                        mo:awardedToAuthor ?author .
                }
            `,
        },
    ];
}