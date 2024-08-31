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

		// ContextMenu won't open if the click is one of these elements
		this.rightClickBlackList = props.rightClickBlackList;

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

	rightClickIsValid = (e) => {
		this.rightClickBlackList.forEach((blacklist_element) => {
			if (blacklist_element.contains(e.target)) { return false };
		})
		return true;
	}

	handleContextMenu = (e) => {
		if (this.rightClickIsValid(e)) {
			e.preventDefault();

			this.setState({
				xPos: `${e.pageX}px`,
				yPos: `${e.pageY}px`,
				showMenu: true,
			});
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
								<ListItemText onClick={ this.onClicks[index] }> { label } </ListItemText>
							</MenuItem>
						))}
					</MenuList>
				</Paper>
			</div>)
		else
			return null;
	}
};