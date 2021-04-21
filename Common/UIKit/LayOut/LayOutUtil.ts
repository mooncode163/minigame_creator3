
import { _decorator, Component, Node, CCObject, UITransform } from 'cc'; 
import { AppSceneBase } from '../../../AppBase/Common/AppSceneBase';
import { LayOutElement } from './LayOutElement';
const { ccclass, property } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer



enum Align {
    UP = 0,
    DOWN,
    LEFT,
    RIGHT,
    CENTER,
    UP_LEFT,
    UP_RIGHT,
    DOWN_LEFT,
    DOWN_RIGHT,
    Horizontal,
    Vertical,
    SAME_POSTION,
}



enum DispLayVertical {
    TOP_TO_BOTTOM = 0,
    BOTTOM_TO_TOP,
}

enum DispLayHorizontal {
    LEFT_TO_RIGHT = 0,
    RIGHT_TO_LEFT,
}




enum Direction {
    //区分大小写
    TOP_TO_BOTTOM=0,
    BOTTOM_TO_TOP,
    LEFT_TO_RIGHT,
    RIGHT_TO_LEFT,

}


enum SizeType {
    MATCH_CONTENT = 0,//按内容设置
    MATCH_PARENT,//与父窗口等大或者按比例 
    MATCH_TARGET,//与目标等大或者按比例 
    MATCH_PARENT_MIN,//父窗口width 和 height 的 min
    MATCH_PARENT_MAX,//父窗口width 和 height 的 max
    MATCH_WIDTH,//width 和 height 相等
    MATCH_HEIGHT,//width 和 height相等
    BETWEEN_SIDE_TARGET,//夹在边界和target之间
    BETWEEN_TWO_TARGET,//夹在两个target之间

    // 和widht height同步
    MATCH_VALUE,

    // 和widht height同步 canvas大小
    MATCH_VALUE_Canvas,
}
enum SideType {
    LEFT = 0,// 
    RIGHT,
    UP,
    DOWN,
}

@ccclass('LayOutUtil')
export class LayOutUtil extends CCObject {

    public static Align = Align;
    public static DispLayVertical = DispLayVertical;
    public static DispLayHorizontal = DispLayHorizontal;
    public static Direction = Direction;
    public static SizeType = SizeType;
    public static SideType = SideType;



    static _main:LayOutUtil;
    //静态方法
    static   Main(){ 
        if(this._main==null)
        {
            this._main = new LayOutUtil();
        }
        return this._main;
    }

    //两个node之间的中心位置x
    GetBetweenCenterX(node1, node2) {
        var nodeleft, noderight;
        if (node1.getPosition().x < node2.getPosition().x) {
            nodeleft = node1;
            noderight = node2;
        } else {
            nodeleft = node2;
            noderight = node1;
        }
        // var rctran = nodeleft.getComponent(cc.RectTransform);
        var rctran = nodeleft.getComponent(UITransform).contentSize;
        var v1 = nodeleft.getPosition().x + rctran.width / 2;
        // rctran = noderight.getComponent(cc.RectTransform);
        rctran = noderight.getComponent(UITransform).contentSize;
        var v2 = noderight.getPosition().x - rctran.width / 2;
        return (v1 + v2) / 2;
    }
    //两个node之间的中心位置y
    GetBetweenCenterY(node1, node2) {
        var nodeDown, nodeUp;
        if (node1.getPosition().y < node2.getPosition().y) {
            nodeDown = node1;
            nodeUp = node2;
        } else {
            nodeDown = node2;
            nodeUp = node1;
        }
        // var rctran = nodeDown.getComponent(cc.RectTransform);
        var rctran = nodeDown.getComponent(UITransform).contentSize;
        var v1 = nodeDown.getPosition().y + rctran.height / 2;
        // rctran = nodeUp.getComponent(cc.RectTransform);
        rctran = nodeUp.getComponent(UITransform).contentSize;
        var v2 = nodeUp.getPosition().y - rctran.height / 2;
        return (v1 + v2) / 2;
    }

    //node和屏幕边界之间的中心位置x或者y
    GetBetweenScreenCenter(node, align) {
        var v1 = 0, v2 = 0;
        var sizeCanvas = AppSceneBase.Main().sizeCanvas;
        var rctran = node.getComponent(UITransform).contentSize;
        // var rctran = node.getComponent(cc.RectTransform);
        switch (align) {
            case Align.LEFT:
                {
                    //左边界
                    v1 = -sizeCanvas.width / 2;
                    v2 = node.getPosition().x - rctran.width / 2;
                }
                break;
            case Align.RIGHT:
                {
                    //右边界
                    v1 = sizeCanvas.width / 2;
                    v2 = node.getPosition().x + rctran.width / 2;
                }
                break;
            case Align.UP:
                {
                    //上边界
                    v1 = sizeCanvas.height / 2;
                    v2 = node.getPosition().y + rctran.height / 2;
                }
                break;
            case Align.DOWN:
                {
                    //下边界
                    v1 = -sizeCanvas.height / 2;
                    v2 = node.getPosition().y - rctran.height / 2;
                }
                break;
        }

        return (v1 + v2) / 2;
    }



    //两个对象之间的宽度或者高度 cc.Node
    GetBetweenTwoTargetSize(node1, node2, isHeight) {
        var objDown, objUp;
        var pos1 = node1.getPosition();
        var pos2 = node2.getPosition();
        if (pos1.y < pos2.y) {
            objDown = node1;
            objUp = node2;
        }
        else {
            objDown = node2;
            objUp = node1;
        }
        var pos = objDown.getPosition();
        var size = objDown.getBoundingBox();
        var y1 = pos.y + size.height / 2;
        var x1 = pos.x + size.width / 2;

        // objUp
        pos = objUp.getPosition();
        size = objUp.getBoundingBox();
        var y2 = pos.y - size.height / 2;
        var x2 = pos.x - size.width / 2;

        var ret = 0;
        if (isHeight) {
            ret = Math.abs(y1 - y2);
        }
        else {
            ret = Math.abs(x1 - x2);
        }

        return ret;
    }


    //边界和对象之间的宽度或者高度 type SizeType
    GetBetweenSideAndTargetSize(node, type) {
        var v1 = 0, v2 = 0;
        var size = node.getBoundingBox(); 
        var pos = node.getPosition();
        var sizeParent = node.parent.getBoundingBox(); 
        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height; 
        switch (type) {
            case SideType.LEFT:
                {
                    //左边界
                    v1 = -w_parent / 2;
                    v2 = pos.x - size.width / 2;
                }
                break;
            case SideType.RIGHT:
                {
                    //右边界
                    v1 = w_parent / 2;
                    v2 = pos.x + size.width / 2;
                }
                break;
            case SideType.UP:
                {
                    //上边界
                    v1 = h_parent / 2;
                    v2 = pos.y + size.height / 2;
                }
                break;
            case SideType.DOWN:
                {
                    //下边界
                    v1 = -h_parent / 2;
                    v2 = pos.y - size.height / 2;
                }
                break;
        }

        var ret = 0;

        ret = Math.abs(v1 - v2);

        return ret;
    }

    GetChildCount(node, includeHide = true) {
        var count = 0;
        for (var i = 0; i < node.children.length; i++) {
            var child = node.children[i];
            if (child == null) {
                // 过滤已经销毁的嵌套子对象 
                continue;
            }
            //     GameObject objtmp = child.gameObject;
            //     if (this.gameObject == objtmp) {
            //         continue;
            //     }

            if (!includeHide) {
                if (!child.active) {
                    //过虑隐藏的
                    continue;
                }
            }

            var le = child.getComponent(LayOutElement);
            if (le != null && le.ignoreLayout) {
                continue;
            }

            //     if (objtmp.transform.parent != this.gameObject.transform) {
            //         //只找第一层子物体
            //         continue;
            //     }
            count++;
        }

        return count;
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
