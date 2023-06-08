const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const z = require('zod');
const { registerRecipe, queryRecipe, recipeUpdate, recipeDelete } = require('../db/recipe');


const recipeSchema = z.object({
    name: z.string(),
    description: z.string(),
    preparationTime: z.number()
})

router.post('/recipe/register', auth, async (req, res) => {
    try {

        const recipe = recipeSchema.parse(req.body);
        const newRecipe = await registerRecipe(recipe, req.user)

        res.status(200).json({
            'newRecipe': newRecipe
        });

    } catch (error) {
        if (err instanceof z.ZodError) return res.status(422).json({ "message": err.errors, })

        res.status(500).json({
            "message": 'server error!!!'
        });
    }
});

router.put('/recipe/update/:id', auth, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const recipe = recipeSchema.parse(req.body)
        const user = Number(req.user);
        const dataRecipe = await recipeUpdate(id, recipe, user)

        res.json({
            "Produtos": dataRecipe
        })
    } catch (err) {

        if (err instanceof z.ZodError) return res.status(422).json({ "message": err.errors, })

        res.status(500).json({
            "message": 'server error!!!'
        });
    }
});

router.delete('/recipe/delete/:id', auth, async (req, res) => {

    try {

        const user = Number(req.user);
        const id = Number(req.params.id);

        await recipeDelete(id, user);
        res.status(204).send();

    } catch (error) {
        res.status(500).json({
            "message": 'server error!!!'

        });
    }
})

router.get('/query/recipe', auth, async (req, res) => {

    try {

        const recipe = await queryRecipe(req.user);

        res.status(200).json({
            'recipe': recipe
        })

    } catch (error) {
        res.status(500).json({
            "message": 'server error!!!'
        });
    }
});

module.exports = {
    router
} 