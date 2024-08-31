import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircleIcon from '@mui/icons-material/Circle';
import Draggable, {DraggableCore} from "react-draggable";
// import { Arrow } from "./_components/Arrows";
import { ContextMenu } from "./_components/ContextMenu";
import { Node } from "./_components/Node";
import "./styles.css";


export default function App() {
	let NODES = [<Node name="salt" type="chemical" parent={ null } child={ null }/>]

	const [inputVisible, setInputVisible] = useState(false);
	const [inputType, setInputType] = useState(null);

	const getNodeRefs = () => {
		return (
			NODES.map((node) => (
				node.ref
			))
		);
	};

	const handleChemicalClick = () => {
		setInputType("chemical");
		setInputVisible(true);
	};

	const handleReactionClick = () => {
		setInputType("reaction");
		setInputVisible(true);
	};

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
	
				// addChemical(name_, stereo);
				NODES.push(<Node name={ name_ } type="chemical" parent={ null } child={ null }/>)
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
	
				// addReaction(name_, tf);
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

	return (
		<div>
			{NODES.map((node) => (
				node
			))}
			
			{ inputVisible && <InputBox type={ inputType } setVisible={ setInputVisible } /> }
			{ !inputVisible && <ContextMenu labels={ ["Add Chemical", "Add Reaction"] } onClicks={ [handleChemicalClick, handleReactionClick] } /> }

		</div>
	);
}

