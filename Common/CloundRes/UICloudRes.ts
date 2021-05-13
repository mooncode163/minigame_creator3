
import { _decorator, Component, Node, CCObject, resources, Prefab } from 'cc'; 
import { UIView } from '../UIKit/ViewController/UIView';
import { CloudRes } from './CloudRes';

const { ccclass, property } = _decorator;
// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('UICloudRes')
export class UICloudRes extends UIView {
    // imageBg: Sprite,
    // textTitle: Label,
    // textStatus: Label,
    // uiProgress: UIProgress,
  

    // onLoad () {
    //     this._super();
    //     this.node.setContentSize(this.node.parent.getContentSize());
    //     this.textTitle.string = Language.main().GetString("STR_CLOUDRES_TITLE");
    //     // this.progressBar.totalLength = this.node.getContentSize().width-32;
    //     this.UpdateProgress(0);

    //     CloudRes.main.StartDownload({
    //         // url: Device.main.isLandscape ? AppRes.URL_CLOUND_RES_HD : AppRes.URL_CLOUND_RES,
    //         url:Config.main().cloudResUrl,
    //         success (res) {

    //         }.bind(this),
    //         fail (res) {

    //         }.bind(this),
    //         progress (res) {
    //             //console.log('CloudRes下载进度=', res.progress)
    //             //console.log('CloudRes已经下载的数据长度=', res.totalBytesWritten)
    //             //console.log('CloudRes预期需要下载的数据总长度=', res.totalBytesExpectedToWrite)
    //             this.UpdateProgress(res.progress / 100.0);
    //         }.bind(this),

    //         unzipSuccess () {
    //             Debug.Log(" unzipSuccess ");
    //             this.scheduleOnce(this.OnCloudResDidFinish, 0.25);
    //         }.bind(this),


    //     });

    //     this.LayOut();
    // }

    // UpdateProgress (value) {
    //     var progress = value;
    //     if (progress < 0) {
    //         progress = 0;
    //     }
    //     if (progress > 1) {
    //         progress = 1;
    //     }
    //     var percent = Math.floor(progress * 100);
    //     // progress = 0.5;
    //     this.uiProgress.UpdateProgress(progress);
    //     //下载进度:xxx%
    //     var str = Language.main().GetString("STR_CLOUDRES_STATUS");
    //     str = str.replace("xxx", percent.toString());
    //     this.textStatus.string = str;
    // }
    // OnCloudResDidFinish () {
    //     Common.SetBoolOfKey(CommonRes.KEY_DOWNLOAD_CLOUNDRES, true);
    //     if (this.controller != null) {
    //         this.controller.Close();
    //     }
    // }

    // LayOut () {
    //     var size = this.node.getContentSize();

    // }

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
