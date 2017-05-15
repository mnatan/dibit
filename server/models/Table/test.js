import model from "./model"

module.exports = places => Promise.all(
    places.map(pl =>
        [1, 2, 3, 4].map(no => {
            model.create({
                name: `test table ${pl.id}, ${no}`,
                placeId: pl.id
            })
        })
    )
);
