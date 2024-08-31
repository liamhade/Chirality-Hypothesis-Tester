import { React, useRef } from "react";
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';
import Draggable, {DraggableCore} from "react-draggable";
import { ContextMenu } from "./ContextMenu";

export class Node extends React.Component {
	constructor(props) {
		super(props);
		this.name = props.name; 
		this.type = props.type;
		this.parent = props.parent;
		this.child = props.child;
		this.ref = props.ref;

		this.state = {
			highlighed: true
		};
	}

	handleContextMenu() {
		console.log("test");
		return (
			<ContextMenu labels={["Add Parents"]} onClicks={[this.addParent]} />
		)
	}

	componentDidMount() {
		// document.addEventListener("click", this.handleClick);
		document.addEventListener("contextmenu", this.handleContextMenu);
	}

	render() {
		return (
			<Draggable>
				<Box ref={ this.ref } id="node">
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
		);
	}
}