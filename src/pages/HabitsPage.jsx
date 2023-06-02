import Top from "../components/Top"
import Menu from "../components/Menu"
import SCContent from "../style/SCContent"
import styled from "styled-components"

export default function HabitsPage() {
    const [newHabit, setNewHabit] = useState(false);
    return(
        <>
            <Top />
            <SCContent>
                <SCMyHabits>
                    <h1>Meus hábitos</h1>
                    <button>+</button>
                </SCMyHabits>
                <h3>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h3>
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
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 27px;
        line-height: 34px;
    }
`