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
    } , [loadHabits]);


    function markAsDone(habit) {
        let action = "check";
        if(habit.done) {
            action = "uncheck";
        }
        console.log(config);
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/${action}`, {}, config);
        promise.then((response) => setLoadHabits(loadHabits + 1));
        promise.catch((error) => alert(error.response.data.message));
    }

    return(
        <>
            <Top />
            <SCContent>
                <SCTodayHeader>
                    <h1>{dayOfWeek[dayjs().day()]}, {dayjs().format('DD/MM')}</h1>
                    <h2>Nenhum hábito concluído ainda</h2>
                </SCTodayHeader>
                {todayHabits.map((habit) => 
                <SCTodayHabit key={habit.id}>
                    <SCHabitDetails>
                        <h3>{habit.name}</h3>
                        <p>Sequência atual: <SCDays highlight={habit.done}>{habit.currentSequence} dias</SCDays></p>
                        <p>Seu recorde: <SCDays highlight={habit.highestSequence === habit.currentSequence && habit.highestSequence !== 0}>{habit.highestSequence} dias</SCDays></p>
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
    p {
        color: #666666;
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
`;

const SCTodayHeader = styled.div`
    h2 {
        font-size: 18px;
        line-height: 22px;
        color: #BABABA;
    }
`

const SCDays = styled.span`
    color: ${props => props.highlight ? "#8FC549" : "#666666"};
`;