import * as PIXI from 'pixijs'
import { GameConfig } from './Config/GameConfig';
import { AssetLoader } from "gamecraft-assetloader";
import { SampleLogoModel } from './Lib/Models/SampleLogoModel/SampleLogoModel';
import { SampleLogoView } from './Lib/Views/SampleLogoView/SampleLogoView';
import { GameController } from './Lib/Controllers/GameController';
import { AnimationManager } from "gamecraft-animation";
import { SnakeHeadModel } from './Lib/Models/SnakeModel/SnakeHeadModel';
import { SnakeHeadView } from './Lib/Views/SnakeView/SnakeHeadView';
import { InputHandler } from "gamecraft-input";
import { SnakeBodyModel } from './Lib/Models/SnakeModel/SnakeBodyModel';
import { SnakeBodyView } from './Lib/Views/SnakeView/SnakeBodyView';
import { CollisionDetector } from "gamecraft-collision-detector";
import { FoodModel } from './Lib/Models/FoodModel/FoodModel';
import { FoodView } from './Lib/Views/FoodView/FoodView';


export interface Game{
    renderer: PIXI.Application,
    models:{
    },
    views:{
    },
    controllers:{
    }
}

export class GameFactory {

    public static async InitializeGame(config: GameConfig): Promise<Game>{

        const renderer = new PIXI.Application(config.display);
        await AssetLoader.loadBackground(config.assets.background, renderer, config.display.background);
        const sampleLogoTexture = await AssetLoader.getTextures([config.assets.sampleLogo]);
        const snakeHeadTexture = await AssetLoader.getTextures([config.assets.snakeHead]);
        const snakeBodyPartTexture = await AssetLoader.getTextures([config.assets.snakeBodyPart]);
        const foodTexture = await AssetLoader.getTextures([config.assets.food]);

        const sampleLogoModel = new SampleLogoModel({});
        const snakeHeadModel = new SnakeHeadModel(config.snakeConfig);
        const snakeBodyModel = new SnakeBodyModel(config.snakeConfig);
        const foodModel = new FoodModel({});
        
        const sampleLogoView =  new SampleLogoView({texture: sampleLogoTexture[0], renderer: renderer, interactive: true});
        const snakeHeadView = new SnakeHeadView({texture: snakeHeadTexture[0], renderer: renderer, interactive: false, scale: 0.05});
        const snakeBodyView = new SnakeBodyView({texture: snakeBodyPartTexture[0], renderer: renderer, initialLength: config.snakeConfig.initialLength, interactive: false});
        const foodView = new FoodView({texture: foodTexture[0], renderer: renderer, interactive: false, scale: 0.06});
        
        const animationManager = new AnimationManager({renderer: renderer});

        CollisionDetector.addImpactor(snakeHeadView);
        CollisionDetector.init(renderer);
        
        InputHandler.addKeyboardInput();

        const gameController = new GameController({
            sampleLogoModel: sampleLogoModel,
            sampleLogoView: sampleLogoView,
            animationManager: animationManager,
            snakeHeadModel: snakeHeadModel,
            snakeHeadView: snakeHeadView,
            snakeBodyModel: snakeBodyModel,
            snakeBodyView: snakeBodyView,
            foodModel: foodModel,
            foodView: foodView
        });

        gameController.init();
        return {
            renderer: renderer,
            models: {
            },
            views: {
            },
            controllers: {
            }
        }
    }

}