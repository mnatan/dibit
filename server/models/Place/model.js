import User from "../User/definition"
import Place from "./definition"

Place.belongsTo(User, {allowNull: false});

module.exports = Place;
