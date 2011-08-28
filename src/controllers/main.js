/*!
 * Controllers.
 *
 * Copyright 2011 Marcelo Gornstein <marcelog@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
function MainController(resources) {
    this.resources = resources;
    this.logger = this.resources.logger.getLogger('AsterTrace.Express');
}

function CallsController(resources) {
    this.resources = resources;
    this.logger = this.resources.logger.getLogger('AsterTrace.Express');
}

MainController.prototype.home = function (req, res) {
    res.send('hello world');
};
CallsController.prototype.callsList = function (req, res) {
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

exports.callsController = function (resources) { return new CallsController(resources); }
exports.mainController = function (resources) { return new MainController(resources); }
