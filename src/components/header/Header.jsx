import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth.context';
import Menu from '../menu/Menu';
import { StyledHeader } from './styles';

const Header = () => {
	const { currentUser } = useContext(AuthContext);
	return (
		<StyledHeader>
			<h2>{currentUser && currentUser.email}</h2>
			<Menu />
		</StyledHeader>
	);
};

export default Header;
