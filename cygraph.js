var cy = cytoscape({
    container: document.getElementById("cy"),
elements: {
    nodes: [
      { data: { id: 'a', name: "atest"}, classes: "atest"},
      { data: { id: 'b', name: "btest"}, classes: "btest" },
      { data: { id: 'c', name: "ctest" }, classes: "ctest" },
      { data: { id: 'd', name: "dtest" }, classes: "dtest" },
      { data: { id: 'e', name: "etest" }, classes: "etest" },
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
  //selectors for undo/redo
  style: [
    { selector: 'node', style: { 'content': 'data(name)' }  },
    { selector: 'edge', style: { 'target-arrow-shape': 'triangle' } },
    { selector: ':selected', style: {  } }
    ],

  layout: {
    name: 'breadthfirst',
    directed: true,
    padding: 10
  }
}); // cy init

// test for traversing the tree
var a = cy.$('#a');
var b = cy.$('#b');

console.log(a.edgesWith(b));


//undo/redo

var ur = cy.undoRedo ({
  });

document.addEventListener("keydown", function (e) {
    if(e.which === 46) {
      var selecteds = cy.$(":selected");
    if (selecteds.length > 0)
      ur.do("remove", selecteds);
    }

    else if (e.ctrlKey && e.target.nodeName === 'BODY')
      if (e.which === 90)
        ur.undo();
    else if (e.which === 89)
      ur.redo();
});

document.addEventListener("click", function(e){
  if (e.altKey)
    ur.do("add", {
      group: "nodes",
      data: { weight: 75, name: "New Node" },
      renderedPosition: {
        x: e.clientX,
        y: e.clientY,
      },
    });
});