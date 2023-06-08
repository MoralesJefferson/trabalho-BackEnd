const prisma = require('./prisma');

const registerUsers = (user) => {
    return prisma.user.create({
        data: user
    });
};

const queryUsersByEmail = (email) => {
    return prisma.user.findFirst({
        where: {
            email: email
        }
    });
};

const queryUsers = () => {
    return prisma.user.findMany();
};

module.exports = {
    queryUsersByEmail,
    registerUsers,
    queryUsers

};