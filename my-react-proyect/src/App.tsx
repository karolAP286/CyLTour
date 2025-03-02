import { useState } from 'react';
import './App.css'
import ButtonComponent from './components/ButtonComponent'
import HeaderComponent from './components/HeaderComponent'
import Login from './components/login';
import MovieList from './components/MovieList';
import AnimalList from './components/AnimalList';

function App() {
  const [number, setNumber] = useState(0);
  const [myValue, setMyValue] = useState("");
  const myPlaceHolder = "escribe aqui"
  const [greetings, setgreetings] = useState("")
  
  const links = {
    home: "home",
    blog: "blog",
    news: "news"
  }

  const [user, setUser] = useState({
    username: "",
    email: ""
  })
  const condition = false;
  const sayHello  = () => {
    setgreetings("Bienvenidos a mi web");
    console.log("hola")
  }
  const loginInfo = (userinfo:any)=> {
    console.log(userinfo);
    setUser(userinfo);
  }
  const handleChange  = (event:any) => {
    console.log(event.target.value)
    setMyValue(event.target.value)
  }
  const upOne = () => {
    setNumber(number+1);
  }
  return (
    <>
      <HeaderComponent greetings={greetings} links= {links}></HeaderComponent>
      <main className='main-content'>
        {
        user.username && <h2 onClick={sayHello}>Hola {user.username}</h2>
        }
        
        
        <Login handleLogin= {loginInfo}></Login>
        

        {
          condition && <h2>la condicion se cumple</h2>
        }
        {
          !condition && <h2>La condicion no se cumple</h2>
        }
        {
          condition ? (<h2>la condicion se cumple</h2>): (<h2>La condicion no se cumple</h2>)
        }
        <h2 onClick= {upOne}>Number: {number}</h2>
        
        <input type="text" value={myValue} placeholder={myPlaceHolder} onChange={handleChange}/>
        
        <ButtonComponent ></ButtonComponent>
        <MovieList></MovieList>
        <AnimalList></AnimalList>
      </main>
      
    </>
  )
}

export default App
