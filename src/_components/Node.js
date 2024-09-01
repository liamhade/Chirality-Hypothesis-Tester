import React from "react";
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';
import Draggable from "react-draggable";
import { ContextMenu } from "./ContextMenu";

export class Node extends React.Component {
	constructor(props) {
		super(props);
		this.name = props.name; 
		this.type = props.type;
		this.parent = props.parent;
		this.child = props.child;
		this.network = props.network;

		// In case two nodes are given the same name,
		// we'll still have a unique id for this component.
		this.id = `${this.name}-${Math.random()}`;

		this.state = {
			highlighed: true,
			showContextMenu: false
		};
	}

	addParent = () => {
		console.log("addParent");

		// Listen for what the user clicks next
		document.addEventListener("click", (e) => { this.network.nodeRequestingParent(this, e) })
	};

	addChild = () => {
		console.log("addChild");
	}


	render() {
		return (
			<div>
				<Draggable>
					<Box id={ this.id } className="node">
						<Box
							sx={{
								outline: this.state.highlighed ? "solid rgb(255, 0, 0) 2px": null, 
								display: "flex",
								borderRadius: "50px",
							}}
						>
							<CircleIcon
								sx={{
									fontSize: ((this.type == "chemical") ? 50: 25)
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