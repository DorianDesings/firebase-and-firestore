import { addDoc } from 'firebase/firestore';
import {
	deleteObject,
	getDownloadURL,
	listAll,
	ref,
	uploadBytesResumable
} from 'firebase/storage';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { blogCollectionReference, storage } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/auth.context';

const defaultImage =
	'https://firebasestorage.googleapis.com/v0/b/crud-firebase-eed75.appspot.com/o/default.png?alt=media&token=d7f69d12-7a3f-49ac-93cb-e45e32d5df3d';

const NewPost = () => {
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);
	const inputFileRef = useRef(null);

	const [newPostInfo, setNewPostInfo] = useState({
		title: '',
		text: ''
	});

	const [imageURL, setImageURL] = useState(defaultImage);

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

			<form onSubmit={e => e.preventDefault()}>
				<img src={imageURL} alt='' />
				{imageURL !== defaultImage && (
					<button
						onClick={() =>
							handleDeleteImage(imageURL, setImageURL, inputFileRef)
						}
					>
						Delete image
					</button>
				)}

				<div>
					<input
						ref={inputFileRef}
						type='file'
						onChange={e =>
							handleLoadImage(e.target.files[0], setImageURL, currentUser)
						}
					/>
				</div>
			</form>
		</>
	);
};
const handleLoadImage = async (file, setImageURL, currentUser) => {
	console.log(file);
	const nameNoExtension = file.name.substring(0, file.name.indexOf('.'));
	const finalName = nameNoExtension + v4();
	const storageRef = ref(storage, `${currentUser.email}/${finalName}`);

	const metadata = {
		contentType: file.type
	};

	try {
		const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		uploadTask.on('state_changed', snapshot => {
			const progress = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			);
		});

		await uploadTask;

		const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
		setImageURL(downloadURL);

		// Obtén una referencia a la carpeta en Firebase Storage
		const folderRef = ref(storage, currentUser.email);

		// Obtiene la lista de todos los archivos en la carpeta
		listAll(folderRef)
			.then(res => {
				res.items.forEach(itemRef => {
					// Obtén la URL del archivo
					getDownloadURL(itemRef)
						.then(url => {
							console.log(url);
						})
						.catch(error => {
							console.log('Error al obtener la URL del archivo:', error);
						});
				});
			})
			.catch(error => {
				console.log('Error al obtener la lista de archivos:', error);
			});
	} catch (error) {
		console.error('Error al cargar la foto:', error);
	}
};

const handleDeleteImage = async (imageURL, setImageURL, inputFileRef) => {
	const storageRef = ref(storage, imageURL);
	try {
		await deleteObject(storageRef);
		console.log('Foto eliminada exitosamente');
		setImageURL(defaultImage);
		inputFileRef.current.value = null;
	} catch (error) {
		console.error('Error al eliminar la foto:', error);
	}
};

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
