import * as React from "react";
import { useState } from "react";
// import { Arrow } from "./_components/Arrows";
import { InputBox } from "./_components/InputBox";
import { Node } from "./_components/Network";
import { ContextMenu } from "./_components/ContextMenu";
import { Network } from "./_components/Network";
import { SimulateButton } from "./_components/SimulateButton";
// import { Node } from "./_components/Node";
import "./styles.css";

export default function App() {
	const [ nodes, setNodes ] = useState([
		new Node('a', 'chemical', null),
		new Node('b', 'chemical', null)
	]);

	const [ inputVisible, setInputVisible ] = useState(false);
	const [ inputType, setInputType ] = useState(null);

	const handleChemicalClick = () => {
		setInputType("chemical");
		setInputVisible(true);
	};

	const handleReactionClick = () => {
		setInputType("reaction");
		setInputVisible(true);
	};

	return (
		<div id="main">
			<Network nodes={ nodes } setNodes={ setNodes }/>
			{ inputVisible ? (
				<InputBox type={ inputType } setVisible={ setInputVisible } setNodes={ setNodes } />
			) : (
				<ContextMenu 
					labels={ ["Add Chemical", "Add Reaction"] } 
					onClicks={ [handleChemicalClick, handleReactionClick] } 
					listeningElement={ document }
					rightClickBlackList={ document.getElementsByClassName("node") } 
				/> 
			)}
			<SimulateButton nodes={ nodes } />
		</div>
	);
}

