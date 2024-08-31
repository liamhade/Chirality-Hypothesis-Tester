import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
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

const CHEMICALS = [
	{name_: "salt", stereo: [1,-1,1]},
	// {name_: "dirt", stereo: [1,1,-1]}
];
const REACTIONS = [{name_: "heat", stereo: [-1,1,-1]}];
const CONNECTIONS = [];

export default function App() {
	const [selectedElement, setSelectedElement] = useState(null);
	const [connectionMode, setConnectionMode] = useState(false);
	const [inputVisible, setInputVisible] = useState(false);
	const [inputType, setInputType] = useState(null);

	const componentConnector = new ComponentConnector(); 

	const start_ref = useRef(null);
	const end_ref = useRef(null);


	return (
		<div>		
			{CHEMICALS.map((chemical) => (
				<Chemical name={ chemical.name_ } componentConnector={ componentConnector } connectionMode={ connectionMode } setSelectedElement={ setSelectedElement } />
			))}	

			{REACTIONS.map((reaction) => (
				<Reaction name={ reaction.name_ } />
			))}	

			{ inputVisible && <InputBox type={ inputType } setVisible={ setInputVisible } /> }
			{ !inputVisible && <ContextMenu setConnectionMode={ setConnectionMode } setInputType={ setInputType } setInputVisible={ setInputVisible } /> }


			<Draggable>
				<p ref={ start_ref }>start</p>
			</Draggable>
			<Draggable>
				<p ref={ end_ref }>end</p>
			</Draggable>
			<Arrow startRef={ start_ref } endRef={ end_ref } />
		</div>
	);
}

///////////
// CLASSES
///////////

class ComponentConnector {
	constructor() {
		// Both attributes are HTML elements
		this.parent = null;
		this.child = null;

		// How many times we've already clicked with the
		// component connector active
		this.click_num = 0;
	}

	reset() {
		this.click_num = 0;
		this.parent = null;
		this.child = null;
	}

	isParentClick() {
		return (this.click_num == 0);
	}

	handleClick(ref) {
		if (this.click_num == 0) { 
			this.parent = ref;
			this.highlightParent(this.parent);
			this.click_num++;
		}
		else if (this.click_num == 1) { 
			this.child = ref;
			this.reset();
		};
	}

	highlightParent() {
		// console.log(this.parent.current.style);
		this.parent.current.style.outline = "solid rgb(255, 0, 0) 3px";
		// console.log(this.parent.setState({ highlighted: true }));
	}

	setChild(child_ref) {
		this.child = child_ref;
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
		this.setConnectionMode = props.setConnectionMode;
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
			this.setConnectionMode(true);
			console.log("set connection mode to true");

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
		this.componentConnector = props.componentConnector;
		
		this.state = {
			highlighted: false
		}
    }

	handleIconClick(ref) {
		if (this.props.connectionMode) {
			console.log(this.componentConnector.click_num)

			if (this.componentConnector.isParentClick()) {
				this.componentConnector.handleClick(ref);
				this.setState({ highlighted: true });
			}
			
			// console.log(this.componentConnector.parent);
			this.setSelectedElement(ref);
		}
	}

	render() {
		const ChemicalIcon = () => {
			const wrapperRef = useRef(null); 

			return (
				<Box
					sx={{ 
						outline: (this.state.highlighted ? "solid rgb(255, 0, 0) 2px": ""), 
						display: "flex",
						borderRadius: "50px",
					}}
				>
					<CircleIcon 
						onClick={ () => (this.handleIconClick(wrapperRef)) }
						ref={ wrapperRef }
						sx={{ fontSize: 50 }}
					/>
				</Box>
			);
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

const Arrow = ({ startRef, endRef }) => {
	const [arrow, setArrow] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
	const svgRef = useRef(null);
  
	const updateArrow = useCallback(() => {
		if (startRef.current && endRef.current && svgRef.current) {
			const start = startRef.current.getBoundingClientRect();
			const end = endRef.current.getBoundingClientRect();
			const svg = svgRef.current.getBoundingClientRect();

			setArrow({
			x1: start.left + start.width / 2 - svg.left,
			y1: start.top + start.height / 2 - svg.top,
			x2: end.left + end.width / 2 - svg.left,
			y2: end.top + end.height / 2 - svg.top,
			});
		}
	}, [startRef, endRef]);

	useEffect(() => {
		updateArrow();
		window.addEventListener('resize', updateArrow);
		return () => window.removeEventListener('resize', updateArrow)
	}, [updateArrow]);
  
	// const angle = Math.atan2(arrow.y2 - arrow.y1, arrow.x2 - arrow.x1) * 180 / Math.PI;
  
	return (
		<svg ref={svgRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
		<defs>
			<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
			<polygon points="0 0, 10 3.5, 0 7" fill="black" />
			</marker>
		</defs>
		<line
			x1={arrow.x1}
			y1={arrow.y1}
			x2={arrow.x2}
			y2={arrow.y2}
			stroke="black"
			strokeWidth="2"
			markerEnd="url(#arrowhead)"
		/>
		</svg>
	);
  };
  


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