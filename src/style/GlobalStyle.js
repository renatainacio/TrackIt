import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	* {
		font-family: 'Lexend Deca', sans-serif;
		font-style: normal;
		font-weight: 400;
	}
	
	button {
		width: 303px;
		height: 45px;
		background: #52B6FF;
		border-radius: 5px;
		border-style: none;
		font-size: 21px;
		line-height: 26px;
		text-align: center;
		color: #FFFFFF;
		margin-bottom: 25px;
		display: flex;
		justify-content: center;
		align-items: center;
		&:disabled {
			opacity: 0.7;
		}
	}
	input {
		background: #FFFFFF;
		border: 1px solid #D5D5D5;
		border-radius: 5px;
		width: 303px;
		height: 45px;
		margin-bottom: 6px;
		padding: 0 11px;
		font-size: 20px;
		line-height: 25px;
		display: flex;
		align-items: center;
		&:disabled {
			background: #F2F2F2;
		}
		&::placeholder{
			color: #DBDBDB;
		}
		
	}
`

export default GlobalStyle