const prisma = require('./prisma');

const registerRecipe = (recipe, user) => {
    return prisma.recipe.create({
        data: {
            name: recipe.name,
            description: recipe.description,
            preparationTime: recipe.preparationTime,
            userId: user
        }
    })
}

const queryRecipe = (user) => {

    return prisma.recipe.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            preparationTime: true,
            userId: true,

        },
        where: {
            userId: user
        }
    });
}


const recipeUpdate = async (id, recipe, user) => {

    await prisma.recipe.updateMany({
        where: {
            id: id,
            userId: user
        },
        data: {
            name: recipe.name,
            description: recipe.description,
            preparationTime: recipe.preparationTime,
            userId: user
        }
    });

    return await prisma.recipe.findFirst({
        where: {
            id: id,
            userId: user
        }
    });
}

const recipeDelete = (id, user) => {
    return prisma.recipe.deleteMany({
        where:{
            id:id,
            userId:user
        }
    });
}

module.exports = {
    registerRecipe,
    queryRecipe,
    recipeUpdate,
    recipeDelete

}



