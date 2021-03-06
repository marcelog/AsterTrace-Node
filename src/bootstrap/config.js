/*!
 * Reads configuration file and setups global configuration.
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
exports.bootstrap = function (resources) {
    var NamiConfig;
    eval(require('fs').readFileSync(
        process.env.NAMI_CONFIG_DIR + '/config.js',
        'ascii'
    ));
    NamiConfig.dir = process.env.NAMI_CONFIG_DIR;
    return NamiConfig;
};

exports.shutdown = function (resources) {
};

