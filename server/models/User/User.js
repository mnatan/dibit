import Sequelize from "sequelize";
import dibitDB from "../../utils/database";
import {attributeFields} from "graphql-sequelize";
import {GraphQLList, GraphQLObjectType} from "graphql";
import Place from "../Place";

let Model = dibitDB.define('user', {
    // System data
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    passwordHash: Sequelize.STRING,
    passwordSalt: Sequelize.STRING,
    currentToken: Sequelize.STRING,
    tokenEol: Sequelize.DATE,

    active: Sequelize.BOOLEAN,

    // Personal info
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    dateOfBirth: Sequelize.DATEONLY,
});
Place.Model.belongsTo(Model, {allowNull: false});

let Type = new GraphQLObjectType({
    name: 'User',
    description: 'Represents any human user regardless of the account type',
    fields: {
        ...attributeFields(Model),
        places: {
            type: new GraphQLList(Place.Type),
            resolve: user => Place.Model
                .findAll({where: {userUsername: user.username}})
                .then(place => place.map(x => x.get()))
        }
    }
});

module.exports = {
    Model,
    Type,
    test: networks => Promise.all(
        networks.map(
            nt => Model.findOrCreate({
                where: {username: `test`},
                defaults: {
                    networkName: nt.name,
                    passwordHash: 'test',
                    passwordSalt: 'test',
                    currentToken: null,
                    tokenEol: null,

                    active: true,

                    // Personal info
                    firstName: 'Krzysztof',
                    lastName: 'Sczur',
                    dateOfBirth: '1994-09-26',
                }
            }).spread((x, cre) => x)
        ))
};
