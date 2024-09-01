import React from "react";

export class Network {
	constructor(nodes, setNodes) {
		this.nodes = nodes;
		this.setNodes = setNodes;
	}

	addNode(newNode) {
		this.setNodes(prevNodes => [...prevNodes, newNode]);
	}

	nodeRequestingParent(node) {
		console.log("requesting parent");
		console.log(node);
		document.addEventListener("click", (e) => {
			console.log(e.target)
		})
		return;
	}

	nodeRequestingChild(node, clickEvent) {
		return;
	}

	render() {
		return (
			<div>
				{this.nodes.map((node) => (
					node
				))}
			</div>
		);
	}
}