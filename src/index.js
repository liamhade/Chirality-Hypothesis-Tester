import ReactDOM from 'react-dom/client';
import SimplifiedTester from "./tests/simplied_tester";
import App from "./App";

// Creates a root for our React app to run in
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<App />
	// SimplifiedTester()
);