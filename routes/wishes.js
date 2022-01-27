const express = require('express');
const router = express.Router();
const Wish = require('../models/wishSchema');
const getNumber = require('../validators/getNumber');
const testWish = require('../validators/testMessage');

router.post('/', async (req, res) => {
    if (!req.body.message || !testWish(req.body.message)) 
        return res.json({
            success: false,
            status: {
                code: 400,
                message: 'Invalid wish'
            }
        });

    let randomNum = getNumber.getRandomInt(1, (await Wish.find().count()));
    let randomWish;
    try {
        randomWish = await Wish.findOne({index: randomNum});
    }
    catch(err) {
        res.send(err.errors);
    }

    let wish = new Wish({
        index: (await Wish.find().count()) + 1,
        message: req.body.message
    });
    try {
        let result = await wish.save();
    }
    catch(e) {
        res.send(e.errors);
    }

    res.json({
        success: true,
        status: {
            code: 200,
            message: randomWish.message
        }
    });
});

module.exports = router;