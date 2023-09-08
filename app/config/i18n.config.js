const { I18n } = require('i18n');
const path = require('path');
const { LANGUANGE, DEFAULT_LANGUANGE } = require('../util/properties.util');

const i18n = new I18n({
    locales: LANGUANGE,
    defaultLocale: DEFAULT_LANGUANGE,
    directory: path.join(__dirname, '..', 'locales')
});

module.exports = i18n;