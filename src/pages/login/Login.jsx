import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup
} from 'firebase/auth';

import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/auth.context';
import { GoogleLoginButton, GoogleLoginIcon } from './styles';

const Login = () => {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const [loginData, setLoginData] = useState({
		email: '',
		password: ''
	});

	const [error, setError] = useState('');

	useEffect(() => {
		if (currentUser) navigate('/');
	}, [currentUser]);

	return (
		<>
			<h1>Login</h1>
			{error && <p>{error}</p>}
			<form onSubmit={e => handleSubmit(e, loginData, setError)}>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						onChange={e =>
							setLoginData({ ...loginData, email: e.target.value })
						}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={e =>
							setLoginData({ ...loginData, password: e.target.value })
						}
					/>
				</div>
				<input type='submit' value='Sign In' />
			</form>

			<GoogleLoginButton onClick={loginWithGoogle}>
				<GoogleLoginIcon
					src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
					alt='Google Icon'
				/>
				Iniciar sesión con Google
			</GoogleLoginButton>
		</>
	);
};

const handleSubmit = async (e, loginData, setError) => {
	e.preventDefault();
	const { email, password } = loginData;
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		setError('INVALID EMAIL');
	}
};

const loginWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		console.log(credential);
	} catch (err) {
		console.log(err);
	}
};

export default Login;
