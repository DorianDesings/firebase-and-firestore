import styled from 'styled-components';

const GoogleLoginButton = styled.button`
	background-color: #ffffff;
	color: #757575;
	border: 1px solid #757575;
	border-radius: 4px;
	padding: 8px 16px;
	cursor: pointer;
	font-size: 14px;
	font-weight: bold;
	display: flex;
	align-items: center;

	&:hover {
		background-color: #f1f1f1;
	}

	&:focus {
		outline: none;
	}

	&:active {
		background-color: #e0e0e0;
	}

	img {
		margin-right: 8px;
	}
`;

const GoogleLoginIcon = styled.img`
	width: 18px;
`;

export { GoogleLoginButton, GoogleLoginIcon };
