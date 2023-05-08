import { signOut } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/auth.context';

const Profile = () => {
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		if (!currentUser) navigate('/');
	}, [currentUser]);
	console.log(currentUser);
	return (
		<>
			<h1>Profile</h1>
			<img
				src={currentUser.photoURL}
				referrerPolicy='no-referrer'
				alt='profileImage'
			/>
			<h2>
				{currentUser.displayName ? currentUser.displayName : currentUser.email}
			</h2>
			<div>
				<p>
					Member since:{' '}
					{new Date(Number(currentUser.metadata.createdAt)).toLocaleString(
						'it-IT'
					)}
				</p>
			</div>
			<button onClick={() => handleSignOut(navigate)}>Logout</button>
		</>
	);
};

const handleSignOut = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Profile;
