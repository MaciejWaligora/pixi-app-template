
import { ConstantMoveAnimation, ConstantMoveAnimationConfig } from '../../Animations/ConstantMoveAnimation';
import { Direction } from '../Models/SnakeHeadModel';
import { Signal } from '../Signal';
import { SnakeHeadView, SnakeHeadViewConfig } from '../Views/SnakeHeadView';
import { ViewController, ViewControllerConfig } from './ViewController';

export interface SnakeHeadViewControllerConfig extends ViewControllerConfig{
    view: SnakeHeadView<SnakeHeadViewConfig>;
}

export class SnakeHeadViewController<Tconfig extends SnakeHeadViewControllerConfig> extends ViewController<SnakeHeadViewControllerConfig>{

    public movedSignal = new Signal<{x:number, y: number}>();
    private _speed = 0;
    private _direction: Direction = 'up';
    private _currentAnimation: ConstantMoveAnimation<ConstantMoveAnimationConfig> | null = null
    public addedSignal = new Signal<{x:number, y: number}>();


    constructor(config: Tconfig){
        super(config);
        this._config.view.addedSignal.addListener(this._onAdded, this);
    }
    public add(){
        this._config.view.add();
        this.movedSignal.emit({x:this._config.view.x, y: this._config.view.y})
    }

    private _onAdded(){
        this.addedSignal.emit({x:this._config.view.x, y: this._config.view.y});
    }

    public remove(){
        this._config.view.remove();
    }

    public show(){
        this._config.view.show();
    }

    public hide(){
        this._config.view.hide();
    }

    public setSpeed(speed: number){
        this._speed = speed;
        if(this._currentAnimation){
            this._currentAnimation.stop();
            this._currentAnimation = this._config.animationManager.playLinearMoveInfnitely(this._config.view, this._direction, this._speed);
            this._currentAnimation.positionChangedSignal.addListener((e)=>{this.movedSignal.emit(e)},this);
        }
    }

    public setDirection(dir: Direction){
        this._direction = dir;
        if(this._currentAnimation){
            this._currentAnimation.stop();
            this._currentAnimation = this._config.animationManager.playLinearMoveInfnitely(this._config.view, this._direction, this._speed);
            this._currentAnimation.positionChangedSignal.addListener((e)=>{this.movedSignal.emit(e)},this);
        }

        switch (dir){
            case 'up':
                this._config.view.rotation = 0;
                break;
            case 'down':
                this._config.view.rotation = Math.PI;
                break;
            case 'left':
                this._config.view.rotation = Math.PI + Math.PI/2;
                break;
            case 'right':
                this._config.view.rotation = Math.PI/2;
                break;
        }

    }   

    public startMoving(){
        if(this._currentAnimation){
            this._currentAnimation.stop();
        }
        this._currentAnimation = this._config.animationManager.playLinearMoveInfnitely(this._config.view, this._direction, this._speed);
        this._currentAnimation.positionChangedSignal.addListener((e)=>{this.movedSignal.emit(e)},this);
    }

    public stopMoving(){
        if(this._currentAnimation){
            this._currentAnimation.stop();
        }
    }


}
