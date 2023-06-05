import Top from "../components/Top"
import Menu from "../components/Menu"
import SCContent from "../style/SCContent"
import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from  'react-loader-spinner';

export default function HabitsPage() {
    const navigate = useNavigate();
    const [loadHabits, setLoadHabits] = useState(0);
    const [newHabit, setNewHabit] = useState(false);
    const [habitDescription, setHabitDescription] = useState("");
    const [user, setUser] = useContext(AuthContext);
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(false);
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
        console.log("confirmar");
        if(window.confirm(`Tem certeza que deseja deletar o hábito ${habit.name}?`)) 
        deleteHabit(habit);
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
        setLoading(true);
        promise.then(response => {
            console.log(response);
            setLoadHabits(loadHabits + 1);
            setLoading(false);
            setNewHabit(false);
            setHabitDescription("");
            setSelectedDays([]);
        });
        promise.catch(error => {
            alert(error.response.data.message);
            setLoading(false);
        });
    }

    return(
        <>
            <Top />
            <SCContent>
                <SCMyHabits>
                    <h1>Meus hábitos</h1>
                    <button type="button" onClick={() => {setNewHabit(true)}} data-test="habit-create-btn">+</button>
                </SCMyHabits>
                {newHabit ? 
                    <SCNewHabitForm onSubmit={createNewHabit} data-test="habit-create-container">
                        <input type="text" value={habitDescription} onChange={e => setHabitDescription(e.target.value)} placeholder="nome do hábito" disabled={loading} data-test="habit-name-input"/>
                        <SCDaysOfWeek>
                            {daysOfWeek.map((dow, index) => <SCDoW key={index} type="button" onClick={() => {
                                !selectedDays.includes(index) ? setSelectedDays([...selectedDays, index]) : setSelectedDays(selectedDays.filter((day) => day !== index));
                                }} selected={selectedDays.includes(index)} disabled={loading} data-test="habit-day">{dow}</SCDoW>)}
                        </SCDaysOfWeek>
                    <SCNewHabitButtons>
                        <SCHabitButton type="reset" btn="cancel" onClick={() => {setNewHabit(false)}} data-test="habit-create-cancel-btn" disabled={loading}>Cancelar</SCHabitButton>
                        <SCHabitButton btn="save" disabled={loading} data-test="habit-create-save-btn">
                            {loading ? 
                            <ThreeDots
                            height="10"
                            color="white"
                            ariaLabel="loading"
                            />
                            : "Salvar"
                            }
                        </SCHabitButton>
                    </SCNewHabitButtons>
                    </SCNewHabitForm>
                    : ""
                }
                {habits.length === 0 ? <SCNoHabit>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</SCNoHabit> : 
                    habits.map((habit) => 
                    <SCHabitItem key={habit.id} data-test="habit-container">
                        <SCHabitHeader>
                            <h3 data-test="habit-name">{habit.name}</h3>
                            <ion-icon name="trash-outline" onClick={() => confirmDeletion(habit)} data-test="habit-delete-btn"></ion-icon>
                        </SCHabitHeader>
                        <SCDaysOfWeek>
                            {daysOfWeek.map((dow, index) => <SCDoW key={index} type="button" disabled selected={habit.days.includes(index)} data-test="habit-day">{dow}</SCDoW>)}
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
    margin-bottom: 10px;
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
    margin-bottom: 10px;
    height: 91px;
`
