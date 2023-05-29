const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const pdf = require('html-pdf');
const bodyParser = require('body-parser');
const { jsPDF } = require('jspdf');
const port = process.env.PORT || 4000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Define a route to render the HTML page
app.get('/', (req, res) => {
  let hallNo="-1";
  let bol=true;
  const tab1="";
  
  const all_gpa="FAIL";
  const all_res="";
  // Render the HTML template and pass the data
  res.render('index', {  bol,hallNo,tab1,  all_gpa, all_res ,jsPDF});
});
app.get('/result', async(req, res) => {
  const url="https://github.com/Srujan-github/node_clg_results";
try{
  // res.render('loading');
    const hallNo = req.query.hallNo;
    const response = await fetch(`https://results-restapi.up.railway.app/all-r18/${hallNo}`);
    const result = await response.json();
  
    if (response.ok) {
      const details = result.data.details;
      const overall_gpa = result.data.overall_gpa;
      const results = result.data.results;
      all_gpa=overall_gpa?overall_gpa:"FAIL";
      tab1=details;
      if(!details){
          res.status(404).render('404');
          return;
      }
      all_res=results;
    }else{
        console.log("error");
    }
    bol=false;
   
    // Process the hallNo value as needed
    // console.log('Hall Ticket Number:', hallNo);
    // console.log(all_res[0]['1-1']);
    if(all_res[0]['1-1'])
    res.render('index', {bol,hallNo,tab1,all_gpa,all_res,url,jsPDF });
    else
    res.render('lateral',{bol,hallNo,tab1,all_gpa,all_res,url,jsPDF });
    // res.send('Received Hall Ticket Number: ' + hallNo);
  }catch(err){
    console.log(err);
    res.status(400).render('404');
}}
  );

 
// app.get("/test",(req,res)=>{
//   res.render('test')
// })
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
