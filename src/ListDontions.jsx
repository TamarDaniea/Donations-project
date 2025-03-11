import { useState } from "react";
import One from "./OneDontion";
import './ListDontions.css';

// רכיב להצגת רשימת תרומות
const ListDontions = (props) => {
    let [arr, setArr] = useState(props.Darr)
    const [showFilter, setShowFilter] = useState(false);
    
    // פונקציה לסינון לפי שם תורם או הקדשה
    function find(e) {
        let copy = props.Darr.filter(item => item.Name.includes(e.target.value) || item.dedication.includes(e.target.value))
        setArr(copy)
    }

    
    // פונקציה למיון הרשימה לפי קריטריונים שונים
    function LateEarlyOrExpensiveCheap(e) {
        const sortOrder = e.target.value;
        let sortedArr = [...arr];


        // מיון לפי תאריך (מוקדם למאוחר או מאוחר למוקדם)
        if (sortOrder === "earlyLate") {
            sortedArr.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortOrder === "lateEarly") {
            sortedArr.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        // מיון לפי סכום (מהזול ליקר או מהיקר לזול)
        else if (sortOrder === "cheapExpensive") {
            sortedArr.sort((a, b) => a.sumDontion - b.sumDontion);
        }
        else if (sortOrder === "expensiveCheap") {
            sortedArr.sort((a, b) => b.sumDontion - a.sumDontion);
        }

        setArr(sortedArr);
    }

    return (
        <>

            <div className="filter-container">
                <button
                    className="currency-btn"
                    onClick={() => setShowFilter(!showFilter)}
                >
                    <i className="fa fa-search">🔍</i> 
                </button>

                {showFilter && (
                    <>
                        <select onChange={LateEarlyOrExpensiveCheap}>
                            <option value="">בחר סינון</option>
                            <option value="earlyLate">מוקדם למאוחר</option>
                            <option value="lateEarly">מאוחר למוקדם</option>
                            <option value="cheapExpensive">מהזול ליקר</option>
                            <option value="expensiveCheap">מהיקר לזול</option>
                        </select>

                        <input
                            type="text"
                            placeholder="חפש לפי שם או הקדשה"
                            onChange={find}
                        />
                    </>
                )}
            </div>

            <div className="list-container">
                {arr.map((item) => (
                    <div key={item.id} className="list-item">
                        <One d={item} coin={props.coin} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListDontions;