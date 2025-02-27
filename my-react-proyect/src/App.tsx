import { useState } from 'react';
import './App.css'
import ButtonComponent from './components/ButtonComponent'
import HeaderComponent from './components/HeaderComponent'

function App() {
  const [number, setNumber] = useState(0);
  const [myValue, setMyValue] = useState("");
  const myPlaceHolder = "escribe aqui"
  const sayHello  = () => {
    console.log("hola")
  }
  const handleChange  = (event:any) => {
    console.log(event.target.value)
    setMyValue(event.target.value)
  }
  const upone = () => {
    setNumber(number+1);
  }
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <main className='main-content'>
        <h2 onClick={sayHello}>Hola</h2>
        <h2 onClick= {upone}>Number: {number}</h2>
        <input type="text" value={myValue} placeholder={myPlaceHolder} onChange={handleChange}/>
        <ButtonComponent ></ButtonComponent>
      </main>
      
    </>
  )
}

export default App
