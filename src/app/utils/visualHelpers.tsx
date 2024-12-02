import { CircularProgress } from '@mui/material';

export const hideWhileInProgress = (
	conditional: boolean,
	component: React.ReactNode
) => (conditional ? component : <CircularProgress />);
