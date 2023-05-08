import { deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { blogCollectionReference } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/auth.context';

const Home = () => {
	const { currentUser } = useContext(AuthContext);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		getPosts(setPosts);
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

const getPosts = async setPosts => {
	const dataColection = await getDocs(blogCollectionReference);
	const dataInfo = dataColection.docs.map(doc => ({
		...doc.data(),
		id: doc.id
	}));

	dataInfo.length === 0 ? setPosts(null) : setPosts(dataInfo);
};

const editPost = async post => {};

const deletePost = async (id, setPosts) => {
	const postDoc = doc(blogCollectionReference, id);
	await deleteDoc(postDoc);
	getPosts(setPosts);
};

export default Home;
