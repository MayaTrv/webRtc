// Precisamos que isso seja executado em um contexto de host local em vez de um arquivo para que possamos executar dispositivos enumerados.
//Ele deve ser executado em um contexto seguro e o host local conta.
// http://localhost:3000/index.html

const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname)))
app.listen(3000)