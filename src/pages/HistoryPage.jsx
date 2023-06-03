import Top from "../components/Top"
import Menu from "../components/Menu"
import SCContent from "../style/SCContent"
import styled from "styled-components"

export default function HistoryPage() {
    return(
        <>
            <Top />
            <SCContent>
                <h1>Histórico</h1>
                <h3>Em breve você poderá ver o histórico dos seus hábitos aqui!</h3>
            </SCContent>
            <Menu />
        </>
    )
}