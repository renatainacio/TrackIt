import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInUpPage from "./pages/SignInUpPage";
import HabitsPage from "./pages/HabitsPage";
import TodayPage from "./pages/TodayPage";
import HistoryPage from "./pages/HistoryPage";
import { useState } from "react";
import AuthContext from "./context/AuthContext";
import DailyProgressContext from "./context/DailyProgressContext";


export default function App() {

  const [user, setUser] = useState({});
  const [progress, setProgress] = useState(0);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      <DailyProgressContext.Provider value={[progress, setProgress]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInUpPage pageType="login"/>}/>
            <Route path="/cadastro" element={<SignInUpPage pageType="register"/>}/>
            <Route path="/habitos" element={<HabitsPage />}/>
            <Route path="/hoje" element={<TodayPage />}/>
            <Route path="/historico" element={<HistoryPage />}/>
          </Routes>
        </BrowserRouter>
      </DailyProgressContext.Provider>
    </AuthContext.Provider>
  )
}

