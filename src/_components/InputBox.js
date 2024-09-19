import { useRef, useEffect, createRef } from "react";
import { Node } from "./Network";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from "@mui/material";

export function InputBox( { networkRef, setVisible, type }) {
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

	if (type === "chemical") {
		const handleSubmit = () => {
			const name_ = document.getElementById("input-chemical-name").value;
			// const stereo = document.getElementById("input-chemical-stereo").value;

			const newNode = new Node(name_, "chemical", null);
			console.log(networkRef);
			networkRef.current.addNode(newNode);
			setVisible(false);
		}

		return (
			<Box 
			 className="input-backdrop"
			 sx={{
				width: window.innerWidth,
				height: window.innerHeight,
			 }}
			>
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
	} else if (type === "reaction") {
		const handleSubmit = () => {
			// const name_ = document.getElementById("input-reaction-name").value;
			// const tf = document.getElementById("input-reaction-transformation").value;

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
		throw new Error(`(inputBox): type prop of "${type}" is invalid`);
	};
}