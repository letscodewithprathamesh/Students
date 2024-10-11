import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'

const app =express();
app.use(cors());
app.use(express.json());

const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Tiger@100",
    database:"testdb"
}).promise()





app.get('/', async (req, res) => {
    const sql = "SELECT * FROM student";
    
    try {
        const [result] = await pool.query(sql); // Using async/await
        return res.json(result);
    } catch (err) {
        return res.json({ Message: "Error inside server", error: err });
    }
});

app.post('/student', async (req, res) => {
    const sql = "INSERT INTO student (FName, Email) VALUES (?, ?)";  // Corrected query

    //console.log(req.body);

    const values = [
        req.body.name,
        req.body.email
    ];

    try {
        const [result] = await pool.query(sql, values);  // No callback, using async/await needed
        return res.json(result);
    } catch (err) {
        return res.json(err);
    }
});

app.get('/read/:id', async (req, res) => {
    const sql = "SELECT * FROM student where Id=?";
    const id=req.params.id;

    try {
        const [result] = await pool.query(sql,id); // Using async/await
        return res.json(result);
    } catch (err) {
        return res.json({ Message: "Error inside server", error: err });
    }
});

app.put('/update/:id', async (req, res) => {
    const sql = "UPDATE student set `FName`=?,`Email`=? WHERE Id=? ";
    const id=req.params.id;

    try {
        const [result] = await pool.query(sql,[req.body.name,req.body.email,id]); // Using async/await
        return res.json(result);
    } catch (err) {
        return res.json({ Message: "Error inside server", error: err });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const sql = "DELETE from student WHERE Id=? ";
    const id=req.params.id;

    try {
        const [result] = await pool.query(sql,id); // Using async/await
        return res.json(result);
    } catch (err) {
        return res.json({ Message: "Error inside server", error: err });
    }
});



app.listen(8088,()=>{
    console.log("Listening");
})


// const pool=mysql.createPool({
//     host:"localhost",
//     user:"root",
//     password:"Tiger@100",
//     database:"testdb"
// }).promise()

// async function getNames() {
//     const [rows] =await pool.query("select * from student");
//     return rows
// }

// const notes =await getNames();
// console.log(notes)