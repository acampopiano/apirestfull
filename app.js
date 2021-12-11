const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'articulosdb',
    password: 'Pa$$word',
    database: 'articulosdb'
});

connection.connect((error)=>{
    if(error)
        throw error;
    else
        console.log("Servidor exitosa a la base de datos");
});

app.get('/api/articulos', async(req, res) => {
    await connection.query('SELECT * FROM articulos',(error,rows)=>{
        if(error) throw error;
        res.send(rows);        
    });
});

app.get('/api/articulos/:id', async(req, res) => {    
    const {id} = req.params;
    await connection.query('SELECT * FROM articulos WHERE id = ' + [id],(error,row) => {
        if(error) throw error;
        res.send(row);
    });
});

app.post('/api/articulos',async (req, res) => {
    const {descripcion, precio, stock} = req.body;   
    const articulos = {
        descripcion, 
        precio, 
        stock
    };
    
    await connection.query('INSERT INTO articulos SET ?', [articulos], (error,result)=>{
        if(error) throw error;
        res.send(result);
    });
     
});

app.put('/api/articulos/:id', async (req, res) => {
    const {id} = req.params;
    const {descripcion, precio, stock} = req.body;
    const editArticulo = { descripcion, precio, stock };
    await connection.query('UPDATE articulos SET ? WHERE id = ?', [editArticulo,id],(error,result)=>{
        if(error) throw error;
        res.send(result);
    });
});

app.delete('/api/articulos/:id', async(req, res)=>{
    const {id} = req.params;
    await connection.query('DELETE FROM articulos WHERE id id = ?', [id],(error,result)=>{
        if(error) throw error;
        res.send(result);
    });
});

app.get('/',(req, res) => {
    res.send('Ruta Inicial');
})
const port = process.env.PORT || 3000;
app.listen('3000', (req,res) => {
    console.log("Server Up " + port + " listening");
})