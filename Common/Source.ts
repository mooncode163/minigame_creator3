
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('Source')
export class Source extends CCObject {

    public static WEIXIN: string = "weixin";

    public static WEIXINFRIEND: string = "weixinfriend";
    public static QQ: string = "qq";
    public static QQZONE: string = "qqzone";
    public static WEIBO: string = "weibo";
    public static EMAIL: string = "email";
    public static SMS: string = "sms";
    public static UMENG: string = "umeng";

    public static IOS: string = "ios";
    public static ANDROID: string = "android";
    public static WIN: string = "win";

    //channel
    public static APPSTORE: string = "appstore";
    public static XIAOMI: string = "xiaomi";
    public static TAPTAP: string = "taptap";
    public static HUAWEI: string = "huawei";
    public static GP: string = "gp";//google play
    public static FACEBOOK: string = "fb";
    //ad
    public static INMOB: string = "inmobi";
    public static ADMOB: string = "admob";
    public static GDT: string = "gdt";
    public static UNITY: string = "unity";
    public static WAPS: string = "waps";
    public static ADVIEW: string = "adview";
    public static MICROSOFT: string = "microsoft";
    public static MOBVISTA: string = "mobvista";

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
