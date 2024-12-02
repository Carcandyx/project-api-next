// To inform next js, this is a client component
'use client';

const axios = require('axios');
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';

import styles from './page.module.css';
import CustomDrawer from './components/CustomDrawer';
import TodoList from './components/TodoList';
import { ITodoItem } from './types';
import { hideWhileInProgress } from './utils/visualHelpers';

export default function Home() {
	const [todosListData, setTodoListData] = useState([] as ITodoItem[]);
	const [selectedUser, setUser] = useState(0);
	const message = selectedUser
		? `Lista TODOs para usuario ${selectedUser}`
		: 'Seleccione un usuario para ver su lista de TODOs';

	const getTodoListData = () => {
		axios
			.get('https://jsonplaceholder.typicode.com/todos')
			.then((response: any) => {
				setTodoListData(response.data);
			})
			.catch((error: AxiosError) => {
				console.log(error);
			});
	};

	useEffect(getTodoListData, []);

	const getUsers = () => {
		const uniqueUsers = new Set(
			todosListData.map((listItem) => listItem.userId)
		);
		return [...uniqueUsers];
	};

	return (
		<div className={styles.page}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar>
					<Typography variant='h6' noWrap component='div'>
						{'PI. Aplicación con tu entorno de desarrollo, Framework (NextJS)'}
					</Typography>
				</Toolbar>
			</AppBar>
			<CustomDrawer {...{ selectedUser, setUser }} users={getUsers()} />
			<main className={styles.main}>
				<Typography>{message}</Typography>
				{!!selectedUser &&
					hideWhileInProgress(
						!!todosListData.length,
						<TodoList
							todoListData={todosListData.filter(
								(todoItem) => todoItem.userId === selectedUser
							)}
						/>
					)}
			</main>
		</div>
	);
}
