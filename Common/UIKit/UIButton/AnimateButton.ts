
import { _decorator, Component, Node, Sprite, Label, Button, EventHandler, tween, Vec3 } from 'cc';
import { AudioPlay } from '../../Audio/AudioPlay';
import { Common } from '../../Common';
import { CommonRes } from '../../CommonRes';
import { Debug } from '../../Debug';
import { UIView } from '../ViewController/UIView';
const { ccclass, property, type, string } = _decorator;

// TypeScript自动引入脚本插件
// https://blog.csdn.net/u011004567/article/details/78507236
// VS Code的插件-TypeScript Importer

@ccclass('AnimateButton')
export class AnimateButton extends Button {
    // @type([EventHandler])
    // clickAnimateEvents: EventHandler[] = []; 
    @type([EventHandler])
    // @serializable
    // @displayOrder(20)
    // @tooltip('按钮点击事件的列表。先将数量改为1或更多，就可以为每个点击事件设置接受者和处理方法')
    public clickAnimateEvents: EventHandler[] = [];
    // onLoad() {
    //     // super.onLoad();
    //     // if (this.clickEvents.length) {
    //     //     var ev = this.clickEvents[0];
    //     //     ev.target = this.node;
    //     //     ev.component = "AnimateButton";
    //     //     ev.handler = "OnClickItem";
    //     // }
    // }

    // start() { 
    //     // super.start();
    // }
    OnClickItem(event: Event, customEventData: string) {
        // The event here is a Touch object, and you can get the send node of the event by event.target
        // const node = event.target as Node;
        //  const button = node.getComponent(Button);
        //  console.log(customEventData); // foobar

        Debug.Log("AnimateButton OnClickItem");
        var duration = 0.2;

        // var actionTo1 = cc.scaleTo(duration / 2, 1.2);
        // var actionTo2 = cc.scaleTo(duration / 2, 1);
        // //delay延时
        // var time = cc.delayTime(0.01);
        // var seq = cc.sequence([time, actionTo1, actionTo2, cc.callFunc(function () {
        //     this.DoClickItem(event, customEventData);
        // }.bind(this))]);
        // this.node.runAction(seq);


        var scale1 = 1.2;
        var scale2 = 1;

        tween(this.node)
            .delay(0.01)
            .to(duration / 2, { scale: new Vec3(scale1, scale1, 1) })
            .to(duration / 2, { scale: new Vec3(scale2, scale2, 1) })
            .call(() => {
                console.log('AnimateButton scale animate finish');
                this.DoClickItem(event, customEventData);
            })
            .start()
        var ret = Common.GetBoolOfKey(CommonRes.KEY_BTN_SOUND, false);
        if (ret) {
            //play sound click
            AudioPlay.main.PlayByKey("BtnClick");
        }
    }

    DoClickItem(event: Event, customEventData: string) {
        Debug.Log("AnimateButton DoClickItem");
        // cc.Component.EventHandler.emitEvents(this.clickAnimateEvents, event);
        //Component.EventHandler.emitEvents(this.clickAnimateEvents, event);
        EventHandler.emitEvents(this.clickAnimateEvents, event);
         
        // this.node.emit(EventType.CLICK, this);
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
