/**
 * @author sc
 * @date 2018/08/08
 */

const path = require('path');
const yaml = require('yamljs');
const webResponseCode = yaml.load(path.join(__dirname, 'web_response_code.yaml'));

exports.module = webResponseCode

