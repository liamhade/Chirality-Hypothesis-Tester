import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function SimulateButton({ nodes }) {
	const handleClick = () => {
		console.log("heres the nodes:");
		console.log(nodes);
	}

	return (
		<Box className="sim-button-box">
			<Button id="sim-button" onClick={ handleClick }>
				Simulate
			</Button>
		</Box>	
	);
}
