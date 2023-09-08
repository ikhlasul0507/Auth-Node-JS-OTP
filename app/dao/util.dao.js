selectDataQuery = (query, req) => {
    const limit = req.query.limit;
    const page = req.query.page;
    const order = req.query.order;
    const filter = req.query.filter;
    let data = "";
    if (query) {
        data = query;
    }
    if (filter) {
        let array = req.query.filter.split("-");
        if (array.length > 0) {
            switch (array[1].toLowerCase()) {
                case "lk":
                    array[1] = `like`;
                    array[2] = `"%${array[2]}%"`
                    break;
                case "eq":
                    array[1] = `=`;
                    array[2] = `"${array[2]}"`
                    break;
                default:
                    break;
            }
        }
        data += ` WHERE ${array.join(" ")}`;
    }
    if (order) {
        data += ` ORDER BY ${req.query.order}`;
    }
    if (page > 0 && limit > 0) {
        data += ` LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
    }
    return data;
}

module.exports = {
    selectDataQuery
}