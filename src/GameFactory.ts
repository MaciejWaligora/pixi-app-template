import * as PIXI from 'pixijs'
import { GameConfig } from './Config/GameConfig';
import { AssetLoader } from "gamecraft-assetloader";
import { SampleLogoModel } from './Lib/Models/SampleLogoModel';
import { SampleLogoView } from './Lib/Views/SampleLogoView';
import { GameController } from './Lib/Controllers/GameController';
import { AnimationManager } from "gamecraft-animation";
import { SoundManager } from "gamecraft-sound";


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
        const sampleLogoModel = new SampleLogoModel({});
        const sampleLogoView =  new SampleLogoView({texture: sampleLogoTexture[0], renderer: renderer});
        const animationManager = new AnimationManager({renderer: renderer});
        const soundManager = new SoundManager();
        soundManager.loadBackgroundSound(config.audio.background);
        soundManager.loadSfxTracks(config.audio.sfxTracks);
        const gameController = new GameController({
            sampleLogoModel: sampleLogoModel,
            sampleLogoView: sampleLogoView,
            animationManager: animationManager,
            soundManager: soundManager
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