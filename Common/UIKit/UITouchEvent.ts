
import { _decorator, Component, Node, Prefab } from 'cc';  
const { ccclass, property, type } = _decorator;

@ccclass('UITouchEvent')
export class UITouchEvent extends Component {
    
    statics: {
        TOUCH_DOWN: 0,
        TOUCH_MOVE: 1,
        TOUCH_UP: 2,
    },
    properties: {

        // uiTabBarPrefab: {
        //     default: null,
        //     type: cc.Prefab,
        // },
        // iDelegate: IPopViewControllerDelegate,

        // (UITouchEvent ev,int status, pos) 
        callBackTouch: null,
    },

    onLoad: function () {
        this.Init();
    },

    Init: function () {
        // cc.Debug.Log("UITouchEvent Init");
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
            // var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
            // var posnodeAR = this.node.convertToNodeSpaceAR(pos);//坐标原点在node的锚点

            // cc.Debug.Log("UITouchEvent OnTouchDown:pos=" + pos+ " posnode="+posnode);
            if (this.callBackTouch != null) {
                this.callBackTouch(this, UITouchEvent.TOUCH_DOWN, event);
            }
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            // var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
            // var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
            // var posnodeAR = this.node.convertToNodeSpaceAR(pos);//坐标原点在node的锚点
            if (this.callBackTouch != null) {
                this.callBackTouch(this, UITouchEvent.TOUCH_MOVE, event);
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            // var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
            // var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
            // var posnodeAR = this.node.convertToNodeSpaceAR(pos);//坐标原点在node的锚点
            if (this.callBackTouch != null) {
                this.callBackTouch(this, UITouchEvent.TOUCH_UP, event);
            }
        }, this);
    },

     

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
