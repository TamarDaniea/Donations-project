import React, { useState, useEffect } from 'react';
import { FaDollarSign, FaShekelSign } from 'react-icons/fa';
import { fromShekelToX, fromXlToShekel } from './dollarUtils';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { IoMdArrowRoundUp } from 'react-icons/io';


const Header = (props) => {
    const navigate = useNavigate();
    const donations = props.arrClali;
    const sumDonation = donations.reduce((acc, donation) => acc + (+donation.sumDontion), 0);
    const countDonors = donations.length;
    const TargetAmount = 20000;
    const precentDonation = ((sumDonation / TargetAmount) * 100).toFixed(2);

    const [percent, setPercent] = useState(precentDonation);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
// רשימת תמונות למצגת
    const images = [
        'https://b313e8803f7a4150a884-6e0b076a1e92e31c40be44f466689c50.ssl.cf5.rackcdn.com/images/loginid36930/3663356463343931346232303135663336393633653537333438656265323961_31373139343832393931.webp',
        'https://b313e8803f7a4150a884-6e0b076a1e92e31c40be44f466689c50.ssl.cf5.rackcdn.com/images/loginid36930/3566613736393163633765616364363666643636343862313132383232653739_31373139343832393737.webp',
        'https://b313e8803f7a4150a884-6e0b076a1e92e31c40be44f466689c50.ssl.cf5.rackcdn.com/images/loginid36930/3262333163353164303031366539376565316635386331343634343361393835_31373139343832393631.webp',
        'https://b313e8803f7a4150a884-6e0b076a1e92e31c40be44f466689c50.ssl.cf5.rackcdn.com/images/loginid36930/3566613736393163633765616364363666643636343862313132383232653739_31373139343832393737.webp'
    ];
   // מעגלי תרומה לדוגמה
    const circles = [
        { image: 'https://b313e8803f7a4150a884-6e0b076a1e92e31c40be44f466689c50.ssl.cf5.rackcdn.com/images/loginid36930/6565323639303862663936323965656234623337646163333530663437353461_31373139383439363632', amount: 60 },
        { image: 'https://b313e8803f7a4150a884-6e0b076a1e92e31c40be44f466689c50.ssl.cf5.rackcdn.com/images/loginid36930/6565323639303862663936323965656234623337646163333530663437353461_31373231313531393730', amount: 100 },
        { image: 'https://b313e8803f7a4150a884-6e0b076a1e92e31c40be44f466689c50.ssl.cf5.rackcdn.com/images/loginid36930/6565323639303862663936323965656234623337646163333530663437353461_31373139383439363437', amount: 122 },
        { image: 'https://b313e8803f7a4150a884-6e0b076a1e92e31c40be44f466689c50.ssl.cf5.rackcdn.com/images/loginid36930/6565323639303862663936323965656234623337646163333530663437353461_31373139383439363237', amount: 180 },
        { image: 'https://b313e8803f7a4150a884-6e0b076a1e92e31c40be44f466689c50.ssl.cf5.rackcdn.com/images/loginid36930/6565323639303862663936323965656234623337646163333530663437353461_31373139383439363039', amount: 250 }
    ];

     // עדכון אחוז התרומות כאשר סך התרומות משתנה
    useEffect(() => {
        setPercent(precentDonation);
    }, [sumDonation]);

       // מצגת מתחלפת אוטומטית
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

      // שינוי סוג המטבע (דולר/שקל)
    function changeType(e) {
        props.setCoin({ ...props.coin, type: e.target.value });
    }

    // ניווט לעמוד הוספת תרומה עם סכום קבוע מראש
    const handleCircleClick = (amount) => {
        navigate('/AddDonatoin', { state: { sum: amount } });
    };
    

   // ממשק המשתמש של רכיב הכותרת
    return (
        <div className="header-wrapper">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Header image ${index}`}
                    className={`top-center-image ${index === currentImageIndex ? 'active' : ''}`}
                />
            ))}
            <div className="circles-container">
                {circles.map((circle, index) => (
                    <div key={index} className="circle-wrapper" onClick={() => handleCircleClick(circle.amount)}>
                        <div className="circle-image">
                            <img src={circle.image} alt={`Circle ${index}`} />
                        </div>
                        <div className="circle-caption">
                            {`₪${circle.amount} לחודש`}
                        </div>
                    </div>
                ))}

            </div>
            <div className="header-container">
                <div className="buttons-container">
                    <button value="d" onClick={changeType} className="currency-btn">
                        <FaDollarSign />
                    </button>
                    <button value="s" onClick={changeType} className="currency-btn">
                        <FaShekelSign />
                    </button>
                </div>
                <div className="info-container">
                    <div className="info-text">
                        <div className="info-item">
                            <h1 className="info-number">
                                {props.coin.type === 'd'
                                    ? fromShekelToX(TargetAmount, props.coin).toFixed(2)
                                    : fromXlToShekel(TargetAmount, props.coin)} {props.coin.type === 'd' ? '$' : 'ש"ח'}
                            </h1>
                            <p className="info-label">סכום היעד</p>
                        </div>
                        <div className="info-item">
                            <h1 className="info-number">
                                {props.coin.type === 'd'
                                    ? fromShekelToX(sumDonation, props.coin).toFixed(2)
                                    : fromXlToShekel(sumDonation, props.coin)} {props.coin.type === 'd' ? '$' : 'ש"ח'}
                            </h1>
                            <p className="info-label">הסכום הכללי שתרמו עד כה</p>
                        </div>
                        <div className="info-item">
                            <h1 className="info-number">{precentDonation}%</h1>
                            <p className="info-label">אחוז התרומות מהיעד הכללי</p>
                        </div>                        <div className="info-item">
                            <h1 className="info-number">{countDonors}</h1>
                            <p className="info-label">כמות התורמים שתרמו עד כה</p>
                        </div>
                    </div>
                </div>



                <div className="donation-circle">
                    <div className="circle-background">
                        <div
                            className="circle-fill"
                            style={{ background: `conic-gradient(#4CAF50 ${percent}%, #e0e0e0 0%)` }}
                        ></div>
                    </div>
                    <div className="circle-percent">{percent}%</div>
                </div>
            </div>
        </div>

    );
};

export default Header;



