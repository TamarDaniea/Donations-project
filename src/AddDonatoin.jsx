import  React, { useState,useEffect,useRef } from "react"
import { fromXlToShekel } from "./dollarUtils"
import './AddDonatoin.css';
import './ImagePage'
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';  



// הגדרת רכיב AddDonatoin
//פונקציה להוספת תרומה 
const AddDonatoin =(props)=>{
    const location = useLocation();// קבלת מידע מהכתובת (state)
    let initialSum = location.state?.sum || "";
    const formRef = useRef(null);
    let[myErrors,setMyErrors]=useState({})
      // ניהול מצב עבור פרטי התרומה
    let[empty,setEmpty]=useState({
        id:0,
        Name:" ", 
        phone:" ",
        sumDontion: initialSum,
        dedication:" ", 
        date:null
    })
    // אפקט המתעדכן כאשר משתנה סכום ההתחלה
    useEffect(() => {
        const initialSum = location.state?.sum || "";
        setEmpty((prevEmpty) => ({
            ...prevEmpty,
            sumDontion: initialSum,// עדכון המצב בסכום החדש
        }));
    }, [location.state?.sum]); 

    
     // פונקציה לבדיקת תקינות השדות בטופס
    const propriety=()=>{
        let err={};

        if(!empty.Name)
            err.Name="שדה חובה"
        else if(empty.Name.length<2)
            err.Name="שם קצר מידי"

        const namePattern = /^[a-zA-Zא-ת]+$/;

        if(!empty.phone)
            err.phone="שדה חובה"
        else if(empty.phone.length<9)
            err.phone="מספר טלפון לא תקין"
        else if (namePattern.test(empty.phone))
          err.phone="מספר טלפון אינו יכול להכיל אותיות"

        if(!empty.sumDontion)
            err.sumDontion="שדה חובה"
        else if(empty.sumDontion<=0)
            err.sumDontion="סכום לא תקין"

         
        return err;

    }
    
// פונקציה לשמירת פרטי התרומה
    const saveDetails = (e) => {
        e.preventDefault();
        let result = propriety(); // בדיקת תקינות השדות 
        if (Object.keys(result).length === 0) {// אם אין שגיאות
            alert("תודה! התרומה התקבלה בהצלחה!");
            const updatedEmpty = { 
                ...empty, 
                date: new Date(),
                sumDontion: fromXlToShekel(empty.sumDontion, props.coin)
            };
            setEmpty(updatedEmpty);
            props.getDontion(updatedEmpty);
            localStorage.setItem('userDetails', JSON.stringify({
                name: empty.Name,
                phone: empty.phone,
                sumDontion: empty.sumDontion,
                dedication: empty.dedication,
                date: updatedEmpty.date
            }));
            setEmpty({
                Name: " ", 
                phone: " ",
                sumDontion: " ",
                dedication: " "
            });
    
           // בקשה להדפסת קבלה
            const printConfirmation = window.confirm("האם ברצונך להדפיס קבלה?");
            if (printConfirmation) {
                showReceiptModal();
            } else {
                window.location.href = '/listdontoin';
            }
        }
        setMyErrors(result);

    };
    
    // פונקציה להצגת מודאל עם קבלה
    const showReceiptModal = () => {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        const name = userDetails?.name || 'שם לא זמין';
        const sum = userDetails?.sumDontion || 'סכום לא זמין';

        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.maxWidth = '600px';
        modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        modal.style.zIndex = 1000;
        modal.style.textAlign = 'center';
        modal.style.borderRadius = '15px';
        modal.style.border = '2px solid #28a745';

        const modalContent = `
                    <h2>לכבוד: ${name}</h2>
                    <p>תודה רבה על תרומתך בסך ${sum} ש"ח</p>
                    <p>אנחנו מודים לך מאוד ותזכה למצוות.</p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEW3DOmGiETXyBXmbRAE0tWyxDJyvCeXUu8g&s" alt="תמונה" style="width:50%; height:auto;"/>
                    <br/>
                    <button id="closeModalBtn" style="margin-top: 10px;">סגור</button>
                    <button id="printPdfBtn" style="margin-top: 10px; margin-left: 10px;">הדפס PDF</button>
                `;

        modal.innerHTML = modalContent;
        document.body.appendChild(modal);

        document.getElementById('closeModalBtn').onclick = () => {
            modal.remove();
            window.history.back();
        };

        document.getElementById('printPdfBtn').onclick = () => {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text(`לכבוד: ${name}`, 10, 10);
            doc.text(`תודה רבה על תרומתך בסך ${sum} ש"ח`, 10, 20);
            doc.text('אנחנו מודים לך מאוד ותזכה למצוות.', 10, 30);
            doc.addImage('https://dizngof10print.co.il/wp-content/uploads/2022/12/97056.jpg', 'JPEG', 10, 40, 150, 100);
            doc.save('קבלה.pdf');
        };
    };
  // פונקציה לעדכון השדות בטופס
    const change = (e) => {
        const { type, value, name } = e.target;
        const newValue = type === "number" ? +value : value;
        setEmpty((prevEmpty) => ({
            ...prevEmpty,
            [name]: newValue
        }));
    };

    return(

    <form className="addDonion" onSubmit={saveDetails}>
    <label>שם</label>
    <input name="Name" type="text" value={empty.Name} onChange={(e) => setEmpty({...empty, Name: e.target.value})}/>
    {myErrors.Name && <div>{myErrors.Name}</div>}
    <label>מספר טלפון</label>
    <input name="phone" type="text" value={empty.phone} onChange={(e) => setEmpty({...empty, phone: e.target.value})}/>
    {myErrors.phone && <div>{myErrors.phone}</div>}
    <label>סכום התרומה</label>
    <input name="sumDontion" type="number" value={empty.sumDontion} onChange={(e) => setEmpty({...empty, sumDontion: e.target.value})}/>
    {myErrors.sumDontion && <div>{myErrors.sumDontion}</div>}
    <label>הקדשה</label>
    <textarea name="dedication" rows="4" cols="4" placeholder="כתוב כאן" value={empty.dedication} onChange={(e) => setEmpty({...empty, dedication: e.target.value})}/>
    <input type="submit" value="הוסף תרומה" />
</form>

    )


} 
export default AddDonatoin;
