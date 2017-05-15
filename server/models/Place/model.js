import User from "../User/definition"
import Place from "./definition"

Place.belongsToMany(User, {as: 'Owners', through: 'PlaceOwners'});
User.belongsToMany(Place, {through: 'PlaceOwners'});

module.exports = Place;
