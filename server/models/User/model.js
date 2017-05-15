import User from "./definition"
import Network from "../Network/definition"

User.belongsTo(Network, {allowNull: false});

module.exports = User;
