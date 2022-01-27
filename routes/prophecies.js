const express = require('express');
const router = express.Router();
const Prophecy = require('../models/prophecySchema');
const getNumber = require('../validators/getNumber');

router.post('/', async (req, res) => {
    
    // let prophecy = new Prophecy({
    //     index: (await Prophecy.find().count()) + 1,
    //     love: req.body.love,
    //     career: req.body.career,
    //     money: req.body.money
    // });
    // try {
    //     let result = await prophecy.save();
    //     res.send(result);
    // }
    // catch(e) {
    //     res.send(e.errors);
    // }

    let numerology = getNumber.calNumerology(req.body.date);
    try {
        let prophecy = await Prophecy.findOne({index: numerology});
        res.json({
            success: true,
            status: {
                code: 200,
                love: prophecy.love,
                career: prophecy.career,
                money: prophecy.money
            }
        });
    }
    catch(err) {
        res.send(err.errors);
    }
});

module.exports = router;