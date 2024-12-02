import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from '@mui/material';
import { AccountCircleOutlined } from '@mui/icons-material';
import { hideWhileInProgress } from '../utils/visualHelpers';

interface Props {
	users: number[];
	selectedUser: number;
	setUser: (userId: number) => void;
}

export default function CustomDrawer({ users, selectedUser, setUser }: Props) {
	const getDrawerItem = (userId: number) => (
		<ListItem
			key={userId}
			disablePadding
			sx={{
				color: selectedUser === userId ? 'white' : 'inherit',
				backgroundColor: selectedUser === userId ? '#1976d252' : 'inherit',
			}}
		>
			<ListItemButton onClick={() => setUser(userId)}>
				<ListItemIcon>
					<AccountCircleOutlined />
				</ListItemIcon>
				<ListItemText primary={`Usuario ${userId}`} />
			</ListItemButton>
		</ListItem>
	);

	return (
		<Drawer
			variant='permanent'
			elevation={1}
			sx={{
				width: '20rem',
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: '20rem', boxSizing: 'border-box' },
			}}
		>
			<Toolbar />
			<Box sx={{ alignSelf: !!users.length ? 'inherit' : 'center' }}>
				{hideWhileInProgress(
					!!users.length,
					<List>{users.map((user) => getDrawerItem(user))}</List>
				)}
			</Box>
		</Drawer>
	);
}
