function MainController(resources) {
    this.resources = resources;
}

MainController.prototype.home = function (req, res) {
    res.send('hello world');
};
MainController.prototype.callsList = function (req, res, pageStart, pageLen, dateStart, dateEnd, status) {
    var queryObject = {};
    var ret = [];
    if (status !== 'undefined') {
        queryObject.dialStatus = status;
    }
    var options = {};
    options.skip = pageStart * pageLen;
    options.limit = pageLen;
    this.resources.mongo.CallModel.find(queryObject, {}, options, function (err, obj) {
        if (err !== null) {
            this.logger.error("Error getting calls: " + err);
            res.send(err);
        } else {
            ret = obj;
            res.send(ret);
        }
    });
};

exports.mainController = function (resources) { return new MainController(resources); }
