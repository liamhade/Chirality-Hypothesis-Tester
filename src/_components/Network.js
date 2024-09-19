import React, { useImperativeHandle } from "react";
import Xarrow from "react-xarrows";
import { forwardRef } from "react";

export const Network = forwardRef((props, ref) => {
	useImperativeHandle(ref, () => ({
		addNode: (newNode) => {
			props.setNodes(prevNodes => {
				const updatedNodes = [...prevNodes, newNode];
				return updatedNodes;
			});
		},

		nodeRequestingParent: (childNode) => {
	
			const handleMouseDown = (e) => {
				console.log("mouse down!")
				for (let i=0; i<props.nodes.length; i++) {
					const node = props.nodes[i].ref.current;
					if (node.wasClickedOn(e)) {
						console.log("child node");
						console.log(childNode);
						console.log("node");
						console.log(node);

						childNode.setParent(node);
						childNode.parentWasAdded();
						node.setChild(childNode);

						document.removeEventListener("mousedown", handleMouseDown);
						console.log("removingEventListener");
						
						return node;
					}
				}
			}

			document.addEventListener("mousedown", handleMouseDown);
		}
	}))

	const renderArrows = () => (
		props.nodes.map((node) => {
			console.log(node);
			return node.render();
			// if (node.state.child != null) {
			// 	return (
			// 		<Xarrow>
			// 			start={node.id}
			// 			end={node.state.child.id}
			// 		</Xarrow>
			// 	)
			// }
		})
	)


	return (
		<div>
			{props.nodes.map((node) => 
				React.cloneElement(node, { key: node.id })
			)}
		</div>
	);
});
