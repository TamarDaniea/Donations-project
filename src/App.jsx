import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddDonatoin from './AddDonatoin'
import ListDontions from './listDontions'
import { Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import Header from './Header'
import { fromShekelToX } from './dollarUtils'
import ImagePage from './ImagePage';
import Footer from './footer'



// פונקציה לשליפת נתונים מ-LocalStorage

function getLocalStorage() {
  let result = localStorage.getItem('Dontion')
  if (!result) // אם אין נתונים, מחזירה רשימה עם תרומה לדוגמה
    return [{ id: 1, Name: "tamar", phone: "0504163028", sumDontion: 50, dedication: "תודה רבה!", date: new Date("2024-11-10") }]
 return JSON.parse(result);
 

}
// פונקציית הרכיב הראשי של האתר
function App() {
    // ניהול מצב למטבע: סוג ושער המרה
const [coin,setCoin]=useState({type:"s",dollarRate:3.5})
  let [Dontoins, setDontions] = useState(getLocalStorage)
  
  // פונקציה להוספת תרומה חדשה
  const addDontions = (Dontoin) => {
    Dontoin.id = Dontoins[Dontoins.length - 1].id + 1;
    let copy = [...Dontoins, Dontoin];
    localStorage.setItem('Dontion', JSON.stringify(copy))
    setDontions(copy);
  }
  // אפקט: שליפת שער הדולר ממקור חיצוני

useEffect(()=>{
fetch("https://v6.exchangerate-api.com/v6/ac44b3e1846cae995fa99968/latest/USD")
.then(res=>res.json())
.then(date=>
  setCoin({...coin,dollarRate:date.conversion_rates.ILS})
)
.catch(err=>
  console.log(err)
)
},[])
  return (
    <>
{  
      <h1>ברוכים הבאים לאתר התרומות</h1> }
      <Header arrClali={Dontoins} setCoin={setCoin} coin={coin}/>
      <NavBar />
      <Routes>
        <Route path="ListDontions" element={<ListDontions Darr={Dontoins} coin={coin} />} />
        <Route path="AddDonatoin" element={<AddDonatoin getDontion={addDontions} coin={coin}/>} />
        <Route path="*" element={<h1></h1>} />
      </Routes>
    <Footer />
    </>
  )


}

export default App

