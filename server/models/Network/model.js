import User from "../User/model"
import Network from "./definition"

User.belongsTo(Network, {allowNull: false});

module.exports = Network;
