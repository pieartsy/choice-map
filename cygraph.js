//waits until DOM is loaded for script to run
document.addEventListener('DOMContentLoaded', function(){

//declares cytoscape graph with container as the div id 'cy' in index.html
var cy = cytoscape({
    container: document.getElementById("cy"),
//the parts of the graph
elements: {
  //the circles with labels
    nodes: [
      { data: { id: 'a', label: "atest"} },
      { data: { id: 'b', label: "btest"} },
      { data: { id: 'c', label: "ctest" } },
      { data: { id: 'd', label: "dtest" } },
      { data: { id: 'e', label: "etest" } },
    ],
    //the lines connecting them
    edges: [
      { data: { source: 'a', target: 'b', label: 'edgetest' } },
      { data: { source: 'b', target: 'c' } },
      { data: { source: 'b', target: 'd' } },
      { data: { source: 'd', target: 'e' } },
      { data: { source: 'c', target: 'e' } },
      { data: { source: 'b', target: 'e' } },
    ]
  },
  //styles
  style: [
    //adds the name attribute (the node's label, ex: 'btest') to the node
    { 
      selector: "node",
      style: { 
          "width": 80,
          "height": 80,
          "label": "data(label)",
          "text-wrap": "wrap",
          "text-max-width": 70,
          "text-valign": "center",
          "text-halign": "center",
          'background-color': '#fff',
          'border-color': "#000",
          "border-width": 2
      }
    },
    //styles the edges as having directed arrows and bezier curves with labels
    { selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'arrow-scale': 2,
          'label': "data(label)"} },
    //selected nodes or edges have cyan outlines
    { selector: ':selected', 
        style: { 
          "border-color": '#50d7ff',
          "border-width": 4,
          "line-color": "#50d7ff",
          "target-arrow-color": "#50d7ff",
     } },
    // some style for edge handler
    //for the little dot that you grab to make an edge
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
    //when you hover over the target node with your handle, it turns red
    { selector: '.eh-hover',  style: { 'background-color': 'red' } },
    //when you grab the edge handle and move it away from the given node, its border is red
    { selector: '.eh-source',
        style: {
          'border-width': 4,
          'border-color': 'red'
        }
    },
    //the target node you're gonna add an edge to turns red
    { selector: '.eh-target',
        style: {
          'border-width': 4,
          'border-color': 'red'
        }
    },
    //the 'ghost' (not locked in) edges are red
    { selector: '.eh-preview, .eh-ghost-edge',
        style: {
          'background-color': 'red',
          'line-color': 'red',
          'target-arrow-color': 'red',
          'source-arrow-color': 'red',
          'line-style': "dashed"
        }
    },
    //not sure what this is tbfh
    { selector: '.eh-ghost-edge.eh-preview-active', style: { 'opacity': 0 } },
    
    //color styles for nodes and edges
    { selector: '.red', style: { 'background-color': '#f45353', 'line-color': '#f45353', 'target-arrow-color': '#f45353' } },
    { selector: '.orange', style: { 'background-color': '#e78d41', 'line-color': '#e78d41', 'target-arrow-color': '#e78d41'  } },
    { selector: '.yellow', style: { 'background-color': '#fbf086', 'line-color': '#fbf086', 'target-arrow-color': '#fbf086'   } },
    { selector: '.green', style: { 'background-color': '#5bbd67', 'line-color': '#5bbd67', 'target-arrow-color': '#5bbd67'   } },
    { selector: '.blue', style: { 'background-color': '#799bf6', 'line-color': '#799bf6', 'target-arrow-color': '#799bf6'   } },
    { selector: '.purple', style: { 'background-color': '#a54bd8', 'line-color': '#a54bd8', 'target-arrow-color': '#a54bd8'   } },
    { selector: '.pink', style: { 'background-color': '#ff9cdd', 'line-color': '#ff9cdd', 'target-arrow-color': '#ff9cdd'   } },
    { selector: '.white', style: { 'background-color': '#fff', 'line-color': 'grey', 'target-arrow-color': 'grey'   } },
    { selector: '.black', style: { 'background-color': '#000', 'color': '#fff', 'line-color': '#000', 'target-arrow-color': '#000'   } },
    ],

//makes the layout a directed tree graph
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


//undo/redo extension

var ur = cy.undoRedo ({
  });

//listens for a keydown
document.addEventListener("keydown", function (e) {
  //if keydown is delete button, remove element
    if(e.which === 46) {
      var selecteds = cy.$(":selected");
    if (selecteds.length > 0)
      ur.do("remove", selecteds);
    }
    //if keydown is ctrl [dunno what the stuff after && is]
    else if (e.ctrlKey && e.target.nodeName === 'BODY')
    //and z, undo
      if (e.which === 90)
        ur.undo();
    //and y, redo
    else if (e.which === 89)
      ur.redo();
});

//listens for a mouse click
document.addEventListener("click", function(e){
  //if alt key is pressed at the same time
  if (e.altKey)
  //add a node where the mouse is
    ur.do("add", {
      group: "nodes",
      data: { weight: 75, label: "New Node" },
      renderedPosition: {
        x: e.clientX,
        y: e.clientY,
      },
    });
});

//edge handles extension
cy.edgehandles({});


//change the color of nodes and edges
//listens to whether the user selects an option on the dropdown form with ID "colors"
document.getElementById("colors").addEventListener("change", function(e) {
  //when you select a node (or nodes)
  cy.on("select", "node", function(e){
    //the target node is the variable 'node'
    var node = e.target;
    //the node's color class is changed to the selected color in the dropdown
    node.classes(colors.options[colors.selectedIndex].text);
  });
  //when you select an edge (or edges)
  cy.on("select", "edge", function(e){
    //the target node is the variable 'edge'
    var edge = e.target;
    //the edge's color class is changed to the selected color in the dropdown
    edge.classes(colors.options[colors.selectedIndex].text);
  });
});

//this has a weird bug right now
//it changes every previously selected node's label also?
//when a node is selected
cy.on("select", "node", function(e){
  //the selected node is the variable, 'node'
  var node = e.target;
  //when the label button div is clicked
  document.getElementById("labelbutton").addEventListener("click", function(e) {
    //the node's data is changed to the input from the nodelabel div
    node.data('label', document.getElementById("nodelabel").value);
    });
});

//end of DOM listener
});