import logo from "../assets/logo.png"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import axios from 'axios'
import { ThreeDots } from  'react-loader-spinner'
import AuthContext from "../context/AuthContext"

export default function SignInUpPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [disable, setDisable] = useState(false);
    const registerURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
    const loginURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    const [user, setUser] = useContext(AuthContext);
    const navigate = useNavigate();

    function login(e) {
        e.preventDefault();
        const promise = axios.post(loginURL,
            {
                email,
                password
            });
        setDisable(true);
        promise.catch((error) => {
            alert(error.response.data.message);
            setDisable(false);
        });
        promise.then((response) => {
            navigate("/hoje");
            console.log(response.data);
            setUser(response.data);
        });
    }

    function register(e) {                                             
        e.preventDefault();
        const promise = axios.post(registerURL,
            {
                email,
                name,
                image,
                password
            });
        setDisable(true);
        promise.catch((error) => {
            alert(error.response.data.message);
            setDisable(false);
        });
        promise.then(() => navigate("/"));
    }

    return(
        <SCLoginPage>
            <img src={logo}/>
            <SCForm onSubmit={props.pageType === "register" ? register : login}>
                <input type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} disabled={disable} data-test="email-input"/>
                <input type="password" placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} disabled={disable} data-test="password-input"/>
                {props.pageType === "register" ? 
                    <>
                        <input type="text" placeholder="nome" value={name} onChange={e => setName(e.target.value)} disabled={disable} data-test="user-name-input"/>
                        <input type="url" placeholder="foto" value={image} onChange={e => setImage(e.target.value)} disabled={disable} data-test="user-image-input"/>
                    </>
                    : ""}
                {props.pageType === "login" ? 
                    <button type="submit" disabled={disable} data-test="login-btn">{ disable ? 
                        <ThreeDots
                        height="13"
                        color="white"
                        ariaLabel="loading"
                      />
                     : "Entrar"} </button>
                     : 
                    <button type="submit" disabled={disable} data-test="signup-btn">{ disable ? 
                        <ThreeDots
                        height="13"
                        color="white"
                        ariaLabel="loading"
                      />
                     : "Cadastrar"}</button>}
                {props.pageType === "register" ? 
                <Link to="/" data-test="login-link">
                <SCLink>Já tem uma conta? Faça login!</SCLink>
                </Link>
                : 
                <Link to="/cadastro" data-test="signup-link">
                    <SCLink>Não tem uma conta? Cadastre-se!</SCLink>
                </Link>}
                
            </SCForm>
        </SCLoginPage>
    )
}

const SCLoginPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 180px;
        margin-top: 68px;
        margin-bottom: 33px;
    }
`

const SCForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SCLink = styled.p`
    font-family: 'Lexend Deca', sans-serif;
	font-style: normal;
	font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-decoration-line: underline;
    color: #52B6FF;
`