const express = require("express");
const path = require("path");
const app = express();
const PORT = 5000;

const checkWorkingHours = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hourOfDay = date.getHours();
  let nowIsWorkingHour =( 
    dayOfWeek >= 1 && 
    dayOfWeek <= 5 && 
    hourOfDay >= 9 && 
    hourOfDay <= 17
  )
  
  if (nowIsWorkingHour) {
    next();
  } else {
    res.send("Sorry, the website is only available during working hours.");
  }
};

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/views')));
app.use(checkWorkingHours);


app.get("/", (req, res) => {
  console.log("homepage is being rendered");
  res.render("home");
});
app.get("/services", (req, res) => {
  res.render("services");
})
app.get('/contact', (req, res) => {
  res.render("contact");
})



app.listen(5000);
