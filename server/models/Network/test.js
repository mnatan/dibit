import Network from "./model";

module.exports = () => Promise.all([
    Network.findOrCreate({
        where: {name: `test`},
        defaults: {description: 'for test purposes'}
    }).spread((nt, cre) => nt)
]);
