module.exports = {
    getParam(req, param) {
        let reqParam = req.params[param];
        return (reqParam && reqParam != null && reqParam.length != 0) ? reqParam : null;
    }
}