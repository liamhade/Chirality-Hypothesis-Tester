import ReactDOM from 'react-dom/client';
import App from "./App";

let json_data;
let HYPOTHESIS = "NOT YET TESTED";

function grabInput() {
	const json_file = document.getElementById("file-input").files[0];
	const reader = new FileReader();

	if (json_file) {
		// asynchronous action
		reader.readAsText(json_file);

		reader.onload = () => {
			// Saves it to our global variable
			json_data = JSON.parse(reader.result);
		}
	}

	console.log("loaded file");
};

function testHypothesis() {
	const reactions = json_data.reactions;

	reactions.forEach((r) => {
		// Assume for now that we only have
		// one product and one reactant
		const reactant = r.reactants[0];
		const product  = r.products[0];
		const tf = r.transformation;

		const r_stereo = reactant.stereochemistry;
		const p_stereo = product.stereochemistry;

		const predicted_stereo = r_stereo.map((value, index) => value*tf[index]);
		console.log(predicted_stereo);
		console.log(p_stereo);

		if (JSON.stringify(predicted_stereo) != JSON.stringify(p_stereo)) {
			console.log("FALSE");
		} else {
			console.log("TRUE");
		}
	})
}

// Creates a root for our React app to run in
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <App />
	<div style={{ display: "flex", flexDirection: "column" }}>
		{ HYPOTHESIS }
		<input id="file-input" type="file"></input>
		<button id="load-data" onClick={ grabInput }>Load</button>
		<button id="test-data" onClick={ testHypothesis }>Test Hypothesis</button>
	</div>
);