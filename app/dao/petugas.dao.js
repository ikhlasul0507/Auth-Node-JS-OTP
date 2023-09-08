const db = require("../models");
const { selectDataQuery } = require("./util.dao");
const petugas = db.petugas;
const sequelize = db.sequelize;

getPetugasDao = async (req, res) => {
    try {
        let query = "SELECT * FROM petugas ";
        const data = await sequelize.query(selectDataQuery(query, req), {
            model: petugas,
            mapToModel: true // pass true here if you have any mapped fields
        });
        return data;
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

insertPetugasDao = async (req, res) => {
    let data = {
        id_petugas: req.body.id_petugas,
        nama_petugas: req.body.nama_petugas,
        jabatan_petugas: req.body.jabatan_petugas,
        no_telp_petugas: req.body.no_telp_petugas,
        alamat_petugas: req.body.alamat_petugas,
    }
    try {
        const result = await petugas.create(data)
        return { id: result.id }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }


};

module.exports = {
    getPetugasDao,
    insertPetugasDao
};