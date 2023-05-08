import { addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogCollectionReference, storage } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/auth.context';

const NewPost = () => {
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);
	const [newPostInfo, setNewPostInfo] = useState({
		title: '',
		text: ''
	});

	const [imagePreview, setImagePreview] = useState(null);
	const [imageURL, setImageURL] = useState(null);

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
				<div>
					<input
						type='file'
						onChange={e =>
							handleUpload(e.target.files[0], setImagePreview, setImageURL)
						}
					/>
					{imagePreview && <img src={imagePreview} />}
				</div>

				<input type='submit' value='Crear Post' />
			</form>
		</>
	);
};

const handleUpload = async (file, setImagePreview, setImageURL) => {
	// Crea un objeto FileReader
	const reader = new FileReader();

	// Escucha el evento load que se dispara cuando la lectura del archivo es completada
	reader.onload = event => {
		const imageUrl = event.target.result;
		setImagePreview(imageUrl);
	};
	reader.readAsDataURL(file);
	handleFileUpload(file, setImageURL);
};

const handleFileUpload = async (file, setImageURL) => {
	// Sube el archivo al almacenamiento de Firebase
	const storageRef = ref(storage, file.name);
	try {
		await uploadBytes(storageRef, file);
		const downloadURL = await getDownloadURL(storageRef);
		setImageURL(downloadURL);
	} catch (err) {
		console.log(err);
	}
};

const createPost = async (e, newPostInfo, currentUser, imageURL) => {
	e.preventDefault();
	if (!newPostInfo.title || !newPostInfo.text || !imageURL) return;
	await addDoc(blogCollectionReference, {
		...newPostInfo,
		email: currentUser.email,
		date: new Date().toLocaleString(),
		imageURL
	});
	e.target.reset();
};

export default NewPost;
