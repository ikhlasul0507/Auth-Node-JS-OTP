const { authJwt } = require("../middleware");
const controller = require("../controllers/petugas.controller");
const { URL } = require("../util/properties.util");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        URL.PETUGAS,
        [authJwt.verifyToken],
        controller.getAllPetugas
    );
    app.post(
        URL.PETUGAS,
        [authJwt.verifyToken],
        controller.insertDataPetugas
    );
};