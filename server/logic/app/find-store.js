const { Stores } = require('../../models');

module.exports = async coor => {
    const coordinates = [ parseFloat(coor[0]), parseFloat(coor[1]) ];
    try {
        const stores = await Stores.aggregate([{
            $geoNear: {
                near: { type: "Point", coordinates},
                spherical: true,
                distanceField: "calcDistance"
            }
        }]);
        const { email, calcDistance } = stores[0];
        return {
            email,
            calcDistance
        }
    } catch(err){
        throw err;
    }
}