const express = require('express');
const router = express.Router();
const offenses = require('../models/offenses')

router.get('/', async (req, res) => {
    try {
        const offensy = await offenses.findAll();
        res.json(offensy);
    } catch (err) {
        console.error(err);
        res.status(500).send('Ошибка сервера');
    }
})

router.put('/', async (req, res) => {
    try {
        const { id, driver_name, driver_surname, amount } = req.body;

        const offense = await offenses.findByPk(id);

        if (!offense) {
            return res.status(404).json({ message: 'Offense not found' });
        }

        // Обновить данные штрафа
        offense.driver_name = driver_name;
        offense.driver_surname = driver_surname;
        offense.sum = amount;

        await offense.save(); 

        res.status(200).json({ message: 'Offense successfully updated', offense });
    } catch (error) {
        console.error('Error updating offense:', error);
        res.status(400).json({ message: 'Error updating offenses', error });
    }
});


module.exports = router;