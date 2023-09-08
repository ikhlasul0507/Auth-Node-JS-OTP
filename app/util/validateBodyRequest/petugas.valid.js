const { checkBodyRequestFields } = require("./util.valid");

const fields = {
    validFilter: [
        { 'id': ['eq'] },
        { 'nama_petugas': ['eq', 'lk'] }
    ],
    validOrder: [
        { 'id': ['asc', 'desc'] },
    ],
}

checkBodyRequestFieldsGetData = (req) => {
    return checkBodyRequestFields(req, fields);
}

const exportData = {
    checkBodyRequestFieldsGetData,
    fields
}
module.exports = exportData;