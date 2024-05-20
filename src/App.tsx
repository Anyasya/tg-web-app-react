import React, {useEffect} from 'react';
import './App.css';
import {useTelegram} from "./hooks/useTelegram";
import {Route, Routes} from 'react-router-dom'
import List from "./components/List";
import {StatusesPage} from "./pages/statusesPage";
import FormPage from "./pages/formPage";
import {ProjectsPage} from "./pages/projectsPage";
import Logo from "./components/Svgs/gainius-logo";

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
          <Logo/>
          <div className={'decorative-line'}></div>
      </header>
        <Routes>
            <Route index element={<ProjectsPage />}/>
            <Route path={'new-status'} element={<StatusesPage />}/>
            <Route path={'form'} element={<FormPage />}/>
            <Route path={'projects'} element={<ProjectsPage />}/>
        </Routes>
    </div>
  );
}

export default App;
