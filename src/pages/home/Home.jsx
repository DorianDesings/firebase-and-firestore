import { deleteDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { blogCollectionReference } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/auth.context';

const Home = () => {
	const { currentUser } = useContext(AuthContext);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const subscribeToData = onSnapshot(blogCollectionReference, snapshot => {
			const dataInfo = snapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));

			dataInfo.length === 0 ? setPosts(null) : setPosts(dataInfo);
		});

		return () => subscribeToData();
	}, []);

	if (posts && posts.length === 0) return <h1>Loading posts...</h1>;

	if (!posts) return <h1>Nothing to show!</h1>;

	return (
		<>
			<h1>Home</h1>
			{posts &&
				posts.map(post => (
					<div key={post.id}>
						<img src={post.imageURL} alt='' />
						<h2>{post.title}</h2>
						<p>{post.text}</p>
						{currentUser && currentUser.email === post.email && (
							<>
								<button onClick={() => editPost(post)}>Edit</button>
								<button onClick={() => deletePost(post.id, setPosts)}>
									Delete
								</button>
							</>
						)}
					</div>
				))}
		</>
	);
};

const getPostById = async id => {
	const postReference = doc(blogCollectionReference, id);
	try {
		const postToRead = await getDoc(postReference);
		console.log(postToRead.data());
	} catch (err) {
		console.log(err);
	}
};

const deletePost = async id => {
	try {
		const postToDelete = doc(blogCollectionReference, id);
		await deleteDoc(postToDelete);
	} catch (error) {
		console.error('Error al actualizar el documento:', error);
	}
};

export default Home;
