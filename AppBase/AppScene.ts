
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
// import AppSceneBase = require("AppSceneBase");
 
// import {  AppSceneBase } ;
import { AppSceneBase } from "./Common/AppSceneBase";

@ccclass('AppScene')
export class AppScene extends AppSceneBase {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    onLoad () {
        // [3]
        super.onLoad();
        console.log("AppScene onLoad");
    }
    start () {
        // [3]
        super.start();
        console.log("AppScene start");
    }
    RunApp () {
        console.log("AppScene RunApp");

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
