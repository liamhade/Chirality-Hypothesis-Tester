import * as React from "react";
import { useState, useRef } from "react";
// import { Arrow } from "./_components/Arrows";
import { InputBox } from "./_components/InputBox";
import { ContextMenu } from "./_components/ContextMenu";
import { Network } from "./_components/Network";
// import { Node } from "./_components/Node";
import "./styles.css";

export default function App() {
	const [nodes, setNodes] = useState([]);
	const networkRef = useRef();
	const [inputVisible, setInputVisible] = useState(false);
	const [inputType, setInputType] = useState(null);

	const handleChemicalClick = () => {
		setInputType("chemical");
		setInputVisible(true);
	};

	const handleReactionClick = () => {
		setInputType("reaction");
		setInputVisible(true);
	};

	// document.addEventListener("click", () => {console.log(networkRef)});

	return (
		<div id="main">
			<Network ref={ networkRef } nodes={ nodes } setNodes={ setNodes } />
			{ inputVisible ? (
				<InputBox type={ inputType } setVisible={ setInputVisible } networkRef={ networkRef } />
			) : (
				<ContextMenu 
					labels={ ["Add Chemical", "Add Reaction"] } 
					onClicks={ [handleChemicalClick, handleReactionClick] } 
					rightClickBlackList={ document.getElementsByClassName("node") } 
				/> 
			)}
			
		</div>
	);
}

