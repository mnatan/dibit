import User from "./model"

module.exports = network => Promise.all([
        User.findOrCreate({
            where: {username: 'test'},
            defaults: {
                passwordHash: 'test',
                firstName: 'Krzysztof',
                lastName: 'Sczur',
                dateOfBirth: '1994-09-26',
                networkName: network.name
            }
        }).spread((x, cre) => x)
    ]
);
