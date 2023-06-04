import Top from "../components/Top"
import Menu from "../components/Menu"
import SCContent from "../style/SCContent"
import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function HabitsPage() {
    const navigate = useNavigate();
    const [loadHabits, setLoadHabits] = useState(0);
    const [newHabit, setNewHabit] = useState(false);
    const [habitDescription, setHabitDescription] = useState("");
    const [user, setUser] = useContext(AuthContext);
    const [habits, setHabits] = useState([]);
    const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const [selectedDays, setSelectedDays] = useState([]);
    const URLNewHabit = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const URLGetHabits = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    function deleteHabit(habit) {
        const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`, config);
        promise.then(() => setLoadHabits(loadHabits + 1));
        promise.catch((error) => alert(error.response.data.message));
    }

    function confirmDeletion(habit) {
        const options = {
            title: 'Confirmar exclusão',
            message: `Tem certeza que deseja excluir o hábito ${habit.name}?`,
            buttons: [
              {
                label: 'Sim',
                onClick: () => deleteHabit(habit)
              },
              {
                label: 'Não',
              }
            ],
          };
        confirmAlert(options);
    }

    useEffect( () => {
        const promise = axios.get(URLGetHabits, config);
        promise.then((response) => {
            setHabits(response.data);
        });
        promise.catch((error) => {
            (alert(error.response.data.message));
             navigate("/");
        });
    }
        , [loadHabits]);

    function createNewHabit(e) {
        e.preventDefault();
        console.log(selectedDays);
        const habit = {
            name: habitDescription,
            days: selectedDays
        };
        const promise = axios.post(URLNewHabit, habit, config);
        promise.then(response => {
            console.log(response);
            setLoadHabits(loadHabits + 1);
        });
        promise.catch(error => console.log(error.response.data));
    }

    return(
        <>
            <Top />
            <SCContent>
                <SCMyHabits>
                    <h1>Meus hábitos</h1>
                    <button type="button" onClick={() => {setNewHabit(true)}}>+</button>
                </SCMyHabits>
                {newHabit ? 
                    <SCNewHabitForm onSubmit={createNewHabit}>
                        <input type="text" value={habitDescription} onChange={e => setHabitDescription(e.target.value)} placeholder="nome do hábito"/>
                        <SCDaysOfWeek>
                            {daysOfWeek.map((dow, index) => <SCDoW key={index} type="button" onClick={() => {
                                !selectedDays.includes(index) ? setSelectedDays([...selectedDays, index]) : setSelectedDays(selectedDays.filter((day) => day === index));
                                }} selected={selectedDays.includes(index)}>{dow}</SCDoW>)}
                        </SCDaysOfWeek>
                    <SCNewHabitButtons>
                        <SCHabitButton type="reset" btn="cancel" onClick={() => {setNewHabit(false)}}>Cancelar</SCHabitButton>
                        <SCHabitButton btn="save">Salvar</SCHabitButton>
                    </SCNewHabitButtons>
                    </SCNewHabitForm>
                    : ""
                }
                {habits.length === 0 ? <SCNoHabit>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</SCNoHabit> : 
                    habits.map((habit) => 
                    <SCHabitItem key={habit.id}>
                        <SCHabitHeader>
                            <h3>{habit.name}</h3>
                            <ion-icon name="trash-outline" onClick={() => confirmDeletion(habit)}></ion-icon>
                        </SCHabitHeader>
                        <SCDaysOfWeek>
                            {daysOfWeek.map((dow, index) => <SCDoW key={index} type="button" disabled selected={habit.days.includes(index)}>{dow}</SCDoW>)}
                        </SCDaysOfWeek>
                    </SCHabitItem>
                )}
            </SCContent>
            <Menu />
        </>
    )
}

const SCMyHabits = styled.div`
    display: flex;
    justify-content: space-between;
    button {
        width: 40px;
        height: 35px;
        font-size: 27px;
        line-height: 34px;
    }
`

const SCNewHabitForm = styled.form`
    background-color: white;
    padding: 15px 16px;
`

const SCDaysOfWeek = styled.div`
    display: flex;
    `

const SCDoW = styled.button`
    width: 30px;
    height: 30px;
    background: ${props => props.selected ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-right: 4px;
    font-size: 20px;
    line-height: 25px;
    margin-bottom: 0;
    color: ${props => props.selected ? "#FFFFFF" : "#DBDBDB"};
`

const SCNewHabitButtons = styled.div`
    display: flex;
    justify-content: flex-end;
`

const SCHabitButton = styled.button`
    vertical-align: middle;
    width: 84px;
    height: 35px;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 0;
    margin-top: 29px;
    margin-left: 10px;
    background-color: ${props => props.btn === "cancel" ? "white" : "#52B6FF"};
    color: ${props => props.btn === "save" ? "white" : "#52B6FF"};
`

const SCNoHabit = styled.h3`
    margin-top: 29px;
`

const SCHabitHeader = styled.div`
    display: flex;
    justify-content: space-between;
    height: 30px;
    ion-icon{
        color: #666666;
        font-size: 18px;
    }
`

const SCHabitItem = styled.div`
    background-color: white;
    padding: 15px 16px;
    margin-top: 10px;
    height: 91px;
`
