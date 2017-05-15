import User from "./model"

module.exports = networks => Promise.all(networks.map(
    network => User.findOrCreate({
        where: {username: 'test_kszczur'},
        defaults: {
            passwordHash: 'test',
            firstName: 'Krzysztof',
            lastName: 'Sczur',
            dateOfBirth: '1994-09-26',
            networkName: network.name
        }
    }).spread((x, cre) => x)
));
