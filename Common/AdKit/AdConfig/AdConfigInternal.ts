
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { ConfigInternalBase } from '../../Config/ConfigInternalBase';
import { Debug } from '../../Debug';
import { JsonUtil } from '../../File/JsonUtil';
import { Source } from '../../Source';
import { AdInfo } from './AdInfo';
 

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html
const AdType = AdInfo.AdType;

@ccclass('AdConfigInternal')
export class AdConfigInternal extends ConfigInternalBase {



    public static COUNTRY_CN: string = "cn";
    public static COUNTRY_OTHER: string = "other";
    public static SPLASH_TYPE_SPLASH: string = "splash";
    public static SPLASH_TYPE_INSERT: string = "splash_insert";

    adSourceSplash: string = Source.ADMOB;
    adSourceSplashInsert: string = Source.ADMOB;
    adSourceInsert: string = Source.ADMOB;
    adSourceBanner: string = Source.ADMOB;
    adSourceNative: string = Source.GDT;
    adSourceVideo: string = Source.UNITY;


    // public OnAdConfigFinishedDelegate callback { get; set; }

    listPlatform: AdInfo[] = [];
    listPriorityBanner: AdInfo[] = [];
    listPriorityInsert: AdInfo[] = [];
    listPrioritySplash: AdInfo[] = [];
    listPrioritySplashInsert: AdInfo[] = [];
    listPriorityVideo: AdInfo[] = [];
    listPriorityNative: AdInfo[] = [];

    rootJsonCommon: any = null;
    rootJsonPriority: any = null;

    indexPriorityBanner = 0;
    indexPriorityInsert = 0;
    indexPrioritySplash = 0;
    indexPrioritySplashInsert = 0;
    indexPriorityVideo = 0;
    indexPriorityNative = 0;

    IsInPlatformList(src: string) {
        var ret = false;
        this.listPlatform.forEach((info) => {
            if (info.source == src) {
                ret = true;
                return ret;
            }
        });
        return ret;
    }
    GetJsonKey(data: any, key: string) {
        var ret = "0";
        if (JsonUtil.ContainsKey(data, key)) {
            ret = data[key];
        }
        return ret;
    }



    GetAdInfo(source: string) {
        if (this.listPlatform == null) {
            return null;
        }

        this.listPlatform.forEach((info) => {
            if (info.source == source) {
                return info;
            }
        });
        return null;
    }
    IsInChina() {
        var ret = true;
        // var ret = IPInfo.isInChina;
        // if (Common.isAndroid) {
        //     if (AppVersion.appCheckForXiaomi) {
        //         //xiaomi 审核中,广告用国外的 admob
        //         // ret = false;
        //     }
        //     ret = true;
        // }

        return ret;
    }
    GetAdSource(type) {
        // var src = AdConfigParser.adSourceBanner;
        // switch (type) {
        //     case AdConfigInternal.SOURCE_TYPE_SPLASH:
        //         src = AdConfigParser.adSourceSplash;

        //         break;
        //     case AdConfigInternal.SOURCE_TYPE_BANNER:
        //         src = AdConfigParser.adSourceBanner;

        //         break;
        //     case AdConfigInternal.SOURCE_TYPE_INSERT:
        //         src = AdConfigParser.adSourceInsert;
        //         break;
        //     case AdConfigInternal.SOURCE_TYPE_SPLASH_INSERT:
        //         src = AdConfigParser.adSourceSplashInsert;
        //         break;
        //     case AdConfigInternal.SOURCE_TYPE_NATIVE:
        //         src = AdConfigParser.adSourceNative;
        //         break;
        //     case AdConfigInternal.SOURCE_TYPE_VIDEO:
        //         src = AdConfigParser.adSourceVideo;
        //         break;
        // }

        // if (Config.main.channel == Source.INMOB) {
        //     src = Source.INMOB;
        // }
        // return src;
    }
    GetAppId(source: string) {
        var ret = "0";
        var info = this.GetAdInfo(source);
        if (info != null) {
            ret = info.appid;
        }
        return ret;
    }

    GetAdKey(source: string, type: number) {
        var ret = "0";
        var info = this.GetAdInfo(source);
        if (info != null) {
            switch (type) {
                case AdType.SPLASH:
                    ret = info.key_splash;
                    break;
                case AdType.BANNER:
                    ret = info.key_banner;
                    break;
                case AdType.INSERT:
                    ret = info.key_insert;
                    break;
                case AdType.SPLASH_INSERT:
                    ret = info.key_splash_insert;
                    break;
                case AdType.NATIVE:
                    ret = info.key_native;
                    break;

                case AdType.VIDEO:
                    ret = info.key_video;
                    break;
                case AdType.INSERT_VIDEO:
                    ret = info.key_insert_video;
                    break;
            }
        }
        return ret;
    }

    // public List<AdInfo> GetListPriority(int type) {
    //     List < AdInfo > listPriority = null;
    //     switch (type) {
    //         case SOURCE_TYPE_SPLASH:
    //             listPriority = listPrioritySplash;
    //             break;
    //         case SOURCE_TYPE_BANNER:
    //             listPriority = listPriorityBanner;
    //             break;
    //         case SOURCE_TYPE_INSERT:
    //             listPriority = listPriorityInsert;
    //             break;
    //         case SOURCE_TYPE_SPLASH_INSERT:
    //             listPriority = listPrioritySplashInsert;
    //             break;
    //         case SOURCE_TYPE_NATIVE:
    //             listPriority = listPriorityNative;
    //             break;
    //         case SOURCE_TYPE_VIDEO:
    //             listPriority = listPriorityVideo;
    //             break;
    //     }
    //     return listPriority;
    // }

    // public void InitPriority(string src, int type) {
    //     int idx = 0;
    //     List < AdInfo > listPriority = GetListPriority(type);
    //     foreach(AdInfo info in listPriority)
    //     {
    //         if (info.source == src) {
    //             switch (type) {
    //                 case SOURCE_TYPE_SPLASH:
    //                     indexPrioritySplash = idx;
    //                     break;
    //                 case SOURCE_TYPE_BANNER:
    //                     indexPriorityBanner = idx;
    //                     break;
    //                 case SOURCE_TYPE_INSERT:
    //                     indexPriorityInsert = idx;
    //                     break;
    //                 case SOURCE_TYPE_SPLASH_INSERT:
    //                     indexPrioritySplashInsert = idx;
    //                     break;
    //                 case SOURCE_TYPE_NATIVE:
    //                     indexPriorityNative = idx;
    //                     break;
    //                 case SOURCE_TYPE_VIDEO:
    //                     indexPriorityVideo = idx;
    //                     break;
    //             }
    //             break;
    //         }
    //         idx++;
    //     }
    // }

    // public AdInfo GetNextPriority(int type) {
    //     int idx = 0;
    //     switch (type) {
    //         case SOURCE_TYPE_SPLASH:
    //             idx = ++indexPrioritySplash;
    //             break;
    //         case SOURCE_TYPE_BANNER:
    //             idx = ++indexPriorityBanner;
    //             break;
    //         case SOURCE_TYPE_INSERT:
    //             idx = ++indexPriorityInsert;
    //             break;
    //         case SOURCE_TYPE_SPLASH_INSERT:
    //             idx = ++indexPrioritySplashInsert;
    //             break;
    //         case SOURCE_TYPE_NATIVE:
    //             idx = ++indexPriorityNative;
    //             break;
    //         case SOURCE_TYPE_VIDEO:
    //             idx = ++indexPriorityVideo;
    //             break;
    //     }
    //     List < AdInfo > listPriority = GetListPriority(type);
    //     Debug.Log("GetNextPriority:listPriority.Count=" + listPriority.Count + " type=" + type + " idx=" + idx);
    //     if (idx >= listPriority.Count) {
    //         return null;
    //     }
    //     AdInfo info = listPriority[idx];
    //     return info;

    // }

    ParseData() {
        var key = "platform";
        if (!JsonUtil.ContainsKey(this.rootJson, key)) {
            return;
        }
        var jsonItems = this.rootJson[key];

        for (var i = 0; i < jsonItems.Count; i++) {
            var info = new AdInfo();
            var current = jsonItems[i];
            info.source = current["source"];
            if (this.IsInPlatformList(info.source)) {
                continue;
            }

            info.appid = current["appid"];
            info.appkey = this.GetJsonKey(current, "appkey");
            info.key_splash = this.GetJsonKey(current, "key_splash");
            info.key_splash_insert = this.GetJsonKey(current, "key_splash_insert");
            info.key_banner = current["key_banner"];
            info.key_insert = current["key_insert"];
            info.key_native = this.GetJsonKey(current, "key_native");
            info.key_video = this.GetJsonKey(current, "key_video");
            info.key_insert_video = this.GetJsonKey(current, "key_insert_video");
            this.listPlatform.push(info);

        }
    }
    GetAppIdOfStore(store: string) {
        Debug.Log("GetAppIdOfStore store=" + store);
        var appid = this.rootJson.APPID;
        var strid = "0";
        if (appid.store != null) {
            strid = appid.store;
        }
        Debug.Log("GetAppIdOfStore appid= " + strid + "store=" + store);
        return strid;
    }
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
