import React, { useState } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import { forwardRef } from "react";
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';
import Draggable from "react-draggable";
import { ContextMenu } from "./ContextMenu";

const boxStyle = {border: 'grey solid 2px', borderRadius: '10px', padding: '5px'};

export function Node(name_, type, child = null) {
    this.type = type;
    this.name_ = name_;
    this.child = child;

    let random_num = Math.floor(Math.random() * 9999);
    this.id = `${name_}-${random_num}`;
}

function nodeFromId(node_array, id) {
    return node_array.find(node => node.id === id);
}

const DraggableNode = ({ node, allNodes, updateXarrow }) => {
	const nodeSize = (node.type === 'chemical' ? 50 : 25);
    const [, forceUpdate] = useState();

	const addChild = () => {
		console.log('addChild')
		console.log(node.id);

		// Parent node is 'node'
		const handleMouseDown = (e) => {
			console.log('handle mousedown');
			const allNodeHTML = document.getElementsByClassName("node");

			for (let i = 0; i < allNodeHTML.length; i++) {
				if (allNodeHTML[i].contains(e.target)) {
					const childNodeId = allNodeHTML[i].id;
					const childNode = nodeFromId(allNodes, childNodeId);
					if (childNode && childNode !== node) {
						node.child = childNode;
						forceUpdate({});
						updateXarrow();
					}
					document.removeEventListener("mousedown", handleMouseDown);
					break;
				}
			}
		};
		document.addEventListener("mousedown", handleMouseDown);
	}

	return (
		<div>
			<Draggable onDrag={updateXarrow} onStop={updateXarrow}>
				<Box onClick={() => console.log(`${node.id} was clicked`)} id={node.id} className="node" sx={{ width: `${nodeSize}px`, ...boxStyle }}>
					<Box sx={{ borderRadius: "50px" }}>
						<CircleIcon sx={{ fontSize: nodeSize }} />
					</Box>
					<div>{node.name_} ({node.type})</div>
				</Box>
			</Draggable>
			<ContextMenu labels={["Add Child"]} onClicks={[addChild]} name={ node.id }/>
		</div>
	);
};

export const Network = forwardRef((props, ref) => {
    const updateXarrow = useXarrow();

	const nodeElements = [];
	for (const node of props.nodes) {
		nodeElements.push(
			<React.Fragment key={node.id}>
				<DraggableNode node={node} nodeId={node.id} allNodes={ props.nodes } updateXarrow={updateXarrow} />
				{node.child && <Xarrow start={node.id} end={node.child.id} />}
			</React.Fragment>
		)
	} 

    return (
        <Xwrapper>
			{nodeElements}
        </Xwrapper>
    );
});