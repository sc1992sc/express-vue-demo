var path=require('path');

const ROOT_PATH=path.resolve(__dirname, '../');;
const APP_PATH='app';
const FRONTEND_PATH='frontend';
const DIST_PATH='dist';
const LOGS_PATH='logs';
const VIEW_PATH='views';

function resolvePath(name){
    return path.resolve(ROOT_PATH,name)
}

module.exports={
    ROOT_PATH:ROOT_PATH,
    APP_PATH:resolvePath(APP_PATH),
    FRONTEND_PATH:resolvePath(FRONTEND_PATH),
    DIST_PATH:resolvePath(DIST_PATH),
    LOGS_PATH:resolvePath(LOGS_PATH),
    VIEW_PATH:resolvePath(VIEW_PATH)
}