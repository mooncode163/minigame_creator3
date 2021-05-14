
import { _decorator, Component, Node, CCObject, resources, Texture2D } from 'cc';
import { Debug } from '../Debug';

const { ccclass, property } = _decorator;

// 动态加载资源文档
// https://docs.cocos.com/creator/3.0/manual/en/asset/dynamic-load-resources.html

@ccclass('ShareWeiXin')
export class ShareWeiXin extends CCObject {
     //微信小程序 菜单 “转发”按钮
     SetWeiXinMPShareMenu (title:string, pic:string) {
        wx.onShareAppMessage(() => ({
            title: title,
            imageUrl: pic,
        }))
    }

    // image 分辨率 5:4  如 1000 × 800
    ShareImageText (source:string, title:string, pic:string, url:string) {
        this.SetWeiXinMPShareMenu(title, pic);
        wx.shareAppMessage({
            title: title,
            imageUrl: pic,
            success: function (res) {
                Debug.Log("weixin share success");
                //getSystemInfo是为了获取当前设备信息，判断是android还是ios，如果是android
                //还需要调用wx.getShareInfo()，只有当成功回调才是转发群，ios就只需判断shareTickets
                //获取用户设备信息
                // wx.getSystemInfo({
                //     success: function (d) {
                //         console.log(d);
                //         //判断用户手机是IOS还是Android
                //         if (d.platform == 'android') {
                //             wx.getShareInfo({//获取群详细信息
                //                 shareTicket: res.shareTickets,
                //                 success: function (res) {
                //                     //这里写你分享到群之后要做的事情，比如增加次数什么的
                //                 },
                //                 fail: function (res) {//这个方法就是分享到的是好友，给一个提示
                //                     wx.showModal({
                //                         title: '提示',
                //                         content: '分享好友无效，请分享群',
                //                         success: function (res) {
                //                             if (res.confirm) {
                //                                 console.log('用户点击确定')
                //                             } else if (res.cancel) {
                //                                 console.log('用户点击取消')
                //                             }
                //                         }
                //                     })
                //                 }
                //             })
                //         }
                //         if (d.platform == 'ios') {//如果用户的设备是IOS
                //             if (res.shareTickets != undefined) {
                //                 console.log("分享的是群");
                //                 wx.getShareInfo({
                //                     shareTicket: res.shareTickets,
                //                     success: function (res) {
                //                         //分享到群之后你要做的事情
                //                     }
                //                 })

                //             } else {//分享到个人要做的事情，我给的是一个提示
                //                 console.log("分享的是个人");
                //                 wx.showModal({
                //                     title: '提示',
                //                     content: '分享好友无效，请分享群',
                //                     success: function (res) {
                //                         if (res.confirm) {
                //                             console.log('用户点击确定')
                //                         } else if (res.cancel) {
                //                             console.log('用户点击取消')
                //                         }
                //                     }
                //                 })
                //             }
                //         }

            },
            fail: function (res) {
                Debug.Log("weixin share fails");
            }
        })
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
