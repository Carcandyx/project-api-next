// To inform next js, this is a client component
'use client';

import {
	CancelOutlined,
	CheckCircleOutlineOutlined,
} from '@mui/icons-material';

import {
	Box,
	Card,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { ITodoItem } from '../types';
import { useState } from 'react';

interface Props {
	todoListData: ITodoItem[];
}

export default function TodoList({ todoListData }: Props) {
	const [seed, setSeed] = useState(0);
	const reRender = () => {
		setSeed(seed + 1);
	};
	const markListItem = (item: ITodoItem) => {
		console.log(!item.completed);
		item.completed = !item.completed;
		reRender();
	};

	const getListItemComponent = (item: ITodoItem) => {
		const itemStatusIcon = item.completed ? (
			<CheckCircleOutlineOutlined sx={{ color: 'green' }} />
		) : (
			<CancelOutlined sx={{ color: 'red' }} />
		);

		return (
			<ListItem key={item.id} disablePadding divider sx={{ height: '4rem' }}>
				<ListItemButton
					sx={{ height: '4rem' }}
					onClick={() => {
						markListItem(item);
					}}
				>
					<ListItemText primary={item.title} />
					<ListItemIcon>{itemStatusIcon}</ListItemIcon>
				</ListItemButton>
			</ListItem>
		);
	};

	return (
		<Box sx={{ width: '50rem' }} role='presentation'>
			<Card elevation={3}>
				<List>
					{todoListData.map((todoItem) => getListItemComponent(todoItem))}
				</List>
			</Card>
		</Box>
	);
}
