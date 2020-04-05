const express = require('express');
const router = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');
//routes file
const ongscontroller = require('./controllers/ongscontroller');
const incidentcontroller = require('./controllers/incidentcontroller');
const profilecontroller = require('./controllers/profilecontroller');
const sessioncontroller = require('./controllers/sessioncontroller');

router.get('/ongs', ongscontroller.index);
router.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentcontroller.index);
router.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object()({
        authorization: Joi.string().required(),
    }).unknow(),
}), profilecontroller.index);
router.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongscontroller.create);
router.post('/incidents', incidentcontroller.create);
router.post('/sessions', sessioncontroller.create);
router.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentcontroller.delete);

module.exports = router;