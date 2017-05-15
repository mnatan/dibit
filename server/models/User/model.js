import User from "./definition"
import Place from "../Place/definition"

Place.belongsTo(User, {allowNull: false});

module.exports = User;
