import Top from "../components/Top"
import Menu from "../components/Menu"
import SCContent from "../style/SCContent"
import styled from "styled-components"
import Calendar from 'react-calendar'
import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import 'react-calendar/dist/Calendar.css';

export default function HistoryPage() {
    const [user, setUser] = useContext(AuthContext);
    const[history, setHistory] = useState([]);
    const [green, setGreen] = useState([]);
    const [red, setRed] = useState([]);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    };
    const URLGetHistory = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily";

    useEffect(() => {
        const promise = axios.get(URLGetHistory, config);
            promise.then((response) => {
                let auxGreen;
                let auxRed;
                setHistory(response.data);
                console.log(response.data);
                auxGreen = response.data.filter((record) => record.habits.length === record.habits.filter(habit => habit.done).length);
                console.log(auxGreen[0].day.split("/")[2]);
                console.log(auxGreen[0].day.split("/")[1]);
                console.log(auxGreen[0].day.split("/")[0]);
                console.log(new Date("2023", "06", "04"));
                if (auxGreen.length > 0)
                    setGreen(auxGreen.map(item => new Date(Number(item.day.split("/")[2]), Number(item.day.split("/")[1]) - 1, Number(item.day.split("/")[0]))));
                auxRed = response.data.filter((record) => !auxGreen.includes(record));
                if (auxRed.length > 0)
                    setRed(auxRed.map(item => new Date(Number(item.day.split("/")[2]), Number(item.day.split("/")[1]) - 1, Number(item.day.split("/")[0]))));               
            });
            promise.catch((error) => {
                (alert(error.response.data.message));
            });
    } , []);

    function isSameDay(a, b) {
        console.log(a === b);
        return a === b;
      }

    function calendarStyle(date) {
        // console.log(green);
        // console.log(red);
        // console.log(date.date);

        if(green.find((dDate) => dDate.getTime() === date.date.getTime()))
        {
            return 'highlight-green';
        }
        else if (red.find((dDate) => dDate.getTime() === date.date.getTime()))
        {
            return 'highlight-red';
        }
    };

    return(
        <>
            <Top />
            <SCContent>
                <h1>Histórico</h1>
                <SCHistory>
                    <Calendar calendarType="US" tileClassName={calendarStyle} />
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
    padding: 0 15px;
    button {
        margin: auto auto;
        display: inline;
        width: auto;
        height: 48px;
        font-size: 14px;
    }
    .react-calendar{
        border:none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .highlight-green {
            border: 8px solid #FFFFFF;
            background-color: #3ad63a;
            border-radius: 100%;
        }
        .highlight-red {
            border: 8px solid #FFFFFF;
            background-color: #eb5656;
            border-radius: 100%;
        }
    }
`