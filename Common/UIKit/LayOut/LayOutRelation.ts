
import { _decorator, Component, Node, UITransform, Vec2 } from 'cc';
import { Debug } from '../../Debug';
import { LayOutBase } from './LayOutBase';
import { LayOutUtil } from './LayOutUtil';
const { ccclass, property } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

const Align = LayOutUtil.Align;

enum RelationType {
    NONE,// 
    PARENT,//相对父窗口 
    TARGET,//相对目标 
    ALL,
}




// enum CustomerState {
//     NONE,
//     GREETING,
//     GOODBYE,
// }

// enum EventName {
//     GREETING = 'greeting',
//     GOODBYE = 'goodbye', 
// }
@ccclass('LayOutRelation')
export class LayOutRelation extends LayOutBase {
    public static RelationType = RelationType;

    @property
    private _type = RelationType.PARENT;
    //get 的用法
    get type(): number {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._type;
    }
    // set 的用法
    set type(value: number) {
        this._type = value;
    }


    private _offset = Vec2.ZERO;
    //get 的用法
    get offset(): Vec2 {           // 函数后(): string 这个的意思是 要求函数返回的类型必须是 string
        return this._offset;
    }
    // set 的用法
    set offset(value: Vec2) {
        this._offset = value;
    }
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    onLoad() {
        super.onLoad();
        this._type = RelationType.PARENT;
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
        var x, y, w, h;
        var pt = this.node.getPosition();
        x = pt.x;
        y = pt.y;

        // var rctran = this.node.getComponent(cc.RectTransform);
        var size = this.node.getComponent(UITransform)?.contentSize;
        var sizeParent = this.node.parent?.getComponent(UITransform)?.contentSize;
        w = size?.width;
        h = size?.height;

        var w_parent = sizeParent?.width;
        var h_parent = sizeParent?.height;

        Debug.Log("this.type=" + this.type + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w);
        switch (this.type) {
            case RelationType.PARENT:
                {

                    if (this.align == Align.LEFT) {
                        x = - w_parent / 2 + w / 2 + this.offset.x;
                    }
                    if (this.align == Align.RIGHT) {
                        x = w_parent / 2 - w / 2 - this.offset.x;
                    }
                    if (this.align == Align.UP) {
                        Debug.Log("Align.UP this.type=" + this.type + " w_parent=" + w_parent + " h_parent=" + h_parent + " h=" + h);
                        y = h_parent / 2 - h / 2 - this.offset.y;
                    }
                    if (this.align == Align.DOWN) {
                        y = - h_parent / 2 + h / 2 + this.offset.y;
                    }


                }
                break;
            case RelationType.TARGET:
                {
                    if (this.target == null) {
                        break;
                    }
                    var sizeTarget = this.target?.getComponent(UITransform)?.contentSize;
                    if (sizeTarget == null) {
                        break;
                    }
                    var ptTarget = this.target.getPosition();
                    // 位于target的左边
                    if (this.align == Align.LEFT) {
                        x = ptTarget.x - sizeTarget.width / 2 - w / 2 - this.offset.x;
                    }
                    if (this.align == Align.RIGHT) {
                        x = ptTarget.x + sizeTarget.width / 2 + w / 2 + this.offset.x;
                    }
                    if (this.align == Align.UP) {
                        y = ptTarget.y + sizeTarget.height / 2 + h / 2 + this.offset.y;
                    }
                    if (this.align == Align.DOWN) {
                        y = ptTarget.y - sizeTarget.height / 2 - h / 2 - this.offset.y;
                    }

                    //相同位置
                    if (this.align == Align.SAME_POSTION) {
                        x = ptTarget.x;
                        y = ptTarget.y;
                    }

                }
                break;

        }


        this.node.setPosition(x, y);

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
