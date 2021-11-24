import './App.scss';
import Users from './Pages/Users/Users'
import {Routes, Route} from 'react-router-dom'
import Posts from './Pages/Posts/Posts';
import Header from './Components/Header/Header';

function App() {
  return (
    <>
    <Header/>
    <Routes>
    <Route path="/users" element={<Users/>} />
    <Route path="/posts/:id" element={<Posts/>} />
    </Routes>
    </>
    );
  }
  
  export default App;
  