import React, { useImperativeHandle, useState } from "react";
// import Xarrow from "react-xarrows";
import { forwardRef } from "react";
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';
import Draggable from "react-draggable";
import { ContextMenu } from "./ContextMenu";

export function Node(name_, type, child) {
	this.type = type;
	this.name_ = name_;
	this.child = child;
};

export const Network = forwardRef((props, ref) => {
	console.log("here!")
	const [nodes, setNodes] = useState([]);

	useImperativeHandle(ref, () => ({
		addNode: (newNode) => {
			setNodes(prevNodes => {
				const updatedNodes = [...prevNodes, newNode];
				return updatedNodes;
			});
		}
	}));
 	
	function renderNode(node) {
		const { x, y } = this.state;
		return (
			<div>
				<Draggable onDrag={ this.handleDrag } position={{ x, y }}>
					<Box ref={ this.nodeHTMLRef } id={ this.id } className="node" sx={{ width: `${this.iconWidth}px` }}>
						<Box
							sx={{
								outline: this.state.highlighed ? "solid rgb(255, 0, 0) 2px": null, 
								borderRadius: "50px",
							}}
						>
							<CircleIcon
								sx={{
									fontSize: this.iconWidth
								}}
							/>
						</Box>
						<div>{this.name} ({ this.type })</div>
					</Box>
				</Draggable>
				{ <ContextMenu labels={["Add Parent", "Add Child"]} onClicks={[this.addParent, this.addChild]} /> }
			</div>
		);
	}

	return (
		<div>
			{nodes.map((node) => 
				React.cloneElement(node, { key: node.id })
			)}
		</div>
	)
})
