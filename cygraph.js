//waits until DOM is loaded for script to run
document.addEventListener('DOMContentLoaded', function(){

//declares cytoscape graph with container as the div id 'cy' in index.html
var cy = cytoscape({
    container: document.getElementById("cy"),
//the parts of the graph
elements: {
  //the circles with labels
    nodes: [
      { data: { id: 'a', label: "atest", variable: "avariable", value: 1 }, classes: [".white", ".ellipse"] },
      { data: { id: 'b', label: "btest", variable: "bvariable", value: 2 }, classes: [".white", ".ellipse"] },
      { data: { id: 'c', label: "ctest", variable: "cvariable", value: 4  }, classes: [".white", ".ellipse"] },
      { data: { id: 'd', label: "dtest", variable: "dvariable", value: -2  }, classes: [".white", ".ellipse"] },
      { data: { id: 'e', label: "etest", variable: "evariable", value: 3  }, classes: [".white", ".ellipse"] },
    ],
    //the lines connecting them
    edges: [
      { data: { source: 'a', target: 'b', label: 'edgetest' }, classes: ".white" },
      { data: { source: 'b', target: 'c' }, classes: ".white" },
      { data: { source: 'b', target: 'd' }, classes: ".white" },
      { data: { source: 'd', target: 'e' }, classes: ".white" },
      { data: { source: 'c', target: 'e' }, classes: ".white" },
      { data: { source: 'b', target: 'e' }, classes: ".white" },
    ]
  },
  //styles
  style: [
    //adds the name attribute (the node's label, ex: 'btest') to the node
    { 
      selector: "node",
      style: {
          "padding": 30,
          "padding-in-relation-to": 'average',
          "label": "data(label)",
          "width": 'label',
          "height": 'label',
          "text-wrap": "wrap",
          "text-max-width": 60,
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
          'padding': 0,
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
    { selector: '.orange', style: { 'background-color': '#e78d41', 'line-color': '#e78d41', 'target-arrow-color': '#e78d41' } },
    { selector: '.yellow', style: { 'background-color': '#fbf086', 'line-color': '#fbf086', 'target-arrow-color': '#fbf086' } },
    { selector: '.green', style: { 'background-color': '#5bbd67', 'line-color': '#5bbd67', 'target-arrow-color': '#5bbd67' } },
    { selector: '.blue', style: { 'background-color': '#799bf6', 'line-color': '#799bf6', 'target-arrow-color': '#799bf6' } },
    { selector: '.purple', style: { 'background-color': '#a554ce', 'line-color': '#a554ce', 'target-arrow-color': '#a554ce' } },
    { selector: '.pink', style: { 'background-color': '#ff9cdd', 'line-color': '#ff9cdd', 'target-arrow-color': '#ff9cdd' } },
    { selector: '.white', style: { 'background-color': '#fff', 'line-color': 'grey', 'target-arrow-color': 'grey' } },
    { selector: '.black', style: { 'background-color': '#000', 'color': '#fff', 'line-color': '#000', 'target-arrow-color': '#000' } },

    //shape styles for nodes
    { selector: '.ellipse', style: { "shape": 'ellipse' } },
    { selector: '.rectangle', style: { "shape": 'rectangle' } },
    { selector: '.diamond', style: { "shape": 'diamond' } },
    { selector: '.pentagon', style: { "shape": 'pentagon' } },
    { selector: '.hexagon', style: { "shape": 'hexagon' } },
    { selector: '.star', style: { "shape": 'star' } },
    ],

//makes the layout a directed tree graph
  layout: {
    name: 'breadthfirst',
    directed: true,
    padding: 10
  }
}); // cy init

// test for traversing the tree
//var a = cy.$('#a');
//var b = cy.$('#b');

//console.log(a.edgesWith(b));


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
      data: { label: "New node", variable: "new variable", value: 0 }, classes: ".white" ,
      renderedPosition: {
        x: e.clientX,
        y: e.clientY,
      },
    });
});

//edge handles extension
cy.edgehandles({});



//function that changes the color of nodes and edges based off of the color dropdown
//defined before function
var newcolor = "";
var colornode = "";
var oldnodecolor = "";
var coloredge = "";
var oldedgecolor = "";

function changecolor(){    
      //the newcolor variable is the selected color in the dropdown
      newcolor = colors.options[colors.selectedIndex].text;
      //when you select a node (or nodes)
      cy.on("select", "node", function(e){
        //the target node is the variable 'node'
        colornode = e.target;
        //the old color of the node is saved as "oldnodecolor"
        oldnodecolor = colornode.classes()[0];
        //the old color is removed and the new color is added to the node
        colornode.removeClass(oldnodecolor);
        colornode.addClass(newcolor);
        console.log(oldnodecolor);
        colornode.deselect();
      });
      //when you select an edge (or edges)
      cy.on("select", "edge", function(e){
        //the target node is the variable 'edge'
        coloredge = e.target;
        //the old color of the edge is saved as "oldedgecolor"
        oldedgecolor = coloredge.classes()[0];
        //the old color is removed and the new color is added to the edge
        coloredge.removeClass(oldedgecolor);
        coloredge.addClass(newcolor);
        console.log(oldedgecolor);
        coloredge.deselect();
      });
}

//trying to write an undo color function (doesn't work rn)
function undocolor(oldcolor, newcolor, node = null, edge = null) {
  if (node) {
    node.removeClass(newcolor);
    node.addClass(oldcolor);
  }
  else if (edge) {
    edge.removeClass(newcolor);
    edge.addClass(oldcolor);
  }
}
ur.action("redoundocolor", changecolor, undocolor);

////listens to whether the user selects an option on the dropdown form with ID "colors"
document.getElementById("colors").addEventListener("change", function(e) {
  //runs the changecolor function
  changecolor()
});

//change node shape function
var newshape = "";
var shapenode = "";
var oldnodeshape = "";

function changeshape(){    
  //the newcolor variable is the selected color in the dropdown
  newshape = shapes.options[shapes.selectedIndex].text;
  //when you select a node (or nodes)
  cy.on("select", "node", function(e){
    //the target node is the variable 'node'
    shapenode = e.target;
    //the old color of the node is saved as "oldnodecolor"
    oldnodeshape = shapenode.classes()[0];
    //the old color is removed and the new color is added to the node
    shapenode.removeClass(oldnodeshape);
    shapenode.addClass(newshape);
    console.log(oldnodeshape);
    shapenode.deselect();
  });
}


////listens to whether the user selects an option on the dropdown form with ID "colors"
document.getElementById("shapes").addEventListener("change", function(e) {
  //runs the changecolor function
  changeshape()
});


//changes the label of a node
//labelnode and newval declared outside of function
var labelnode = "";
//when a node is selected
cy.on("select", "node", function(e){
  //the selected node is the variable, 'labelnode'
  labelnode = e.target;
  //when the label button div is clicked
  document.getElementById("labelbutton").addEventListener("click", function(e) {
    //the node's label is changed to the input from the nodelabel div
    labelnode.data('label', document.getElementById("nodelabel").value);
  })
});

//changes the variable and value of an edge
cy.on("select", "edge", function(e){
  //the selected node is the variable, 'labeledge'
  labeledge = e.target;
  document.getElementById("variablevaluesbutton").addEventListener("click", function(e) {
    //the node's variable is changed to the input from the nodevariable div
    labeledge.data('variable', document.getElementById("edgevariable").value);
    //newval is the old value of the node + the new value of the node from the nodevariable div
    labeledge.data('value', Number(document.getElementById("edgevariablevalue").value));
    labeledge.data('label', document.getElementById("edgevariablevalue").value + " " + document.getElementById("edgevariable").value )
  });
});


});//end of DOM listener