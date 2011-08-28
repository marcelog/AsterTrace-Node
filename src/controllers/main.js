function MainController(resources) {
    this.resources = resources;
    this.logger = this.resources.logger.getLogger('AsterTrace.Express');
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
    var clid = req.query.clid;
    var dialString = req.query.dialString;
    var queryObject = {};
    var ret = [];
    if (online !== undefined) {
        queryObject.dialStatus = null;
    } else {
        if (status !== 'undefined') {
            queryObject.dialStatus = status;
        }
    }
    if (clid !== 'undefined') {
        var re = new RegExp(clid, "g");
        queryObject.clidName = re;
        queryObject.clidNum = re;
    }
    if (dialString !== 'undefined') {
        var re = new RegExp(dialString, "g");
        queryObject.dialString = re;
        queryObject.dialString = re;
    }
    var options = {};
    options.skip = (pageStart - 1) * pageLen;
    options.limit = pageLen;
    this.resources.mongo.CallModel.find(queryObject, {}, options, function (err, obj) {
        if (err !== null) {
            res.send(err);
        } else {
            ret = obj;
            res.send(ret);
        }
    });
};

exports.mainController = function (resources) { return new MainController(resources); }
