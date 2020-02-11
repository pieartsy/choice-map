document.addEventListener('DOMContentLoaded', function(){

var cy = cytoscape({
    container: document.getElementById("cy"),
elements: {
    nodes: [
      { data: { id: 'a', name: "atest"} },
      { data: { id: 'b', name: "btest"} },
      { data: { id: 'c', name: "ctest" } },
      { data: { id: 'd', name: "dtest" } },
      { data: { id: 'e', name: "etest" } },
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
    { selector: 'edge', style: {  'curve-style': 'bezier', 'target-arrow-shape': 'triangle' } },
    { selector: ':selected', style: {  } },
    // some style for endge handler
    { selector: '.eh-handle',
        style: {
          'background-color': 'red',
          'width': 12,
          'height': 12,
          'shape': 'ellipse',
          'overlay-opacity': 0,
          'border-width': 12, // makes the handle easier to hit
          'border-opacity': 0
        }
    },
    { selector: '.eh-hover',  style: { 'background-color': 'red' } },
    { selector: '.eh-source',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }
    },
    { selector: '.eh-target',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }
    },

    { selector: '.eh-preview, .eh-ghost-edge',
        style: {
          'background-color': 'red',
          'line-color': 'red',
          'target-arrow-color': 'red',
          'source-arrow-color': 'red'
        }
    },

    { selector: '.eh-ghost-edge.eh-preview-active',
      style: { 'opacity': 0 } }
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


var eh = cy.edgehandles({});

});