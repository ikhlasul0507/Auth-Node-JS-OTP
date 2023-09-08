module.exports = (sequelize, Sequelize) => {
    const Petugas = sequelize.define("petugas", {
        id_petugas: {
            type: Sequelize.STRING
        },
        nama_petugas: {
            type: Sequelize.STRING
        },
        jabatan_petugas: {
            type: Sequelize.STRING
        },
        no_telp_petugas: {
            type: Sequelize.CHAR(15)
        },
        alamat_petugas: {
            type: Sequelize.TEXT
        }
    });

    return Petugas;
};