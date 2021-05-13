
import { _decorator, Component, Node } from 'cc';
import { Debug } from '../../Debug';
import { LayOutBase } from './LayOutBase';
import { Align, LayOutUtil } from './LayOutUtil';
const { ccclass, property } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer
// const Align = LayOutUtil.Align;

@ccclass('LayOutBetween')
export class LayOutBetween extends LayOutBase {
    onLoad () {
        super.onLoad();
        this.LayOut();

    }
    start () {
        super.start();
        this.LayOut();
    }
    LayOut () {
        /// this.col = this.GetChildCount(); 
        if (!this.Enable()) {
            return;
        }
        super.LayOut();
        var x, y, w, h;
        Debug.Log("LayOutBetween LayOut");
        var pt = this.node.getPosition();
        x = pt.x;
        y = pt.y;
        if (this.target == null) {
            return;
        }

      
        //左右
        if (this.align == Align.Horizontal) {
            x = LayOutUtil.main.GetBetweenCenterX(this.target, this.target2) + this.offset.x;
        }
        if (this.align == Align.Vertical) {
            y = LayOutUtil.main.GetBetweenCenterY(this.target, this.target2) + this.offset.y;
        }

        //屏幕边界
        if ((this.align == Align.LEFT) || (this.align == Align.RIGHT)) {
            x = LayOutUtil.main.GetBetweenScreenCenter(this.target, this.align) + this.offset.x;
        }
        if ((this.align == Align.UP) || (this.align == Align.DOWN)) {
            y = LayOutUtil.main.GetBetweenScreenCenter(this.target, this.align) + this.offset.y;
        }
        Debug.Log("LayOutBetween x=" + x + " y=" + y + " align=" + this.align);
        this.node.setPosition(x, y);

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
