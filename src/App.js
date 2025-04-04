import logo from './logo.svg';
import './App.css';
import LoginAndSignUp from './components/Authentication/LoginAndSignUp';
import NavigationBar from './components/EmailBoxUi/NavigationBar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/EmailBoxUi/Home';
import SendEmail from './components/EmailBoxUi/SendEmail';
import "bootstrap/dist/css/bootstrap.min.css";
import EmailInbox from './components/EmailBoxUi/EmailinBox';
import { useSelector } from 'react-redux';
import ReadEmail from './components/EmailBoxUi/ReadEmail';

function App() {

  const islogin = useSelector((state) => state.Auth.isLoggin);

  return <>
    <NavigationBar />  
    
      <Routes>
      {islogin && <Route path="/" element={<Home />} />}
      {islogin && <Route path='/Sendemail' element={<SendEmail></SendEmail>}></Route>}
      {islogin && <Route path='/Inbox' element={<EmailInbox></EmailInbox>}></Route>}
      {islogin && <Route path='/Inbox/:id' element={<ReadEmail></ReadEmail>}></Route>}
      {!islogin && <Route path="/Auth" element={<LoginAndSignUp />} />}
      </Routes>
  </>
}

export default App;
