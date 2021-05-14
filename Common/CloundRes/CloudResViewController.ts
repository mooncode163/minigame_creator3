
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { UIView } from '../../Common/UIKit/ViewController/UIView';
import { PrefabCache } from '../Cache/PrefabCache';
import { Debug } from '../Debug';
import { PopViewController } from '../UIKit/ViewController/PopViewController';
import { UICloudRes } from './UICloudRes';
import { ImageRes } from '../Config/ImageRes';
const { ccclass, property, type } = _decorator;

@ccclass('CloudResViewController')
export class CloudResViewController extends PopViewController {
    uiPrefab: Prefab;
    ui: UICloudRes;

    static _main: CloudResViewController;
    //静态方法
    static get main() {
        if (this._main == null) {
            this._main = new CloudResViewController();
        }
        return this._main;
    }

    Init() {
        Debug.Log("CloudResViewController Init");
        //  this.LoadPrefab();
    }
    CreateUI() {
        Debug.Log("CloudResViewController CreateUI");
        var node = instantiate(this.uiPrefab);
        this.ui = node.getComponent(UICloudRes);
        this.ui.SetController(this);
    }

    LoadPrefab() {
        var key = "UICloudRes";

        PrefabCache.main.LoadByKey(
            {
                key: key,
                success: (p: any, data: any) => {
                    this.uiPrefab = data;
                    this.CreateUI();

                },
                fail: () => {

                },
            });
    }

    ViewDidLoad() {
        Debug.Log("CloudResViewController ViewDidLoad");
        super.ViewDidLoad();
        this.LoadPrefab();
    }
    ViewDidUnLoad() {
        Debug.Log("CloudResViewController ViewDidUnLoad");
        super.ViewDidUnLoad();

    }
    LayOut() {


    }

    Close() {

        // ImageRes.main.LoadCloudConfig(
        //     {
        //         success: (p: any) => {
        //             super.Close();
        //         },
        //         fail: () => {
        //             super.Close();
        //         },
        //     }); 
        super.Close();
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
