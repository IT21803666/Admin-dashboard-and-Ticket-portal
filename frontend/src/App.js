import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/admin/Dashboard';
import AdminSignIn from './components/admin/AdminSignin';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddManager from './components/admin/AddManager';
import EditManager from './components/admin/EditManager';
import SupportList from './components/support/SupportList';
import Replies from './components/support/Replies';
import AddTicket from './components/ticket/AddTicket';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminSignIn />} /> 
        <Route path="/addmanager" element={<AddManager/>}/>
        <Route path="/dashboard" element={<Dashboard/>} /> 
        <Route path="/editmanager/:id" element={<EditManager/>} />
        <Route path="/supportlist" element={<SupportList/>} />  
        <Route path="/replies" element={<Replies/>} />  
        <Route path="/addticket" element={<AddTicket/>} />  
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
