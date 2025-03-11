import React, { useState, useEffect } from 'react';
import { fromShekelToX } from './dollarUtils';

// רכיב להצגת פרטי תרומה בודדת
const One = (props) => {
    // מצב לאחסון טקסט המציין כמה זמן עבר מאז התרומה
    const [staty, setStaty] = useState('');

    
    // פונקציה לעדכון מצב הטקסט (זמן שחלף מאז התרומה)
    const updateStaty = () => {
        const donationDate = new Date(props.d.date);
        const diffInMilliseconds = new Date() - donationDate;
        // חישוב הפרש הזמן בימים, שעות ודקות
        const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

        // עדכון הטקסט בהתאם לזמן שחלף
        if (days > 0) {
            setStaty(` לפני ${days} יום `);
        } else if (hours > 0) {
            setStaty(`לפני ${hours} שעות `);
        } else {
            setStaty(`לפני ${minutes} דקות `);
        }
    };

     // אפקט שמופעל בכל שינוי בתאריך התרומה
    useEffect(() => {
        updateStaty();
    }, [props.d.date]); 

    // קבלת האות הראשונה של שם התורם
    const firstLetter = props.d.Name.charAt(0); 
    return (
        <div className="donation-box">
        <div className="first-letter">{firstLetter}</div>
        <div className="donation-item">{props.d.Name}</div>
        <div className="donation-item">{props.d.phone}</div>
        <div className="sum-donation">
  {Number(fromShekelToX(props.d.sumDontion, props.coin)).toFixed(2)} 
  {props.coin.type === 'd' ? ' $' : ' ש"ח'}
</div>




        <div className="donation-item">{props.d.dedication}</div>
        <div className="donation-item">{staty}</div>
    </div>
    );
}

export default One;


    


