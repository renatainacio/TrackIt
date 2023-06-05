import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext } from "react";
import DailyProgressContext from "../context/DailyProgressContext";

export default function Menu() {
    const navigate = useNavigate();
    const [dailyProgress, setDailyProgress] = useContext(DailyProgressContext);

    return (
        <SCMenu data-test="menu">
            <SCButtonCircle onClick={() => navigate("/hoje")} data-test="today-link"><CircularProgressbar value={dailyProgress * 100} text="Hoje" styles={
                buildStyles({
                    textSize: '22px',
                    trailColor: '#52B6FF',
                    textColor: '#FFFFFF',
                    backgroundColor: '#52B6FF',
                    pathColor: `#FFFFFF`,
                })}/></SCButtonCircle>
            <SCBottom>
                <SCButtonWhite onClick={() => navigate("/habitos")} data-test="habit-link">Hábitos</SCButtonWhite>
                <SCButtonWhite onClick={() => navigate("/historico")} data-test="history-link">Histórico</SCButtonWhite>
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
    justify-content: space-between;
    padding: 0 25px;
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
    margin-bottom: 0;
    height: auto;
    text-align: center;
`

const SCButtonCircle = styled.button`
    width: 91px;
    height: 91px;
    border-radius: 91px;
    position: fixed;
    margin-bottom: 0px;
    bottom: 10px;
    z-index: 2;
`