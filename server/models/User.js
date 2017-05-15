import Sequelize from "sequelize";
import dibitDB from "../utils/database";
import {attributeFields} from "graphql-sequelize";
import {GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import Place from "./Place";

let Model = dibitDB.define('user', {
    // System data
    username: {type: Sequelize.STRING, primaryKey: true, unique: true, allowNull: false},
    passwordHash: {type: Sequelize.STRING, allowNull: false},
    currentToken: Sequelize.STRING,
    tokenEol: Sequelize.DATE,

    active: {type: Sequelize.BOOLEAN, default: true},

    // Personal info
    firstName: {type: Sequelize.STRING, allowNull: false},
    lastName: {type: Sequelize.STRING, allowNull: false},
    dateOfBirth: {type: Sequelize.DATEONLY, allowNull: false},
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
        },
        network: {
            type: GraphQLString,
            resolve: user => Model
                .findOne({where: {userUsername: user.username}})
                .then(place => place.map(x => x.get()))
        }
    }
});

module.exports = {
    Model,
    Type,
    test: () => Promise.all([
            Model.findOrCreate({
                where: {username: 'test'},
                defaults: {
                    passwordHash: 'test',
                    firstName: 'Krzysztof',
                    lastName: 'Sczur',
                    dateOfBirth: '1994-09-26',
                }
            }).spread((x, cre) => x)
        ]
    )
};
