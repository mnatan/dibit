import Table from "../Table/definition";
import Place from "./definition"

Table.belongsTo(Place, {allowNull: false});

module.exports = Place;
