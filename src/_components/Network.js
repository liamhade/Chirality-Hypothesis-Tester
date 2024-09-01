import React, { useImperativeHandle } from "react";
import { useState, forwardRef } from "react";

export const Network = forwardRef((props, ref) => {
	useImperativeHandle(ref, () => ({
		addNode: (newNode) => {
			props.setNodes(prevNodes => {
				const updatedNodes = [...prevNodes, newNode];
				return updatedNodes;
			});
		},

		nodeRequestingParent: (node) => {
			const getNodeHTML = (node) => {
				return document.getElementById(node.id);
			}
	
			const handleMouseDown = (e) => {
				console.log(this);
				for (let i=0; i<this.state.nodes.length; i++) {
					let node = this.state.nodes[i];
					console.log(node);
					let nodeHTML = getNodeHTML(node);
	
					if (nodeHTML.contains(e.target)) {
						console.log(node.name);
						return;
					}
				}
			}

			document.addEventListener("mousedown", handleMouseDown);

			// Cleanup function
			return () => {
				document.removeEventListener("mousedown", handleMouseDown);
			}
		}
	}))

	return (
		<div>
			{props.nodes.map((node) => 
				React.cloneElement(node, { key: node.id })
			)}
		</div>
	);
});
