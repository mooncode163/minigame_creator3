
import { _decorator, Component, Node, UITransform, Vec2 } from 'cc';
import { Debug } from '../../Debug';
import { LayOutBase } from './LayOutBase';
import { LayOutElement } from './LayOutElement';
import { Align, Direction, LayOutUtil } from './LayOutUtil';
import { UIView } from '../ViewController/UIView';
const { ccclass, property } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer
// const Direction = LayOutUtil.Direction;
// const Align = LayOutUtil.Align;
@ccclass('HorizontalOrVerticalLayoutBase')
export class HorizontalOrVerticalLayoutBase extends LayOutBase {

 
        //是否控制大小
        childControlHeight=false;
        childControlWidth=false;

        //是否整个区域展开
        childForceExpandHeight=false;
        childForceExpandWidth=false;

        childScaleHeight=false;
        childScaleWidth=false;

        row=1;//行
        col=1;//列  
 

    LayOut () {

        var idx = 0;
        var r = 0, c = 0; 
        if (!this.Enable()) {
            return;
        }  
        super.LayOut();


        for (var i = 0; i < this.node.children.length; i++) {
            var child = this.node.children[i];
            if (child == null) {
                // 过滤已经销毁的嵌套子对象 
                continue;
            }

            var le = child.getComponent(LayOutElement);
            if (le != null && le.ignoreLayout) {
                continue;
            }

            if (!this.enableHide) {
                if (!child.active) {
                    //过虑隐藏的
                    continue;
                }
            }

            // if (objtmp.transform.parent != this.gameObject.transform) {
            //     //只找第一层子物体
            //     continue;
            // }

            //  LayoutElement
            //floor 小于等于 x，且与 x 最接近的整数。
            r = Math.floor(idx / this.col);
            c = idx - Math.floor(r * this.col);

            //从顶部往底部显示
            if (this.directionVertical == Direction.TOP_TO_BOTTOM) {
                r = this.row - 1 - r;
            }

            //从右往左显示
            if (this.directionHorizontal == Direction.RIGHT_TO_LEFT) {
                c = this.col - 1 - c;
            }

            var pt = this.GetItemPostion(child, r, c);
       
            child.setPosition(pt.x, pt.y);
            idx++;

        }


    }

    // r 行 ; c 列  返回中心位置 Vector2
    GetItemPostion (nodeItem:Node, r:Number, c:Number) {
        var x, y, w, h; 

        var rctran = UIView.GetNodeBoundingBox(this.node); 
        w = rctran.width;
        h = rctran.height;
        var item_w = 0, item_h = 0, x_left = 0, y_bottom = 0, w_total = 0, h_total = 0;

        var rctranItem =UIView.GetNodeBoundingBox(nodeItem); 

        if (this.childControlWidth) {
            item_w = (w - (this.space.x * (this.col - 1))) / this.col;
            // rctranItem.sizeDelta = new Vector2(item_w, rctranItem.sizeDelta.y);
            rctranItem.width = item_w;
        }
        else {
            item_w = rctranItem.width;
        }

        if (this.childControlHeight) {
            item_h = (h - (this.space.y * (this.row - 1))) / this.row;
            // rctranItem.sizeDelta = new Vector2(rctranItem.sizeDelta.x, item_h);
            rctranItem.height = item_w;
        }
        else {
            item_h = rctranItem.height;
        }

        w_total = item_w * this.col + (this.space.x * (this.col - 1));
        h_total = item_h * this.row + (this.space.y * (this.row - 1));

        if (this.childForceExpandWidth) {
            x_left = -w / 2;
        }
        else {
            if (this.align == Align.LEFT) {
                x_left = -w / 2;
            }
            else if (this.align == Align.RIGHT) {
                x_left = w / 2 - w_total;
            }
            else {
                //CENTER
                x_left = -w_total / 2;
            }
        }

        x = x_left + item_w * c + item_w / 2 + this.space.x * c;
        Debug.Log("x_left=" + " item_w=" + item_w);

        if (this.childForceExpandHeight) {
            y_bottom = -h / 2;
        }
        else {
            if (this.align == Align.DOWN) {
                y_bottom = -h / 2;
            }
            else if (this.align == Align.UP) {
                y_bottom = h / 2 - h_total;
            }
            else {
                //CENTER
                y_bottom = -h_total / 2;
            }
        }
        y = y_bottom + item_h * r + item_h / 2 + this.space.y * r;
        return new Vec2(x, y);

    }

    onLoad() {
        super.onLoad(); 
        // this.LayOut();
    }
    start() {
        
        // [3] super.LayOut();
        super.start();
        this.LayOut();
    }
 
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting=https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass=https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks=https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
