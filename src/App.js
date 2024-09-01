import * as React from "react";
import { useState, useEffect } from "react";
// import { Arrow } from "./_components/Arrows";
import { InputBox } from "./_components/InputBox";
import { ContextMenu } from "./_components/ContextMenu";
import { Network } from "./_components/Network";
import { Node } from "./_components/Node";
import "./styles.css";

export default function App() {
	const [nodes, setNodes] = useState([]);
	const network = new Network(nodes, setNodes);
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

	useEffect(() => {
		network.addNode(<Node network={ network } name="salt" type="chemical" parent={ null } child={ null }/>);
	}, []);

	return (
		<div>
			{ network.render() }
			{ inputVisible && <InputBox type={ inputType } setVisible={ setInputVisible } setNodes={ setNodes } /> }
			{ !inputVisible && <ContextMenu labels={ ["Add Chemical", "Add Reaction"] } onClicks={ [handleChemicalClick, handleReactionClick] } rightClickBlackList={ document.getElementsByClassName("node") } /> }

		</div>
	);
}

