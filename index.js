const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const pg = require("pg")
const Pool = pg.Pool;


let app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(express.static(__dirname+'/public'));
//app.use(express.static('image'))

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const connectionString = process.env.DATABASE_URL || 'postgresql://codex-coder:pg123@localhost:5432/crime_report';

const pool = new Pool({
    connectionString
});


app.get("/", function (req, res) {
    res.render('index')
});


app.post("/crime", async function (req, res) {

    console.log(req.body);

    const sql = "insert into report_crime ( type, time_of_the_day, involment ) values ($1, $2, $3);"

    const crimeData = req.body;

    await pool.query(sql, [
        crimeData.typeOfCrime,
        crimeData.period,
        crimeData.involvement
    ])

    res.redirect('/crimes')
});

app.get("/crimes", async function (req, res) {


    const sql = "select * from report_crime";

    // const crimeData = req.body;

    const result = await pool.query(sql)

    res.render('crime', {
        crimes : result.rows
    })
});




app.post("/graph", function (req, res) {
    res.render('crime')
});

let PORT = process.env.PORT || 3005;

app.listen(PORT, function () {

})