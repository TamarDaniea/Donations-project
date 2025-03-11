import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";
import MoodIcon from "@mui/icons-material/Mood";
import ListIcon from "@mui/icons-material/List";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import './Footer.css';

const Footer = () => {
  const navigateTo = (url) => {
    window.location.href = url;
  };

  // פונקציה שתציג את הטקסט לפי האייקון
  const handleMouseOver = (text) => {
    const tooltip = document.getElementById("tooltip");
    tooltip.innerText = text;
    tooltip.style.visibility = "visible";
  };

  // פונקציה שתסיר את הטקסט כאשר העכבר יוצא מהאייקון
  const handleMouseOut = () => {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.visibility = "hidden";
  };

  return (
    <div className="footer-container">
      <div className="footer-icons">

        {/* כפתור מעבר לדף תרומות */}
        <IconButton 
          onClick={() => navigateTo("/AddDonatoin")}
          onMouseOver={() => handleMouseOver("לדף התרומות")}
          onMouseOut={handleMouseOut}
        >
          <MoodIcon />
        </IconButton>

        {/* כפתור מעבר לדף רשימת התרומות */}
        <IconButton 
          onClick={() => navigateTo("/ListDontions")}
          onMouseOver={() => handleMouseOver("לדף הרשימה")}
          onMouseOut={handleMouseOut}
        >
          <ListIcon />
        </IconButton>

        {/* כפתור חזרה למעלה */}
        <IconButton 
          onClick={() => window.scrollTo(0, 0)}
          onMouseOver={() => handleMouseOver("חזרה למעלה")}
          onMouseOut={handleMouseOut}
        >
          <ArrowUpwardIcon />
        </IconButton>
      </div>
      {/* תיבת טקסט שתציג את ההסברים */}
      <div id="tooltip" style={{ visibility: "hidden", position: "absolute", backgroundColor: "black", color: "white", padding: "5px", borderRadius: "5px", fontSize: "14px" }}></div>
    </div>
  );
};

export default Footer;