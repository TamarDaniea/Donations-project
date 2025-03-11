import React, { useEffect, useState } from 'react';

const ImagePage = () => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        // קריאה ל- localStorage לקבל את פרטי המשתמש
        const storedDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (storedDetails) {
            setUserDetails(storedDetails);
        } else {
            console.log("לא נמצאו פרטי משתמש ב-localStorage");
        }
    }, []); // תוודא שה- useEffect יופעל רק פעם אחת בעת טעינת הדף

    return (
        <div className="image-page">
            {userDetails ? (
                <>
                    <h1>שלום {userDetails.name}, תודה על התרומה!</h1>
                    <h3>הטלפון שלך: {userDetails.phone}</h3>
                    <h3>סכום התרומה: {userDetails.sumDontion}</h3>
                    <h3>הקדשה: {userDetails.dedication}</h3>
                    <h3>תאריך התרומה: {new Date(userDetails.date).toLocaleDateString()}</h3>
                </>
            ) : (
                <h2>אין פרטי משתמש זמינים.</h2>
            )}
            <img
                src="https://dizngof10print.co.il/wp-content/uploads/2022/12/97056.jpg"
                alt="תמונה"
                className="display-image"
            />
        </div>
    );
};

export default ImagePage;

