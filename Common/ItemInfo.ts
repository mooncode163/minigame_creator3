
import { _decorator, CCObject,Node } from 'cc';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ItemInfo')
export class ItemInfo extends CCObject {
    source = '';
    id = '';
    type = '';
    pic = '';
    title = '';
    description = '';
    artist = '';
    url = '';
    icon = '';
    appid = '';
    category = '';
    sound = '';
    tag = 0;
    index = '';
    row = '';
    col = ''; 
    node: Node = null;
    time = '';
    game = '';
    gameType = '';
    language = '';
    isAd=false;
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
