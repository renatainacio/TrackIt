import Top from "../components/Top"
import Menu from "../components/Menu"
import SCContent from "../style/SCContent"
import styled from "styled-components"
import Calendar from 'react-calendar'
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import axios from "axios"
import { useState } from "react"

export default function HistoryPage() {
    const [user, setUser] = useContext(AuthContext);
    const[history, setHistory] = useState([]);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    };
    const URLGetHistory = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";

    const promise = axios.get(URLGetHistory, config);
        promise.then((response) => {
            setHistory(response.data);
        });
        promise.catch((error) => {
            (alert(error.response.data.message));
        });

    return(
        <>
            <Top />
            <SCContent>
                <h1>Histórico</h1>
                <SCHistory>
                    <Calendar calendarType="US"/>
                </SCHistory>
            </SCContent>
            <Menu />
        </>
    )
}

const SCHistory = styled.div`
    margin-top: 14px;
    display: flex;
    background-color: #FFFFFF;
    border-radius: 10px;
    text-align: center;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    button {
        margin: auto auto;
        display: inline;
        background-color: #FFFFFF;
        width: auto;
        height: 48px;
        color: #000000;
        font-size: 14px;
    }

`