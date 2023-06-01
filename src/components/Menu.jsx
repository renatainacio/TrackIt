import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function Menu() {
    const navigate = useNavigate();

    return (
        <SCMenu>
            <SCButtonCircle onClick={() => navigate("/hoje")}>Hoje</SCButtonCircle>
            <SCBottom>
                <SCButtonWhite onClick={() => navigate("/habitos")}>Hábitos</SCButtonWhite>
                <SCButtonWhite onClick={() => navigate("/historico")}>Histórico</SCButtonWhite>
            </SCBottom>
        </SCMenu>
    )
}

const SCBottom = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-around;
`

const SCMenu = styled.div`
    display: flex;
    justify-content: center;
`

const SCButtonWhite = styled.button`
    background: none;
    width: auto;
    font-size: 18px;
    line-height: 22px;
    color: #52B6FF;
`

const SCButtonCircle = styled.button`
    width: 91px;
    height: 91px;
    border-radius: 91px;
    background: #52B6FF;
    font-size: 18px;
    position: fixed;
    bottom: 10px;
    z-index: 2;
`