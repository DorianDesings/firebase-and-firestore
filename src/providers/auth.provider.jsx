import { useEffect, useState } from 'react';
import { auth } from '../config/firebase.config';
import { AuthContext } from '../contexts/auth.context';

const getUserFromLocalStorage = () => {
	const user = localStorage.getItem('currentUser');

	return user;
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(getUserFromLocalStorage);

	useEffect(() => {
		const unsuscribre = auth.onAuthStateChanged(user => {
			if (user) {
				// El usuario está autenticado
				console.log('Usuario autenticado:', user);
				setCurrentUser(user);
			} else {
				// El usuario no está autenticado
				console.log('Usuario no autenticado');
				setCurrentUser(null);
			}
		});

		return () => unsuscribre();
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
