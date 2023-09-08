const { getPetugasDao, insertPetugasDao } = require("../dao/petugas.dao");

getPetugas = async (req, res) => {
    const result = await getPetugasDao(req, res)
    return result;
}

insertPetugas = async (req, res) => {
    const result = await insertPetugasDao(req, res)
    return result;
}

const exportData = {
    getPetugas,
    insertPetugas
};
module.exports = exportData;