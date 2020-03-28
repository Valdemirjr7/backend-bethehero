const express = require('express');
const router = express.Router();
//routes file
const ongscontroller = require('./controllers/ongscontroller');
const incidentcontroller = require('./controllers/incidentcontroller');
const profilecontroller = require('./controllers/profilecontroller');
const sessioncontroller = require('./controllers/sessioncontroller');

router.get('/ongs', ongscontroller.index);
router.get('/incidents', incidentcontroller.index);
router.get('/profile', profilecontroller.index);
router.post('/ongs', ongscontroller.create);
router.post('/incidents', incidentcontroller.create);
router.post('/sessions', sessioncontroller.create);
router.delete('/incidents/:id', incidentcontroller.delete);

module.exports = router;