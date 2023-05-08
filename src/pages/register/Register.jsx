import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/auth.context';

const Register = () => {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const [registerData, setRegisterData] = useState({
		email: '',
		password: '',
		passwordConfirmation: ''
	});

	useEffect(() => {
		if (currentUser) navigate('/');
	}, [currentUser]);

	return (
		<>
			<h1>Register</h1>
			<form onSubmit={e => handleSubmit(e, registerData)}>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						onChange={e =>
							setRegisterData({ ...registerData, email: e.target.value })
						}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={e =>
							setRegisterData({ ...registerData, password: e.target.value })
						}
					/>
				</div>
				<div>
					<label htmlFor='password-confirmation'>Password Confirmation</label>
					<input
						type='password'
						id='password-confirmation'
						onChange={e =>
							setRegisterData({
								...registerData,
								passwordConfirmation: e.target.value
							})
						}
					/>
				</div>
				<input type='submit' value='Sign Up' />
			</form>
		</>
	);
};

const handleSubmit = async (e, registerData) => {
	e.preventDefault();
	const { email, password } = registerData;
	try {
		await createUserWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.log(err);
	}
};

export default Register;
