const express = require('express');
const sequelize = require('./db');
const offensesRoute = require('./routes/offensesRoute')
const cors = require('cors');

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(cors());

sequelize.sync({ alter: true }) 
  .then(() => console.log('Схемы синхронизированы'))
  .catch(err => console.error('Ошибка синхронизации:', err));


app.use('/offenses', offensesRoute);

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
})