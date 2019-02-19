/**
 * Created by sc on 08/08/18.
 */
'use strict';

var path    = require('path');
var YAML = require('yamljs');

module.exports=function(){
    var severConfigPath=path.join(__dirname,'dev.yml')

    try{
        var configData=YAML.load(severConfigPath);
    }
    catch(e){
        console.error('NODE_ENV error: can not found dev.yml', e);
        process.exit(1);
    }

    return configData
}()

