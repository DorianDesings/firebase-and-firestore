import { Navigate, Route, Routes } from 'react-router-dom';

import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import NewPost from '../pages/new-post/NewPost';
import Profile from '../pages/profile/Profile';
import Register from '../pages/register/Register';

const Router = () => {
	const { currentUser } = useContext(AuthContext);
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route index element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				{currentUser && (
					<>
						<Route path='/new-post' element={<NewPost />} />
						<Route path='/profile' element={<Profile />} />
					</>
				)}
			</Route>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};

export default Router;
