var bcrypt = require("bcryptjs");

checkBodyRequestFields = (req, fields) => {
    let result = {};
    const limit = req.query.limit;
    const page = req.query.page;
    const order = req.query.order;
    const filter = req.query.filter;
    if (!limit) {
        result.limit = "There Must be limit"
    }
    if (limit < 1) {
        result.limit = "Limit must be greater than or equal to 1"
    }
    if (!page) {
        result.page = "There Must be page"
    }
    if (page < 1) {
        result.page = "Page must be greater than or equal to 1"
    }
    if (filter) {
        let countError = 0;
        let countErrorOperator = 0;
        let valueValid;
        let array = filter.split("-");
        if (array.length > 2) {
            for (let i = 0; i < fields.validFilter.length; i++) {
                if (fields.validFilter[i][array[0]] !== undefined) {
                    countError++
                    valueValid = fields.validFilter[i][array[0]]
                }
            }
            if (countError == 0) {
                result.filter_key = `Key ${array[0]} Not supported`
            }
            if (valueValid !== undefined) {
                for (var k = 0; k < valueValid.length; k++) {
                    if (valueValid[k] === array[1]) {
                        countErrorOperator++
                    }
                }
            }
            console.log(countErrorOperator)
            if (countErrorOperator == 0) {
                result.filter_operator = `Operator ${array[1]} Not supported`
            }
        } else {
            result.filter = `Format filter must be specified "id-eq-string"`
        }
    }
    return result;

}

passwordIsValid = (reqpass, oldpass) => {
    return bcrypt.compareSync(
        reqpass,
        oldpass
    );
}

const exportData = {
    checkBodyRequestFields,
    passwordIsValid
}

module.exports = exportData;