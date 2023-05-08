import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import { MenuItem, MenuLink, StyledMenu } from './styles';

const Menu = ({ open }) => {
	const { currentUser } = useContext(AuthContext);
	return (
		<nav>
			<StyledMenu open={open}>
				<MenuItem>
					<MenuLink to={'/'}>Home</MenuLink>
				</MenuItem>
				{!currentUser ? (
					<>
						<MenuItem>
							<MenuLink to={'/login'}>Login</MenuLink>
						</MenuItem>
						<MenuItem>
							<MenuLink to={'/register'}>Register</MenuLink>
						</MenuItem>
					</>
				) : (
					<>
						<MenuItem>
							<MenuLink to={'/new-post'}>New Post</MenuLink>
						</MenuItem>
						<MenuItem>
							<MenuLink to={'/profile'}>Profile</MenuLink>
						</MenuItem>
					</>
				)}
			</StyledMenu>
		</nav>
	);
};

export default Menu;
