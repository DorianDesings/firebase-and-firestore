import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/auth.provider';
import Router from './router/Router';
import { GlobalStyles } from './styles/globalStyles';
const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<AuthProvider>
				<Router />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
