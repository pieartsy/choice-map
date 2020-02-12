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
      { data: { source: 'a', target: 'b' } },
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
          "text-halign": "center"
      }
    },
    //styles the edges as having directed arrows and bezier curves
    { selector: 'edge', style: {  'curve-style': 'bezier', 'target-arrow-shape': 'triangle' } },
    //a selector for undo/redo
    { selector: ':selected', style: {  } },
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
          'border-width': 2,
          'border-color': 'red'
        }
    },
    //the target node you're gonna add an edge to turns red
    { selector: '.eh-target',
        style: {
          'border-width': 2,
          'border-color': 'red'
        }
    },
    //the 'ghost' (not locked in) edges are red
    { selector: '.eh-preview, .eh-ghost-edge',
        style: {
          'background-color': 'red',
          'line-color': 'red',
          'target-arrow-color': 'red',
          'source-arrow-color': 'red'
        }
    },
    //not sure what this is tbfh
    { selector: '.eh-ghost-edge.eh-preview-active', style: { 'opacity': 0 } },
    
    //color styles
    { selector: '.red', style: { 'background-color': '#f45353' } },
    { selector: '.orange', style: { 'background-color': '#e78d41' } },
    { selector: '.yellow', style: { 'background-color': '#feff7d' } },
    { selector: '.green', style: { 'background-color': '#5bbd67' } },
    { selector: '.blue', style: { 'background-color': '#799bf6' } },
    { selector: '.purple', style: { 'background-color': '#a54bd8' } },
    { selector: '.white', style: { 'background-color': '#fff' } },
    { selector: '.black', style: { 'background-color': '#000', 'color': '#fff' } },
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
      data: { weight: 75, name: "New Node" },
      renderedPosition: {
        x: e.clientX,
        y: e.clientY,
      },
    });
});

//edge handles extension
cy.edgehandles({});

//ctxmenu extension
cy.cxtmenu({
  selector: 'node',

  commands: [
    {
      content: 'Make tooltip',
      select: function(ele){
        console.log( ele.id() );
      }
    },

    {
      content: 'Text',
      select: function(ele){
        console.log( ele.position() );
      }
    }
  ]
});

cy.cxtmenu({
  selector: 'edge',

  commands: [
    {
      content: 'bg1',
      select: function(){
        console.log( 'bg1' );
      }
    },

    {
      content: 'bg2',
      select: function(){
        console.log( 'bg2' );
      }
    }
  ]
});

})