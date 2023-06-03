import Top from "../components/Top"
import Menu from "../components/Menu"
import SCContent from "../style/SCContent"
import styled from "styled-components"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HabitsPage() {
    const navigate = useNavigate();
    const [newHabit, setNewHabit] = useState(false);
    const [user, setUser] = useContext(AuthContext);
    const [habits, setHabits] = useState([]);
    const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const [selectedDays, setSelectedDays] = useState([]);
    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }
    useEffect( () => {
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config);
        promise.then((response) => {
            setHabits(response.data);
        });
        promise.catch((error) => {
            (alert(error.response.data.message));
             navigate("/");
        });
    }
        , []);
    console.log(selectedDays);
    return(
        <>
            <Top />
            <SCContent>
                <SCMyHabits>
                    <h1>Meus hábitos</h1>
                    <button type="button" onClick={() => {setNewHabit(true)}}>+</button>
                </SCMyHabits>
                {newHabit ? 
                    <SCNewHabitForm>
                        <input placeholder="nome do hábito"/>
                        <SCDaysOfWeek>
                            {daysOfWeek.map((dow, index) => <SCDoW key={index} type="button" onClick={() => {
                                !selectedDays.includes(index) ? setSelectedDays([...selectedDays, index]) : setSelectedDays(selectedDays.filter((day) => day === index));
                                }} selected={selectedDays.includes(index)}>{dow}</SCDoW>)}
                        </SCDaysOfWeek>
                    <SCNewHabitButtons>
                        <SCHabitButton type="reset" btn="cancel" onClick={() => {setSelectedDays([]); setNewHabit(false)}}>Cancelar</SCHabitButton>
                        <SCHabitButton btn="save">Salvar</SCHabitButton>
                    </SCNewHabitButtons>
                    </SCNewHabitForm>
                    : ""
                }
                {habits.length === 0 ? <SCNoHabit>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</SCNoHabit> : "" }
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
    left: 36px;
    top: 218px;
    background: ${props => props.selected ? "#CFCFCF" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    margin-right: 4px;
    font-size: 20px;
    line-height: 25px;
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
    margin-top: 4px;
    margin-left: 10px;
    background-color: ${props => props.btn === "cancel" ? "white" : "#52B6FF"};
    color: ${props => props.btn === "save" ? "white" : "#52B6FF"};
`

const SCNoHabit = styled.h3`
    margin-top: 29px;
`