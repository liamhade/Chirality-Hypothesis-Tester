import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircleIcon from '@mui/icons-material/Circle';
import Draggable, {DraggableCore} from "react-draggable";

import "./styles.css";

const CHEMICALS = [{name_: "salt", stereo: [1,2,3]}];
const REACTIONS = [{name_: "heat", stereo: [1,1,1]}];
const CONNECTIONS = [];

export default function App() {
	const [selectedElement, setSelectedElement] = useState(null);
	const [inputVisible, setInputVisible] = useState(false);
	const [inputType, setInputType] = useState(null);

	return (
		<div>		
			<p style={{ position: "absolute", left: "30px", top:"30px" }}>Hello</p>

			{CHEMICALS.map((chemical) => (
				<Chemical name={ chemical.name_ } setSelectedElement={ setSelectedElement } />
			))}	

			{REACTIONS.map((reaction) => (
				<Reaction name={ reaction.name_ } />
			))}	

			{ inputVisible && <InputBox type={ inputType } setVisible={ setInputVisible } /> }
			{ !inputVisible && <ContextMenu setInputType={ setInputType } setInputVisible={ setInputVisible } /> }
		</div>
	);
}

///////////
// CLASSES
///////////

class ConnectComponents {
	constructor(parent) {
		// Both attributes are HTML elements
		this.parent = parent;
		this.child = null;
	}

	highlightParent() {
		this.parent.style.outline = "solid rgb(255, 0, 0) 3px";
	}

	setChild(child) {
		this.child = child;
	}

	render() {
		return;
	}
}

class ContextMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			xPos: "0px",
			yPos: "0px",
			showMenu: false,	
		};
		this.setInputVisible = props.setInputVisible;
		this.setInputType = props.setInputType
	}

	componentDidMount() {
		document.addEventListener("click", this.handleClick);
		document.addEventListener("contextmenu", this.handleContextMenu);
	}

	componentWillUnmount() {
		document.removeEventListener("click", this.handleClick);
		document.removeEventListener("contextmenu", this.handleContextMenu);
	}

	handleClick = (e) => {
		// Close the context menu if it's open
		if (this.state.showMenu) {
			this.setState({ showMenu: false });
		}
	}

	handleContextMenu = (e) => {
		e.preventDefault();

		this.setState({
			xPos: `${e.pageX}px`,
			yPos: `${e.pageY}px`,
			showMenu: true,
		});
	}

	render() {
		const { showMenu, xPos, yPos } = this.state;

		const handleChemicalClick = () => {
			this.setInputType("chemical");
			this.setInputVisible(true);
		};
		
		const handleReactionClick = () => {
			this.setInputType("reaction");
			this.setInputVisible(true);
		};

		const handleConnectionClick = () => {
			// Put a red outline around the screen
			const root = document.getElementById("root");
			root.style.outline = "dashed rgb(255, 0, 0) 3px";

			// Wait for the user to click a chemical or reaction
			// this.setClickedElement = 


			// Once they click it, put a red outline around it

			// Wait for them to click another object

			// After they click the second object

			// Remove the red outlines, and create an arrow pointing from
			// the first object to the second object
		}

		if (showMenu)
			return (<div className="context-menu" style={{ position: "absolute", top: yPos, left: xPos }}>
				
				<Paper sx={{ width: 320 }}>
					<MenuList dense>
						<MenuItem>
							<ListItemText onClick={ handleChemicalClick }>Add Chemical</ListItemText>
						</MenuItem>
						<MenuItem>
							<ListItemText onClick={ handleReactionClick }>Add Reaction</ListItemText>
						</MenuItem>
						<MenuItem>
							<ListItemText onClick={ handleConnectionClick }>Create Connection</ListItemText>
						</MenuItem>
					</MenuList>
				</Paper>
			</div>)
		else
			return null;
	}
};


class Chemical extends React.Component {
    constructor (props) {
		super(props);
		this.setSelectedElement = props.setSelectedElement;
		this.state ={
			highlighted: false
		}
    }

	handleIconClick(ref) {
		this.setState({ highlighted: true });
		this.setSelectedElement(ref);
	}

	render() {
		const ChemicalIcon = () => {
			const ref = useRef(null); 
			return (
				<CircleIcon 
					onClick={ () => (this.handleIconClick(ref)) }
					sx={{ 
						outline: (this.state.highlighted ? "solid rgb(255, 0, 0) 2px": ""), 
						fontSize: 50,
					}}
					ref={ ref }
				/>
			)
		}

		return (
			<Draggable>
				<div id={ `chemical-id-${this.props.name}` }>
					<ChemicalIcon />
					<p>{this.props.name}</p>
				</div>
			</Draggable>
		);
	}
}

class Reaction extends React.Component {
	constructor (props) {
		super(props);
	}

	// isValid() {
	// 	let r_stereo;
	// 	let p_stereo;
	// 	let transformation;

	// 	let num_chiral_centers = this.reactant.stereo.length;
	// 	for (let i=0; i<num_chiral_centers; i++) {

	// 		r_stereo = this.reactant.stereo[i];
	// 		p_stereo = this.product.stereo[i];
	// 		transformation = this.stereo_transformation[i];

	// 		if (p_stereo !==  (r_stereo * transformation)) {
	// 			return false;
	// 		}
	// 	}
	// 	return true
	// }

	render() {
		return (
			<Draggable>
				<div>
					<CircleIcon sx={{ fontSize: 10  }} />
					<p>{this.props.name}</p>
					<p>{this.props.transormation}</p>
				</div>
			</Draggable>
		);
	}
}

/////////////////////////
// FUNCTIONAL COMPONENTS	
/////////////////////////

function InputBox( { setVisible, type }) {
	// Remove component if we click outside the input box
	const wrapperRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setVisible(false);
		}
	}

	// Bind the event listener
	document.addEventListener("mousedown", handleClickOutside);

	return () => {
		// Unbind the event listener on clean up
		document.removeEventListener("mousedown", handleClickOutside);
	};
	}, [wrapperRef, setVisible]);

	if (type == "chemical") {
		const handleSubmit = () => {
			const name_ = document.getElementById("input-chemical-name").value;
			const stereo = document.getElementById("input-chemical-stereo").value;

			addChemical(name_, stereo);
			setVisible(false);
		}

		return (
			<Box className="input-backdrop">
				<Box ref={ wrapperRef }  className="input-main-box">
					<Box className="input-title">
						<Typography sx={{ fontSize: 20 }}>Chemical</Typography>
					</Box>

					<Box className="input-inner-box">
						<Box id="chemicalInput">
							<TextField required id="input-chemical-name" label="Chemical Name" sx={{ mb: "2vh" }} />
							<TextField required id="input-chemical-stereo" label="Stereochemistray" /> 
						</Box>

						<Button id="inputButton" variant="contained" onClick={ handleSubmit }>
							Create
						</Button>
					</Box>
				</Box>
			</Box>
		);
	} else if (type == "reaction") {
		const handleSubmit = () => {
			const name_ = document.getElementById("input-reaction-name").value;
			const tf = document.getElementById("input-reaction-transformation").value;

			addReaction(name_, tf);
			setVisible(false);
		}

		return (
			<Box className="input-backdrop">
				<Box ref={ wrapperRef }  className="input-main-box">
					<Box className="input-title">
						<Typography sx={{ fontSize: 20 }}>Reaction</Typography>
					</Box>

					<Box className="input-inner-box">
						<Box id="reactionInput">
							<TextField required id="input-reaction-name" label="Reaction Name" sx={{ mb: "2vh" }} />
							<TextField required id="input-reaction-transformation" label="Transformation" /> 
						</Box>

						<Button id="inputButton" variant="contained" onClick={ handleSubmit }>
							Create
						</Button>
					</Box>
				</Box>
			</Box>
		);	
	} else {
		throw new Error(`(inputBox): type prop of \"${type}\" is invalid`);
	};
}


//////////////
// FUNCTIONS
//////////////

function addChemical(name_, stereo) {
	CHEMICALS.push(
		{ name_: name_, stereo: stereo }
	);
} 

function addReaction(name_, tf) {
	REACTIONS.push(
		{ name_: name_, transormation: tf }
	);
}