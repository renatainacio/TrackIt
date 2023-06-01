import Top from "../components/Top"
import Menu from "../components/Menu"
import SCContent from "../style/SCContent"

export default function TodayPage() {
    return(
        <>
            <Top />
            <SCContent>
                <h1>Teste</h1>
                <h2>Hábitos concluídos</h2>
                <p>Map de hábitos</p>
            </SCContent>
            <Menu />
        </>
    )
}