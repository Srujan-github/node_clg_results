const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
// Define a route to render the HTML page
app.get('/', (req, res) => {
  let hallNo="-1";
  let bol=true;
  const tab1="";
  
  const all_gpa="FAIL";
  const all_res="";
  // Render the HTML template and pass the data
  res.render('index', {  bol,hallNo,tab1,  all_gpa, all_res });
});
app.post('/re', async(req, res) => {
try{
  // res.render('loading');
    const hallNo = req.body.hallNo;
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
    console.log('Hall Ticket Number:', hallNo);
    res.render('index', {bol,hallNo,tab1,all_gpa,all_res });
    // res.send('Received Hall Ticket Number: ' + hallNo);
  }catch(err){
    console.log(err);
    res.status(400).render('404');
}}
  );

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
