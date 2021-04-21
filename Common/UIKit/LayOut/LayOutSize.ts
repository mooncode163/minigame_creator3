 
import { _decorator, Component, Node, Enum, View, Size, director, size, view, math, UITransform, Button, Vec2, Label } from 'cc';
const { ccclass, property, integer, float, boolean, string,type } = _decorator;

import { Debug } from '../../Debug';
import { LayOutBase } from './LayOutBase';
import { LayOutUtil } from './LayOutUtil';
import { AppSceneBase } from '../../../AppBase/Common/AppSceneBase';
// import { serializable } from 'cc.decorator';

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer
const Align = LayOutUtil.Align;
const SideType = LayOutUtil.SideType;
const SizeType = LayOutUtil.SizeType;

// export const NetURL = cc.Enum({
//     eLAN : 1,//内网
//     eWAN : 2,//外网
//     })

const layerList = {
    NONE: 0,
    DEFAULT:2,
    ALL: 0xffffffff,
};

enum TestEum {
    LEFT = 0,// 
    RIGHT,
    UP,
    DOWN,
}
Enum(TestEum);

@ccclass('LayOutSize')
export class LayOutSize extends LayOutBase {
  public static Enum = Enum(layerList);
    @property
    ratio = 1.0;
    @property
    ratioW = 1.0;
    @property
    ratioH = 1.0;
    @property
    widthH = 1.0;//宽
    @property
    heightH = 1.0;//高  
 
    _sideType = SideType.LEFT;
    @type(SideType) 
    get sideType() {
        return this._sideType;
    }
    set sideType(value) {
        this._sideType = value;
        this.LayOut();
    }


    private _width = 1.0;
    //get 的用法
    get width(): number {
        return this._width;
    }
    // set 的用法
    set width(value: number) {
        this._width = value;
        this.LayOut();
    }

    private _height = 1.0;
    @property
    //get 的用法
    get height(): number {
        return this._height;
    }
    // set 的用法
    set height(value: number) {
        this._height = value;
        this.LayOut();
    } 
    private _typeX = SizeType.MATCH_PARENT;
    @type(SizeType) 
    get typeX() {
        return this._typeX;
    }
    set typeX(value) {
        this._typeX = value;
        this.LayOut();
    }
    
    private _typeY = SizeType.MATCH_PARENT;
    @type(SizeType) 
    get typeY() {
        return this._typeY;
    }
    set typeY(value) {
        this._typeY = value;
        this.LayOut();
    }

    // @serializable
    // protected _transition = TestEum.LEFT;

    // @type(TestEum) 
    // // @property({type:TestEum})
    // get transition () {
    //     return this._transition;
    // }

    // set transition (value: TestEum) {
    //     if (this._transition === value) {
    //         return;
    //     }
    //     this._transition = value; 
    // }
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    onLoad() {
        super.onLoad();
        this._typeX = SizeType.MATCH_PARENT;
        // this.LayOut();
    }
    start() {
        
        // [3] super.LayOut();
        super.start();
        this.LayOut();
    }
    LayOut () { 
        super.LayOut();
        var x, y, w, h;
        w = 1024;
        h = 512;
        // w = AppSceneBase.Main().sizeCanvas.width;
        // this.node?.getComponent(UITransform)?.setContentSize(new Size(w, h));
        // var sizeParent = this.node.parent.getComponent(UITransform).contentSize;
        this.UpdateSize();
    }
    // update (deltaTime: number) {
    //     // [4]
    // }

    UpdateSizeX() {
        var x, y, w, h;
        var size = this.node.getComponent(UITransform).contentSize;
        var sizeParent = this.node.parent.getComponent(UITransform).contentSize;
        w = size.width;
        h = size.height;
        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        w_parent -= (this.offsetMin.x + this.offsetMax.x);
        h_parent -= (this.offsetMin.y + this.offsetMax.y);
         Debug.Log("this.typeX=" + this.typeX + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w);
        // Debug.Log("w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w);
        
        // return;
        switch (this.typeX) {
            case SizeType.MATCH_CONTENT:
                {
                    w = size.width;
                }
                break;
            case SizeType.MATCH_VALUE:
                {
                    w = this.width;
                }
                break;
            case SizeType.MATCH_VALUE_Canvas:
                {
                    w = this.width;
                    //  if (IsSprite())
                    // {
                    //     w= Common.CanvasToWorldWidth(AppSceneBase.main.mainCamera, AppSceneBase.main.sizeCanvas, width);
                    // }
                    //    x = rctran.anchoredPosition.x;
                }
                break;

            case SizeType.MATCH_PARENT:
                {
                    w = w_parent * this.ratioW;
                }
                break;
            case SizeType.MATCH_PARENT_MIN:
                {
                    w = Math.min(w_parent, h_parent) * this.ratioW;

                }
                break;
            case SizeType.MATCH_PARENT_MAX:
                {
                    w = Math.max(w_parent, h_parent) * this.ratioW;
                }
                break;
            case SizeType.MATCH_TARGET:
                {
                    if (this.target != null) {
                        w = this.target.getComponent(UITransform).contentSize.width * this.ratioW;

                    }

                }
                break;
            case SizeType.MATCH_HEIGHT:
                {
                    w = size.height;
                }
                break;

            case SizeType.BETWEEN_SIDE_TARGET:
                {

                    if ((this.sideType == SideType.LEFT) || (this.sideType == SideType.RIGHT)) {
                        w = LayOutUtil.Main().GetBetweenSideAndTargetSize(this.target, this.sideType) * this.ratioW;
                    }

                }
                break;
            case SizeType.BETWEEN_TWO_TARGET:
                {
                    w = LayOutUtil.Main().GetBetweenTwoTargetSize(this.target, this.target2, false);

                }
                break;
        }
        Debug.Log("UpdateSizeX w=" + w + " h=" + h);
        this.node?.getComponent(UITransform)?.setContentSize(new Size(w, h));
    }


    UpdateSizeY() {
        var x, y, w, h;
        var size = this.node.getComponent(UITransform).contentSize;
        var sizeParent = this.node.parent.getComponent(UITransform).contentSize;
        w = size.width;
        h = size.height;

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;
        w_parent -= (this.offsetMin.x + this.offsetMax.x);
        h_parent -= (this.offsetMin.y + this.offsetMax.y);

        switch (this.typeY) {
            case SizeType.MATCH_CONTENT:
                {
                    h = size.height;
                }
                break;
            case SizeType.MATCH_VALUE:
                {
                    h = this.height;
                }
                break;
            case SizeType.MATCH_VALUE_Canvas:
                {
                    h = this.height;
                    //  if (IsSprite())
                    // {
                    //     w= Common.CanvasToWorldWidth(AppSceneBase.main.mainCamera, AppSceneBase.main.sizeCanvas, width);
                    // }
                    //    x = rctran.anchoredPosition.x;
                }
                break;

            case SizeType.MATCH_PARENT:
                {
                    h = h_parent * this.ratioH;
                }
                break;
            case SizeType.MATCH_PARENT_MIN:
                {
                    h = Math.min(w_parent, h_parent) * this.ratioH;

                }
                break;
            case SizeType.MATCH_PARENT_MAX:
                {
                    h = Math.max(w_parent, h_parent) * this.ratioH;
                }
                break;
            case SizeType.MATCH_TARGET:
                {
                    if (this.target != null) {
                        h = this.target.getComponent(UITransform).contentSize.height * this.ratioH;

                    }

                }
                break;
            case SizeType.MATCH_WIDTH:
                {
                    h = size.width;
                }
                break;

            case SizeType.BETWEEN_SIDE_TARGET:
                {

                    if ((this.sideType == SideType.UP) || (this.sideType == SideType.DOWN)) {
                        h = LayOutUtil.Main().GetBetweenSideAndTargetSize(this.target, this.sideType) * this.ratioH;
                    }

                }
                break;
            case SizeType.BETWEEN_TWO_TARGET:
                {
                    h = LayOutUtil.Main().GetBetweenTwoTargetSize(this.target, this.target2, true);

                }
                break;
        }
        Debug.Log("UpdateSizeY w=" + w + " h=" + h);
        this.node?.getComponent(UITransform)?.setContentSize(new Size(w, h));
    }
    UpdateSize() {
        this.UpdateSizeX();
        this.UpdateSizeY();
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
