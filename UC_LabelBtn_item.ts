/*
 * @Author: 孙国强
 * @Date:   2020-08-04 18:01:16
<<<<<<< Updated upstream
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-08-09 14:09:10
=======
 * @Last Modified by:   Your name
 * @Last Modified time: 2020-08-08 18:01:00
>>>>>>> Stashed changes
 */

import UV_labelBtn_item from "../uv/UV_labelBtn_item";
import UIBase from "../../../Scripts/Logic/UiController/core/UIBase";
import UIHelper from "../../../Scripts/Logic/UiController/core/UIHelper";
import UV_menuScrollView from "../uv/UV_menuScrollView";

const { ccclass, menu, property } = cc._decorator;

@ccclass
@menu("UI/common/UC_LabelBtn_item")
export default class UC_LabelBtn_item extends UIBase {
	ui: UV_labelBtn_item = null;

	protected static prefabUrl = "prefabs/common/labelBtn_item";
	protected static className = "UC_LabelBtn_item";

	private mune_uv: UV_menuScrollView = null;
	private targetDis: number = 0;
	//遮罩世界坐标
	private viewMask_world: cc.Vec2;
	//遮罩顶端世界坐标高度
	private viewHighTop_world: number = 0;
	private viewHighBottom_world: number = 0;
	//当前按钮世界坐标，相对底部中心位置
	private curBtnPos_world: cc.Vec2;
	private scroll_com: cc.ScrollView = null;

	onUILoad() {
		this.ui = this.node.addComponent(UV_labelBtn_item);
		this.onRegisterEvent(this.ui.labelBtn_item, this.selectBtn, this);
	}

	onShow() {
		console.log("本地");
			console.log("远端");
	}

	onHide() {

	}

	onStart() {

	}

	onClose() {
		UIHelper.CloseUI(UC_LabelBtn_item);
	}

	public selectBtn() {
		if(this.ui.labelBtn_bg!=null){
			this.ui.labelBtn_bg.active = true;
		}
		// if(this.node.children[0]!=null){
		// 	this.node.children[0].active=true;
		// }
		//this.ui.labelBtn_bg.getComponent(cc.Sprite).enabled=true;
	}

	public resetBtn() {
		if(this.ui.labelBtn_bg!=null){
			this.ui.labelBtn_bg.active = false;
		}
		// if(this.node.children[0]!=null){
		// 	this.node.children[0].active=false;
		// }
		
		//this.ui.labelBtn_bg.getComponent(cc.Sprite).enabled=false;
	}

	public synScrollViewPos(mune: cc.Node) {
		this.scheduleOnce(function () {
			this.delayMove(mune);
		}, 0.1);
	}

	delayMove(mune: cc.Node) {
		this.mune_uv = mune.getComponent(UV_menuScrollView);
		this.scroll_com = mune.getComponent(cc.ScrollView);
		//遮罩世界坐标
		this.viewMask_world = this.mune_uv.view.convertToWorldSpaceAR(cc.v2(0.5, 0.5));
		//遮罩顶端世界坐标高度
		this.viewHighTop_world = this.viewMask_world.y + this.mune_uv.view.height / 2;
		this.viewHighBottom_world = this.viewMask_world.y - this.mune_uv.view.height / 2;
		//当前按钮世界坐标
		this.curBtnPos_world = this.node.convertToWorldSpaceAR(cc.v2(0.5, 0.5));
		let scrollCom_Hight = this.mune_uv.menuScrollView.height;

		//要移动相对于左上角，预制体anchor=(0.5,1),content顶部在整个scrollview的中心，长度是559，一半280
		if ((this.curBtnPos_world.y - this.node.height / 2) < this.viewHighBottom_world) {
			this.targetDis = this.viewMask_world.y - this.curBtnPos_world.y - 280;
			this.moveScrContent(this.targetDis);
		} else if ((this.curBtnPos_world.y + this.node.height / 2) > this.viewHighTop_world) {
			this.targetDis = this.viewMask_world.y - this.curBtnPos_world.y - 280;
			this.moveScrContent(this.targetDis);
		}
	}

	private moveScrContent(dis: number) {
		this.scroll_com.scrollToOffset(cc.v2(
			this.mune_uv.content.position.x,
			(this.mune_uv.content.position.y + dis)
		), 0.3);
	}
}
