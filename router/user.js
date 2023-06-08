const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const z = require('zod');
const jwt = require('jsonwebtoken');
const { queryUsersByEmail, registerUsers, queryUsers } = require('../db/user');

const userSchema = z.object({
    name: z.string().trim().min(3),
    email: z.string().email(),
    password: z.string().trim().min(6)
});


router.post('/user/register', async (req, res) => {
    try {
        const user = userSchema.parse(req.body);

        if (await queryUsersByEmail(user.email)) return res.status(400).json({ 'Error': 'Email Already Registered' });

        user.password = bcrypt.hashSync(user.password, 10);

        const newUser = await registerUsers(user);

        delete newUser.password;

        res.status(201).json({
            'user': newUser
        });

    } catch (error) {
        if (error instanceof z.ZodError) return res.status(422).json({ 'Error': error.errors });

        res.status(500).json({
            'ERROr': error
        });
    };
});


router.post('/user/login', async (req, res) => {
    const user = await queryUsersByEmail(req.body.email);

    if (!user) return res.status(401).send("email não encontrado");

    if (!bcrypt.compareSync(req.body.password, user.password)) return res.status(401).send("password Invalido");

    const token = jwt.sign({
        userId:user.id
    },process.env.SECRET);
    
    
    /* 
*/
    //console.log("password  = ", isSamePassword);

    res.status(200).json({
        'success': true,
        'token':token
    });

});

router.get('/query/users',async(req,res)=>{
    
    const users = await queryUsers();
    
    res.status(200).json({
        'users': users
    })
});


module.exports = {
    router
}


