import * as _ from "lodash";
import Place from "./model"

module.exports = users => Promise.all(
    users.map(user => Promise.all(
        [1, 2].map(no =>
            Place.create({
                name: `test place ${no}`,
                description: 'place for test purposes',
                userUsername: user.username
            })
        )))).then(_.flatten);
