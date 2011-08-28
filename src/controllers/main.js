function MainController(resources) {
    this.resources = resources;
}

MainController.prototype.home = function (req, res) {
    res.send('hello world');
};
MainController.prototype.callsList = function (req, res) {
    var pageStart = req.query.pageStart;
    var pageLen = req.query.pageLen;
    var dateStart = req.query.dateStart;
    var dateEnd = req.query.dateEnd;
    var status = req.query.status;
    var online = req.query.online;
    var queryObject = {};
    var ret = [];
    if (online !== undefined) {
        queryObject.dialStatus = null;
    } else {
        if (status !== 'undefined') {
            queryObject.dialStatus = status;
        }
    }
    var options = {};
    options.skip = (pageStart - 1) * pageLen;
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
