import Top from "../components/Top"
import Menu from "../components/Menu"
import SCContent from "../style/SCContent"
import dayjs from "dayjs"
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useState } from "react";
import styled from "styled-components";

export default function TodayPage() {
    const dayOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const getTodayHabitsURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    const [user, setUser] = useContext(AuthContext);
    const [todayHabits, setTodayHabits] = useState([]);
    const [loadHabits, setLoadHabits] = useState(0);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    useEffect(() => {
        const promise = axios.get(getTodayHabitsURL, config);
        promise.then((response) => {
            console.log(response.data);
            setTodayHabits(response.data);
        });
        promise.catch((error) => console.log(error.response.data.message));
    } , []);


    function markAsDone(habit) {
        console.log("marcar como feito");
    }

    return(
        <>
            <Top />
            <SCContent>
                <h1>{dayOfWeek[dayjs().day()]}, {dayjs().format('DD/MM')}</h1>
                <h2>Nenhum hábito concluído ainda</h2>
                {todayHabits.map((habit) => 
                <SCTodayHabit key={habit.id}>
                    <SCHabitDetails>
                        <h3>{habit.name}</h3>
                        <p>Sequência atual: {habit.currentSequence} dias</p>
                        <p>Seu recorde: {habit.highestSequence} dias</p>
                    </SCHabitDetails>
                    <SCMarkButton onClick={() => markAsDone(habit)} done={habit.done}><ion-icon name="checkmark-outline"></ion-icon></SCMarkButton>
                </SCTodayHabit>
                )}
            </SCContent>
            <Menu />
        </>
    )
}

const SCTodayHabit = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 13px 13px 12px 15px;
    width: 340px;
    height: 94px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 10px;
`;

const SCHabitDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    h3 {
        font-size: 20px;
    }
`;

const SCMarkButton = styled.button`
    width: 69px;
    height: 69px;
    background: ${props => props.done ? "#8FC549" : "#EBEBEB"};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    ion-icon {
        font-size: 46px;
        font-weight: 900;
        --ionicon-stroke-width: 75px;
    }
`