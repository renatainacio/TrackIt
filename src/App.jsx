import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInUpPage from "./pages/SignInUpPage";
import HabitsPage from "./pages/HabitsPage";
import TodayPage from "./pages/TodayPage";
import HistoryPage from "./pages/HistoryPage";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInUpPage pageType="login"/>}/>
        <Route path="/cadastro" element={<SignInUpPage pageType="register"/>}/>
        <Route path="/habitos" element={<HabitsPage />}/>
        <Route path="/hoje" element={<TodayPage />}/>
        <Route path="/historico" element={<HistoryPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

