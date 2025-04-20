const game = {
    bgm: null,
    bgmPlaying: true
};

const scenes = {};
let bg, bg1_2, pillars, floors;
let prop1, prop2, trap1, trap2, trap3, hearts, treasure, button, key;
let player, player2; 
let cursors;
let lives = 3;
let gameOver = false;
let restartText, winText, restartButton;
let bg2, bg2_2, pillars2, floors2;
let trap2_1, trap2_2, prop, button2;
let passedLevels = 0;
let isPlayingMoveSound = false;

scenes.HomeScene = class HomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HomeScene' });
    }

    preload() {
        this.load.image('background_home', 'assets/img/index.png');
        this.load.image('bgmOn', 'assets/img/bgm_on.png');
        this.load.image('bgmOff', 'assets/img/bgm_off.png');
        this.load.audio('bgm', 'assets/SoundEffect/Greece Theme - Medieval (Civilization 6 OST) Epitaph of Seikilos.mp3');
        this.load.spritesheet('idle', './assets/girl/Idle_KG_2.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('idle2', './assets/brother/Idle-Sheet.png', { frameWidth: 64, frameHeight: 80 });
    }

    create() {
        this.add.image(400, 300, 'background_home').setScale(1.8);
    
        this.add.text(400, 120, 'Ο θησαυρός του Θεού', { 
            fontSize: '48px', 
            fill: '#fff', 
            fontStyle: 'bold',
            stroke: '#000', 
            strokeThickness: 8,
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, stroke: true, fill: true }
        }).setOrigin(0.5).setDepth(1);
    
        this.add.text(400, 180, 'The Treasure of the Gods', { 
            fontSize: '32px', 
            fill: '#fff', 
            fontStyle: 'italic',
            stroke: '#000', 
            strokeThickness: 6,
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, stroke: true, fill: true }
        }).setOrigin(0.5).setDepth(1);
    
        this.add.sprite(650, 550, 'idle').setScale(1.5);
        this.add.sprite(220, 520, 'idle2').setScale(1.7);
    
        const buttonStyle = {
            fontSize: '24px', 
            fill: '#fff', 
            backgroundColor: '#4CAF50', 
            padding: { left: 20, right: 20, top: 10, bottom: 10 }, 
            borderRadius: 10, 
            align: 'center', 
            fontStyle: 'bold'
        };
    
        const startButton = this.add.text(400, 350, 'Start', buttonStyle).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('LevelSelectScene');
        });
        startButton.on('pointerover', () => {
            startButton.setStyle({ fill: '#ff0' });
        });
        startButton.on('pointerout', () => {
            startButton.setStyle({ fill: '#fff' });
        });
    
        const instructionsButton = this.add.text(400, 490, 'Instructions', buttonStyle).setOrigin(0.5);
        instructionsButton.setInteractive();
        instructionsButton.on('pointerdown', () => {
            this.scene.start('InstructionsScene'); 
        });
        instructionsButton.on('pointerover', () => {
            instructionsButton.setStyle({ fill: '#ff0' });
        });
        instructionsButton.on('pointerout', () => {
            instructionsButton.setStyle({ fill: '#fff' });
        });
    
        const storyButton = this.add.text(400, 420, 'Story', buttonStyle).setOrigin(0.5);
        storyButton.setInteractive();
        storyButton.on('pointerdown', () => {
            this.scene.start('StoryScene');
        });
        storyButton.on('pointerover', () => {
            storyButton.setStyle({ fill: '#ff0' });
        });
        storyButton.on('pointerout', () => {
            storyButton.setStyle({ fill: '#fff' });
        });
    
        this.bgmButton = this.add.sprite(750, 550, game.bgmPlaying ? 'bgmOn' : 'bgmOff').setInteractive();
        this.bgmButton.setScale(0.05);
        this.bgmButton.setOrigin(0.5);
    
        this.bgmButton.on('pointerdown', () => {
            if (game.bgmPlaying) {
                game.bgm.stop();
                this.bgmButton.setTexture('bgmOff');
            } else {
                game.bgm.play();
                this.bgmButton.setTexture('bgmOn');
            }
            game.bgmPlaying = !game.bgmPlaying;
        });
    
        if (!game.bgm) {
            game.bgm = this.sound.add('bgm');
            game.bgm.play({ loop: true });
        }
    }
    
    
};

scenes.LevelSelectScene = class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectScene' });
    }

    preload() {
        this.load.image('background_level_select', 'assets/img/desert.jpg');
    }

    create() {
        this.bgmButton = this.add.sprite(750, 550, game.bgmPlaying ? 'bgmOn' : 'bgmOff').setInteractive();
        this.bgmButton.setScale(0.05);
        this.bgmButton.setOrigin(0.5);
    
        this.bgmButton.on('pointerdown', () => {
            if (game.bgmPlaying) {
                game.bgm.stop();
                this.bgmButton.setTexture('bgmOff');
            } else {
                game.bgm.play();
                this.bgmButton.setTexture('bgmOn');
            }
            game.bgmPlaying = !game.bgmPlaying;
        });
    
        if (!game.bgm) {
            game.bgm = this.sound.add('bgm');
            game.bgm.play({ loop: true });
        }
    
        this.add.image(400, 300, 'background_level_select').setScale(1.7);
    
        this.add.text(400, 180, 'Level Select', { 
            fontSize: '48px', 
            fill: '#fff',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 6,
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, stroke: true, fill: true }
        }).setOrigin(0.5);
    
        const level1Button = this.createLevelButton(400, 350, 'Egypt', 'GameScene1', 1);
        const level2Button = this.createLevelButton(400, 420, 'Mesopotamia', 'GameScene2', 2);
        // const level3Button = this.createLevelButton(400, 490, 'Level 3', 'GameScene3', 3);
    
        if (passedLevels < 1) {
            this.lockLevelButton(level2Button);
            // this.lockLevelButton(level3Button);
        } else if (passedLevels < 2) {
            this.lockLevelButton(level1Button);
            // this.lockLevelButton(level3Button);
        } else {
            this.lockLevelButton(level1Button);
            this.lockLevelButton(level2Button);
        }
    
        const backButton = this.add.text(100, 50, 'Return to Home', { 
            fontSize: '18px', 
            fill: '#fff', 
            backgroundColor: '#4CAF50',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 10,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start('HomeScene');
        });
    
        backButton.on('pointerover', () => {
            backButton.setStyle({ fill: '#ff0' }); 
        });
        backButton.on('pointerout', () => {
            backButton.setStyle({ fill: '#fff' }); 
        });
    }
    
    createLevelButton(x, y, text, sceneKey, levelNumber) {
        const button = this.add.text(x, y, text, { 
            fontSize: '24px', 
            fill: '#fff', 
            backgroundColor: '#4CAF50', 
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 10,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        button.setInteractive();
        button.on('pointerdown', () => {
            this.scene.start(sceneKey);
        });
    
        button.on('pointerover', () => {
            button.setStyle({ fill: '#ff0' }); 
        });
        button.on('pointerout', () => {
            button.setStyle({ fill: '#fff' }); 
        });
    
        return button;
    }
    
    lockLevelButton(button) {
        button.setStyle({ fill: 'gray', backgroundColor: '#ddd' });
        button.removeInteractive();
    }
    
}


scenes.StoryScene = class StoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StoryScene' });
    }

    preload() {
        this.load.image('background_story', 'assets/img/night.png');
        this.load.audio('bgm', 'assets/audio/background.mp3'); 
    }

    create() {

        this.add.image(400, 310, 'background_story').setScale(1.7).setOrigin(0.5).setAlpha(0.3);

        this.bgmButton = this.add.sprite(750, 550, game.bgmPlaying ? 'bgmOn' : 'bgmOff').setInteractive();
        this.bgmButton.setScale(0.05);
        this.bgmButton.setOrigin(0.5);

        this.bgmButton.on('pointerdown', () => {
            if (game.bgmPlaying) {
                game.bgm.stop();
                this.bgmButton.setTexture('bgmOff');
            } else {
                game.bgm.play();
                this.bgmButton.setTexture('bgmOn');
            }
            game.bgmPlaying = !game.bgmPlaying;
        });

        if (!game.bgm) {
            game.bgm = this.sound.add('bgm');
            game.bgm.play({ loop: true });
        }

        this.languageButton = this.add.text(700, 20, '', {
            fontSize: '16px',
            backgroundColor: '#2196F3', 
            padding: 10,
            color: 'white'
        }).setOrigin(0.5);
        this.languageButton.setInteractive();

        this.isChinese = false; 
        this.updateLanguageButton();

        this.languageButton.on('pointerover', () => {
            this.languageButton.setStyle({ backgroundColor: '#1976D2' });  
        });

        this.languageButton.on('pointerout', () => {
            this.languageButton.setStyle({ backgroundColor: '#2196F3' }); 
        });

        this.languageButton.on('pointerdown', () => {
            this.isChinese = !this.isChinese;  
            this.updateLanguageButton();  
            this.displayStory();  
        });

        this.currentIndex = 0;   
        this.displayStory();
    }

    updateLanguageButton() {
        if (this.isChinese) {
            this.languageButton.setText('中文');
        } else {
            this.languageButton.setText('English');
        }
    }

 
    displayStory() {
        const textArray = this.isChinese ? chineseStoryText : englishStoryText;

        if (this.storyTextObject) {
            this.storyTextObject.destroy();  
        }

        this.storyTextObject = this.add.text(400, 310, '', {
            fontSize: '24px',
            fill: '#fff',
            padding: 50,
            wordWrap: { width: 600, useAdvancedWrap: true },
            lineSpacing: 10,
            align: 'center',
        }).setOrigin(0.5);

        if (this.currentIndex < textArray.length) {
            this.storyTextObject.setText(textArray[this.currentIndex]);
            this.currentIndex++;
            this.time.addEvent({
                delay: 5000,
                callback: () => {
                    this.displayStory();
                }
            });
        } else {
            this.showBackButton();
        }
    }

    showBackButton() {
        const backButton = this.add.text(400, 500, '返回主页', {
            fontSize: '24px',
            backgroundColor: '#4CAF50',
            padding: 10
        }).setOrigin(0.5);
        backButton.setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('HomeScene');
        });
    }
}

const chineseStoryText = [
    "在一片荒漠中 哥哥醒了過來 他看著仍在睡夢中的妹妹 不可思議地盯著自己的手 ",
    "「這是夢嗎？」 他喃喃自語道 肌膚上風沙帶來的砂礫感告訴他 這不是夢 他回想起了不久前的經歷",
    "「我需要你們兄妹幫我收集寶藏」 一個看不清面容的人突然出現在他們身後 突兀地對他們說道",
    "他還來不及反應 一陣風沙突然襲來 將他們捲入風暴之中",
    "他們很快便失去意識",
    "「早安，哥哥。」妹妹的聲音將哥哥從回憶中驚醒，重新將注意力拉回到現實中來。",
    "他開始想著之後該如何行動，但很快地他就決定了下來。",
    "「收集寶藏甚麼的，不正是我們這種寶藏獵人的拿手好戲嗎？」",
    "妹妹似乎跟哥哥心有靈犀似的，心情也開始興奮了起來。",
    "他拍拍身上的沙子，和妹妹一起從地上站起來，兩個人開始朝著遺跡走去..."
];

const englishStoryText = [
    "In a desert, the older brother woke up and stared at his still-sleeping younger sister, incredulously looking at his hand.",
    "\"Is this a dream?\" he murmured to himself, but the sensation of sand and gravel on his skin told him this was real. He recalled his recent experience.",
    "\"I need you, siblings, to help me collect treasures,\" a figure with an unclear face suddenly appeared behind them and abruptly said to them.",
    "Before he could react, a gust of sand suddenly struck, engulfing them in a storm.",
    "They quickly lost consciousness.",
    "\"Good morning, brother.\" The voice of his sister awakened the older brother from his memories, bringing his attention back to reality.",
    "He began to think about what to do next, but soon he decided.",
    "\"Collecting treasures, isn't that what we treasure hunters excel at?\"",
    "The younger sister seemed to be in sync with her brother, and her mood also began to become excited.",
    "He brushed off the sand from his body and stood up from the ground with his sister, starting to walk towards the ruins..."
];



scenes.GameScene1 = class GameScene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene1' });
    }

    preload() {
        this.load.image('bg', './assets/img/bg.png');
        this.load.image('bg1_2', './assets/img/bg2.png');
        this.load.spritesheet('idle', './assets/girl/Idle_KG_2.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('rwalk', './assets/girl/Walking_KG_1.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('lwalk', './assets/girl/Walking_KG_left.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('rjump', './assets/girl/Jump_KG_1.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('ljump', './assets/girl/Jump_KG_left.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('idle2', './assets/brother/Idle-Sheet.png', { frameWidth: 64, frameHeight: 80 });
        this.load.spritesheet('rwalk2', './assets/brother/Run-Sheet.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('lwalk2', './assets/brother/Run-Sheet_left.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('rjump2', './assets/brother/Jump-All-Sheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ljump2', './assets/brother/Jump-All-Sheet_left.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('floor1_2', './assets/img/floor2.png');
        this.load.image('floor1_1', './assets/img/floor1.png');
        this.load.image('pillar1', './assets/img/pillar.png');
        this.load.image('prop1_1', './assets/img/prop1.png');
        this.load.image('prop1_2', './assets/img/prop2.png');
        this.load.image('trap1', './assets/img/trap.png');
        this.load.image('heart', './assets/img/heart.png');
        this.load.image('treasure1', './assets/img/treasure1.png');
        this.load.image('button1_1', './assets/img/button1.png');
        this.load.image('button1_2', './assets/img/button2.png');
        this.load.image('key1', './assets/img/key.png');
        this.load.audio('moveSound', './assets/SoundEffect/Walking sound effect.mp3');
        this.load.audio('jumpSound', './assets/SoundEffect/Jump sound effect .mp3');
        this.load.audio('treasureSound', './assets/SoundEffect/Door open sound effect.mp3');
        this.load.audio('passSound', './assets/SoundEffect/Bling_Sound_Effect.mp3');
        
    }

    create() {

        this.bgmButton = this.add.sprite(560, 20, game.bgmPlaying ? 'bgmOn' : 'bgmOff').setInteractive();
        this.bgmButton.setScale(0.03);
        this.bgmButton.setOrigin(0.5);
        this.bgmButton.setDepth(1);

        this.bgmButton.on('pointerdown', () => {
            if (game.bgmPlaying) {
                game.bgm.stop();
                this.bgmButton.setTexture('bgmOff');
            } else {
                game.bgm.play();
                this.bgmButton.setTexture('bgmOn');
            }
            game.bgmPlaying = !game.bgmPlaying;
        });

        if (!game.bgm) {
            game.bgm = this.sound.add('bgm');
            game.bgm.play({ loop: true });
        }

        const backButton = this.add.text(300, 20, 'Return to Menu', {
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            },
            borderRadius: 5,
            color: 'white',
        });
        backButton.setDepth(1);
        backButton.setOrigin(0.5);
        backButton.setInteractive();
    
        backButton.on('pointerover', () => {
            backButton.setBackgroundColor('#45a049'); 
        });
    
        backButton.on('pointerout', () => {
            backButton.setBackgroundColor('#4CAF50');
        });
    
        backButton.on('pointerdown', () => {
            this.scene.start('LevelSelectScene');
        });
        bg = this.add.image(400, 310, 'bg').setScale(0.7);
        bg2 = this.add.image(400, 20, 'bg1_2').setScale(0.7);
        hearts = this.add.group({
            key: 'heart',
            repeat: 2,
            setXY: { x: 120, y: 20, stepX: 30 }
        });

        restartButton = this.add.text(450, 20, 'Refresh', {
            fontSize: '16px',
            backgroundColor: '#f44336',
            padding: 10,
            borderRadius: 5,
            color: 'white',
        });
        restartButton.setDepth(1);
        restartButton.setOrigin(0.5);
        restartButton.setInteractive();

        restartButton.on('pointerover', () => {
            restartButton.setBackgroundColor('#e57373');
        });

        restartButton.on('pointerout', () => {
            restartButton.setBackgroundColor('#f44336');
        });

        restartButton.on('pointerdown', () => {
            lives = 3;
            gameOver = false;
            this.scene.restart();
        });


        pillars = this.physics.add.staticGroup();
        pillars.create(20, 85, 'pillar1').setScale(0.7).refreshBody();
        pillars.create(20, 309, 'pillar1').setScale(0.7).refreshBody();
        pillars.create(20, 530, 'pillar1').setScale(0.7).refreshBody();
        pillars.create(780, 85, 'pillar1').setScale(0.7).refreshBody();
        pillars.create(780, 309, 'pillar1').setScale(0.7).refreshBody();
        pillars.create(780, 530, 'pillar1').setScale(0.7).refreshBody();
    
        floors = this.physics.add.staticGroup();
        floors.create(67, 197, 'floor1_1').setScale(0.7).refreshBody();
        floors.create(200, 197, 'floor1_1').setScale(0.7).refreshBody();
        floors.create(22, 421, 'floor1_2').setScale(0.7).refreshBody(); 
        floors.create(67, 421, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(112, 421, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(112, 421, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(157, 421, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(733, 421, 'floor1_1').setScale(0.7).refreshBody();
        floors.create(643, 421, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(780, 197, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(735, 197, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(690, 197, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(645, 600, 'floor1_1').setScale(0.7).refreshBody();
        floors.create(555, 600, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(555, 555, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(600, 555, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(645, 555, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(690, 555, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(175, 555, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(220, 555, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(265, 555, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(310, 555, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(355, 555, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(467, 487, 'floor1_1').setScale(0.7).refreshBody();
        floors.create(289, 197, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(112, 330, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(157, 330, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(202, 330, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(247, 330, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(292, 330, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(337, 330, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(382, 330, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(427, 330, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(472, 330, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(517, 330, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(465, 200, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(510, 200, 'floor1_2').setScale(0.7).refreshBody();
        floors.create(100, 635, 'floor1_1').setScale(0.7).refreshBody();
        floors.create(300, 635, 'floor1_1').setScale(0.7).refreshBody();
        floors.create(200, 635, 'floor1_1').setScale(0.7).refreshBody();
        floors.create(400, 635, 'floor1_1').setScale(0.7).refreshBody();
        floors.create(500, 635, 'floor1_1').setScale(0.7).refreshBody();
        floors.create(600, 635, 'floor1_1').setScale(0.7).refreshBody();
        floors.create(700, 635, 'floor1_1').setScale(0.7).refreshBody();
    
        prop1 = this.physics.add.staticImage(289, 264, 'prop1_1').setScale(0.7).refreshBody();
        prop2 = this.physics.add.staticImage(170, 107, 'prop1_2').setScale(0.7).refreshBody();
        trap1 = this.physics.add.staticImage(285, 515, 'trap1').setScale(0.7).refreshBody();
        trap2 = this.physics.add.staticImage(600, 515, 'trap1').setScale(0.7).refreshBody();
        trap3 = this.physics.add.staticImage(643, 515, 'trap1').setScale(0.7).refreshBody();
        treasure = this.physics.add.staticImage(240, 275, 'treasure1').setScale(0.7).refreshBody();
        button = this.physics.add.staticImage(740, 160, 'button1_1').setScale(0.7).refreshBody();
        key = this.physics.add.staticImage(180, 510, 'key1').setScale(0.7).refreshBody();
    
        player = this.physics.add.sprite(700, 300, 'idle');
        player.body.setSize(player.width * 0.3, player.height);
        this.physics.add.collider(player, floors);
        this.physics.add.collider(player, pillars);
        let prop1Collider = this.physics.add.collider(player, prop1);
        let prop2Collider = this.physics.add.collider(player, prop2);
        this.physics.add.overlap(player, trap1, playerDeath, null, this);
        this.physics.add.overlap(player, trap2, playerDeath, null, this);
        this.physics.add.overlap(player, trap3, playerDeath, null, this);
        
    
        this.physics.add.overlap(player, button, function () {
            this.sound.play('treasureSound');
            button.setTexture('button1_2'); 
            prop1.setVisible(false); 
            prop1Collider.active = false; 
            prop2Collider.active = false;
        }, null, this);
    
        this.physics.add.overlap(player, key, function () {
            this.sound.play('passSound');
            key.setVisible(false);
            key.destroy();
            prop2.setVisible(false); 
            prop2Collider.active = false; 
            prop2Collider2.active = false;
        }, null, this);
    
        this.physics.add.overlap(player, treasure, function () {
            this.sound.play('treasureSound');
            winText = this.add.text(config.width / 2 , config.height / 2, 'Clear', {
                fontSize: '40px 微軟正黑體',
                color: 'white',
                stroke: 'red',
                padding: 10,
            }).setOrigin(0.5);
            passedLevels++; 
            if (passedLevels === 2) {
                this.time.delayedCall(2000, function() {
                    this.scene.stop('GameScene1');
                    this.scene.start('VictoryScene');
                }, [], this);
            } else {
                
                this.time.delayedCall(2000, function() {
                    this.scene.start('LevelSelectScene');
                }, [], this); 
            }
            this.physics.pause();
        }, null, this);
    
        cursors = this.input.keyboard.createCursorKeys(); 
    
        player2 = this.physics.add.sprite(100, 140, 'idle2');
        player2.setScale(1.6);
        player2.body.setSize(player2.width * 0.3, player2.height * 0.6);
        this.physics.add.collider(player2, floors);
        this.physics.add.collider(player2, pillars);
        let prop1Collider2 = this.physics.add.collider(player2, prop1);
        let prop2Collider2 = this.physics.add.collider(player2, prop2);
        this.physics.add.overlap(player2, trap1, playerDeath, null, this);
        this.physics.add.overlap(player2, trap2, playerDeath, null, this);
        this.physics.add.overlap(player2, trap3, playerDeath, null, this);
        this.physics.add.overlap(player2, button, function () {
            button.setTexture('button1_2'); 
            prop1.setVisible(false);
            prop1Collider.active = false;
            prop1Collider2.active = false;
        }, null, this);
        this.physics.add.overlap(player2, key, function () {
            this.sound.play('passSound');
            key.setVisible(false);
            prop2.setVisible(false); 
            prop2Collider.active = false; 
            prop2Collider2.active = false;
        }, null, this);
        
        this.physics.add.overlap(player2, treasure, function () {
            this.sound.play('treasureSound');
            winText = this.add.text(config.width / 2 , config.height / 2, 'Clear', {
                fontSize: '40px 微軟正黑體',
                color: 'white',
                stroke: 'red',
                padding: 10,
            }).setOrigin(0.5);
            passedLevels++; 
            if (passedLevels === 2) {
                this.time.delayedCall(2000, function() {
                    this.scene.stop('GameScene1');
                    this.scene.start('VictoryScene');
                }, [], this);
            } else {
                
                this.time.delayedCall(2000, function() {
                    this.scene.start('LevelSelectScene');
                }, [], this); 
            }
            this.physics.pause();
        }, null, this);

        function  playerDeath(player, trap1, trap2,  trap3) {
            this.physics.pause();
            player.setTint(0xff0000);
        
            player.anims.play(player === player2 ? 'turn2' : 'turn');
        
            lives -= 1;
            hearts.children.iterate(function (child, index) {
                if (index >= lives) {
                    child.setVisible(false);
                }
            });
        
            if (lives <= 0) {
                gameOver = true;
            } else {
                this.time.delayedCall(1000, function () {
                    player.clearTint();
        
                    if (player === player2) {
                        player.setPosition(100, 140);
                        player.anims.play('turn2', true);
                    } else {
                        player.setPosition(700, 300);
                        player.anims.play('turn', true);
                    }
        
                    this.physics.resume();
                }, [], this);
        
            }
        }

    
        player2.up = this.input.keyboard.addKey('W'); 
        player2.down = this.input.keyboard.addKey('S');
        player2.left = this.input.keyboard.addKey('A');
        player2.right = this.input.keyboard.addKey('D');
    

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('lwalk', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'idle', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('rwalk', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump-left',
            frames: this.anims.generateFrameNumbers('ljump', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump-right',
            frames: this.anims.generateFrameNumbers('rjump', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'left2',
            frames: this.anims.generateFrameNumbers('lwalk2', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn2',
            frames: [{ key: 'idle2', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right2',
            frames: this.anims.generateFrameNumbers('rwalk2', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump-left2',
            frames: this.anims.generateFrameNumbers('ljump2', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump-right2',
            frames: this.anims.generateFrameNumbers('rjump2', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
    
        restartText = this.add.text(config.width / 2 - 100, config.height / 2 - 40, 'game over', {
            fontSize: '40px 微軟正黑體',
            color: 'white',
            stroke: 'red',
            padding: 10,
        });
        restartText.visible = false;
    }

    update() {
        if (gameOver === true) {
            restartText.visible = true;
            
            this.time.delayedCall(2000, function() {
                this.scene.start('HomeScene');
                lives = 3;
                gameOver = false;
            }, [], this);
        }

        
    
        if (gameOver == false) {
            if (cursors.left.isDown) {
                if (!isPlayingMoveSound) {
                    isPlayingMoveSound = true;
                }
                player.setVelocityX(-160);
                player.anims.play('left', true);
                player.lastDirection = 'left';
            } else if (cursors.right.isDown) {
                if (!isPlayingMoveSound) {
                    isPlayingMoveSound = true;
                }
                player.setVelocityX(160);
                player.anims.play('right', true);
                player.lastDirection = 'right';
            } else {
                player.setVelocityX(0);
                player.anims.play('turn');
                isPlayingMoveSound = false;
            }
            if (cursors.up.isDown && player.body.touching.down) {
                this.sound.play('jumpSound');
                player.setVelocityY(-250);
                if (player.lastDirection === 'left') {
                    player.anims.play('jump-left', true);
                } else if (player.lastDirection === 'right') {
                    player.anims.play('jump-right', true);
                }
            }
    
            if (player2.left.isDown) {
                if (!isPlayingMoveSound) {
                    isPlayingMoveSound = true;
                }
                player2.setVelocityX(-160);
                player2.anims.play('left2', true);
                player2.lastDirection = 'left';
            } else if (player2.right.isDown) {
                if (!isPlayingMoveSound) {
                    isPlayingMoveSound = true;
                }
                player2.setVelocityX(160);
                player2.anims.play('right2', true);
                player2.lastDirection = 'right';
            } else {
                player2.setVelocityX(0);
                player2.anims.play('turn2');
                isPlayingMoveSound = false;
            }
            if (player2.up.isDown && player2.body.touching.down) {
                this.sound.play('jumpSound');
                player2.setVelocityY(-200);
                if (player2.lastDirection === 'left') {
                    player2.anims.play('jump-left2', true);
                } else if (player2.lastDirection === 'right') {
                    player2.anims.play('jump-right2', true);
                }
            }
        }
    }
    
};

scenes.GameScene2 = class GameScene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene2' });
    }

    preload() {
        this.load.image('bg2', './assets/img/2bg.png');
        this.load.image('bg2_2', './assets/img/2bg2.png');
        this.load.spritesheet('idle', './assets/girl/Idle_KG_2.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('rwalk', './assets/girl/Walking_KG_1.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('lwalk', './assets/girl/Walking_KG_left.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('rjump', './assets/girl/Jump_KG_1.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('ljump', './assets/girl/Jump_KG_left.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('idle2', './assets/brother/Idle-Sheet.png', { frameWidth: 64, frameHeight: 80 });
        this.load.spritesheet('rwalk2', './assets/brother/Run-Sheet.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('lwalk2', './assets/brother/Run-Sheet_left.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('rjump2', './assets/brother/Jump-All-Sheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ljump2', './assets/brother/Jump-All-Sheet_left.png', { frameWidth: 64, frameHeight: 64 });
        this.load.image('floor2', './assets/img/2floor.png');
        this.load.image('pillar2', './assets/img/2pillar.png');
        this.load.image('trap2', './assets/img/2trap.png');
        this.load.image('prop1', './assets/img/2prop.png');
        this.load.image('button2_1', './assets/img/button1.png');
        this.load.image('button2_2', './assets/img/button2.png');
        this.load.image('heart', './assets/img/heart.png');
        this.load.image('treasure', './assets/img/treasure2.png');
        this.load.image('block', './assets/img/block.png');
        this.load.audio('moveSound', './assets/SoundEffect/Walking sound effect.mp3');
        this.load.audio('jumpSound', './assets/SoundEffect/Jump sound effect .mp3');
        this.load.audio('treasureSound', './assets/SoundEffect/Door open sound effect.mp3');
        this.load.audio('passSound', './assets/SoundEffect/Bling_Sound_Effect.mp3');
    }

    create() {
        
        bg2 = this.add.image(400, 310, 'bg2').setScale(0.7);
        bg2_2 = this.add.image(400, 20, 'bg2_2').setScale(0.7);
        hearts = this.add.group({
            key: 'heart',
            repeat: 2,
            setXY: { x: 120, y: 20, stepX: 30 }
        });

        pillars2 = this.physics.add.staticGroup();
        pillars2.create(20, 330, 'pillar2').setScale(0.7).refreshBody();
        pillars2.create(778, 330, 'pillar2').setScale(0.7).refreshBody();


        floors2 = this.physics.add.staticGroup();
        floors2.create(65, 500, 'floor2').setScale(0.7).refreshBody();
        floors2.create(110, 500, 'floor2').setScale(0.7).refreshBody();
        floors2.create(155, 500, 'floor2').setScale(0.7).refreshBody();
        floors2.create(200, 500, 'floor2').setScale(0.7).refreshBody();
        floors2.create(245, 500, 'floor2').setScale(0.7).refreshBody();
        floors2.create(290, 420, 'floor2').setScale(0.7).refreshBody();
        floors2.create(335, 420, 'floor2').setScale(0.7).refreshBody();
        floors2.create(380, 420, 'floor2').setScale(0.7).refreshBody();
        floors2.create(425, 420, 'floor2').setScale(0.7).refreshBody();
        floors2.create(470, 420, 'floor2').setScale(0.7).refreshBody();
        floors2.create(515, 420, 'floor2').setScale(0.7).refreshBody();
        floors2.create(560, 420, 'floor2').setScale(0.7).refreshBody();

        floors2.create(65, 180, 'floor2').setScale(0.7).refreshBody();
        floors2.create(110, 180, 'floor2').setScale(0.7).refreshBody();
        floors2.create(155, 180, 'floor2').setScale(0.7).refreshBody();
        floors2.create(200, 180, 'floor2').setScale(0.7).refreshBody();
        floors2.create(245, 180, 'floor2').setScale(0.7).refreshBody();

        floors2.create(555, 200, 'floor2').setScale(0.7).refreshBody();
        floors2.create(600, 200, 'floor2').setScale(0.7).refreshBody();
        floors2.create(645, 200, 'floor2').setScale(0.7).refreshBody();
        floors2.create(690, 200, 'floor2').setScale(0.7).refreshBody();
        floors2.create(735, 200, 'floor2').setScale(0.7).refreshBody();

        floors2.create(555, 600, 'floor2').setScale(0.7).refreshBody();
        floors2.create(600, 600, 'floor2').setScale(0.7).refreshBody();
        floors2.create(645, 600, 'floor2').setScale(0.7).refreshBody();
        floors2.create(690, 600, 'floor2').setScale(0.7).refreshBody();
        floors2.create(735, 600, 'floor2').setScale(0.7).refreshBody();

        // floors2.create(380, 320, 'floor2').setScale(0.7).refreshBody();
        // floors2.create(425, 320, 'floor2').setScale(0.7).refreshBody();
        // floors2.create(470, 280, 'floor2').setScale(0.7).refreshBody();
         floors2.create(515, 280, 'floor2').setScale(0.7).refreshBody();



        /*------道具------*/
        prop = this.physics.add.staticImage(600, 110, 'prop1').setScale(0.7).refreshBody();
        // prop2 = this.physics.add.staticImage(170, 107, 'prop2').setScale(0.7).refreshBody();
        trap2_1 = this.physics.add.staticImage(600, 555, 'trap2').setScale(0.7).refreshBody();
        trap2_2 = this.physics.add.staticImage(643, 555, 'trap2').setScale(0.7).refreshBody();
        treasure = this.physics.add.staticImage(700, 155, 'treasure').setScale(0.7).refreshBody();
        button2 = this.physics.add.staticImage(150, 465, 'button2_1').setScale(0.7).refreshBody();

        var block = this.physics.add.sprite(480, 375, 'block');
        block.setScale(0.7).refreshBody();
        block.setImmovable(false); 
        block.body.allowGravity = true; 
        this.physics.add.collider(block, floors2);
        this.physics.add.collider(block, pillars2);
        this.physics.add.collider(block, trap2_1);
        this.physics.add.collider(block, trap2_2);

        player = this.physics.add.sprite(700, 500, 'idle');
       
        player.body.setSize(player.width * 0.3, player.height);
        this.physics.add.collider(player, floors2);
        this.physics.add.collider(player, pillars2);
       // this.physics.add.collider(player, block);
        let prop1Collider = this.physics.add.collider(player, prop2);
        
        this.physics.add.overlap(player, trap2_1, this.playerDeath, null, this);
        this.physics.add.overlap(player, trap2_2, this.playerDeath, null, this);

        this.physics.add.overlap(player, button2, function () {
            button2.setTexture('button2_2'); 
            prop.setVisible(false); 
            prop1Collider.active = false 
           // this.physics.world.removeCollider(playerBlockCollider); 
        }, null, this);
        
        let playerBlockCollider = this.physics.add.collider(player, block, function (player, block) {
            if (player.body.touching.right) {
                block.setVelocityX(0);
            } else if (player.body.touching.left) {
                block.setVelocityX(0); 
            }
        });


        this.physics.add.overlap(player, treasure, function () {
            this.sound.play('treasureSound');
            winText = this.add.text(config.width / 2 , config.height / 2, 'Clear', {
                fontSize: '40px 微軟正黑體',
                color: 'white',
                stroke: 'red',
                padding: 10,
            }).setOrigin(0.5);
            passedLevels++; 
            if (passedLevels === 2) {
                this.time.delayedCall(2000, function() {
                    this.scene.stop('GameScene2');
                    this.scene.start('VictoryScene');
                }, [], this);
            } else {
                
                this.time.delayedCall(2000, function() {
                    this.scene.start('LevelSelectScene');
                }, [], this); 
            }
            this.physics.pause();
        }, null, this);

        cursors = this.input.keyboard.createCursorKeys(); 

        player2 = this.physics.add.sprite(100, 100, 'idle2');
        player2.setScale(1.6);
        player2.body.setSize(player2.width * 0.3, player2.height * 0.6);
        this.physics.add.collider(player2, floors2);
        this.physics.add.collider(player2, pillars2);
        let prop1Collider2 = this.physics.add.collider(player2, prop);
        this.physics.add.overlap(player2, trap2_1, this.playerDeath, null, this);
        this.physics.add.overlap(player2, trap2_2, this.playerDeath, null, this);

        this.physics.add.overlap(player2, button2, function () {
            button2.setTexture('button2_2'); 
            prop.setVisible(false);
            prop1Collider2.active = false;
            
        }, null, this);

        this.physics.add.collider(player2, block, function (player2, block) {
            if (player2.body.touching.right) {
                block.setVelocityX(0); 
            } else if (player2.body.touching.left) {
                block.setVelocityX(0); 
            }
        });

        this.physics.add.overlap(player2, treasure, function () {
            this.sound.play('treasureSound');
            winText = this.add.text(config.width / 2 , config.height / 2, 'Clear', {
                fontSize: '40px 微軟正黑體',
                color: 'white',
                stroke: 'red',
                padding: 10,
            }).setOrigin(0.5);
            passedLevels++; 
            if (passedLevels === 2) {
                this.time.delayedCall(2000, function() {
                    this.scene.stop('GameScene2');
                    this.scene.start('VictoryScene');
                }, [], this);
            } else {
                
                this.time.delayedCall(2000, function() {
                    this.scene.start('LevelSelectScene');
                }, [], this); 
            }
            this.physics.pause();
        }, null, this);


        player2.up = this.input.keyboard.addKey('W');
        player2.down = this.input.keyboard.addKey('S');
        player2.left = this.input.keyboard.addKey('A');
        player2.right = this.input.keyboard.addKey('D');


        /*------妹妹人物動畫------*/
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('lwalk', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'idle', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('rwalk', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump-left',
            frames: this.anims.generateFrameNumbers('ljump', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump-right',
            frames: this.anims.generateFrameNumbers('rjump', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        /*------哥哥人物動畫------*/
        this.anims.create({
            key: 'left2',
            frames: this.anims.generateFrameNumbers('lwalk2', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn2',
            frames: [{ key: 'idle2', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right2',
            frames: this.anims.generateFrameNumbers('rwalk2', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump-left2',
            frames: this.anims.generateFrameNumbers('ljump2', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump-right2',
            frames: this.anims.generateFrameNumbers('rjump2', { start: 0, end: 14 }),
            frameRate: 10,
            repeat: -1
        });

        restartText = this.add.text(config.width / 2 - 100, config.height / 2 - 40, 'game over', {
            fontSize: '40px 微軟正黑體',
            color: 'white',
            stroke: 'red',
            padding: 10,
        });
        restartText.visible = false;


        this.bgmButton = this.add.sprite(560, 20, game.bgmPlaying ? 'bgmOn' : 'bgmOff').setInteractive();
        this.bgmButton.setScale(0.03);
        this.bgmButton.setOrigin(0.5);
        this.bgmButton.setDepth(1);

        this.bgmButton.on('pointerdown', () => {
            if (game.bgmPlaying) {
                game.bgm.stop();
                this.bgmButton.setTexture('bgmOff');
            } else {
                game.bgm.play();
                this.bgmButton.setTexture('bgmOn');
            }
            game.bgmPlaying = !game.bgmPlaying;
        });

        if (!game.bgm) {
            game.bgm = this.sound.add('bgm');
            game.bgm.play({ loop: true });
        }

        const backButton = this.add.text(300, 20, 'Return to Menu', {
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            padding: {
                left: 10,
                right: 10,
                top: 5,
                bottom: 5
            },
            borderRadius: 5,
            color: 'white',
        });
        backButton.setDepth(1);
        backButton.setOrigin(0.5);
        backButton.setInteractive();
    
        backButton.on('pointerover', () => {
            backButton.setBackgroundColor('#45a049'); 
        });
    
        backButton.on('pointerout', () => {
            backButton.setBackgroundColor('#4CAF50');
        });
    
        backButton.on('pointerdown', () => {
            this.scene.start('LevelSelectScene');
        });

        restartButton = this.add.text(450, 20, 'Refresh', {
            fontSize: '16px',
            backgroundColor: '#f44336',
            padding: 10,
            borderRadius: 5,
            color: 'white',
        });
        restartButton.setDepth(1);
        restartButton.setOrigin(0.5);
        restartButton.setInteractive();

        restartButton.on('pointerover', () => {
            restartButton.setBackgroundColor('#e57373');
        });

        restartButton.on('pointerout', () => {
            restartButton.setBackgroundColor('#f44336');
        });

        restartButton.on('pointerdown', () => {
            lives = 3;
            gameOver = false;
            this.scene.restart();
        });
    }
    update() {

        if (gameOver === true) {
            restartText.visible = true;
            
            this.time.delayedCall(2000, function() {
                this.scene.start('HomeScene');
                lives = 3;
                gameOver = false;
            }, [], this);
        }
    
        if (gameOver == false) {
            /*------妹妹------*/
            if (cursors.left.isDown) {
                player.setVelocityX(-160);
                player.anims.play('left', true);
                player.lastDirection = 'left';
            } else if (cursors.right.isDown) {
                player.setVelocityX(160);
                player.anims.play('right', true);
                player.lastDirection = 'right';
            } else {
                player.setVelocityX(0);
                player.anims.play('turn');
            }
            if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-300);
                this.sound.play('jumpSound');
                if (player.lastDirection === 'left') {
                    player.anims.play('jump-left', true);
                } else if (player.lastDirection === 'right') {
                    player.anims.play('jump-right', true);
                }
            }
    
            /*------哥哥------*/
            if (player2.left.isDown) {
                player2.setVelocityX(-160);
                player2.anims.play('left2', true);
                player2.lastDirection = 'left';
            } else if (player2.right.isDown) {
                player2.setVelocityX(160);
                player2.anims.play('right2', true);
                player2.lastDirection = 'right';
            } else {
                player2.setVelocityX(0);
                player2.anims.play('turn2');
            }
            if (player2.up.isDown && player2.body.touching.down) {
                this.sound.play('jumpSound');
                player2.setVelocityY(-250);
                if (player2.lastDirection === 'left') {
                    player2.anims.play('jump-left2', true);
                } else if (player2.lastDirection === 'right') {
                    player2.anims.play('jump-right2', true);
                }
            }
        }
    }
    playerDeath(player, trap) {
        this.physics.pause();
        player.setTint(0xff0000);
    
        player.anims.play(player === player2 ? 'turn2' : 'turn');
    
        lives -= 1;
        hearts.children.iterate(function (child, index) {
            if (index >= lives) {
                child.setVisible(false);
            }
        });
    
        if (lives <= 0) {
            gameOver = true;
        } else {
            this.time.delayedCall(1000, function () { 
                player.clearTint();
    
                if (player === player2) {
                    player.setPosition(100, 140);
                    player.anims.play('turn2', true);
                } else {
                    player.setPosition(700, 300);
                    player.anims.play('turn', true);
                }
    
                this.physics.resume();
            }, [], this);
    
        }
    }
};

scenes.GameScene3 = class GameScene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene3' });
    }

    preload() {
        this.load.image('background3', 'assets/background3.jpg');
    }

    create() {
        this.add.image(400, 300, 'background3');
        this.add.text(400, 100, '游戏关卡 3', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.bgmButton = this.add.sprite(700, 500, game.bgmPlaying ? 'bgmOn' : 'bgmOff').setInteractive();
        this.bgmButton.setScale(0.1);
        this.bgmButton.setOrigin(0.5);

        this.bgmButton.on('pointerdown', () => {
            if (game.bgmPlaying) {
                game.bgm.stop();
                this.bgmButton.setTexture('bgmOff');
            } else {
                game.bgm.play();
                this.bgmButton.setTexture('bgmOn');
            }
            game.bgmPlaying = !game.bgmPlaying;
        });

        if (!game.bgm) {
            game.bgm = this.sound.add('bgm');
            game.bgm.play({ loop: true });
        }

        const backButton = this.add.text(100, 500, '返回选择关卡', { fontSize: '24px', backgroundColor: '#4CAF50', padding: 10 });
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start('LevelSelectScene');
        });
    }
};

scenes.VictoryScene = class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
    }

    preload() {
        this.load.image('victory','assets/img/morning.png');
        this.load.spritesheet('idle', './assets/girl/Idle_KG_2.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('idle2', './assets/brother/Idle-Sheet.png', { frameWidth: 64, frameHeight: 80 });
    }

    create() {
        this.add.image(400, 310, 'victory').setScale(1.85).setOrigin(0.5);
    
        this.add.sprite(500, 570, 'idle').setScale(1.5);
        this.add.sprite(300, 560, 'idle2').setScale(1.5);
    
        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.6); 
        graphics.fillRoundedRect(50, 200, 700, 200, 20); 
    
        let victoryText = this.add.text(400, 280, 'Congratulations on Obtaining All Treasures!', { 
            fontSize: '26px', 
            fill: '#fff',
            fontStyle: 'bold', 
            stroke: '#000', 
            strokeThickness: 6, 
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, stroke: true, fill: true } 
        }).setOrigin(0.5);
    
        let victoryText1 = this.add.text(400, 350, 'Enjoy the Modern Leisure Time!', { 
            fontSize: '24px', 
            fill: '#fff',
            fontStyle: 'bold', 
            stroke: '#000', 
            strokeThickness: 4, 
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, stroke: true, fill: true }
        }).setOrigin(0.5);
    
        let returnButton = this.add.text(400, 480, 'Return to Main Menu', { 
            fontSize: '18px', 
            fill: '#fff', 
            backgroundColor: '#4CAF50', 
            padding: { left: 20, right: 20, top: 10, bottom: 10 }, 
            borderRadius: 10, 
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        returnButton.setInteractive();
        returnButton.on('pointerdown', () => {
            this.scene.start('HomeScene');
        });
    

        returnButton.on('pointerover', () => {
            returnButton.setStyle({ fill: '#ff0' }); 
        });
        returnButton.on('pointerout', () => {
            returnButton.setStyle({ fill: '#fff' }); 
        });
    }
    
}    


scenes.InstructionsScene = class InstructionsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InstructionsScene' });
    }

    preload() {
        this.load.image('background_instructions', 'assets/img/instructions_bg.png');
        this.load.spritesheet('idle', './assets/girl/Idle_KG_2.png', { frameWidth: 100, frameHeight: 64 });
        this.load.spritesheet('idle2', './assets/brother/Idle-Sheet.png', { frameWidth: 64, frameHeight: 80 });
        this.load.image('WASD', 'assets/img/WASD.png');
        this.load.image('arrow', 'assets/img/arrow.png');
        this.load.image('background_home', 'assets/img/index.png');
    }

    create() {
        this.add.image(400, 300, 'background_home').setScale(1.8).setAlpha(0.3);
        this.add.sprite(600, 300, 'idle').setScale(2);
        this.add.sprite(200, 300, 'idle2').setScale(2.5);
        this.add.image(600, 450, 'arrow').setScale(0.2);
        this.add.image(200, 450, 'WASD').setScale(0.3);
        this.add.text(400, 100, 'Instructions', {
            fontSize: '48px',
            fill: '#fff',
            fontStyle: 'bold',
            stroke: '#000',
            strokeThickness: 8,
            shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, stroke: true, fill: true }
        }).setOrigin(0.5);

        this.add.text(400, 180, 'use cursors to move the characters.', {
            fontSize: '24px',
            fill: '#fff',
            align: 'center',
            wordWrap: { width: 600 } 
        }).setOrigin(0.5);

        const backButton = this.add.text(400, 560, 'Back to Main Menu', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#4CAF50',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            borderRadius: 10,
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        backButton.setInteractive();

        backButton.on('pointerdown', () => {
            this.scene.start('HomeScene'); 
        });

        backButton.on('pointerover', () => {
            backButton.setStyle({ fill: '#ff0' });
        });

        backButton.on('pointerout', () => {
            backButton.setStyle({ fill: '#fff' });
        });
    }
};



const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 615,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: Object.values(scenes),
}

const gameInstance = new Phaser.Game(config);
gameInstance.scene.start('HomeScene');
