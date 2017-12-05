var request = require('request');

module.exports = {
    getParam(req, param) {
        let reqParam = req.params[param];
        return (reqParam && reqParam != null && reqParam.length != 0) ? reqParam : null;
    },

    handleAPIRequest(url, res) {
        request(url, function (error, response, body) {
            if (error) {
                console.log('error:', error);
                res.end();
                return;
            }
            console.log('statusCode:', response && response.statusCode);
            res.json(JSON.parse(body));
        });
    }
}