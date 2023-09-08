//200
statusSuccess = (message = undefined, result = undefined, res, initiate = undefined, count = undefined) => {
    res.status(200).json({
        status: true,
        uuid: Math.random(),
        time: new Date(),
        message: message,
        count: count,
        data: result,
        initiate: initiate,
    });
}

//400
statusFailed = (message, result = undefined, res) => {
    res.status(400).json({
        status: false,
        uuid: Math.random(),
        time: new Date(),
        message: message,
        error: result,
    });
}

//403
statusProvide = (message, result, res) => {
    res.status(403).json({
        status: false,
        uuid: Math.random(),
        time: new Date(),
        message: message,
        error: result,
    });
}

//401
statusAutorize = (message, result, res) => {
    res.status(401).json({
        status: false,
        uuid: Math.random(),
        time: new Date(),
        message: message,
        error: result,
    });
}

const exportData = {
    statusSuccess,
    statusFailed,
    statusProvide,
    statusAutorize
}
module.exports = exportData;