const familyData = [];

// Handle form submission
document.getElementById('familyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const relation = document.getElementById('relation').value;
    const health = document.getElementById('health').value;

    const member = {
        name,
        age,
        relation,
        health,
        children: []
    };

    familyData.push(member);
    document.getElementById('familyForm').reset();
    updateTree(familyData);
});

// Update family tree visualization
function updateTree(data) {
    // Clear the previous tree
    d3.select("#tree").html("");

    const width = 600, height = 400;
    const treeLayout = d3.tree().size([width, height]);

    const root = d3.hierarchy({children: data});

    const treeData = treeLayout(root);

    const svg = d3.select("#tree")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(50, 50)");

    const link = svg.selectAll(".link")
        .data(treeData.links())
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
        .attr("stroke", "#ccc");

    const node = svg.selectAll(".node")
        .data(treeData.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x},${d.y})`);

    node.append("circle")
        .attr("r", 10)
        .attr("fill", "#69b3a2");

    node.append("text")
        .attr("dy", ".35em")
        .attr("x", d => d.children ? -15 : 15)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name);
}

