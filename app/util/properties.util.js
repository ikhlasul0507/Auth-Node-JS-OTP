
const DEFAULT_LANGUANGE = 'id';
const LANGUANGE = ['en', 'id'];
// const TOKEN_EXPIRED = 24 * 60 * 60 // hours * minutes * seconds
const TOKEN_EXPIRED = 60 // hours * minutes * seconds
const TOKEN_REFRESH_EXPIRED = 24 * 60 * 60 // hours * minutes * seconds
const OTP_EXPIRED = 1 * 60 // hours * minutes * seconds
const ROLES = ["user", "admin", "moderator", "haga_driver", "haga_car", "haga_food"];
const MENU_DEFAULT = ["Beranda", "Profile"];
const ALGORITHM = 'HS256'
const URL = {
    PETUGAS: '/api/test/petugas'
}
const exportData = {
    DEFAULT_LANGUANGE,
    LANGUANGE,
    TOKEN_EXPIRED,
    URL,
    ROLES,
    ALGORITHM,
    MENU_DEFAULT,
    OTP_EXPIRED,
    TOKEN_REFRESH_EXPIRED
}

module.exports = exportData;