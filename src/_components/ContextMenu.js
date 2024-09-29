import React from "react";
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

export class ContextMenu extends React.Component {
	constructor(props) {
		super(props);
		this.labels   = props.labels;
		this.onClicks = props.onClicks;
		this.name = props.name;

		// ContextMenu won't open if the click is one of these elements
		this.rightClickBlackList = (props.rightClickBlackList ? props.rightClickBlackList: []);

		this.state = {
			xPos: "0px",
			yPos: "0px",
			showMenu: false,	
		};
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

		if (this.rightClickIsValid(e) === true) {
			this.setState({
				xPos: `${e.pageX}px`,
				yPos: `${e.pageY}px`,
				showMenu: true,
			});
		} 
		else {
			// We want to close our menu if the user
			// is trying to open a different context menu
			this.handleClick(e);
		}
	}

	rightClickIsValid(e) {
		const blackListArr = Array.from(this.rightClickBlackList)

		if (blackListArr == []) {
			return true;
		}
		else {
			for (let i=0; i<blackListArr.length; i++) {
				if (blackListArr[i].contains(e.target)) { return false };
			}
			return true;
		}
	}

	render() {
		const { showMenu, xPos, yPos } = this.state;

		if (showMenu)
			return (<div className="context-menu" style={{ position: "absolute", top: yPos, left: xPos }}>
				
				<Paper sx={{ width: 320 }}>
					<MenuList dense>
						{this.labels.map((label, index) => (
							<MenuItem>
								<ListItemText key={ `${label}-${index}` } onClick={ this.onClicks[index] }> { label } </ListItemText>
							</MenuItem>
						))}
					</MenuList>
				</Paper>
			</div>)
		else
			return null;
	}
};