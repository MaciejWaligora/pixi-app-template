

import { CollisionDetector } from 'gamecraft-collision-detector';
import { Signal } from 'gamecraft-utils';
import { FoodView, FoodViewConfig } from '../../Views/FoodView/FoodView';
import { ViewController, ViewControllerConfig } from 'gamecraft-controllers';

export interface FoodViewControllerConfig extends ViewControllerConfig{
    view: FoodView<FoodViewConfig>;
}

export class FoodViewController<Tconfig extends FoodViewControllerConfig> extends ViewController<FoodViewControllerConfig>{

    public clickedSignal = new Signal();

    constructor(config: Tconfig){
        super(config);
        this._config.view.clickedSignal.addListener(this.onClicked, this);

    }
    public add(){
        this._config.view.add();
        CollisionDetector.addCollisionZone(this._config.view);
    }

    public remove(){
        this._config.view.remove();
        CollisionDetector.removeCollisionZone(this._config.view);
    }

    public show(){
        this._config.view.show();
        CollisionDetector.addCollisionZone(this._config.view);
    }

    public hide(){
        this._config.view.hide();
        CollisionDetector.removeCollisionZone(this._config.view);
    }

    public setRandomPosition(){
        this._config.view.setRandomPosition();
    }

    private onClicked(){
       this.clickedSignal.emit();
    }
}
