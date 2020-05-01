const { ccclass, property } = cc._decorator

@ccclass
export default class Block extends cc.Component {

    rigidCollider: cc.PhysicsBoxCollider = null

    onLoad() {
        this.rigidCollider = this.node.getComponent(cc.PhysicsBoxCollider)
    }

    initBlock(): void {
        const width: number = this.getRandmWidth()
        this.node.width = width
        this.rigidCollider.size.width = width
        this.rigidCollider.apply()
    }

    getRandmWidth(): number {
        return 80 + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 40)
    }
}
