import { useState, useEffect } from 'react';
import { usersCollectionReference } from './config/firebase.config';
import { addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

const App = () => {
	const [users, setUsers] = useState([]);
	const [newUser, setNewUser] = useState({
		name: '',
		age: 0
	});

	useEffect(() => {
		getUsers(setUsers);
	}, [users]);

	return (
		<>
			<h1>Firestore</h1>
			<form onSubmit={e => e.preventDefault()}>
				<div>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						id='name'
						onChange={e => setNewUser({ ...newUser, name: e.target.value })}
					/>
				</div>
				<div>
					<label htmlFor='age'>Age</label>
					<input
						type='text'
						name='age'
						id='age'
						onChange={e =>
							setNewUser({ ...newUser, age: Number(e.target.value) })
						}
					/>
				</div>
				<button onClick={() => createUser(newUser)}>Create User</button>
			</form>
			{users.map(user => {
				return (
					<div key={user.id}>
						<h2>Name: {user.name}</h2>
						<h3>Age: {user.age}</h3>
						<button
							onClick={() =>
								updateUser(user.id, { ...user.name, age: user.age + 1 })
							}
						>
							Update Age
						</button>
						<button onClick={() => deleteUser(user.id)}>Delete</button>
					</div>
				);
			})}
		</>
	);
};

export default App;

const getUsers = async setUsers => {
	const dataColection = await getDocs(usersCollectionReference);
	const dataInfo = dataColection.docs.map(doc => ({
		...doc.data(),
		id: doc.id
	}));
	setUsers(dataInfo);
};

const createUser = async newUser => {
	if (!newUser.name || newUser.age < 10) return;
	await addDoc(usersCollectionReference, newUser);
};

const updateUser = async (id, newInfo) => {
	const userDoc = doc(usersCollectionReference, id);
	await updateDoc(userDoc, newInfo);
};

const deleteUser = async id => {
	const userDoc = doc(usersCollectionReference, id);
	await deleteDoc(userDoc);
};
