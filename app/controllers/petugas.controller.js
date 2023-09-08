const t = require('../config/i18n.config');
const { statusSuccess, statusFailed } = require("../middleware/responStatus");
const { getPetugas, insertPetugas } = require("../services/petugas.service");
const { checkBodyRequestFieldsGetData, fields } = require('../util/validateBodyRequest/petugas.valid');

exports.getAllPetugas = async (req, res) => {
    if (!Object.keys(checkBodyRequestFieldsGetData(req)).length) {
        const data = await getPetugas(req, res)
        statusSuccess(t.__('GET_SUCCESS'), data, res, fields, data.length);
    } else {
        statusFailed(t.__('GET_FAILED'), checkBodyRequestFieldsGetData(req), res)
    }
};

exports.insertDataPetugas = async (req, res) => {
    // if (!Object.keys(checkBodyRequestFieldsGetData(req)).length) {
    const data = await insertPetugas(req, res)
    statusSuccess(t.__('POST_SUCCESS'), data, res)
    // } else {
    //     statusFailed(t.__('GET_FAILED'), checkBodyRequestFieldsGetData(req), res)
    // }
};
