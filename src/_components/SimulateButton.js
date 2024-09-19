import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function SimulateButton({ network }) {
	const handleClick = () => {
		console.log("heres the network:");
		console.log(network);
	}

	return (
		<Box className="sim-button-box">
			<Button id="sim-button" onClick={ handleClick }>
				Simulate
			</Button>
		</Box>	
	);
}
