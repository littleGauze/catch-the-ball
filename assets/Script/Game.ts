import Ball from './Ball'
import Block from './Block'

const { ccclass, property } = cc._decorator

@ccclass
export default class Game extends cc.Component {

    @property(cc.Label)
    scoreLabel: cc.Label = null

    @property(cc.Node)
    ballNode: cc.Node = null

    @property(cc.Node)
    blockAreas: cc.Node = null

    @property(cc.Prefab)
    blockPrefab: cc.Prefab = null

    private score: number = 0

    private running: boolean = false

    onLoad() {
        this.node.on('touchstart', this.boost, this)

        this.initPhysicSystem()
        this.initBlocks()
    }

    onDestroy() {
        this.node.off('touchstart', this.boost, this)
    }

    initPhysicSystem(): void {
        const physic: cc.PhysicsManager = cc.director.getPhysicsManager()
        physic.enabled = true
        physic.gravity = cc.v2(0, -2400)
    }

    initBlocks(): void {
        for (let i = 0; i < 10; i++) {
            const block: cc.Node = cc.instantiate(this.blockPrefab)
            this.blockAreas.addChild(block)
            block.getComponent(Block).initBlock()
            block.y = 0
            block.x = -200 + i * 200
        }
    }

    boost(): void {
        if (this.ballNode.getComponent(Ball).initVel) {
            this.running = true
            const rigidBody: cc.RigidBody = this.ballNode.getComponent(cc.RigidBody)
            rigidBody.linearVelocity = cc.v2(0, -1600)
        }
    }


    update(dt: number): void {
        if (!this.running) return
        const blocks: Array<cc.Node> = this.blockAreas.children
        for (let i = 0; i < blocks.length; i++) {
            const block: cc.Node = blocks[i]
            block.x -= 300 * dt

            // block recycling
            if (block.x < -(cc.winSize.width / 2 + block.width / 2)) {
                block.x = this.getLastBlockX() + 200
                block.getComponent(Block).initBlock()
                this.score++
                this.scoreLabel.string = this.score + ''
            }

            // check game over
            if (this.ballNode.y < -cc.winSize.height / 2) {
                this.running = false
                cc.director.loadScene('game')
            }
        }
    }

    getLastBlockX(): number {
        const blocks: Array<cc.Node> = this.blockAreas.children

        let posX = 0
        for (let i = 0; i < blocks.length; i++) {
            const block: cc.Node = blocks[i]
            if (block.x > posX) {
                posX = block.x
            }
        }
        return posX
    }
}
