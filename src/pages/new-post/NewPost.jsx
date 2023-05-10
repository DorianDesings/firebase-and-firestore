import { addDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogCollectionReference } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/auth.context';

const NewPost = () => {
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	const [newPostInfo, setNewPostInfo] = useState({
		title: '',
		text: ''
	});

	const [imageURL, setImageURL] = useState(
		'https://firebasestorage.googleapis.com/v0/b/crud-firebase-eed75.appspot.com/o/default.jpg?alt=media&token=9664266e-d33d-4d52-a03e-98d1deaffa3d'
	);

	useEffect(() => {
		if (!currentUser) navigate('/');
	}, [currentUser]);

	return (
		<>
			<h1>New Post</h1>
			<form onSubmit={e => createPost(e, newPostInfo, currentUser, imageURL)}>
				<div>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						id='title'
						onChange={e =>
							setNewPostInfo({ ...newPostInfo, title: e.target.value })
						}
					/>
				</div>
				<div>
					<label htmlFor='text'>Text</label>
					<textarea
						type='text'
						id='text'
						onChange={e =>
							setNewPostInfo({ ...newPostInfo, text: e.target.value })
						}
					/>
				</div>

				<input type='submit' value='Crear Post' />
			</form>

			<form>
				<img src={imageURL} alt='' />
				<div>
					<input
						type='file'
						onChange={e => handleUpload(e.target.files[0], setImageURL)}
					/>
				</div>
			</form>
		</>
	);
};

const handleUpload = async (file, setImageURL) => {
	// Crea un objeto FileReader
	const reader = new FileReader();

	// Escucha el evento load que se dispara cuando la lectura del archivo es completada
	reader.onload = event => {
		const imageUrl = event.target.result;
		const test = reader.readAsDataURL(imageUrl);

		console.log(test);
		setImageURL(imageUrl);
	};
	// handleFileUpload(file, setImageURL);
};

// const handleFileUpload = async (file, setImageURL) => {
// 	// Sube el archivo al almacenamiento de Firebase
// 	const storageRef = ref(storage, file.name);
// 	try {
// 		await uploadBytes(storageRef, file);
// 		await getDownloadURL(storageRef);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

const createPost = async (e, newPostInfo) => {
	e.preventDefault();

	try {
		await addDoc(blogCollectionReference, {
			...newPostInfo,
			date: new Date().toLocaleString()
		});
	} catch (err) {
		console.log(err);
	}

	e.target.reset();
};

export default NewPost;
