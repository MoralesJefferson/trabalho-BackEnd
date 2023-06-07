const express = require('express')
const router = express.Router();

router.get('/receita', (req, res) => {

    res.status(200).json({
        'message': 'Revenue OK!!!',
    });

});

module.exports ={
    router
} 