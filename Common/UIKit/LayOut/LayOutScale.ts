
import { _decorator, Component, Node, UITransform } from 'cc';
import { AppSceneBase } from '../../../AppBase/Common/AppSceneBase';
import { Common } from '../../Common';
import { LayOutBase } from './LayOutBase';
import { LayOutUtil, ScaleType } from './LayOutUtil';
const { ccclass, property, type } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

// const ScaleType = LayOutUtil.ScaleType;

@ccclass('LayOutScale')
export class LayOutScale extends LayOutBase {

    @property
    ratio = 1.0;

    @type(ScaleType)
    private _type = ScaleType.MIN;
    @type(ScaleType)
    //get 的用法
    get type() {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._type;
    }
    // set 的用法
    set type(value) {
        this._type = value;
        this.LayOut();

    }


    onLoad() {
        super.onLoad(); 
        this.type = this._type;
        this.LayOut();
    }

    start() {
        super.start();
        this.LayOut();
    }

    LayOut() {
        if (!this.Enable()) {
            return;
        }
        super.LayOut();
        this.UpdateType();
    }


    UpdateType() {
        switch (this.type) {
            case ScaleType.MIN:
                {
                    this.ScaleNode(this.node, false);
                }
                break;
            case ScaleType.MAX:
                {
                    this.ScaleNode(this.node, true);
                }
                break;

        }
    }

    ScaleNode(node: any, isMaxFit: boolean) {
        var x, y, w, h;
        // var rectParent = this.node.parent.getBoundingBox(); 
        var size = this.node.getComponent(UITransform).contentSize;
        var sizeParent = this.node.parent.getComponent(UITransform).contentSize;

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        w_parent = sizeParent.width;
        h_parent = sizeParent.height;
        if(AppSceneBase.main==null)
        {
            return;
        }
        var sizeCanvas = AppSceneBase.main.sizeCanvas;
        if (w_parent == 0) {
            w_parent = sizeCanvas.width;
        }
        if (h_parent == 0) {
            h_parent = sizeCanvas.height;
        }
        w_parent -= (this.offsetMin.x + this.offsetMax.x);
        h_parent -= (this.offsetMin.y + this.offsetMax.y);

        w = size.width;
        h = size.height;

        var scale = 0;
        if (isMaxFit == true) {
            scale = Common.GetMaxFitScale(w, h, w_parent, h_parent);
        } else {
            scale = Common.GetBestFitScale(w, h, w_parent, h_parent);
        }
        scale = scale * this.ratio; 
        node.scale.x = scale;
        node.scale.y = scale;
    }

    // update (deltaTime: number) {
    //     // [4]
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
