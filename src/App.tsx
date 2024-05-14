import React, {useEffect} from 'react';
import './App.css';
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import List from "./components/List";
import {StatusesPage} from "./pages/statusesPage";

function App() {
    const {
        onToggleButton,
        tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    return (
    <div className="App">
      <header className="App-header">
      Выбор кандидатов
      </header>
        <Routes>
            <Route index element={<List />}/>
            <Route path={'new-status'} element={<StatusesPage />}/>
        </Routes>
    </div>
  );
}

export default App;
