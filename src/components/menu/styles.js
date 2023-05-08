import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 300px;
`;

const MenuItem = styled.li`
	position: relative;
`;

const MenuLink = styled(NavLink)``;

export { StyledMenu, MenuItem, MenuLink };
