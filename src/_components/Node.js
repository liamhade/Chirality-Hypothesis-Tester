/*
TODO:
	* Figure out a simpler way to track the locaiton of the Node
	(for figuring out if the node was clicked)
*/

import React from "react";
// import { createRef } from "react";
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';
import Draggable from "react-draggable";
import { ContextMenu } from "./ContextMenu";

export class Node extends React.Component {
	constructor(props) {
		super(props);
		this.name = props.name; 
		this.type = props.type;

		const chemicalWidth = 50;
		const reactionWidth = 25;
		this.iconWidth = ( this.type === 'chemical' ? chemicalWidth: reactionWidth);
		this.iconHeight = this.iconWidth;

		// Used for tracking where the component is on the screen.
		this.nodeHTMLRef = props.nodeHTMLRef;

		if (!props.network) {throw Error("Node(): Must add each node to a network!")}
		this.network_ref = props.network;

		// In case two nodes are given the same name,
		// we'll still have a unique id for this component.
		this.id = `${this.name}-${Math.random()}`;

		this.state = {
			parent: props.parent,
			child: props.child,
			x: 0,
			y: 0,
			highlighed: false,
			showContextMenu: false
		};
	}

	setParent(parentNode) {
		console.log(parentNode);
		console.log(`setting Parent of ${this.name} to ${parentNode.name}`);
		this.setState({
			parent: parentNode
		})
	} 

	setChild(childNode) {
		this.setState({
			child: childNode
		})
	}

	addParent = () => {
		console.log("addParent");
		this.setState({ highlighed: true });
		this.network_ref.current.nodeRequestingParent(this);
	};

	parentWasAdded = () => {
		this.setState({ highlighed: false });
	}

	addChild = () => {
		this.setState({ highlighed: true });
		console.log("addChild");
	}

	childWasAdded = () => {
		this.setState({ highlighed: false });
	}

	handleDrag = (e, data) => {
		this.setState({ x: data.x, y: data.y });
	}

	wasClickedOn = (e) => {
		const { x, y } = this.state;
		const clickX = e.x;
		const clickY = e.x;

		// console.log(e);

		const clickInX = () => (clickX <= x+this.iconWidth  && clickX >= x);
		const clickInY = () => (clickY <= y+this.iconHeight && clickY >= y);

		// console.log(clickX);
		// console.log(clickY);
		// console.log(x);
		// console.log(y);
		// console.log(x + this.iconWidth);
		// console.log(y + this.iconHeight);
		// console.log(clickInX() && clickInY());

		return (clickInX() && clickInY())
	}

	render() {
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
}