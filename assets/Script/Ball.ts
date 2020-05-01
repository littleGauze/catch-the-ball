
const { ccclass, property } = cc._decorator

@ccclass
export default class Ball extends cc.Component {

    initVel: number = 0

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        const rigidBody: cc.RigidBody = selfCollider.node.getComponent(cc.RigidBody)
        if (!this.initVel) {
            this.initVel = rigidBody.linearVelocity.y
        } else {
            rigidBody.linearVelocity = cc.v2(0, this.initVel)
        }
    }
}
