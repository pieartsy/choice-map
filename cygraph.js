var cy = cytoscape({
    container: document.getElementById('cy'),
elements: {
    nodes: [
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      { data: { id: 'c' } },
      { data: { id: 'd' } },
      { data: { id: 'e' } },
    ],
    edges: [
      { data: { source: 'a', target: 'b' } },
      { data: { source: 'b', target: 'c' } },
      { data: { source: 'b', target: 'd' } },
      { data: { source: 'd', target: 'e' } },
      { data: { source: 'c', target: 'e' } },
      { data: { source: 'b', target: 'e' } },
    ]
  },

  layout: {
    name: 'breadthfirst',
    directed: true,
    padding: 10
  }
}); // cy init