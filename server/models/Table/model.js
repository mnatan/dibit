import Table from "./definition"
import Place from "../Place/definition"

Table.belongsTo(Place, {allowNull: false});

module.exports = Table;
