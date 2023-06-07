const prisma = require('./prisma');

const registerUsers = (user) =>{
    return prisma.user.create({
        data:user
    });
};

const queryUsersByEmail = (email) => {
    return prisma.user.findFirst({
        where:{
            email:email
        }
    });
};

module.exports = {
    queryUsersByEmail,
    registerUsers

};