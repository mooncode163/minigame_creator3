
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc';
import { UIView } from '../UIKit/ViewController/UIView';
import { CloudRes } from './CloudRes';
import { UIImage } from '../UIKit/UIImage/UIImage';
import { UIText } from '../UIKit/UIText/UIText';
import { UIProgress } from '../UIKit/UIProgress/UIProgress';
import { Language } from '../Language/Language';
import { Common } from '../Common';
import { CommonRes } from '../CommonRes';
import { Debug } from '../Debug';
import { Config } from '../Config/Config';
import { PopViewController } from '../UIKit/ViewController/PopViewController';

const { ccclass, property, type } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('UICloudRes')
export class UICloudRes extends UIView {
    @type(UIImage)
    imageBg: UIImage | null = null;
    @type(UIText)
    textTitle: UIText | null = null;
    @type(UIText)
    textStatus: UIText | null = null;
    @type(UIProgress)
    uiProgress: UIProgress | null = null;


    onLoad() {
        super.onLoad();
        // this.node.setContentSize(this.node.parent.getContentSize());
        this.textTitle.text = Language.main.GetString("STR_CLOUDRES_TITLE");
        // this.progressBar.totalLength = this.node.getContentSize().width-32;
        this.UpdateProgress(0);

        CloudRes.main.StartDownload(
            {
                url: Config.main.cloudResUrl,
                progress: (res: any) => {
                    // this.UpdateProgress(res.progress / 100.0);
                },
                unzipSuccess: () => {
                    Debug.Log(" unzipSuccess ");
                    this.scheduleOnce(this.OnCloudResDidFinish, 0.25);
                },
            });
        this.LayOut();
    }

    UpdateProgress(value) {
        var progress = value;
        if (progress < 0) {
            progress = 0;
        }
        if (progress > 1) {
            progress = 1;
        }
        var percent = Math.floor(progress * 100);
        // progress = 0.5;
        // this.uiProgress.UpdateProgress(progress);
        //下载进度:xxx%
        var str = Language.main.GetString("STR_CLOUDRES_STATUS");
        str = str.replace("xxx", percent.toString());
        this.textStatus.text = str;
    }
    OnCloudResDidFinish() {
        Common.SetBoolOfKey(CommonRes.KEY_DOWNLOAD_CLOUNDRES, true);
        if (this.controller != null) {
            var p = this.controller as PopViewController;
            p.Close();
        }
    }

    LayOut() {
        super.LayOut();

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
