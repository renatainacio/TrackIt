import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	* {
		font-family: 'Lexend Deca', sans-serif;
		font-style: normal;
		font-weight: 400;
		box-sizing: border-box;
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
		/* color: #FFFFFF; */
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
		color: #666666;
		&:disabled {
			background: #F2F2F2;
		}
		&::placeholder{
			color: #DBDBDB;
		}
		
	}

	h1 {
		font-size: 23px;
		line-height: 29px;
		color: #126BA5;
	}

	h2 {
		font-size: 18px;
		line-height: 22px;
		color: #BABABA;
		margin-bottom: 28px;
	}

	h3 {
		font-size: 20px;
		line-height: 25px;
		color: #666666;
	}
	
	p {
		font-size: 13px;
		line-height: 16px;
		color: #666666;
	}
`

export default GlobalStyle