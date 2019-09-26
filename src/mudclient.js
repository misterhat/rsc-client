const C_OPCODES = require('./opcodes/client');
const ChatMessage = require('./chat-message');
const GameBuffer = require('./game-buffer');
const GameCharacter = require('./game-character');
const GameConnection = require('./game-connection');
const GameData = require('./game-data');
const Long = require('long');
const Panel = require('./panel');
const Scene = require('./scene');
const Surface = require('./surface');
const SurfaceSprite = require('./surface-sprite');
const Utility = require('./utility');
const VERSION = require('./version');
const WordFilter = require('./word-filter');

class mudclient extends GameConnection {
    constructor(canvas) {
        super(canvas);

        this.menuMaxSize = 250;
        this.pathStepsMax = 8000;
        this.playersMax = 500;
        this.npcsMax = 500;
        this.wallObjectsMax = 500;
        this.playersServerMax = 4000;
        this.groundItemsMax = 5000;
        this.npcsServerMax = 5000;
        this.objectsMax = 1500;
        this.playerStatCount = 18;
        this.questCount = 50;
        this.playerStatEquipmentCount = 5;

        this.localRegionX = 0;
        this.localRegionY = 0;
        this.controlTextListChat = 0;
        this.controlTextListAll = 0;
        this.controlTextListQuest = 0;
        this.controlTextListPrivate = 0;
        this.messageTabSelected = 0;
        this.mouseClickXX = 0;
        this.mouseClickXY = 0;
        this.controlListSocialPlayers = 0;
        this.uiTabSocialSubTab = 0;
        this.privateMessageTarget = new Long(0);
        this.controlListQuest = 0;
        this.uiTabPlayerInfoSubTab = 0;
        this.controlListMagic = 0;
        this.tabMagicPrayer = 0;
        this.packetErrorCount = 0;
        this.mouseButtonDownTime = 0;
        this.mouseButtonItemCountIncrement = 0;
        this.anInt659 = 0;
        this.anInt660 = 0;
        this.cameraRotationX = 0;
        this.scene = null;
        this.loginScreen = 0;
        this.showDialogReportAbuseStep = 0;
        this.tradeConfirmAccepted = false;
        this.audioPlayer = null;
        this.appearanceHeadType = 0;
        this.appearanceSkinColour = 0;
        this.showDialogSocialInput = 0;
        this.anInt707 = 0;
        this.deathScreenTimeout = 0;
        this.cameraRotationY = 0;
        this.combatStyle = 0;
        this.welcomeUnreadMessages = 0;
        this.controlButtonAppearanceHead1 = 0;
        this.controlButtonAppearanceHead2 = 0;
        this.controlButtonAppearanceHair1 = 0;
        this.controlButtonAppearanceHair2 = 0;
        this.controlButtonAppearanceGender1 = 0;
        this.controlButtonAppearanceGender2 = 0;
        this.controlButtonAppearanceTop1 = 0;
        this.controlButtonAppearanceTop2 = 0;
        this.controlButtonAppearanceSkin1 = 0;
        this.controlButtonAppearanceSkin2 = 0;
        this.controlButtonAppearanceBottom1 = 0;
        this.controlButtonAppearanceBottom2 = 0;
        this.controlButtonAppearanceAccept = 0;
        this.logoutTimeout = 0;
        this.tradeRecipientConfirmHash = new Long(0);
        this.loginTimer = 0;
        this.npcCombatModelArray2 = new Int32Array([0, 0, 0, 0, 0, 1, 2, 1]);
        this.systemUpdate = 0;
        this.graphics = null;
        this.regionX = 0;
        this.regionY = 0;
        this.welcomScreenAlreadyShown = false;
        this.mouseButtonClick = 0;
        this.questName = [ 
            'Black knight\'s fortress', 'Cook\'s assistant', 'Demon slayer', 'Doric\'s quest', 'The restless ghost', 'Goblin diplomacy', 'Ernest the chicken', 'Imp catcher', 'Pirate\'s treasure', 'Prince Ali rescue',
            'Romeo & Juliet', 'Sheep shearer', 'Shield of Arrav', 'The knight\'s sword', 'Vampire slayer', 'Witch\'s potion', 'Dragon slayer', 'Witch\'s house (members)', 'Lost city (members)', 'Hero\'s quest (members)',
            'Druidic ritual (members)', 'Merlin\'s crystal (members)', 'Scorpion catcher (members)', 'Family crest (members)', 'Tribal totem (members)', 'Fishing contest (members)', 'Monk\'s friend (members)', 'Temple of Ikov (members)', 'Clock tower (members)', 'The Holy Grail (members)',
            'Fight Arena (members)', 'Tree Gnome Village (members)', 'The Hazeel Cult (members)', 'Sheep Herder (members)', 'Plague City (members)', 'Sea Slug (members)', 'Waterfall quest (members)', 'Biohazard (members)', 'Jungle potion (members)', 'Grand tree (members)',
            'Shilo village (members)', 'Underground pass (members)', 'Observatory quest (members)', 'Tourist trap (members)', 'Watchtower (members)', 'Dwarf Cannon (members)', 'Murder Mystery (members)', 'Digsite (members)', 'Gertrude\'s Cat (members)', 'Legend\'s Quest (members)'
        ];
        this.errorLoadingData = false;
        this.healthBarCount = 0;
        this.spriteMedia = 0;
        this.spriteUtil = 0;
        this.spriteItem = 0;
        this.spriteProjectile = 0;
        this.spriteTexture = 0;
        this.spriteTextureWorld = 0;
        this.spriteLogo = 0;
        this.controlLoginStatus = 0;
        this.controlLoginUser = 0;
        this.controlLoginPass = 0;
        this.controlLoginOk = 0;
        this.controlLoginCancel = 0;
        this.teleportBubbleCount = 0;
        this.mouseClickCount = 0;
        this.shopSellPriceMod = 0;
        this.shopBuyPriceMod = 0;
        this.duelOptionRetreat = 0;
        this.duelOptionMagic = 0;
        this.duelOptionPrayer = 0;
        this.duelOptionWeapons = 0;
        this.groundItemCount = 0;
        this.receivedMessagesCount = 0;
        this.messageTabFlashAll = 0;
        this.messageTabFlashHistory = 0;
        this.messtageTabFlashQuest = 0;
        this.messageTabFlashPrivate = 0;
        this.bankItemCount = 0;
        this.objectAnimationNumberFireLightningSpell = 0;
        this.objectAnimationNumberTorch = 0;
        this.objectAnimationNumberClaw = 0;
        this.loggedIn = 0;
        this.npcCount = 0;
        this.npcCacheCount = 0;
        this.objectAnimationCount = 0;
        this.tradeConfirmItemsCount = 0;
        this.mouseClickXStep = 0;
        this.newBankItemCount = 0;
        this.npcAnimationArray = [
            new Int32Array([11, 2, 9, 7, 1, 6, 10, 0, 5, 8, 3, 4]), 
            new Int32Array([11, 2, 9, 7, 1, 6, 10, 0, 5, 8, 3, 4]), 
            new Int32Array([11, 3, 2, 9, 7, 1, 6, 10, 0, 5, 8, 4]), 
            new Int32Array([3, 4, 2, 9, 7, 1, 6, 10, 8, 11, 0, 5]), 
            new Int32Array([3, 4, 2, 9, 7, 1, 6, 10, 8, 11, 0, 5]), 
            new Int32Array([4, 3, 2, 9, 7, 1, 6, 10, 8, 11, 0, 5]), 
            new Int32Array([11, 4, 2, 9, 7, 1, 6, 10, 0, 5, 8, 3]), 
            new Int32Array([11, 2, 9, 7, 1, 6, 10, 0, 5, 8, 4, 3]) ];
        this.controlWelcomeNewuser = 0;
        this.controlWelcomeExistinguser = 0;
        this.npcWalkModel = [ 0, 1, 2, 1 ];
        this.referid = 0;
        this.anInt827 = 0;
        this.controlLoginNewOk = 0;
        this.combatTimeout = 0;
        this.optionMenuCount = 0;
        this.errorLoadingCodebase = false;
        this.reportAbuseOffence = 0;
        this.cameraRotationTime = 0;
        this.duelOpponentItemsCount = 0;
        this.duelItemsCount = 0;
        this.characterSkinColours = new Int32Array([0xecded0, 0xccb366, 0xb38c40, 0x997326, 0x906020]);
        this.duelOfferOpponentItemCount = 0;
        this.characterTopBottomColours = new Int32Array([
            0xff0000, 0xff8000, 0xffe000, 0xa0e000, 57344, 32768, 41088, 45311, 33023, 12528,
            0xe000e0, 0x303030, 0x604000, 0x805000, 0xffffff
        ]);
        this.itemsAboveHeadCount = 0;
        this.showUiWildWarn = 0;
        this.selectedItemInventoryIndex = 0;
        this.soundData = null;
        this.statFatigue = 0;
        this.fatigueSleeping = 0;
        this.tradeRecipientConfirmItemsCount = 0;
        this.tradeRecipientItemsCount = 0;
        this.showDialogServermessage = false;
        this.menuX = 0;
        this.menuY = 0;
        this.menuWidth = 0;
        this.menuHeight = 0;
        this.menuItemsCount = 0;
        this.showUiTab = 0;
        this.tradeItemsCount = 0;
        this.planeWidth = 0;
        this.planeHeight = 0;
        this.planeMultiplier = 0;
        this.playerQuestPoints = 0;
        this.characterHairColours = new Int32Array([
            0xffc030, 0xffa040, 0x805030, 0x604020, 0x303030, 0xff6020, 0xff4000, 0xffffff, 65280, 65535
        ]);
        this.bankActivePage = 0;
        this.welcomeLastLoggedInDays = 0;
        this.equipmentStatNames = [ 'Armour', 'WeaponAim', 'WeaponPower', 'Magic', 'Prayer' ];
        this.inventoryItemsCount = 0;
        this.skillNameShort = [ 
            'Attack', 'Defense', 'Strength', 'Hits', 'Ranged', 'Prayer', 'Magic', 'Cooking', 'Woodcut', 'Fletching',
            'Fishing', 'Firemaking', 'Crafting', 'Smithing', 'Mining', 'Herblaw', 'Agility', 'Thieving'
        ];
        this.duelOpponentNameHash = new Long(0);
        this.minimapRandom_1 = 0;
        this.minimapRandom_2 = 0;
        this.objectCount = 0;
        this.duelOfferItemCount = 0; 
        this.objectCount = 0;
        this.duelOfferItemCount = 0;
        this.cameraAutoRotatePlayerX = 0;
        this.cameraAutoRotatePlayerY = 0;
        this.npcCombatModelArray1 = new Int32Array([0, 1, 2, 1, 0, 0, 0, 0]);
        this.skillNamesLong = [
            'Attack', 'Defense', 'Strength', 'Hits', 'Ranged', 'Prayer', 'Magic', 'Cooking', 'Woodcutting', 'Fletching',
            'Fishing', 'Firemaking', 'Crafting', 'Smithing', 'Mining', 'Herblaw', 'Agility', 'Thieving'
        ];
        this.playerCount = 0;
        this.knownPlayerCount = 0;
        this.spriteCount = 0;
        this.wallObjectCount = 0;
        this.welcomeRecoverySetDays = 0;
        this.localLowerX = 0;
        this.localLowerY = 0;
        this.localUpperX = 0;
        this.localUpperY = 0;
        this.world = null;
        this.welcomeLastLoggedInIP = 0;
        this.sleepWordDelayTimer = 0;

        this.menuIndices = new Int32Array(this.menuMaxSize);
        this.cameraAutoAngleDebug = false;
        this.wallObjectDirection = new Int32Array(this.wallObjectsMax);
        this.wallObjectId = new Int32Array(this.wallObjectsMax);
        this.cameraRotationXIncrement = 2;
        this.inventoryMaxItemCount = 30;
        this.bankItemsMax = 48;
        this.optionMenuEntry = [];
        this.optionMenuEntry.length = 5;
        this.optionMenuEntry.fill(null);
        this.newBankItems = new Int32Array(256);
        this.newBankItemsCount = new Int32Array(256);
        this.teleportBubbleTime = new Int32Array(50);
        this.showDialogTradeConfirm = false;
        this.tradeConfirmAccepted = false;
        this.receivedMessageX = new Int32Array(50);
        this.receivedMessageY = new Int32Array(50);
        this.receivedMessageMidPoint = new Int32Array(50);
        this.receivedMessageHeight = new Int32Array(50);
        this.localPlayer = new GameCharacter();
        this.localPlayerServerIndex = -1;
        this.menuItemX = new Int32Array(this.menuMaxSize);
        this.menuItemY = new Int32Array(this.menuMaxSize);
        this.showDialogTrade = false;
        this.bankItems = new Int32Array(256);
        this.bankItemsCount = new Int32Array(256);
        this.appearanceBodyGender = 1;
        this.appearance2Colour = 2;
        this.appearanceHairColour = 2;
        this.appearanceTopColour = 8;
        this.appearanceBottomColour = 14;
        this.appearanceHeadGender = 1;
        this.loginUser = '';
        this.loginPass = '';
        this.cameraAngle = 1;
        this.members = false;
        this.optionSoundDisabled = false;
        this.showRightClickMenu = false;
        this.cameraRotationYIncrement = 2;
        this.objectAlreadyInMenu = new Int8Array(this.objectsMax);
        this.menuItemText1 = [];
        this.menuItemText1.length = this.menuMaxSize;
        this.menuItemText1.fill(null);
        this.duelOpponentName = '';
        this.lastObjectAnimationNumberFireLightningSpell = -1;
        this.lastObjectAnimationNumberTorch = -1;
        this.lastObjectAnimationNumberClaw = -1;
        this.planeIndex = -1;
        this.welcomScreenAlreadyShown = false;
        this.isSleeping = false;
        this.cameraRotation = 128;
        this.teleportBubbleX = new Int32Array(50);
        this.errorLoadingData = false;
        this.playerExperience = new Int32Array(this.playerStatCount);
        this.tradeRecipientAccepted = false;
        this.tradeAccepted = false;
        this.mouseClickXHistory = new Int32Array(8192);
        this.mouseClickYHistory = new Int32Array(8192);
        this.showDialogWelcome = false;
        this.playerServerIndexes = new Int32Array(this.playersMax);
        this.teleportBubbleY = new Int32Array(50);
        this.receivedMessages = [];
        this.receivedMessages.length = 50;
        this.receivedMessage.fill(null);
        this.showDialogDuelConfirm = false;
        this.duelAccepted = false;
        this.players = [];
        this.players.length = this.playersMax;
        this.players.fill(null);
        this.prayerOn = new Int8Array(50);
        this.menuSourceType = new Int32Array(this.menuMaxSize);
        this.menuSourceIndex = new Int32Array(this.menuMaxSize);
        this.menuTargetIndex = new Int32Array(this.menuMaxSize);
        this.wallObjectAlreadyInMenu = new Int8Array(this.wallObjectsMax);
        this.magicLoc = 128;
        this.errorLoadingMemory = false;
        this.gameWidth = 512;
        this.gameHeight = 334; 
        this.const_9 = 9;
        this.tradeConfirmItems = new Int32Array(14);
        this.tradeConfirmItemCount = new Int32Array(14);
        this.tradeRecipientName = '';
        this.selectedSpell = -1;
        this.showOptionMenu = false;
        this.playerStatCurrent = new Int32Array(this.playerStatCount);
        this.teleportBubbleType = new Int32Array(50);
        this.errorLoadingCodebase = false;
        this.showDialogShop = false;
        this.shopItem = new Int32Array(256);
        this.shopItemCount = new Int32Array(256);
        this.shopItemPrice = new Int32Array(256);
        this.duelOfferOpponentAccepted = false;
        this.duelOfferAccepted = false;
        this.gameModels = [];
        this.gameModels.length = 1000;
        this.gameModels.fill(null);
        this.showDialogDuel = false;
        this.serverMessage = '';
        this.serverMessageBoxTop = false;
        this.duelOpponentItems = new Int32Array(8);
        this.duelOpponentItemCount = new Int32Array(8);
        this.duelItems = new Int32Array(8);
        this.duelItemCount = new Int32Array(8);
        this.playerStatBase = new Int32Array(this.playerStatCount);
        this.npcsCache = [];
        this.npcsCache.length = this.npcsMax;
        this.npcsCache.fill(null);
        this.groundItemX = new Int32Array(this.groundItemsMax);
        this.groundItemY = new Int32Array(this.groundItemsMax);
        this.groundItemId = new Int32Array(this.groundItemsMax);
        this.groundItemZ = new Int32Array(this.groundItemsMax);
        this.bankSelectedItemSlot = -1;
        this.bankSelectedItem = -2;
        this.duelOfferOpponentItemId = new Int32Array(8);
        this.duelOfferOpponentItemStack = new Int32Array(8);
        this.messageHistoryTimeout = new Int32Array(5);
        this.optionCameraModeAuto = true;
        this.objectX = new Int32Array(this.objectsMax);
        this.objectY = new Int32Array(this.objectsMax);
        this.objectId = new Int32Array(this.objectsMax);
        this.objectDirection = new Int32Array(this.objectsMax);
        this.selectedItemInventoryIndex = -1;
        this.selectedItemName = '';
        this.loadingArea = false;
        this.tradeRecipientConfirmItems = new Int32Array(14);
        this.tradeRecipientConfirmItemCount = new Int32Array(14);
        this.tradeRecipientItems = new Int32Array(14);
        this.tradeRecipientItemCount = new Int32Array(14);
        this.showDialogServermessage = false;
        this.menuItemID = new Int32Array(this.menuMaxSize);
        this.questComplete = new Int8Array(this.questCount);
        this.wallObjectModel = [];
        this.wallObjectModel.length = this.wallObjectsMax;
        this.wallObjectModel.fill(null);
        this.actionBubbleX = new Int32Array(50);
        this.actionBubbleY = new Int32Array(50);
        this.cameraZoom = 550;
        this.tradeItems = new Int32Array(14);
        this.tradeItemCount = new Int32Array(14);
        this.lastHeightOffset = -1;
        this.duelSettingsRetreat = false;
        this.duelSettingsMagic = false;
        this.duelSettingsPrayer = false;
        this.duelSettingsWeapons = false;
        this.showDialogBank = false;
        this.loginUserDesc = '';
        this.loginUserDisp = '';
        this.optionMouseButtonOne = false;
        this.inventoryItemId = new Int32Array(35);
        this.inventoryItemStackCount = new Int32Array(35);
        this.inventoryEquipped = new Int32Array(35);
        this.knownPlayers = [];
        this.knownPlayers.length = this.playersMax;
        this.knownPlayers.fill(null);
        this.messageHistory = [];
        this.messageHistory.length = 5;
        this.messageHistory.fill(null);
        this.reportAbuseMute = false;
        this.duelOfferItemId = new Int32Array(8);
        this.duelOfferItemStack = new Int32Array(8);
        this.actionBubbleScale = new Int32Array(50);
        this.actionBubbleItem = new Int32Array(50);
        this.sleepWordDelay = true;
        this.showAppearanceChange = false;
        this.shopSelectedItemIndex = -1;
        this.shopSelectedItemType = -2;
        this.projectileMaxRange = 40;
        this.npcs = [];
        this.npcs.length = this.npcsMax;
        this.npcs.fill(null);
        this.experienceArray = new Int32Array(99);
        this.healthBarX = new Int32Array(50);
        this.healthBarY = new Int32Array(50);
        this.healthBarMissing = new Int32Array(50);
        this.playerServer = [];
        this.playerServer.length = this.playersServerMax;
        this.playerServer.fill(null);
        this.walkPathX = new Int32Array(this.pathStepsMax);
        this.walkPathY = new Int32Array(this.pathStepsMax);
        this.wallObjectX = new Int32Array(this.wallObjectsMax);
        this.wallObjectY = new Int32Array(this.wallObjectsMax);
        this.menuItemText2 = [];
        this.menuItemText2.length = this.menuMaxSize;
        this.menuItemText2.fill(null);
        this.npcsServer = [];
        this.npcsServer.length = this.npcsServerMax;
        this.npcsServer.fill(null);
        this.playerStatEquipment = new Int32Array(playerStatEquipmentCount);
        this.objectModel = [];
        this.objectModel.length = this.objectsMax;
        this.objectModel.fill(null);
    }

    static formatNumber(i) {
        let s = i.toString();

        for (let j = s.length - 3; j > 0; j -= 3) {
            s = s.substring(0, j) + ',' + s.substring(j);
        }

        if (s.length > 8) {
            s = '@gre@' + s.substring(0, s.length - 8) + ' million @whi@(' + s + ')';
        } else if (s.length() > 4) {
            s = '@cya@' + s.substring(0, s.length() - 4) + 'K @whi@(' + s + ')';
        }

        return s;
    }

    playSoundFile(s) {
        if (this.audioPlayer === null) {
            return;
        }

        if (!this.optionSoundDisabled) {
            this.audioPlayer.writeStream(this.soundData, Utility.getDataFileOffset(s + '.pcm', this.soundData), Utility.getDataFileLength(s + '.pcm', this.soundData));
        }
    }

    drawDialogReportAbuse() {
        this.reportAbuseOffence = 0;
        let y = 135;

        for (let i = 0; i < 12; i++) {
            if (this.mouseX > 66 && this.mouseX < 446 && this.mouseY >= y - 12 && this.mouseY < y + 3) {
                this.reportAbuseOffence = i + 1;
            }

            y += 14;
        }

        if (this.mouseButtonClick !== 0 && this.reportAbuseOffence !== 0) {
            this.mouseButtonClick = 0;
            this.showDialogReportAbuseStep = 2;
            this.inputTextCurrent = '';
            this.inputTextFinal = '';
            return;
        }

        y += 15;

        if (this.mouseButtonClick !== 0) {
            this.mouseButtonClick = 0;

            if (this.mouseX < 56 || this.mouseY < 35 || this.mouseX > 456 || this.mouseY > 325) {
                this.showDialogReportAbuseStep = 0;
                return;
            }

            if (this.mouseX > 66 && this.mouseX < 446 && this.mouseY >= y - 15 && this.mouseY < y + 5) {
                this.showDialogReportAbuseStep = 0;
                return;
            }
        }

        this.surface.drawBox(56, 35, 400, 290, 0);
        this.surface.drawBoxEdge(56, 35, 400, 290, 0xffffff);
        y = 50;
        this.surface.drawStringCenter('This form is for reporting players who are breaking our rules', 256, y, 1, 0xffffff);
        y += 15;
        this.surface.drawStringCenter('Using it sends a snapshot of the last 60 secs of activity to us', 256, y, 1, 0xffffff);
        y += 15;
        this.surface.drawStringCenter('If you misuse this form, you will be banned.', 256, y, 1, 0xff8000);
        y += 15;
        y += 10;
        this.surface.drawStringCenter('First indicate which of our 12 rules is being broken. For a detailed', 256, y, 1, 0xffff00);
        y += 15;
        this.surface.drawStringCenter('explanation of each rule please read the manual on our website.', 256, y, 1, 0xffff00);
        y += 15;

        let textColour = 0;

        if (reportAbuseOffence === 1) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('1: Offensive language', 256, y, 1, textColour);
        y += 14;

        if (reportAbuseOffence === 2) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('2: Item scamming', 256, y, 1, textColour);
        y += 14;

        if (reportAbuseOffence === 3) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('3: Password scamming', 256, y, 1, textColour);
        y += 14;

        if (reportAbuseOffence === 4) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('4: Bug abuse', 256, y, 1, textColour);
        y += 14;

        if (reportAbuseOffence === 5) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('5: Jagex Staff impersonation', 256, y, 1, textColour);
        y += 14;

        if (reportAbuseOffence === 6) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('6: Account sharing/trading', 256, y, 1, textColour);
        y += 14;

        if (reportAbuseOffence === 7) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('7: Macroing', 256, y, 1, textColour);
        y += 14;

        if (reportAbuseOffence === 8) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('8: Mutiple logging in', 256, y, 1, textColour);
        y += 14;

        if (reportAbuseOffence === 9) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('9: Encouraging others to break rules', 256, y, 1, textColour);
        y += 14;

        if (reportAbuseOffence === 10) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('10: Misuse of customer support', 256, y, 1, textColour);
        y += 14;

        if (reportAbuseOffence === 11) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('11: Advertising / website', 256, y, 1, textColour);
        y += 14;

        if (reportAbuseOffence === 12) {
            this.surface.drawBoxEdge(66, y - 12, 380, 15, 0xffffff);
            textColour = 0xff8000;
        } else {
            textColour = 0xffffff;
        }

        this.surface.drawStringCenter('12: Real world item trading', 256, y, 1, textColour);
        y += 14;
        y += 15;
        textColour = 0xffffff;

        if (this.mouseX > 196 && this.mouseX < 316 && this.mouseY > y - 15 && this.mouseY < y + 5) {
            textColour = 0xffff00;
        }

        this.surface.drawStringCenter('Click here to cancel', 256, y, 1, textColour);
    }

    _walkToActionSource_from8(startX, startY, x1, y1, x2, y2, checkObjects, walkToAction) {
        let steps = this.world.route(startX, startY, x1, y1, x2, y2, this.walkPathX, this.walkPathY, checkObjects);

        if (steps === -1) {
            if (walkToAction) {
                steps = 1;
                this.walkPathX[0] = x1;
                this.walkPathY[0] = y1;
            } else {
                return false;
            }
        }

        steps--;
        startX = this.walkPathX[steps];
        startY = this.walkPathY[steps];
        steps--;

        if (walkToAction) {
            this.clientStream.newPacket(C_OPCODES.WALK_ACTION);
        } else {
            this.clientStream.newPacket(C_OPCODES.WALK);
        }

        this.clientStream.putShort(startX + regionX);
        this.clientStream.putShort(startY + regionY);

        if (walkToAction && steps === -1 && (startX + regionX) % 5 === 0) {
            steps = 0;
        }

        for (let l1 = steps; l1 >= 0 && l1 > steps - 25; l1--) {
            this.clientStream.putByte(this.walkPathX[l1] - startX);
            this.clientStream.putByte(this.walkPathY[l1] - startY);
        }

        this.clientStream.sendPacket();

        this.mouseClickXStep = -24;
        this.mouseClickXX = this.mouseX;
        this.mouseClickXY = this.mouseY;

        return true;
    }

    walkTo(startX, startY, x1, y1, x2, y2, checkObjects, walkToAction) {
        let steps = world.route(startX, startY, x1, y1, x2, y2, this.walkPathX, this.walkPathY, checkObjects);

        if (steps === -1) {
            return false;
        }

        steps--;
        startX = this.walkPathX[steps];
        startY = this.walkPathY[steps];
        steps--;

        if (walkToAction) {
            this.clientStream.newPacket(C_OPCODES.WALK_ACTION);
        } else {
            this.clientStream.newPacket(C_OPCODES.WALK);
        }

        this.clientStream.putShort(startX + regionX);
        this.clientStream.putShort(startY + regionY);

        if (walkToAction && steps === -1 && (startX + regionX) % 5 === 0) {
            steps = 0;
        }

        for (let l1 = steps; l1 >= 0 && l1 > steps - 25; l1--) {
            this.clientStream.putByte(this.walkPathX[l1] - startX);
            this.clientStream.putByte(this.walkPathY[l1] - startY);
        }

        this.clientStream.sendPacket();

        this.mouseClickXStep = -24;
        this.mouseClickXX = this.mouseX;
        this.mouseClickXY = this.mouseY;

        return true;
    }

    drawMinimapEntity(x, y, c) {
        this.surface.setPixel(x, y, c);
        this.surface.setPixel(x - 1, y, c);
        this.surface.setPixel(x + 1, y, c);
        this.surface.setPixel(x, y - 1, c);
        this.surface.setPixel(x, y + 1, c);
    }

    updateBankItems() {
        this.bankItemCount = this.newBankItemCount;

        for (let i = 0; i < this.newBankItemCount; i++) {
            this.bankItems[i] = this.newBankItems[i];
            this.bankItemsCount[i] = this.newBankItemsCount[i];
        }

        for (let invIdx = 0; invIdx < this.inventoryItemsCount; invIdx++) {
            if (this.bankItemCount >= this.bankItemsMax) {
                break;
            }

            let invId = this.inventoryItemId[invIdx];
            let hasItemInInv = false;

            for (let bankidx = 0; bankidx < this.bankItemCount; bankidx++) {
                if (this.bankItems[bankidx] !== invId) {
                    continue;
                }

                hasItemInInv = true;
                break;
            }

            if (!hasItemInInv) {
                this.bankItems[this.bankItemCount] = invId;
                this.bankItemsCount[this.bankItemCount] = 0;
                this.bankItemCount++;
            }
        }
    }

    drawDialogWildWarn() {
        let y = 97;

        this.surface.drawBox(86, 77, 340, 180, 0);
        this.surface.drawBoxEdge(86, 77, 340, 180, 0xffffff);
        this.surface.drawStringCenter('Warning! Proceed with caution', 256, y, 4, 0xff0000);
        y += 26;
        this.surface.drawStringCenter('If you go much further north you will enter the', 256, y, 1, 0xffffff);
        y += 13;
        this.surface.drawStringCenter('wilderness. This a very dangerous area where', 256, y, 1, 0xffffff);
        y += 13;
        this.surface.drawStringCenter('other players can attack you!', 256, y, 1, 0xffffff);
        y += 22;
        this.surface.drawStringCenter('The further north you go the more dangerous it', 256, y, 1, 0xffffff);
        y += 13;
        this.surface.drawStringCenter('becomes, but the more treasure you will find.', 256, y, 1, 0xffffff);
        y += 22;
        this.surface.drawStringCenter('In the wilderness an indicator at the bottom-right', 256, y, 1, 0xffffff);
        y += 13;
        this.surface.drawStringCenter('of the screen will show the current level of danger', 256, y, 1, 0xffffff);
        y += 22;

        let j = 0xffffff;

        if (this.mouseY > y - 12 && this.mouseY <= y && this.mouseX > 181 && this.mouseX < 331) {
            j = 0xff0000;
        }

        this.surface.drawStringCenter('Click here to close window', 256, y, 1, j);

        if (this.mouseButtonClick !== 0) {
            if (this.mouseY > y - 12 && this.mouseY <= y && this.mouseX > 181 && this.mouseX < 331) {
                this.showUiWildWarn = 2;
            }

            if (this.mouseX < 86 || this.mouseX > 426 || this.mouseY < 77 || this.mouseY > 257) {
                this.showUiWildWarn = 2;
            }

            this.mouseButtonClick = 0;
        }
    }

    drawAboveHeadStuff() {
        for (let msgIdx = 0; msgIdx < receivedMessagesCount; msgIdx++) {
            let txtHeight = this.surface.textHeight(1);
            let x = this.receivedMessageX[msgIdx];
            let y = this.receivedMessageY[msgIdx];
            let mId = this.receivedMessageMidPoint[msgIdx];
            let msgHeight = this.receivedMessageHeight[msgIdx];
            let flag = true;

            while (flag) {
                flag = false;

                for (let i4 = 0; i4 < msgIdx; i4++) {
                    if (y + msgHeight > this.receivedMessageY[i4] - txtHeight && y - txtHeight < receivedMessageY[i4] + receivedMessageHeight[i4] && x - mId < receivedMessageX[i4] + receivedMessageMidPoint[i4] && x + mId > receivedMessageX[i4] - receivedMessageMidPoint[i4] && receivedMessageY[i4] - txtHeight - msgHeight < y) {
                        y = this.receivedMessageY[i4] - txtHeight - msgHeight;
                        flag = true;
                    }
                }
            }

            this.receivedMessageY[msgIdx] = y;
            this.surface.centrepara(this.receivedMessages[msgIdx], x, y, 1, 0xffff00, 300);
        }

        for (let itemIdx = 0; itemIdx < this.itemsAboveHeadCount; itemIdx++) {
            let x = this.actionBubbleX[itemIdx];
            let y = this.actionBubbleY[itemIdx];
            let scale = this.actionBubbleScale[itemIdx];
            let id = this.actionBubbleItem[itemIdx];
            let scaleX = ((39 * scale) / 100) | 0;
            let scaleY = ((27 * scale) / 100) | 0;

            this.surface.drawActionBubble(x - ((scaleX / 2) | 0), y - scaleY, scaleX, scaleY, this.spriteMedia + 9, 85);

            let scaleXClip = ((36 * scale) / 100) | 0;
            let scaleYClip = ((24 * scale) / 100) | 0;

            this.surface.spriteClipping(x - ((scaleXClip / 2) | 0), (y - scaleY + ((scaleY / 2) | 0)) - ((scaleYClip / 2) | 0), scaleXClip, scaleYClip, GameData.itemPicture[id] + this.spriteItem, GameData.itemMask[id], 0, 0, false);
        }

        for (let j1 = 0; j1 < this.healthBarCount; j1++) {
            let i2 = this.healthBarX[j1];
            let l2 = this.healthBarY[j1];
            let k3 = this.healthBarMissing[j1];

            this.surface.drawBoxAlpha(i2 - 15, l2 - 3, k3, 5, 65280, 192);
            this.surface.drawBoxAlpha((i2 - 15) + k3, l2 - 3, 30 - k3, 5, 0xff0000, 192);
        }
    }

    _walkToActionSource_from5(sx, sy, dx, dy, action) {
        this._walkToActionSource_from8(sx, sy, dx, dy, dx, dy, false, action);
    }

    createMessageTabPanel() {
        this.panelMessageTabs = new Panel(surface, 10);
        this.controlTextListChat = this.panelMessageTabs.addTextList(5, 269, 502, 56, 1, 20, true);
        this.controlTextListAll = this.panelMessageTabs.addTextListInput(7, 324, 498, 14, 1, 80, false, true);
        this.controlTextListQuest = this.panelMessageTabs.addTextList(5, 269, 502, 56, 1, 20, true);
        this.controlTextListPrivate = this.panelMessageTabs.addTextList(5, 269, 502, 56, 1, 20, true);
        this.panelMessageTabs.setFocus(this.controlTextListAll);
    }

    disposeAndCollect() {
        if (this.surface !== null) {
            this.surface.clear();
            this.surface.pixels = null;
            this.surface = null;
        }

        if (this.scene !== null) {
            this.scene.dispose();
            this.scene = null;
        }

        this.gameModels = null;
        this.objectModel = null;
        this.wallObjectModel = null;
        this.playerServer = null;
        this.players = null;
        this.npcsServer = null;
        this.npcs = null;
        this.localPlayer = null;

        if (world !== null) {
            this.world.terrainModels = null;
            this.world.wallModels = null;
            this.world.roofModels = null;
            this.world.parentModel = null;
            this.world = null;
        }
    }

    drawUi() {
        if (this.logoutTimeout !== 0) {
            this.drawDialogLogout();
        } else if (this.showDialogWelcome) {
            this.drawDialogWelcome();
        } else if (this.showDialogServermessage) {
            this.drawDialogServermessage();
        } else if (this.showUiWildWarn === 1) {
            this.drawDialogWildWarn();
        } else if (this.showDialogBank && combatTimeout === 0) {
            this.drawDialogBank();
        } else if (this.showDialogShop && combatTimeout === 0) {
            this.drawDialogShop();
        } else if (this.showDialogTradeConfirm) {
            this.drawDialogTradeConfirm();
        } else if (this.showDialogTrade) {
            this.drawDialogTrade();
        } else if (this.showDialogDuelConfirm) {
            this.drawDialogDuelConfirm();
        } else if (this.showDialogDuel) {
            this.drawDialogDuel();
        } else if (this.showDialogReportAbuseStep === 1) {
            this.drawDialogReportAbuse();
        } else if (this.showDialogReportAbuseStep === 2) {
            this.drawDialogReportAbuseInput();
        } else if (this.showDialogSocialInput !== 0) {
            this.drawDialogSocialInput();
        } else {
            if (this.showOptionMenu) {
                this.drawOptionMenu();
            }

            if (localPlayer.animationCurrent === 8 || localPlayer.animationCurrent === 9) {
                this.drawDialogCombatStyle();
            }

            this.setActiveUiTab();

            let nomenus = !this.showOptionMenu && !this.showRightClickMenu;

            if (nomenus) {
                this.menuItemsCount = 0;
            }

            if (this.showUiTab === 0 && nomenus) {
                this.createRightClickMenu();
            }

            if (this.showUiTab === 1) {
                this.drawUiTabInventory(nomenus);
            }

            if (this.showUiTab === 2) {
                this.drawUiTabMinimap(nomenus);
            }

            if (this.showUiTab === 3) {
                this.drawUiTabPlayerInfo(nomenus);
            }

            if (this.showUiTab === 4) {
                this.drawUiTabMagic(nomenus);
            }

            if (this.showUiTab === 5) {
                this.drawUiTabSocial(nomenus);
            }

            if (this.showUiTab === 6) {
                this.drawUiTabOptions(nomenus);
            }

            if (!this.showRightClickMenu && !this.showOptionMenu) {
                createTopMouseMenu();
            }

            if (this.showRightClickMenu && !this.showOptionMenu) {
                this.drawRightClickMenu();
            }
        }

        this.mouseButtonClick = 0;
    }

    drawDialogTrade() {
        if (this.mouseButtonClick !== 0 && this.mouseButtonItemCountIncrement === 0) {
            this.mouseButtonItemCountIncrement = 1;
        }

        if (this.mouseButtonItemCountIncrement > 0) {
            let mouseX = this.mouseX - 22;
            let mouseY = this.mouseY - 36;

            if (mouseX >= 0 && mouseY >= 0 && mouseX < 468 && mouseY < 262) {
                if (mouseX > 216 && mouseY > 30 && mouseX < 462 && mouseY < 235) {
                    let slot = (((mouseX - 217) / 49) | 0) + (((mouseY - 31) / 34) | 0) * 5;

                    if (slot >= 0 && slot < inventoryItemsCount) {
                        let sendUpdate = false;
                        let itemCountAdd = 0;
                        let itemType = this.inventoryItemId[slot];

                        for (let itemIndex = 0; itemIndex < this.tradeItemsCount; itemIndex++) {
                            if (this.tradeItems[itemIndex] === itemType) {
                                if (GameData.itemStackable[itemType] === 0) {
                                    for (let i4 = 0; i4 < this.mouseButtonItemCountIncrement; i4++) {
                                        if (this.tradeItemCount[itemIndex] < this.inventoryItemStackCount[slot]) {
                                            this.tradeItemCount[itemIndex]++;
                                        }

                                        sendUpdate = true;
                                    }

                                } else {
                                    itemCountAdd++;
                                }
                            }
                        }

                        if (this.getInventoryCount(itemType) <= itemCountAdd) {
                            sendUpdate = true;
                        }

                        // quest items? or just tagged as 'special'
                        if (GameData.itemSpecial[itemType] === 1) { 
                            this.showMessage('This object cannot be traded with other players', 3);
                            sendUpdate = true;
                        }

                        if (!sendUpdate && this.tradeItemsCount < 12) {
                            this.tradeItems[this.tradeItemsCount] = itemType;
                            this.tradeItemCount[this.tradeItemsCount] = 1;
                            this.tradeItemsCount++;
                            sendUpdate = true;
                        }

                        if (sendUpdate) {
                            this.clientStream.newPacket(C_OPCODES.TRADE_ITEM_UPDATE);
                            this.clientStream.putByte(this.tradeItemsCount);

                            for (let j4 = 0; j4 < this.tradeItemsCount; j4++) {
                                this.clientStream.putShort(this.tradeItems[j4]);
                                this.clientStream.putInt(tradeItemCount[j4]);
                            }

                            this.clientStream.sendPacket();
                            this.tradeRecipientAccepted = false;
                            this.tradeAccepted = false;
                        }
                    }
                }

                if (mouseX > 8 && mouseY > 30 && mouseX < 205 && mouseY < 133) {
                    let itemIndex = (((mouseX - 9) / 49) | 0) + (((mouseY - 31) / 34) | 0) * 4;

                    if (itemIndex >= 0 && itemIndex < this.tradeItemsCount) {
                        let itemType = this.tradeItems[itemIndex];

                        for (let i2 = 0; i2 < this.mouseButtonItemCountIncrement; i2++) {
                            if (GameData.itemStackable[itemType] === 0 && this.tradeItemCount[itemIndex] > 1) {
                                this.tradeItemCount[itemIndex]--;
                                continue;
                            }
                            this.tradeItemsCount--;
                            this.mouseButtonDownTime = 0;

                            for (let l2 = itemIndex; l2 < this.tradeItemsCount; l2++) {
                                this.tradeItems[l2] = this.tradeItems[l2 + 1];
                                this.tradeItemCount[l2] = this.tradeItemCount[l2 + 1];
                            }

                            break;
                        }

                        this.clientStream.newPacket(C_OPCODES.TRADE_ITEM_UPDATE);
                        this.clientStream.putByte(this.tradeItemsCount);

                        for (let i3 = 0; i3 < this.tradeItemsCount; i3++) {
                            this.clientStream.putShort(this.tradeItems[i3]);
                            this.clientStream.putInt(this.tradeItemCount[i3]);
                        }

                        this.clientStream.sendPacket();
                        this.tradeRecipientAccepted = false;
                        this.tradeAccepted = false;
                    }
                }

                if (mouseX >= 217 && mouseY >= 238 && mouseX <= 286 && mouseY <= 259) {
                    this.tradeAccepted = true;
                    this.clientStream.newPacket(C_OPCODES.TRADE_ACCEPT);
                    this.clientStream.sendPacket();
                }

                if (mouseX >= 394 && mouseY >= 238 && mouseX < 463 && mouseY < 259) {
                    this.showDialogTrade = false;
                    this.clientStream.newPacket(C_OPCODES.TRADE_DECLINE);
                    this.clientStream.sendPacket();
                }
            } else if (this.mouseButtonClick !== 0) {
                this.showDialogTrade = false;
                this.clientStream.newPacket(C_OPCODES.TRADE_DECLINE);
                this.clientStream.sendPacket();
            }

            this.mouseButtonClick = 0;
            this.mouseButtonItemCountIncrement = 0;
        }

        if (!this.showDialogTrade) {
            return;
        }

        let dialogX = 22;
        let dialogY = 36;

        this.surface.drawBox(dialogX, dialogY, 468, 12, 192);
        this.surface.drawBoxAlpha(dialogX, dialogY + 12, 468, 18, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX, dialogY + 30, 8, 248, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 205, dialogY + 30, 11, 248, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 462, dialogY + 30, 6, 248, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 8, dialogY + 133, 197, 22, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 8, dialogY + 258, 197, 20, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 216, dialogY + 235, 246, 43, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 8, dialogY + 30, 197, 103, 0xd0d0d0, 160);
        this.surface.drawBoxAlpha(dialogX + 8, dialogY + 155, 197, 103, 0xd0d0d0, 160);
        this.surface.drawBoxAlpha(dialogX + 216, dialogY + 30, 246, 205, 0xd0d0d0, 160);

        for (let j2 = 0; j2 < 4; j2++) {
            this.surface.drawLineHoriz(dialogX + 8, dialogY + 30 + j2 * 34, 197, 0);
        }

        for (let j3 = 0; j3 < 4; j3++) {
            this.surface.drawLineHoriz(dialogX + 8, dialogY + 155 + j3 * 34, 197, 0);
        }

        for (let l3 = 0; l3 < 7; l3++) {
            this.surface.drawLineHoriz(dialogX + 216, dialogY + 30 + l3 * 34, 246, 0);
        }

        for (let k4 = 0; k4 < 6; k4++) {
            if (k4 < 5) {
                this.surface.drawLineVert(dialogX + 8 + k4 * 49, dialogY + 30, 103, 0);
            }

            if (k4 < 5) {
                this.surface.drawLineVert(dialogX + 8 + k4 * 49, dialogY + 155, 103, 0);
            }

            this.surface.drawLineVert(dialogX + 216 + k4 * 49, dialogY + 30, 205, 0);
        }

        this.surface.drawString('Trading with: ' + this.tradeRecipientName, dialogX + 1, dialogY + 10, 1, 0xffffff);
        this.surface.drawString('Your Offer', dialogX + 9, dialogY + 27, 4, 0xffffff);
        this.surface.drawString('Opponent\'s Offer', dialogX + 9, dialogY + 152, 4, 0xffffff);
        this.surface.drawString('Your Inventory', dialogX + 216, dialogY + 27, 4, 0xffffff);

        if (!this.tradeAccepted) {
            this.surface.drawSprite(dialogX + 217, dialogY + 238, this.spriteMedia + 25);
        }

        this.surface.drawSprite(dialogX + 394, dialogY + 238, this.spriteMedia + 26);

        if (this.tradeRecipientAccepted) {
            this.surface.drawStringCenter('Other player', dialogX + 341, dialogY + 246, 1, 0xffffff);
            this.surface.drawStringCenter('has accepted', dialogX + 341, dialogY + 256, 1, 0xffffff);
        }

        if (this.tradeAccepted) {
            this.surface.drawStringCenter('Waiting for', dialogX + 217 + 35, dialogY + 246, 1, 0xffffff);
            this.surface.drawStringCenter('other player', dialogX + 217 + 35, dialogY + 256, 1, 0xffffff);
        }

        for (let itemIndex = 0; itemIndex < inventoryItemsCount; itemIndex++) {
            let slotX = 217 + dialogX + (itemIndex % 5) * 49;
            let slotY = 31 + dialogY + ((itemIndex / 5) | 0) * 34;

            this.surface.spriteClipping(slotX, slotY, 48, 32, this.spriteItem + GameData.itemPicture[this.inventoryItemId[itemIndex]], GameData.itemMask[this.inventoryItemId[itemIndex]], 0, 0, false);

            if (GameData.itemStackable[this.inventoryItemId[itemIndex]] === 0) {
                this.surface.drawString(String.valueOf(this.inventoryItemStackCount[itemIndex]), slotX + 1, slotY + 10, 1, 0xffff00);
            }
        }

        for (let itemIndex = 0; itemIndex < this.tradeItemsCount; itemIndex++) {
            let slotX = 9 + dialogX + (itemIndex % 4) * 49;
            let slotY = 31 + dialogY + ((itemIndex / 4) | 0) * 34;

            this.surface.spriteClipping(slotX, slotY, 48, 32, this.spriteItem + GameData.itemPicture[this.tradeItems[itemIndex]], GameData.itemMask[this.tradeItems[itemIndex]], 0, 0, false);

            if (GameData.itemStackable[this.tradeItems[itemIndex]] === 0) {
                this.surface.drawString(String.valueOf(this.tradeItemCount[itemIndex]), slotX + 1, slotY + 10, 1, 0xffff00);
            }

            if (this.mouseX > slotX && this.mouseX < slotX + 48 && this.mouseY > slotY && this.mouseY < slotY + 32) {
                this.surface.drawString(GameData.itemName[this.tradeItems[itemIndex]] + ': @whi@' + GameData.itemDescription[this.tradeItems[itemIndex]], dialogX + 8, dialogY + 273, 1, 0xffff00);
            }
        }

        for (let itemIndex = 0; itemIndex < tradeRecipientItemsCount; itemIndex++) {
            let slotX = 9 + dialogX + (itemIndex % 4) * 49;
            let slotY = 156 + dialogY + ((itemIndex / 4) | 0) * 34;

            this.surface.spriteClipping(slotX, slotY, 48, 32, this.spriteItem + GameData.itemPicture[this.tradeRecipientItems[itemIndex]], GameData.itemMask[this.tradeRecipientItems[itemIndex]], 0, 0, false);

            if (GameData.itemStackable[tradeRecipientItems[itemIndex]] === 0) {
                this.surface.drawString(String.valueOf(this.tradeRecipientItemCount[itemIndex]), slotX + 1, slotY + 10, 1, 0xffff00);
            }

            if (this.mouseX > slotX && this.mouseX < slotX + 48 && this.mouseY > slotY && this.mouseY < slotY + 32) {
                this.surface.drawString(GameData.itemName[this.tradeRecipientItems[itemIndex]] + ': @whi@' + GameData.itemDescription[this.tradeRecipientItems[itemIndex]], dialogX + 8, dialogY + 273, 1, 0xffff00);
            }
        }
    }

    resetGame() {
        this.systemUpdate = 0;
        this.combatStyle = 0;
        this.logoutTimeout = 0;
        this.loginScreen = 0;
        this.loggedIn = 1;

        this.resetPMText();
        this.surface.blackScreen();
        this.surface.draw(this.graphics, 0, 0);

        for (let i = 0; i < this.objectCount; i++) {
            this.scene.removeModel(this.objectModel[i]);
            this.world.removeObject(this.objectX[i], this.objectY[i], this.objectId[i]);
        }

        for (let j = 0; j < this.wallObjectCount; j++) {
            this.scene.removeModel(this.wallObjectModel[j]);
            this.world.removeWallObject(this.wallObjectX[j], this.wallObjectY[j], this.wallObjectDirection[j], this.wallObjectId[j]);
        }

        this.objectCount = 0;
        this.wallObjectCount = 0;
        this.groundItemCount = 0;
        this.playerCount = 0;

        for (let k = 0; k < this.playersServerMax; k++) {
            this.playerServer[k] = null;
        }

        for (let l = 0; l < this.playersMax; l++) {
            this.players[l] = null;
        }

        this.npcCount = 0;

        for (let i1 = 0; i1 < this.npcsServerMax; i1++) {
            this.npcsServer[i1] = null;
        }

        for (let j1 = 0; j1 < this.npcsMax; j1++) {
            this.npcs[j1] = null;
        }

        for (let k1 = 0; k1 < 50; k1++) {
            this.prayerOn[k1] = false;
        }

        this.mouseButtonClick = 0;
        this.lastMouseButtonDown = 0;
        this.mouseButtonDown = 0;
        this.showDialogShop = false;
        this.showDialogBank = false;
        this.isSleeping = false;
        this.friendListCount = 0;
    }

    drawUiTabSocial(nomenus) {
        let uiX = this.surface.width2 - 199;
        let uiY = 36;

        this.surface.drawSprite(uiX - 49, 3, this.spriteMedia + 5);

        let uiWidth = 196;
        let uiHeight = 182;
        let l = 0;
        let k = l = Surface.rgbToLong(160, 160, 160);

        if (this.uiTabSocialSubTab === 0) {
            k = Surface.rgbToLong(220, 220, 220);
        } else {
            l = Surface.rgbToLong(220, 220, 220);
        }

        this.surface.drawBoxAlpha(uiX, uiY, (uiWidth / 2) | 0, 24, k, 128);
        this.surface.drawBoxAlpha(uiX + ((uiWidth / 2) | 0), uiY, (uiWidth / 2) | 0, 24, l, 128);
        this.surface.drawBoxAlpha(uiX, uiY + 24, uiWidth, uiHeight - 24, Surface.rgbToLong(220, 220, 220), 128);
        this.surface.drawLineHoriz(uiX, uiY + 24, uiWidth, 0);
        this.surface.drawLineVert(uiX + ((uiWidth / 2) | 0), uiY, 24, 0);
        this.surface.drawLineHoriz(uiX, (uiY + uiHeight) - 16, uiWidth, 0);
        this.surface.drawStringCenter('Friends', uiX + ((uiWidth / 4) | 0), uiY + 16, 4, 0);
        this.surface.drawStringCenter('Ignore', uiX + ((uiWidth / 4) | 0) + ((uiWidth / 2) | 0), uiY + 16, 4, 0);

        this.panelSocialList.clearList(this.controlListSocialPlayers);

        if (this.uiTabSocialSubTab === 0) {
            for (let i1 = 0; i1 < this.friendListCount; i1++) {
                let s = null;

                if (this.friendListOnline[i1] === 255) {
                    s = '@gre@';
                } else if (this.friendListOnline[i1] > 0) {
                    s = '@yel@';
                } else {
                    s = '@red@';
                }

                this.panelSocialList.addListEntry(this.controlListSocialPlayers, i1, s + Utility.hashToUsername(this.friendListHashes[i1]) + '~439~@whi@Remove         WWWWWWWWWW');
            }

        }

        if (this.uiTabSocialSubTab === 1) {
            for (let j1 = 0; j1 < this.ignoreListCount; j1++) {
                this.panelSocialList.addListEntry(this.controlListSocialPlayers, j1, '@yel@' + Utility.hashToUsername(this.ignoreList[j1]) + '~439~@whi@Remove         WWWWWWWWWW');
            }
        }

        this.panelSocialList.drawPanel();

        if (this.uiTabSocialSubTab === 0) {
            let k1 = this.panelSocialList.getListEntryIndex(this.controlListSocialPlayers);

            if (k1 >= 0 && this.mouseX < 489) {
                if (this.mouseX > 429) {
                    this.surface.drawStringCenter('Click to remove ' + Utility.hashToUsername(this.friendListHashes[k1]), uiX + ((uiWidth / 2) | 0), uiY + 35, 1, 0xffffff);
                } else if (this.friendListOnline[k1] === 255) {
                    this.surface.drawStringCenter('Click to message ' + Utility.hashToUsername(this.friendListHashes[k1]), uiX + ((uiWidth / 2) | 0), uiY + 35, 1, 0xffffff);
                } else if (this.friendListOnline[k1] > 0) {
                    if (this.friendListOnline[k1] < 200) {
                        this.surface.drawStringCenter(Utility.hashToUsername(this.friendListHashes[k1]) + ' is on world ' + (this.friendListOnline[k1] - 9), uiX + ((uiWidth / 2) | 0), uiY + 35, 1, 0xffffff);
                    } else {
                        this.surface.drawStringCenter(Utility.hashToUsername(this.friendListHashes[k1]) + ' is on classic ' + (this.friendListOnline[k1] - 219), uiX + ((uiWidth / 2) | 0), uiY + 35, 1, 0xffffff);
                    }
                } else {
                    this.surface.drawStringCenter(Utility.hashToUsername(this.friendListHashes[k1]) + ' is offline', uiX + ((uiWidth / 2) | 0), uiY + 35, 1, 0xffffff);
                }
            } else {
                this.surface.drawStringCenter('Click a name to send a message', uiX + ((uiWidth / 2) | 0), uiY + 35, 1, 0xffffff);
            }

            let colour = 0;

            if (this.mouseX > uiX && this.mouseX < uiX + uiWidth && this.mouseY > (uiY + uiHeight) - 16 && this.mouseY < uiY + uiHeight) {
                colour = 0xffff00;
            } else {
                colour = 0xffffff;
            }

            this.surface.drawStringCenter('Click here to add a friend', uiX + ((uiWidth / 2) | 0), (uiY + uiHeight) - 3, 1, colour);
        }

        if (this.uiTabSocialSubTab === 1) {
            let l1 = this.panelSocialList.getListEntryIndex(this.controlListSocialPlayers);

            if (l1 >= 0 && this.mouseX < 489 && this.mouseX > 429) {
                if (this.mouseX > 429) {
                    this.surface.drawStringCenter('Click to remove ' + Utility.hashToUsername(this.ignoreList[l1]), uiX + ((uiWidth / 2) | 0), uiY + 35, 1, 0xffffff);
                }
            } else {
                this.surface.drawStringCenter('Blocking messages from:', uiX + ((uiWidth / 2) | 0), uiY + 35, 1, 0xffffff);
            }

            let l2 = 0;

            if (this.mouseX > uiX && this.mouseX < uiX + uiWidth && this.mouseY > (uiY + uiHeight) - 16 && this.mouseY < uiY + uiHeight) {
                l2 = 0xffff00;
            } else {
                l2 = 0xffffff;
            }

            this.surface.drawStringCenter('Click here to add a name', uiX + ((uiWidth / 2) | 0), (uiY + uiHeight) - 3, 1, l2);
        }

        if (!nomenus) {
            return;
        }

        uiX = this.mouseX - (this.surface.width2 - 199);
        uiY = this.mouseY - 36;

        if (uiX >= 0 && uiY >= 0 && uiX < 196 && uiY < 182) {
            this.panelSocialList.handleMouse(uiX + (this.surface.width2 - 199), uiY + 36, this.lastMouseButtonDown, this.mouseButtonDown);

            if (uiY <= 24 && this.mouseButtonClick === 1) {
                if (uiX < 98 && this.uiTabSocialSubTab === 1) {
                    this.uiTabSocialSubTab = 0;
                    this.panelSocialList.resetListProps(this.controlListSocialPlayers);
                } else if (uiX > 98 && this.uiTabSocialSubTab === 0) {
                    this.uiTabSocialSubTab = 1;
                    this.panelSocialList.resetListProps(this.controlListSocialPlayers);
                }
            }

            if (this.mouseButtonClick === 1 && this.uiTabSocialSubTab === 0) {
                let i2 = this.panelSocialList.getListEntryIndex(this.controlListSocialPlayers);

                if (i2 >= 0 && this.mouseX < 489) {
                    if (this.mouseX > 429) {
                        this.friendRemove(this.friendListHashes[i2]);
                    } else if (this.friendListOnline[i2] !== 0) {
                        this.showDialogSocialInput = 2;
                        this.privateMessageTarget = this.friendListHashes[i2];
                        this.inputPmCurrent = '';
                        this.inputPmFinal = '';
                    }
                }
            }

            if (this.mouseButtonClick === 1 && this.uiTabSocialSubTab === 1) {
                let j2 = this.panelSocialList.getListEntryIndex(this.controlListSocialPlayers);

                if (j2 >= 0 && this.mouseX < 489 && this.mouseX > 429) {
                    this.ignoreRemove(this.ignoreList[j2]);
                }
            }

            if (uiY > 166 && this.mouseButtonClick === 1 && this.uiTabSocialSubTab === 0) {
                this.showDialogSocialInput = 1;
                this.inputTextCurrent = '';
                this.inputTextFinal = '';
            }

            if (uiY > 166 && this.mouseButtonClick === 1 && this.uiTabSocialSubTab === 1) {
                this.showDialogSocialInput = 3;
                this.inputTextCurrent = '';
                this.inputTextFinal = '';
            }

            this.mouseButtonClick = 0;
        }
    }

    handleKeyPress(i) {
        if (this.loggedIn === 0) {
            if (this.loginScreen === 0 && this.panelLoginWelcome !== null) {
                this.panelLoginWelcome.keyPress(i);
            }

            if (this.loginScreen === 1 && this.panelLoginNewuser !== null) {
                this.panelLoginNewuser.keyPress(i);
            }

            if (this.loginScreen === 2 && this.panelLoginExistinguser !== null) {
                this.panelLoginExistinguser.keyPress(i);
            }
        }

        if (this.loggedIn === 1) {
            if (this.showAppearanceChange && this.panelAppearance !== null) {
                this.panelAppearance.keyPress(i);
                return;
            }

            if (this.showDialogSocialInput === 0 && this.showDialogReportAbuseStep === 0 && !this.isSleeping && this.panelMessageTabs !== null) {
                this.panelMessageTabs.keyPress(i);
            }
        }
    }

    sendLogout() {
        if (this.loggedIn === 0) {
            return;
        }

        if (this.combatTimeout > 450) {
            this.showMessage('@cya@You can\'t logout during combat!', 3);
            return;
        }

        if (this.combatTimeout > 0) {
            this.showMessage('@cya@You can\'t logout for 10 seconds after combat', 3);
            return;
        } else {
            this.clientStream.newPacket(C_OPCODES.LOGOUT);
            this.clientStream.sendPacket();
            this.logoutTimeout = 1000;
            return;
        }
    }

    createPlayer(serverIndex, x, y, anim) {
        if (this.playerServer[serverIndex] === null) {
            this.playerServer[serverIndex] = new GameCharacter();
            this.playerServer[serverIndex].serverIndex = serverIndex;
            this.playerServer[serverIndex].serverId = 0;
        }

        let character = this.playerServer[serverIndex];
        let flag = false;

        for (let i1 = 0; i1 < this.knownPlayerCount; i1++) {
            if (this.knownPlayers[i1].serverIndex !== serverIndex) {
                continue;
            }

            flag = true;
            break;
        }

        if (flag) {
            character.animationNext = anim;
            let j1 = character.waypointCurrent;

            if (x !== character.waypointsX[j1] || y !== character.waypointsY[j1]) {
                character.waypointCurrent = j1 = (j1 + 1) % 10;
                character.waypointsX[j1] = x;
                character.waypointsY[j1] = y;
            }
        } else {
            character.serverIndex = serverIndex;
            character.movingStep = 0;
            character.waypointCurrent = 0;
            character.waypointsX[0] = character.currentX = x;
            character.waypointsY[0] = character.currentY = y;
            character.animationNext = character.animationCurrent = anim;
            character.stepCount = 0;
        }

        this.players[playerCount++] = character;

        return character;
    }

    drawDialogSocialInput() {
        if (this.mouseButtonClick !== 0) {
            this.mouseButtonClick = 0;

            if (this.showDialogSocialInput === 1 && (this.mouseX < 106 || this.mouseY < 145 || this.mouseX > 406 || this.mouseY > 215)) {
                this.showDialogSocialInput = 0;
                return;
            }

            if (this.showDialogSocialInput === 2 && (this.mouseX < 6 || this.mouseY < 145 || this.mouseX > 506 || this.mouseY > 215)) {
                this.showDialogSocialInput = 0;
                return;
            }

            if (this.showDialogSocialInput === 3 && (this.mouseX < 106 || this.mouseY < 145 || this.mouseX > 406 || this.mouseY > 215)) {
                this.showDialogSocialInput = 0;
                return;
            }

            if (this.mouseX > 236 && this.mouseX < 276 && this.mouseY > 193 && this.mouseY < 213) {
                this.showDialogSocialInput = 0;
                return;
            }
        }

        let i = 145;

        if (this.showDialogSocialInput === 1) {
            this.surface.drawBox(106, i, 300, 70, 0);
            this.surface.drawBoxEdge(106, i, 300, 70, 0xffffff);
            i += 20;
            this.surface.drawStringCenter('Enter name to add to friends list', 256, i, 4, 0xffffff);
            i += 20;
            this.surface.drawStringCenter(this.inputTextCurrent + '*', 256, i, 4, 0xffffff);

            if (this.inputTextFinal.length > 0) {
                let s = this.inputTextFinal.trim();
                this.inputTextCurrent = '';
                this.inputTextFinal = '';
                this.showDialogSocialInput = 0;

                if (s.length > 0 && !Utility.usernameToHash(s).equals(this.localPlayer.hash)) {
                    this.friendAdd(s);
                }
            }
        }

        if (this.showDialogSocialInput === 2) {
            this.surface.drawBox(6, i, 500, 70, 0);
            this.surface.drawBoxEdge(6, i, 500, 70, 0xffffff);
            i += 20;
            this.surface.drawStringCenter('Enter message to send to ' + Utility.hashToUsername(this.privateMessageTarget), 256, i, 4, 0xffffff);
            i += 20;
            this.surface.drawStringCenter(this.inputPmCurrent + '*', 256, i, 4, 0xffffff);

            if (this.inputPmFinal.length > 0) {
                let s1 = this.inputPmFinal;
                this.inputPmCurrent = "";
                this.inputPmFinal = "";
                this.showDialogSocialInput = 0;

                let k = ChatMessage.scramble(s1);
                this.sendPrivateMessage(privateMessageTarget, ChatMessage.scrambledBytes, k);
                s1 = ChatMessage.descramble(ChatMessage.scrambledBytes, 0, k);
                s1 = WordFilter.filter(s1);

                this.showServerMessage('@pri@You tell ' + Utility.hashToUsername(this.privateMessageTarget) + ': ' + s1);
            }
        }

        if (showDialogSocialInput === 3) {
            this.surface.drawBox(106, i, 300, 70, 0);
            this.surface.drawBoxEdge(106, i, 300, 70, 0xffffff);
            i += 20;
            this.surface.drawStringCenter('Enter name to add to ignore list', 256, i, 4, 0xffffff);
            i += 20;
            this.surface.drawStringCenter(this.inputTextCurrent + '*', 256, i, 4, 0xffffff);

            if (this.inputTextFinal.length > 0) {
                let s2 = this.inputTextFinal.trim();
                this.inputTextCurrent = '';
                this.inputTextFinal = '';
                this.showDialogSocialInput = 0;

                if (s2.length > 0 && !Utility.usernameToHash(s2).equals(localPlayer.hash)) {
                    this.ignoreAdd(s2);
                }
            }
        }

        let j = 0xffffff;

        if (this.mouseX > 236 && this.mouseX < 276 && this.mouseY > 193 && this.mouseY < 213) {
            j = 0xffff00;
        }

        this.surface.drawStringCenter('Cancel', 256, 208, 1, j);
    }

    createAppearancePanel() {
        this.panelAppearance = new Panel(surface, 100);
        this.panelAppearance.addText(256, 10, 'Please design Your Character', 4, true);

        let x = 140;
        let y = 34;
        x += 116;
        y -= 10;

        this.panelAppearance.addText(x - 55, y + 110, 'Front', 3, true);
        this.panelAppearance.addText(x, y + 110, 'Side', 3, true);
        this.panelAppearance.addText(x + 55, y + 110, 'Back', 3, true);

        let xoff = 54;
        y += 145;

        this.panelAppearance.addBoxRounded(x - xoff, y, 53, 41);
        this.panelAppearance.addText(x - xoff, y - 8, 'Head', 1, true);
        this.panelAppearance.addText(x - xoff, y + 8, 'Type', 1, true);
        this.panelAppearance.addSprite(x - xoff - 40, y, Panel.baseSpriteStart + 7);
        this.controlButtonAppearanceHead1 = this.panelAppearance.addButton(x - xoff - 40, y, 20, 20);
        this.panelAppearance.addSprite((x - xoff) + 40, y, Panel.baseSpriteStart + 6);
        this.controlButtonAppearanceHead2 = this.panelAppearance.addButton((x - xoff) + 40, y, 20, 20);
        this.panelAppearance.addBoxRounded(x + xoff, y, 53, 41);
        this.panelAppearance.addText(x + xoff, y - 8, 'Hair', 1, true);
        this.panelAppearance.addText(x + xoff, y + 8, 'Color', 1, true);
        this.panelAppearance.addSprite((x + xoff) - 40, y, Panel.baseSpriteStart + 7);
        this.controlButtonAppearanceHair1 = this.panelAppearance.addButton((x + xoff) - 40, y, 20, 20);
        this.panelAppearance.addSprite(x + xoff + 40, y, Panel.baseSpriteStart + 6);
        this.controlButtonAppearanceHair2 = this.panelAppearance.addButton(x + xoff + 40, y, 20, 20);
        y += 50;
        this.panelAppearance.addBoxRounded(x - xoff, y, 53, 41);
        this.panelAppearance.addText(x - xoff, y, 'Gender', 1, true);
        this.panelAppearance.addSprite(x - xoff - 40, y, Panel.baseSpriteStart + 7);
        this.controlButtonAppearanceGender1 = this.panelAppearance.addButton(x - xoff - 40, y, 20, 20);
        this.panelAppearance.addSprite((x - xoff) + 40, y, Panel.baseSpriteStart + 6);
        this.controlButtonAppearanceGender2 = this.panelAppearance.addButton((x - xoff) + 40, y, 20, 20);
        this.panelAppearance.addBoxRounded(x + xoff, y, 53, 41);
        this.panelAppearance.addText(x + xoff, y - 8, 'Top', 1, true);
        this.panelAppearance.addText(x + xoff, y + 8, 'Color', 1, true);
        this.panelAppearance.addSprite((x + xoff) - 40, y, Panel.baseSpriteStart + 7);
        this.controlButtonAppearanceTop1 = this.panelAppearance.addButton((x + xoff) - 40, y, 20, 20);
        this.panelAppearance.addSprite(x + xoff + 40, y, Panel.baseSpriteStart + 6);
        this.controlButtonAppearanceTop2 = this.panelAppearance.addButton(x + xoff + 40, y, 20, 20);
        y += 50;
        this.panelAppearance.addBoxRounded(x - xoff, y, 53, 41);
        this.panelAppearance.addText(x - xoff, y - 8, 'Skin', 1, true);
        this.panelAppearance.addText(x - xoff, y + 8, 'Color', 1, true);
        this.panelAppearance.addSprite(x - xoff - 40, y, Panel.baseSpriteStart + 7);
        this.controlButtonAppearanceSkin1 = this.panelAppearance.addButton(x - xoff - 40, y, 20, 20);
        this.panelAppearance.addSprite((x - xoff) + 40, y, Panel.baseSpriteStart + 6);
        this.controlButtonAppearanceSkin2 = this.panelAppearance.addButton((x - xoff) + 40, y, 20, 20);
        this.panelAppearance.addBoxRounded(x + xoff, y, 53, 41);
        this.panelAppearance.addText(x + xoff, y - 8, 'Bottom', 1, true);
        this.panelAppearance.addText(x + xoff, y + 8, 'Color', 1, true);
        this.panelAppearance.addSprite((x + xoff) - 40, y, Panel.baseSpriteStart + 7);
        this.controlButtonAppearanceBottom1 = this.panelAppearance.addButton((x + xoff) - 40, y, 20, 20);
        this.panelAppearance.addSprite(x + xoff + 40, y, Panel.baseSpriteStart + 6);
        this.controlButtonAppearanceBottom2 = this.panelAppearance.addButton(x + xoff + 40, y, 20, 20);
        y += 82;
        y -= 35;
        this.panelAppearance.addButtonBackground(x, y, 200, 30);
        this.panelAppearance.addText(x, y, 'Accept', 4, false);
        this.controlButtonAppearanceAccept = this.panelAppearance.addButton(x, y, 200, 30);
    }

    resetPMText() {
        this.inputPmCurrent = '';
        this.inputPmFinal = '';
    }

    drawDialogWelcome() {
        let i = 65;

        if (welcomeRecoverySetDays !== 201) {
            i += 60;
        }

        if (welcomeUnreadMessages > 0) {
            i += 60;
        }

        if (welcomeLastLoggedInIP !== 0) {
            i += 45;
        }

        let y = 167 - i / 2;

        this.surface.drawBox(56, 167 - ((i / 2) | 0), 400, i, 0);
        this.surface.drawBoxEdge(56, 167 - ((i / 2) | 0), 400, i, 0xffffff);
        y += 20;
        this.surface.drawStringCenter("Welcome to RuneScape " + loginUser, 256, y, 4, 0xffff00);
        y += 30;

        let s = null;

        if (this.welcomeLastLoggedInDays === 0) {
            s = 'earlier today';
        } else if (this.welcomeLastLoggedInDays === 1) {
            s = 'yesterday';
        } else {
            s = this.welcomeLastLoggedInDays + ' days ago';
        }

        if (this.welcomeLastLoggedInIP !== 0) {
            this.surface.drawStringCenter('You last logged in ' + s, 256, y, 1, 0xffffff);
            y += 15;

            if (this.welcomeLastLoggedInHost === null) {
                this.welcomeLastLoggedInHost = this.getHostnameIP(this.welcomeLastLoggedInIP);
            }

            this.surface.drawStringCenter('from: ' + this.welcomeLastLoggedInHost, 256, y, 1, 0xffffff);
            y += 15;
            y += 15;
        }

        if (this.welcomeUnreadMessages > 0) {
            let k = 0xffffff;

            this.surface.drawStringCenter('Jagex staff will NEVER email you. We use the', 256, y, 1, k);
            y += 15;
            this.surface.drawStringCenter('message-centre on this website instead.', 256, y, 1, k);
            y += 15;

            if (this.welcomeUnreadMessages === 1) {
                this.surface.drawStringCenter('You have @yel@0@whi@ unread messages in your message-centre', 256, y, 1, 0xffffff);
            } else {
                this.surface.drawStringCenter('You have @gre@' + (this.welcomeUnreadMessages - 1) + ' unread messages @whi@in your message-centre', 256, y, 1, 0xffffff);
            }

            y += 15;
            y += 15;
        }

        // this is an odd way of storing recovery day settings
        if (this.welcomeRecoverySetDays !== 201) {
            // and this
            if (this.welcomeRecoverySetDays === 200) {
                this.surface.drawStringCenter('You have not yet set any password recovery questions.', 256, y, 1, 0xff8000);
                y += 15;
                this.surface.drawStringCenter('We strongly recommend you do so now to secure your account.', 256, y, 1, 0xff8000);
                y += 15;
                this.surface.drawStringCenter('Do this from the \'account management\' area on our front webpage', 256, y, 1, 0xff8000);
                y += 15;
            } else {
                let s1 = null;

                if (this.welcomeRecoverySetDays === 0) {
                    s1 = "Earlier today";
                } else if (this.welcomeRecoverySetDays === 1) {
                    s1 = "Yesterday";
                } else {
                    s1 = this.welcomeRecoverySetDays + " days ago";
                }

                this.surface.drawStringCenter(s1 + ' you changed your recovery questions', 256, y, 1, 0xff8000);
                y += 15;
                this.surface.drawStringCenter('If you do not remember making this change then cancel it immediately', 256, y, 1, 0xff8000);
                y += 15;
                this.surface.drawStringCenter('Do this from the \'account management\' area on our front webpage', 256, y, 1, 0xff8000);
                y += 15;
            }

            y += 15;
        }

        let l = 0xffffff;

        if (this.mouseY > y - 12 && this.mouseY <= y && this.mouseX > 106 && this.mouseX < 406) {
            l = 0xff0000;
        }

        this.surface.drawStringCenter('Click here to close window', 256, y, 1, l);

        if (this.mouseButtonClick === 1) {
            if (l === 0xff0000) {
                this.showDialogWelcome = false;
            }

            if ((this.mouseX < 86 || this.mouseX > 426) && (this.mouseY < 167 - ((i / 2) | 0) || this.mouseY > 167 + ((i / 2) | 0))) {
                this.showDialogWelcome = false;
            }
        }

        this.mouseButtonClick = 0;
    }

    drawAppearancePanelCharacterSprites() {
        this.surface.interlace = false;
        this.surface.blackScreen();
        this.panelAppearance.drawPanel();
        let i = 140;
        let j = 50;
        i += 116;
        j -= 25;
        this.surface._spriteClipping_from6(i - 32 - 55, j, 64, 102, GameData.animationNumber[this.appearance2Colour], this.characterTopBottomColours[this.appearanceBottomColour]);
        this.surface._spriteClipping_from9(i - 32 - 55, j, 64, 102, GameData.animationNumber[this.appearanceBodyGender], this.characterTopBottomColours[this.appearanceTopColour], this.characterSkinColours[this.appearanceSkinColour], 0, false);
        this.surface._spriteClipping_from9(i - 32 - 55, j, 64, 102, GameData.animationNumber[this.appearanceHeadType], this.characterHairColours[this.appearanceHairColour], this.characterSkinColours[this.appearanceSkinColour], 0, false);
        this.surface._spriteClipping_from6(i - 32, j, 64, 102, GameData.animationNumber[this.appearance2Colour] + 6, this.characterTopBottomColours[this.appearanceBottomColour]);
        this.surface._spriteClipping_from9(i - 32, j, 64, 102, GameData.animationNumber[this.appearanceBodyGender] + 6, this.characterTopBottomColours[this.appearanceTopColour], this.characterSkinColours[this.appearanceSkinColour], 0, false);
        this.surface._spriteClipping_from9(i - 32, j, 64, 102, GameData.animationNumber[this.appearanceHeadType] + 6, this.characterHairColours[this.appearanceHairColour], this.characterSkinColours[this.appearanceSkinColour], 0, false);
        this.surface._spriteClipping_from6((i - 32) + 55, j, 64, 102, GameData.animationNumber[this.appearance2Colour] + 12, this.characterTopBottomColours[this.appearanceBottomColour]);
        this.surface._spriteClipping_from9((i - 32) + 55, j, 64, 102, GameData.animationNumber[this.appearanceBodyGender] + 12, this.characterTopBottomColours[this.appearanceTopColour], this.characterSkinColours[this.appearanceSkinColour], 0, false);
        this.surface._spriteClipping_from9((i - 32) + 55, j, 64, 102, GameData.animationNumber[this.appearanceHeadType] + 12, this.characterHairColours[this.appearanceHairColour], this.characterSkinColours[this.appearanceSkinColour], 0, false);
        this.surface._drawSprite_from3(0, this.gameHeight, this.spriteMedia + 22);
        this.surface.draw(this.graphics, 0, 0);
    }

    drawItem(x, y, w, h, id, tx, ty) {
        let picture = GameData.itemPicture[id] + this.spriteItem;
        let mask = GameData.itemMask[id];
        this.surface._spriteClipping_from9(x, y, w, h, picture, mask, 0, 0, false);
    }

    handleGameInput() {
        if (this.systemUpdate > 1) {
            this.systemUpdate--;
        }

        this.checkConnection(); // TODO: async

        if (this.logoutTimeout > 0) {
            this.logoutTimeout--;
        }

        if (this.mouseActionTimeout > 4500 && this.combatTimeout === 0 && this.logoutTimeout === 0) {
            this.mouseActionTimeout -= 500;
            this.sendLogout();
            return;
        }

        if (this.localPlayer.animationCurrent === 8 || this.localPlayer.animationCurrent === 9) {
            this.combatTimeout = 500;
        }

        if (this.combatTimeout > 0) {
            this.combatTimeout--;
        }

        if (this.showAppearanceChange) {
            this.handleAppearancePanelControls();
            return;
        }

        for (let i = 0; i < this.playerCount; i++) {
            let character = this.players[i];
            let k = (character.waypointCurrent + 1) % 10;

            if (character.movingStep !== k) {
                let i1 = -1;
                let l2 = character.movingStep;
                let j4;

                if (l2 < k) {
                    j4 = k - l2;
                } else  {
                    j4 = (10 + k) - l2;
                }

                let j5 = 4;

                if (j4 > 2) {
                    j5 = (j4 - 1) * 4;
                }

                if (character.waypointsX[l2] - character.currentX > this.magicLoc * 3 || character.waypointsY[l2] - character.currentY > this.magicLoc * 3 || character.waypointsX[l2] - character.currentX < -this.magicLoc * 3 || character.waypointsY[l2] - character.currentY < -this.magicLoc * 3 || j4 > 8) {
                    character.currentX = character.waypointsX[l2];
                    character.currentY = character.waypointsY[l2];
                } else {
                    if (character.currentX < character.waypointsX[l2]) {
                        character.currentX += j5;
                        character.stepCount++;
                        i1 = 2;
                    } else if (character.currentX > character.waypointsX[l2]) {
                        character.currentX -= j5;
                        character.stepCount++;
                        i1 = 6;
                    }

                    if (character.currentX - character.waypointsX[l2] < j5 && character.currentX - character.waypointsX[l2] > -j5) {
                        character.currentX = character.waypointsX[l2];
                    }

                    if (character.currentY < character.waypointsY[l2]) {
                        character.currentY += j5;
                        character.stepCount++;
                        if (i1 === -1) {
                            i1 = 4;
                        } else if (i1 === 2) {
                            i1 = 3;
                        } else {
                            i1 = 5;
                        }
                    } else if (character.currentY > character.waypointsY[l2]) {
                        character.currentY -= j5;
                        character.stepCount++;

                        if (i1 === -1) {
                            i1 = 0;
                        } else if (i1 === 2) {
                            i1 = 1;
                        } else {
                            i1 = 7;
                        }
                    }

                    if (character.currentY - character.waypointsY[l2] < j5 && character.currentY - character.waypointsY[l2] > -j5) {
                        character.currentY = character.waypointsY[l2];
                    }
                }

                if (i1 !== -1) {
                    character.animationCurrent = i1;
                }

                if (character.currentX === character.waypointsX[l2] && character.currentY === character.waypointsY[l2]) {
                    character.movingStep = (l2 + 1) % 10;
                }
            } else {
                character.animationCurrent = character.animationNext;
            }

            if (character.messageTimeout > 0) {
                character.messageTimeout--;
            }

            if (character.bubbleTimeout > 0) {
                character.bubbleTimeout--;
            }

            if (character.combatTimer > 0) {
                character.combatTimer--;
            }

            if (this.deathScreenTimeout > 0) {
                this.deathScreenTimeout--;

                if (this.deathScreenTimeout === 0) {
                    this.showMessage('You have been granted another life. Be more careful this time!', 3);
                }

                if (this.deathScreenTimeout === 0) {
                    this.showMessage('You retain your skills. Your objects land where you died', 3);
                }
            }
        }

        for (let j = 0; j < this.npcCount; j++) {
            let character_1 = this.npcs[j];
            let j1 = (character_1.waypointCurrent + 1) % 10;

            if (character_1.movingStep !== j1) {
                let i3 = -1;
                let k4 = character_1.movingStep;
                let k5;

                if (k4 < j1) {
                    k5 = j1 - k4;
                } else {
                    k5 = (10 + j1) - k4;
                }

                let l5 = 4;

                if (k5 > 2) {
                    l5 = (k5 - 1) * 4;
                }

                if (character_1.waypointsX[k4] - character_1.currentX > magicLoc * 3 || character_1.waypointsY[k4] - character_1.currentY > magicLoc * 3 || character_1.waypointsX[k4] - character_1.currentX < -magicLoc * 3 || character_1.waypointsY[k4] - character_1.currentY < -magicLoc * 3 || k5 > 8) {
                    character_1.currentX = character_1.waypointsX[k4];
                    character_1.currentY = character_1.waypointsY[k4];
                } else {
                    if (character_1.currentX < character_1.waypointsX[k4]) {
                        character_1.currentX += l5;
                        character_1.stepCount++;
                        i3 = 2;
                    } else if (character_1.currentX > character_1.waypointsX[k4]) {
                        character_1.currentX -= l5;
                        character_1.stepCount++;
                        i3 = 6;
                    }

                    if (character_1.currentX - character_1.waypointsX[k4] < l5 && character_1.currentX - character_1.waypointsX[k4] > -l5) {
                        character_1.currentX = character_1.waypointsX[k4];
                    }

                    if (character_1.currentY < character_1.waypointsY[k4]) {
                        character_1.currentY += l5;
                        character_1.stepCount++;

                        if (i3 === -1) {
                            i3 = 4;
                        } else if (i3 === 2) {
                            i3 = 3;
                        } else {
                            i3 = 5;
                        }
                    } else if (character_1.currentY > character_1.waypointsY[k4]) {
                        character_1.currentY -= l5;
                        character_1.stepCount++;

                        if (i3 === -1) {
                            i3 = 0;
                        } else if (i3 === 2) {
                            i3 = 1;
                        } else {
                            i3 = 7;
                        }
                    }

                    if (character_1.currentY - character_1.waypointsY[k4] < l5 && character_1.currentY - character_1.waypointsY[k4] > -l5) {
                        character_1.currentY = character_1.waypointsY[k4];
                    }
                }

                if (i3 !== -1) {
                    character_1.animationCurrent = i3;
                }

                if (character_1.currentX === character_1.waypointsX[k4] && character_1.currentY === character_1.waypointsY[k4]) {
                    character_1.movingStep = (k4 + 1) % 10;
                }
            } else {
                character_1.animationCurrent = character_1.animationNext;

                if (character_1.npcId === 43) {A
                    character_1.stepCount++;
                }
            }

            if (character_1.messageTimeout > 0) {
                character_1.messageTimeout--;
            }

            if (character_1.bubbleTimeout > 0) {
                character_1.bubbleTimeout--;
            }

            if (character_1.combatTimer > 0) {
                character_1.combatTimer--;
            }
        }

        if (this.showUiTab !== 2) {
            if (Surface.anInt346 > 0) {
                sleepWordDelayTimer++;
            }

            if (Surface.anInt347 > 0) {
                sleepWordDelayTimer = 0;
            }

            Surface.anInt346 = 0;
            Surface.anInt347 = 0;
        }

        for (let l = 0; l < this.playerCount; l++) {
            let character = this.players[l];

            if (character.projectileRange > 0) {
                character.projectileRange--;
            }
        }

        if (this.cameraAutoAngleDebug) {
            if (this.cameraAutoRotatePlayerX - this.localPlayer.currentX < -500 || this.cameraAutoRotatePlayerX - this.localPlayer.currentX > 500 || this.cameraAutoRotatePlayerY - this.localPlayer.currentY < -500 || this.cameraAutoRotatePlayerY - this.localPlayer.currentY > 500) {
                this.cameraAutoRotatePlayerX = this.localPlayer.currentX;
                this.cameraAutoRotatePlayerY = this.localPlayer.currentY;
            }
        } else {
            if (this.cameraAutoRotatePlayerX - this.localPlayer.currentX < -500 || this.cameraAutoRotatePlayerX - this.localPlayer.currentX > 500 || this.cameraAutoRotatePlayerY - this.localPlayer.currentY < -500 || this.cameraAutoRotatePlayerY - this.localPlayer.currentY > 500) {
                this.cameraAutoRotatePlayerX = this.localPlayer.currentX;
                this.cameraAutoRotatePlayerY = this.localPlayer.currentY;
            }

            if (this.cameraAutoRotatePlayerX !== this.localPlayer.currentX) {
                this.cameraAutoRotatePlayerX += ((this.localPlayer.currentX - this.cameraAutoRotatePlayerX) / (16 + (((this.cameraZoom - 500) / 15) | 0))) | 0;
            }

            if (this.cameraAutoRotatePlayerY !== this.localPlayer.currentY) {
                this.cameraAutoRotatePlayerY += ((this.localPlayer.currentY - this.cameraAutoRotatePlayerY) / (16 + (((this.cameraZoom - 500) / 15) | 0))) | 0;
            }

            if (this.optionCameraModeAuto) {
                let k1 = cameraAngle * 32;
                let j3 = k1 - cameraRotation;
                let byte0 = 1;

                if (j3 !== 0) {
                    this.anInt707++;

                    if (j3 > 128) {
                        byte0 = -1;
                        j3 = 256 - j3;
                    } else if (j3 > 0)
                        byte0 = 1;
                    else if (j3 < -128) {
                        byte0 = 1;
                        j3 = 256 + j3;
                    } else if (j3 < 0) {
                        byte0 = -1;
                        j3 = -j3;
                    }

                    this.cameraRotation += (((this.anInt707 * j3 + 255) / 256) | 0) * byte0;
                    this.cameraRotation &= 0xff;
                } else {
                    this.anInt707 = 0;
                }
            }
        }

        if (this.sleepWordDelayTimer > 20) {
            this.sleepWordDelay = false;
            this.sleepWordDelayTimer = 0;
        }

        if (this.isSleeping) {
            if (this.inputTextFinal.length() > 0) {
                if (/^::lostcon$/i.test(this.inputTextFinal)) {
                    this.clientStream.closeStream();
                } else if (/^::closecon$/.test(this.inputTextFinal)) { 
                    this.closeConnection();
                } else {
                    this.clientStream.newPacket(C_OPCODES.SLEEP_WORD);
                    this.clientStream.putString(this.inputTextFinal);

                    if (!this.sleepWordDelay) {
                        this.clientStream.putByte(0);
                        this.sleepWordDelay = true;
                    }

                    this.clientStream.sendPacket();
                    this.inputTextCurrent = '';
                    this.inputTextFinal = '';
                    this.sleepingStatusText = 'Please wait...';
                }
            }

            if (this.lastMouseButtonDown === 1 && this.mouseY > 275 && this.mouseY < 310 && this.mouseX > 56 && this.mouseX < 456) {
                this.clientStream.newPacket(C_OPCODES.SLEEP_WORD);
                this.clientStream.putString('-null-');

                if (!this.sleepWordDelay) {
                    this.clientStream.putByte(0);
                    this.sleepWordDelay = true;
                }

                this.clientStream.sendPacket();
                this.inputTextCurrent = '';
                this.inputTextFinal = '';
                sleepingStatusText = 'Please wait...';
            }

            this.lastMouseButtonDown = 0;
            return;
        }

        if (this.mouseY > this.gameHeight - 4) {
            if (this.mouseX > 15 && this.mouseX < 96 && this.lastMouseButtonDown === 1) {
                this.messageTabSelected = 0;
            }

            if (this.mouseX > 110 && this.mouseX < 194 && this.lastMouseButtonDown === 1) {
                this.messageTabSelected = 1;
                this.panelMessageTabs.controlFlashText[this.controlTextListChat] = 999999;
            }

            if (this.mouseX > 215 && this.mouseX < 295 && this.lastMouseButtonDown === 1) {
                this.messageTabSelected = 2;
                this.panelMessageTabs.controlFlashText[this.controlTextListQuest] = 999999;
            }

            if (this.mouseX > 315 && this.mouseX < 395 && this.lastMouseButtonDown === 1) {
                this.messageTabSelected = 3;
                this.panelMessageTabs.controlFlashText[this.controlTextListPrivate] = 999999;
            }

            if (this.mouseX > 417 && this.mouseX < 497 && this.lastMouseButtonDown === 1) {
                this.showDialogReportAbuseStep = 1;
                this.reportAbuseOffence = 0;
                this.inputTextCurrent = '';
                this.inputTextFinal = '';
            }

            this.lastMouseButtonDown = 0;
            this.mouseButtonDown = 0;
        }

        this.panelMessageTabs.handleMouse(this.mouseX, this.mouseY, this.lastMouseButtonDown, this.mouseButtonDown);

        if (this.messageTabSelected > 0 && this.mouseX >= 494 && this.mouseY >= this.gameHeight - 66) {
            this.lastMouseButtonDown = 0;
        }

        if (this.panelMessageTabs.isClicked(this.controlTextListAll)) {
            let s = this.panelMessageTabs.getText(controlTextListAll);
            this.panelMessageTabs.updateText(controlTextListAll, '');

            if (/^::/.test(s)) {
                if (/^::closecon$/i.test(s)) {
                    this.clientStream.closeStream();
                } else if (/^::logout/i.test(s)) {
                    this.closeConnection();
                } else if (/^::lostcon$/i.test(s)) {
                    this.lostConnection();
                } else {
                    this.sendCommandString(s.substring(2));
                }
            } else {
                let k3 = ChatMessage.scramble(s);
                this.sendChatMessage(ChatMessage.scrambledBytes, k3);
                s = ChatMessage.descramble(ChatMessage.scrambledBytes, 0, k3);
                s = WordFilter.filter(s);
                this.localPlayer.messageTimeout = 150;
                this.localPlayer.message = s;
                this.showMessage(localPlayer.name + ': ' + s, 2);
            }
        }

        if (this.messageTabSelected === 0) {
            for (let l1 = 0; l1 < 5; l1++) {
                if (this.messageHistoryTimeout[l1] > 0) {
                    this.messageHistoryTimeout[l1]--;
                }
            }
        }

        if (this.deathScreenTimeout !== 0) {
            this.lastMouseButtonDown = 0;
        }

        if (this.showDialogTrade || this.showDialogDuel) {
            if (this.mouseButtonDown !== 0) {
                this.mouseButtonDownTime++;
            } else {
                this.mouseButtonDownTime = 0;
            }

            if (this.mouseButtonDownTime > 600) {
                this.mouseButtonItemCountIncrement += 5000;
            } else if (this.mouseButtonDownTime > 450) {
                this.mouseButtonItemCountIncrement += 500;
            } else if (this.mouseButtonDownTime > 300) {
                this.mouseButtonItemCountIncrement += 50;
            } else if (this.mouseButtonDownTime > 150) {
                this.mouseButtonItemCountIncrement += 5;
            } else if (this.mouseButtonDownTime > 50) {
                this.mouseButtonItemCountIncrement++;
            } else if (this.mouseButtonDownTime > 20 && (this.mouseButtonDownTime & 5) === 0) {
                this.mouseButtonItemCountIncrement++;
            }
        } else {
            this.mouseButtonDownTime = 0;
            this.mouseButtonItemCountIncrement = 0;
        }

        if (this.lastMouseButtonDown === 1) {
            this.mouseButtonClick = 1;
        } else if (this.lastMouseButtonDown === 2) {
            this.mouseButtonClick = 2;
        }

        this.scene.setMouseLoc(this.mouseX, this.mouseY);
        this.lastMouseButtonDown = 0;

        if (this.optionCameraModeAuto) {
            if (this.anInt707 === 0 || this.cameraAutoAngleDebug) {

                if (this.keyLeft) {
                    this.cameraAngle = this.cameraAngle + 1 & 7;
                    this.keyLeft = false;

                    if (!this.fogOfWar) {
                        if ((this.cameraAngle & 1) === 0) {
                            this.cameraAngle = this.cameraAngle + 1 & 7;
                        }

                        for (let i2 = 0; i2 < 8; i2++) {
                            if (this.isValidCameraAngle(this.cameraAngle)) {
                                break;
                            }

                            this.cameraAngle = this.cameraAngle + 1 & 7;
                        }
                    }
                }

                if (this.keyRight) {
                    this.cameraAngle = this.cameraAngle + 7 & 7;
                    this.keyRight = false;

                    if (!fogOfWar) {
                        if ((this.cameraAngle & 1) === 0) {
                            this.cameraAngle = this.cameraAngle + 7 & 7;
                        }

                        for (let j2 = 0; j2 < 8; j2++) {
                            if (this.isValidCameraAngle(this.cameraAngle)) {
                                break;
                            }

                            this.cameraAngle = this.cameraAngle + 7 & 7;
                        }
                    }
                }
            }
        } else if (this.keyLeft) {
            this.cameraRotation = this.cameraRotation + 2 & 0xff;
        } else if (this.keyRight) {
            this.cameraRotation = this.cameraRotation - 2 & 0xff;
        }

        if (this.fogOfWar && this.cameraZoom > 550) {
            this.cameraZoom -= 4;
        } else if (!this.fogOfWar && this.cameraZoom < 750) {
            this.cameraZoom += 4;
        }

        if (this.mouseClickXStep > 0) {
            this.mouseClickXStep--;
        } else if (this.mouseClickXStep < 0) {
            this.mouseClickXStep++;
        }

        // 17 is fountain
        this.scene.doSOemthingWithTheFuckinFountainFuck(17);
        this.objectAnimationCount++;

        if (this.objectAnimationCount > 5) {
            this.objectAnimationCount = 0;
            this.objectAnimationNumberFireLightningSpell = (this.objectAnimationNumberFireLightningSpell + 1) % 3;
            this.objectAnimationNumberTorch = (this.objectAnimationNumberTorch + 1) % 4;
            this.objectAnimationNumberClaw = (this.objectAnimationNumberClaw + 1) % 5;
        }

        for (let k2 = 0; k2 < this.objectCount; k2++) {
            let l3 = this.objectX[k2];
            let l4 = this.objectY[k2];

            if (l3 >= 0 && l4 >= 0 && l3 < 96 && l4 < 96 && this.objectId[k2] === 74) {
                this.objectModel[k2].rotate(1, 0, 0);
            }
        }

        for (let i4 = 0; i4 < this.teleportBubbleCount; i4++) {
            this.teleportBubbleTime[i4]++;

            if (this.teleportBubbleTime[i4] > 50) {
                this.teleportBubbleCount--;

                for (let i5 = i4; i5 < this.teleportBubbleCount; i5++) {
                    this.teleportBubbleX[i5] = this.teleportBubbleX[i5 + 1];
                    this.teleportBubbleY[i5] = this.teleportBubbleY[i5 + 1];
                    this.teleportBubbleTime[i5] = this.teleportBubbleTime[i5 + 1];
                    this.teleportBubbleType[i5] = this.teleportBubbleType[i5 + 1];
                }
            }
        }
    }

    renderLoginScreenViewports() {
        let rh = 0;
        let rx = 50; //49;
        let ry = 50; //47;

        this.world.loadSection(rx * 48 + 23, ry * 48 + 23, rh);
        this.world.addModels(this.gameModels);

        let x = 9728;
        let y = 6400;
        let zoom = 1100;
        let rotation = 888;

        this.scene.clipFar3d = 4100;
        this.scene.clipFar2d = 4100;
        this.scene.fogZFalloff = 1;
        this.scene.fogZDistance = 4000;
        this.surface.blackScreen();
        this.scene.setCamera(x, -this.world.getElevation(x, y), y, 912, rotation, 0, zoom * 2);
        this.scene.render();
        this.surface.fadeToBlack();
        this.surface.fadeToBlack();
        this.surface.drawBox(0, 0, this.gameWidth, 6, 0);

        for (let j = 6; j >= 1; j--)
            this.surface.drawLineAlpha(0, j, 0, j, this.gameWidth, 8);

        this.surface.drawBox(0, 194, 512, 20, 0);

        for (let k = 6; k >= 1; k--) {
            this.surface.drawLineAlpha(0, k, 0, 194 - k, this.gameWidth, 8); 
        }

        // runescape logo
        this.surface.drawSprite(((this.gameWidth / 2) | 0) - ((this.surface.spriteWidth[this.spriteMedia + 10] / 2) | 0), 15, this.spriteMedia + 10); 
        this.surface.drawSprite(this.spriteLogo, 0, 0, this.gameWidth, 200);
        this.surface.drawWorld(this.spriteLogo);

        x = 9216;
        y = 9216;
        zoom = 1100;
        rotation = 888;

        this.scene.clipFar3d = 4100;
        this.scene.clipFar2d = 4100;
        this.scene.fogZFalloff = 1;
        this.scene.fogZDistance = 4000;

        this.surface.blackScreen();
        this.scene.setCamera(x, -this.world.getElevation(x, y), y, 912, rotation, 0, zoom * 2);
        this.scene.render();
        this.surface.fadeToBlack();
        this.surface.fadeToBlack();
        this.surface.drawBox(0, 0, this.gameWidth, 6, 0);

        for (let l = 6; l >= 1; l--) {
            this.surface.drawLineAlpha(0, l, 0, l, this.gameWidth, 8);
        }

        this.surface.drawBox(0, 194, this.gameWidth, 20, 0);

        for (let i1 = 6; i1 >= 1; i1--) {
            this.surface.drawLineAlpha(0, i1, 0, 194 - i1, this.gameWidth, 8);
        }

        this.surface.drawSprite(((this.gameWidth / 2) | 0) - ((this.surface.spriteWidth[this.spriteMedia + 10] / 2) | 0), 15, this.spriteMedia + 10);
        this.surface.drawSprite(this.spriteLogo + 1, 0, 0, this.gameWidth, 200); 
        this.surface.drawWorld(this.spriteLogo + 1);

        for (let j1 = 0; j1 < 64; j1++) {
            this.scene.removeModel(this.world.roofModels[0][j1]);
            this.scene.removeModel(this.world.wallModels[1][j1]);
            this.scene.removeModel(this.world.roofModels[1][j1]);
            this.scene.removeModel(this.world.wallModels[2][j1]);
            this.scene.removeModel(this.world.roofModels[2][j1]);
        }

        x = 11136;
        y = 10368;
        zoom = 500;
        rotation = 376;

        this.scene.clipFar3d = 4100;
        this.scene.clipFar2d = 4100;
        this.scene.fogZFalloff = 1;
        this.scene.fogZDistance = 4000;
        this.surface.blackScreen();
        this.scene.setCamera(x, -this.world.getElevation(x, y), y, 912, rotation, 0, zoom * 2);
        this.scene.render();
        this.surface.fadeToBlack();
        this.surface.fadeToBlack();
        this.surface.drawBox(0, 0, this.gameWidth, 6, 0);

        for (let k1 = 6; k1 >= 1; k1--) {
            this.surface.drawLineAlpha(0, k1, 0, k1, this.gameWidth, 8);
        }

        this.surface.drawBox(0, 194, this.gameWidth, 20, 0);

        for (let l1 = 6; l1 >= 1; l1--) {
            this.surface.drawLineAlpha(0, l1, 0, 194, this.gameWidth, 8); 
        }

        this.surface.drawSprite(((this.gameWidth / 2) | 0) - ((this.surface.spriteWidth[this.spriteMedia + 10] / 2) | 0), 15, this.spriteMedia + 10);
        this.surface.drawSprite(this.spriteMedia + 10, 0, 0, this.gameWidth, 200);
        this.surface.drawWorld(this.spriteMedia + 10);
    }

    createLoginPanels() {
        this.panelLoginWelcome = new Panel(this.surface, 50);
        let y = 40;
        let x = (this.gameWidth / 2) | 0;

        if (!this.members) {
            this.panelLoginWelcome.addText(x, 200 + y, 'Click on an option', 5, true);
            this.panelLoginWelcome.addButtonBackground(x - 100, 240 + y, 120, 35);
            this.panelLoginWelcome.addButtonBackground(x + 100, 240 + y, 120, 35);
            this.panelLoginWelcome.addText(x - 100, 240 + y, 'New User', 5, false);
            this.panelLoginWelcome.addText(x + 100, 240 + y, 'Existing User', 5, false);
            this.controlWelcomeNewuser = this.panelLoginWelcome.addButton(x - 100, 240 + y, 120, 35);
            this.controlWelcomeExistinguser = this.panelLoginWelcome.addButton(x + 100, 240 + y, 120, 35);
        } else {
            this.panelLoginWelcome.addText(x, 200 + y, 'Welcome to RuneScape', 4, true);
            this.panelLoginWelcome.addText(x, 215 + y, 'You need a member account to use this server', 4, true);
            this.panelLoginWelcome.addButtonBackground(x, 250 + y, 200, 35);
            this.panelLoginWelcome.addText(x, 250 + y, 'Click here to login', 5, false);
            this.controlWelcomeExistinguser = this.panelLoginWelcome.addButton(x, 250 + y, 200, 35);
        }

        this.panelLoginNewuser = new Panel(this.surface, 50);
        y = 230;

        if (this.referid === 0) {
            this.panelLoginNewuser.addText(x, y + 8, 'To create an account please go back to the', 4, true);
            y += 20;
            this.panelLoginNewuser.addText(x, y + 8, 'www.runescape.com front page, and choose \'create account\'', 4, true);
        } else if (this.referid === 1) {
            this.panelLoginNewuser.addText(x, y + 8, 'To create an account please click on the', 4, true);
            y += 20;
            this.panelLoginNewuser.addText(x, y + 8, '\'create account\' link below the game window', 4, true);
        } else {
            this.panelLoginNewuser.addText(x, y + 8, 'To create an account please go back to the', 4, true);
            y += 20;
            this.panelLoginNewuser.addText(x, y + 8, 'runescape front webpage and choose \'create account\'', 4, true);
        }

        y += 30;
        this.panelLoginNewuser.addButtonBackground(x, y + 17, 150, 34);
        this.panelLoginNewuser.addText(x, y + 17, 'Ok', 5, false);
        this.controlLoginNewOk = this.panelLoginNewuser.addButton(x, y + 17, 150, 34);
        this.panelLoginExistinguser = new Panel(this.surface, 50);
        y = 230;
        this.controlLoginStatus = this.panelLoginExistinguser.addText(x, y - 10, 'Please enter your username and password', 4, true);
        y += 28;
        this.panelLoginExistinguser.addButtonBackground(x - 116, y, 200, 40);
        this.panelLoginExistinguser.addText(x - 116, y - 10, 'Username:', 4, false);
        controlLoginUser = this.panelLoginExistinguser.addTextInput(x - 116, y + 10, 200, 40, 4, 12, false, false);
        y += 47;
        this.panelLoginExistinguser.addButtonBackground(x - 66, y, 200, 40);
        this.panelLoginExistinguser.addText(x - 66, y - 10, 'Password:', 4, false);
        controlLoginPass = this.panelLoginExistinguser.addTextInput(x - 66, y + 10, 200, 40, 4, 20, true, false);
        y -= 55;
        this.panelLoginExistinguser.addButtonBackground(x + 154, y, 120, 25);
        this.panelLoginExistinguser.addText(x + 154, y, 'Ok', 4, false);
        controlLoginOk = this.panelLoginExistinguser.addButton(x + 154, y, 120, 25);
        y += 30;
        this.panelLoginExistinguser.addButtonBackground(x + 154, y, 120, 25);
        this.panelLoginExistinguser.addText(x + 154, y, 'Cancel', 4, false);
        this.controlLoginCancel = this.panelLoginExistinguser.addButton(x + 154, y, 120, 25);
        y += 30;
        this.panelLoginExistinguser.setFocus(this.controlLoginUser);
    }

    drawUiTabInventory(nomenus) {
        let uiX = this.surface.width2 - 248;
        this.surface.drawSprite(uiX, 3, this.spriteMedia + 1);

        for (let itemIndex = 0; itemIndex < this.inventoryMaxItemCount; itemIndex++) {
            let slotX = uiX + (itemIndex % 5) * 49;
            let slotY = 36 + ((itemIndex / 5) | 0) * 34;

            if (itemIndex < this.inventoryItemsCount && this.inventoryEquipped[itemIndex] === 1) {
                this.surface.drawBoxAlpha(slotX, slotY, 49, 34, 0xff0000, 128);
            } else {
                this.surface.drawBoxAlpha(slotX, slotY, 49, 34, Surface.rgbToLong(181, 181, 181), 128);
            }

            if (itemIndex < this.inventoryItemsCount) {
                this.surface.spriteClipping(slotX, slotY, 48, 32, this.spriteItem + GameData.itemPicture[this.inventoryItemId[itemIndex]], GameData.itemMask[this.inventoryItemId[itemIndex]], 0, 0, false);

                if (GameData.itemStackable[this.inventoryItemId[itemIndex]] === 0) {
                    this.surface.drawString(this.inventoryItemStackCount[itemIndex].toString(), slotX + 1, slotY + 10, 1, 0xffff00);
                }
            }
        }

        for (let rows = 1; rows <= 4; rows++) {
            this.surface.drawLineVert(uiX + rows * 49, 36, ((this.inventoryMaxItemCount / 5) | 0) * 34, 0);
        }

        for (let cols = 1; cols <= this.inventoryMaxItemCount / 5 - 1; cols++) {
            this.surface.drawLineHoriz(uiX, 36 + cols * 34, 245, 0);
        }

        if (!nomenus) {
            return;
        }

        let mouseX = this.mouseX - (this.surface.width2 - 248);
        let mouseY = this.mouseY - 36;

        if (mouseX >= 0 && mouseY >= 0 && mouseX < 248 && mouseY < ((this.inventoryMaxItemCount / 5) | 0) * 34) {
            let itemIndex = ((mouseX / 49) | 0) + ((mouseY / 34) | 0) * 5;

            if (itemIndex < this.inventoryItemsCount) {
                let i2 = this.inventoryItemId[itemIndex];

                if (this.selectedSpell >= 0) {
                    if (GameData.spellType[this.selectedSpell] === 3) {
                        this.menuItemText1[this.menuItemsCount] = 'Cast ' + GameData.spellName[this.selectedSpell] + ' on';
                        this.menuItemText2[this.menuItemsCount] = '@lre@' + GameData.itemName[i2];
                        this.menuItemID[this.menuItemsCount] = 600;
                        this.menuSourceType[this.menuItemsCount] = itemIndex;
                        this.menuSourceIndex[this.menuItemsCount] = this.selectedSpell;
                        this.menuItemsCount++;
                        return;
                    }
                } else {
                    if (this.selectedItemInventoryIndex >= 0) {
                        this.menuItemText1[this.menuItemsCount] = 'Use ' + this.selectedItemName + ' with';
                        this.menuItemText2[this.menuItemsCount] = '@lre@' + GameData.itemName[i2];
                        this.menuItemID[this.menuItemsCount] = 610;
                        this.menuSourceType[this.menuItemsCount] = itemIndex;
                        this.menuSourceIndex[this.menuItemsCount] = this.selectedItemInventoryIndex;
                        this.menuItemsCount++;
                        return;
                    }

                    if (inventoryEquipped[itemIndex] === 1) {
                        this.menuItemText1[this.menuItemsCount] = 'Remove';
                        this.menuItemText2[this.menuItemsCount] = '@lre@' + GameData.itemName[i2];
                        this.menuItemID[this.menuItemsCount] = 620;
                        this.menuSourceType[this.menuItemsCount] = itemIndex;
                        this.menuItemsCount++;
                    } else if (GameData.itemWearable[i2] !== 0) {
                        if ((GameData.itemWearable[i2] & 24) !== 0) {
                            this.menuItemText1[this.menuItemsCount] = 'Wield';
                        } else {
                            this.menuItemText1[this.menuItemsCount] = 'Wear';
                        }

                        this.menuItemText2[this.menuItemsCount] = '@lre@' + GameData.itemName[i2];
                        this.menuItemID[this.menuItemsCount] = 630;
                        this.menuSourceType[this.menuItemsCount] = itemIndex;
                        this.menuItemsCount++;
                    }

                    if (GameData.itemCommand[i2] !== '') {
                        this.menuItemText1[this.menuItemsCount] = GameData.itemCommand[i2];
                        this.menuItemText2[this.menuItemsCount] = '@lre@' + GameData.itemName[i2];
                        this.menuItemID[this.menuItemsCount] = 640;
                        this.menuSourceType[this.menuItemsCount] = itemIndex;
                        this.menuItemsCount++;
                    }

                    this.menuItemText1[this.menuItemsCount] = 'Use';
                    this.menuItemText2[this.menuItemsCount] = '@lre@' + GameData.itemName[i2];
                    this.menuItemID[this.menuItemsCount] = 650;
                    this.menuSourceType[this.menuItemsCount] = itemIndex;
                    this.menuItemsCount++;
                    this.menuItemText1[this.menuItemsCount] = 'Drop';
                    this.menuItemText2[this.menuItemsCount] = '@lre@' + GameData.itemName[i2];
                    this.menuItemID[this.menuItemsCount] = 660;
                    this.menuSourceType[this.menuItemsCount] = itemIndex;
                    this.menuItemsCount++;
                    this.menuItemText1[this.menuItemsCount] = 'Examine';
                    this.menuItemText2[this.menuItemsCount] = '@lre@' + GameData.itemName[i2];
                    this.menuItemID[this.menuItemsCount] = 3600;
                    this.menuSourceType[this.menuItemsCount] = i2;
                    this.menuItemsCount++;
                }
            }
        }
    }

    autorotateCamera() {
        if ((this.cameraAngle & 1) === 1 && this.isValidCameraAngle(this.cameraAngle)) {
            return;
        }

        if ((this.cameraAngle & 1) === 0 && this.isValidCameraAngle(this.cameraAngle)) {
            if (this.isValidCameraAngle(this.cameraAngle + 1 & 7)) {
                this.cameraAngle = this.cameraAngle + 1 & 7;
                return;
            }

            if (this.isValidCameraAngle(this.cameraAngle + 7 & 7)) {
                this.cameraAngle = this.cameraAngle + 7 & 7;
            }

            return;
        }

        let ai = new Int32Array([1, -1, 2, -2, 3, -3, 4]);

        for (let i = 0; i < 7; i++) {
            if (!this.isValidCameraAngle(this.cameraAngle + ai[i] + 8 & 7)) {
                continue;
            }

            this.cameraAngle = this.cameraAngle + ai[i] + 8 & 7;
            break;
        }

        if ((this.cameraAngle & 1) === 0 && this.isValidCameraAngle(this.cameraAngle)) {
            if (this.isValidCameraAngle(this.cameraAngle + 1 & 7)) {
                this.cameraAngle = this.cameraAngle + 1 & 7;
                return;
            }

            if (this.isValidCameraAngle(this.cameraAngle + 7 & 7)) {
                this.cameraAngle = this.cameraAngle + 7 & 7;
            }
        }
    }

    drawRightClickMenu() {
        if (this.mouseButtonClick !== 0) {
            for (let i = 0; i < this.menuItemsCount; i++) {
                let k = this.menuX + 2;
                let i1 = this.menuY + 27 + i * 15;

                if (this.mouseX <= k - 2 || this.mouseY <= i1 - 12 || this.mouseY >= i1 + 4 || this.mouseX >= (k - 3) + this.menuWidth) {
                    continue;
                }

                this.menuItemClick(this.menuIndices[i]);
                break;
            }

            mouseButtonClick = 0;
            showRightClickMenu = false;
            return;
        }

        if (this.mouseX < this.menuX - 10 || this.mouseY < this.menuY - 10 || this.mouseX > this.menuX + this.menuWidth + 10 || this.mouseY > this.menuY + this.menuHeight + 10) {
            this.showRightClickMenu = false;
            return;
        }

        this.surface.drawBoxAlpha(this.menuX, this.menuY, this.menuWidth, this.menuHeight, 0xd0d0d0, 160);
        this.surface.drawString('Choose option', this.menuX + 2, this.menuY + 12, 1, 65535);

        for (let j = 0; j < this.menuItemsCount; j++) {
            let l = this.menuX + 2;
            let j1 = this.menuY + 27 + j * 15;
            let k1 = 0xffffff;

            if (this.mouseX > l - 2 && this.mouseY > j1 - 12 && this.mouseY < j1 + 4 && this.mouseX < (l - 3) + this.menuWidth) {
                k1 = 0xffff00;
            }

            this.surface.drawString(this.menuItemText1[this.menuIndices[j]] + " " + this.menuItemText2[this.menuIndices[j]], l, j1, 1, k1);
        }
    }

    drawUiTabMinimap(nomenus) {
        let uiX = this.surface.width2 - 199;
        let uiWidth = 156;
        let uiHeight = 152;

        this.surface.drawSprite(uiX - 49, 3, this.spriteMedia + 2);
        uiX += 40;
        this.surface.drawBox(uiX, 36, uiWidth, uiHeight, 0);
        this.surface.setBounds(uiX, 36, uiX + uiWidth, 36 + uiHeight);

        let k = 192 + minimapRandom_2;
        let i1 = this.cameraRotation + this.minimapRandom_1 & 0xff;
        let k1 = (((this.localPlayer.currentX - 6040) * 3 * k) / 2048) | 0;
        let i3 = (((this.localPlayer.currentY - 6040) * 3 * k) / 2048) | 0;
        let k4 = Scene.sin2048Cache[1024 - i1 * 4 & 0x3ff];
        let i5 = Scene.sin2048Cache[(1024 - i1 * 4 & 0x3ff) + 1024];
        let k5 = i3 * k4 + k1 * i5 >> 18;

        i3 = i3 * i5 - k1 * k4 >> 18;
        k1 = k5;
        
        // landscape
        this.surface.drawMinimapSprite((uiX + ((uiWidth / 2) | 0)) - k1, 36 + ((uiHeight / 2) | 0) + i3, this.spriteMedia - 1, i1 + 64 & 255, k);

        for (let i = 0; i < this.objectCount; i++) {
            let l1 = ((((this.objectX[i] * this.magicLoc + 64) - this.localPlayer.currentX) * 3 * k) / 2048) | 0;
            let j3 = ((((this.objectY[i] * this.magicLoc + 64) - this.localPlayer.currentY) * 3 * k) / 2048) | 0;
            let l5 = j3 * k4 + l1 * i5 >> 18;
            j3 = j3 * i5 - l1 * k4 >> 18;
            l1 = l5;

            this.drawMinimapEntity(uiX + ((uiWidth / 2) | 0) + l1, (36 + ((uiHeight / 2) | 0)) - j3, 65535);
        }

        for (let j7 = 0; j7 < this.groundItemCount; j7++) {
            let i2 = ((((this.groundItemX[j7] * this.magicLoc + 64) - this.localPlayer.currentX) * 3 * k) / 2048) | 0;
            let k3 = ((((this.groundItemY[j7] * this.magicLoc + 64) - this.localPlayer.currentY) * 3 * k) / 2048) | 0;
            let i6 = k3 * k4 + i2 * i5 >> 18;
            k3 = k3 * i5 - i2 * k4 >> 18;
            i2 = i6;

            this.drawMinimapEntity(uiX + ((uiWidth / 2) | 0) + i2, (36 + ((uiHeight / 2) | 0)) - k3, 0xff0000);
        }

        for (let k7 = 0; k7 < this.npcCount; k7++) {
            let character = this.npcs[k7];
            let j2 = (((character.currentX - this.localPlayer.currentX) * 3 * k) / 2048) | 0;
            let l3 = (((character.currentY - this.localPlayer.currentY) * 3 * k) / 2048) | 0;
            let j6 = l3 * k4 + j2 * i5 >> 18;
            l3 = l3 * i5 - j2 * k4 >> 18;
            j2 = j6;

            this.drawMinimapEntity(uiX + ((uiWidth / 2) | 0) + j2, (36 + ((uiHeight / 2) | 0)) - l3, 0xffff00);
        }

        for (let l7 = 0; l7 < playerCount; l7++) {
            let character_1 = players[l7];
            let k2 = (((character_1.currentX - this.localPlayer.currentX) * 3 * k) / 2048) | 0;
            let i4 = (((character_1.currentY - this.localPlayer.currentY) * 3 * k) / 2048) | 0;
            let k6 = i4 * k4 + k2 * i5 >> 18;
            i4 = i4 * i5 - k2 * k4 >> 18;
            k2 = k6;
            let j8 = 0xffffff;

            for (let k8 = 0; k8 < this.friendListCount; k8++) {
                if (!character_1.hash.equals(this.friendListHashes[k8]) || this.friendListOnline[k8] !== 255) {
                    continue;
                }

                j8 = 65280;
                break;
            }

            this.drawMinimapEntity(uiX + ((uiWidth / 2) | 0) + k2, (36 + ((uiHeight / 2) | 0)) - i4, j8);
        }

        this.surface.drawCircle(uiX + ((uiWidth / 2) | 0), 36 + ((uiHeight / 2) | 0), 2, 0xffffff, 255);

        // compass
        this.surface.drawMinimapSprite(uiX + 19, 55, this.spriteMedia + 24, this.cameraRotation + 128 & 255, 128);
        this.surface.setBounds(0, 0, this.gameWidth, this.gameHeight + 12);

        if (!nomenus) {
            return;
        }

        let mouseX = this.mouseX - (this.surface.width2 - 199);
        let mouseY = this.mouseY - 36;

        if (mouseX >= 40 && mouseY >= 0 && mouseX < 196 && mouseY < 152) {
            let c1 = 156;
            let c3 = 152;
            let l = 192 + this.minimapRandom_2;
            let j1 = this.cameraRotation + this.minimapRandom_1 & 0xff;
            let j = this.surface.width2 - 199;

            j += 40;

            let dx = (((this.mouseX - (j + ((c1 / 2) | 0))) * 16384) / (3 * l)) | 0;
            let dy = (((this.mouseY - (36 + ((c3 / 2) | 0))) * 16384) / (3 * l)) | 0;
            let l4 = Scene.sin2048Cache[1024 - j1 * 4 & 1023];
            let j5 = Scene.sin2048Cache[(1024 - j1 * 4 & 1023) + 1024];
            let l6 = dy * l4 + dx * j5 >> 15;

            dy = dy * j5 - dx * l4 >> 15;
            dx = l6;
            dx += this.localPlayer.currentX;
            dy = this.localPlayer.currentY - dy;

            if (this.mouseButtonClick === 1) {
                this._walkToActionSource_from5(this.localRegionX, this.localRegionY, (dx / 128) | 0, (dy / 128) | 0, false);
            }

            this.mouseButtonClick = 0;
        }
    }

    drawDialogTradeConfirm() {
        let dialogX = 22;
        let dialogY = 36;

        this.surface.drawBox(dialogX, dialogY, 468, 16, 192);
        this.surface.drawBoxAlpha(dialogX, dialogY + 16, 468, 246, 0x989898, 160);
        this.surface.drawStringCenter('Please confirm your trade with @yel@' + Utility.hashToUsername(this.tradeRecipientConfirmHash), dialogX + 234, dialogY + 12, 1, 0xffffff);
        this.surface.drawStringCenter('You are about to give:', dialogX + 117, dialogY + 30, 1, 0xffff00);

        for (let j = 0; j < this.tradeConfirmItemsCount; j++) {
            let s = GameData.itemName[this.tradeConfirmItems[j]];

            if (GameData.itemStackable[this.tradeConfirmItems[j]] === 0) {
                s = s + ' x ' + this.formatNumber(this.tradeConfirmItemCount[j]);
            }

            this.surface.drawStringCenter(s, dialogX + 117, dialogY + 42 + j * 12, 1, 0xffffff);
        }

        if (this.tradeConfirmItemsCount === 0) {
            this.surface.drawStringCenter('Nothing!', dialogX + 117, dialogY + 42, 1, 0xffffff);
        }

        this.surface.drawStringCenter('In return you will receive:', dialogX + 351, dialogY + 30, 1, 0xffff00);

        for (let k = 0; k < this.tradeRecipientConfirmItemsCount; k++) {
            let s1 = GameData.itemName[this.tradeRecipientConfirmItems[k]];

            if (GameData.itemStackable[this.tradeRecipientConfirmItems[k]] === 0) {
                s1 = s1 + ' x ' + this.formatNumber(this.tradeRecipientConfirmItemCount[k]);
            }

            this.surface.drawStringCenter(s1, dialogX + 351, dialogY + 42 + k * 12, 1, 0xffffff);
        }

        if (this.tradeRecipientConfirmItemsCount === 0) {
            this.surface.drawStringCenter('Nothing!', dialogX + 351, dialogY + 42, 1, 0xffffff);
        }

        this.surface.drawStringCenter('Are you sure you want to do this?', dialogX + 234, dialogY + 200, 4, 65535);
        this.surface.drawStringCenter('There is NO WAY to reverse a trade if you change your mind.', dialogX + 234, dialogY + 215, 1, 0xffffff);
        this.surface.drawStringCenter('Remember that not all players are trustworthy', dialogX + 234, dialogY + 230, 1, 0xffffff);

        if (!this.tradeConfirmAccepted) {
            this.surface._drawSprite_from3((dialogX + 118) - 35, dialogY + 238, this.spriteMedia + 25);
            this.surface._drawSprite_from3((dialogX + 352) - 35, dialogY + 238, this.spriteMedia + 26);
        } else {
            this.surface.drawStringCenter('Waiting for other player...', dialogX + 234, dialogY + 250, 1, 0xffff00);
        }

        if (this.mouseButtonClick === 1) {
            if (this.mouseX < dialogX || this.mouseY < dialogY || this.mouseX > dialogX + 468 || this.mouseY > dialogY + 262) {
                this.showDialogTradeConfirm = false;
                this.clientStream.newPacket(C_OPCODES.TRADE_DECLINE);
                this.clientStream.sendPacket();
            }

            if (this.mouseX >= (dialogX + 118) - 35 && this.mouseX <= dialogX + 118 + 70 && this.mouseY >= dialogY + 238 && this.mouseY <= dialogY + 238 + 21) {
                this.tradeConfirmAccepted = true;
                this.clientStream.newPacket(C_OPCODES.TRADE_CONFIRM_ACCEPT);
                this.clientStream.sendPacket();
            }

            if (this.mouseX >= (dialogX + 352) - 35 && this.mouseX <= dialogX + 353 + 70 && this.mouseY >= dialogY + 238 && this.mouseY <= dialogY + 238 + 21) {
                this.showDialogTradeConfirm = false;
                this.clientStream.newPacket(C_OPCODES.TRADE_DECLINE);
                this.clientStream.sendPacket();
            }

            this.mouseButtonClick = 0;
        }
    }

    setActiveUiTab() {
        if (this.showUiTab === 0 && this.mouseX >= this.surface.width2 - 35 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 && this.mouseY < 35) {
            this.showUiTab = 1;
        }

        if (this.showUiTab === 0 && this.mouseX >= this.surface.width2 - 35 - 33 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 - 33 && this.mouseY < 35) {
            this.showUiTab = 2;
            minimapRandom_1 = ((Math.random() * 13) | 0) - 6;
            minimapRandom_2 = ((Math.random() * 23) | 0) - 11;
        }

        if (this.showUiTab === 0 && this.mouseX >= this.surface.width2 - 35 - 66 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 - 66 && this.mouseY < 35) {
            this.showUiTab = 3;
        }

        if (this.showUiTab === 0 && this.mouseX >= this.surface.width2 - 35 - 99 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 - 99 && this.mouseY < 35) {
            this.showUiTab = 4;
        }

        if (this.showUiTab === 0 && this.mouseX >= this.surface.width2 - 35 - 132 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 - 132 && this.mouseY < 35) {
            this.showUiTab = 5;
        }

        if (this.showUiTab === 0 && this.mouseX >= this.surface.width2 - 35 - 165 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 - 165 && this.mouseY < 35) {
            this.showUiTab = 6;
        }

        if (this.showUiTab !== 0 && this.mouseX >= this.surface.width2 - 35 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 && this.mouseY < 26) {
            this.showUiTab = 1;
        }

        if (this.showUiTab !== 0 && this.showUiTab !== 2 && this.mouseX >= this.surface.width2 - 35 - 33 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 - 33 && this.mouseY < 26) {
            this.showUiTab = 2;
            minimapRandom_1 = ((Math.random() * 13) | 0) - 6;
            minimapRandom_2 = ((Math.random() * 23) | 0) - 11;
        }

        if (this.showUiTab !== 0 && this.mouseX >= this.surface.width2 - 35 - 66 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 - 66 && this.mouseY < 26) {
            this.showUiTab = 3;
        }

        if (this.showUiTab !== 0 && this.mouseX >= this.surface.width2 - 35 - 99 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 - 99 && this.mouseY < 26) {
            this.showUiTab = 4;
        }

        if (this.showUiTab !== 0 && this.mouseX >= this.surface.width2 - 35 - 132 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 - 132 && this.mouseY < 26) {
            this.showUiTab = 5;
        }

        if (this.showUiTab !== 0 && this.mouseX >= this.surface.width2 - 35 - 165 && this.mouseY >= 3 && this.mouseX < this.surface.width2 - 3 - 165 && this.mouseY < 26) {
            this.showUiTab = 6;
        }

        if (this.showUiTab === 1 && (this.mouseX < this.surface.width2 - 248 || this.mouseY > 36 + (inventoryMaxItemCount / 5) * 34)) {
            this.showUiTab = 0;
        }

        if (this.showUiTab === 3 && (this.mouseX < this.surface.width2 - 199 || this.mouseY > 316)) {
            this.showUiTab = 0;
        }

        if ((this.showUiTab === 2 || this.showUiTab === 4 || this.showUiTab === 5) && (this.mouseX < this.surface.width2 - 199 || this.mouseY > 240)) {
            this.showUiTab = 0;
        }

        if (this.showUiTab === 6 && (this.mouseX < this.surface.width2 - 199 || this.mouseY > 311)) {
            this.showUiTab = 0;
        }
    }

    drawOptionMenu() {
        if (this.mouseButtonClick !== 0) {
            for (let i = 0; i < this.optionMenuCount; i++) {
                if (this.mouseX >= this.surface.textWidth(this.optionMenuEntry[i], 1) || this.mouseY <= i * 12 || this.mouseY >= 12 + i * 12) {
                    continue;
                }

                this.clientStream.newPacket(C_OPCODES.CHOOSE_OPTION);
                this.clientStream.putByte(i);
                this.clientStream.sendPacket();
                break;
            }

            this.mouseButtonClick = 0;
            this.showOptionMenu = false;
            return;
        }

        for (let j = 0; j < this.optionMenuCount; j++) {
            let k = 65535;

            if (this.mouseX < this.surface.textWidth(this.optionMenuEntry[j], 1) && this.mouseY > j * 12 && this.mouseY < 12 + j * 12) {
                k = 0xff0000;
            }

            this.surface.drawString(this.optionMenuEntry[j], 6, 12 + j * 12, 1, k);
        }
    }

    drawNpc(x, y, w, h, id, tx, ty) {
        let character = this.npcs[id];
        let l1 = character.animationCurrent + (cameraRotation + 16) / 32 & 7;
        let flag = false;
        let i2 = l1;

        if (i2 === 5) {
            i2 = 3;
            flag = true;
        } else if (i2 === 6) {
            i2 = 2;
            flag = true;
        } else if (i2 === 7) {
            i2 = 1;
            flag = true;
        }

        let j2 = i2 * 3 + npcWalkModel[((character.stepCount / GameData.npcWalkModel[character.npcId]) | 0) % 4];

        if (character.animationCurrent === 8) {
            i2 = 5;
            l1 = 2;
            flag = false;
            x -= ((GameData.npcCombatAnimation[character.npcId] * ty) / 100) | 0;
            j2 = i2 * 3 + npcCombatModelArray1[(((loginTimer / (GameData.npcCombatModel[character.npcId]) | 0) - 1)) % 8];
        } else if (character.animationCurrent === 9) {
            i2 = 5;
            l1 = 2;
            flag = true;
            x += ((GameData.npcCombatAnimation[character.npcId] * ty) / 100) | 0;
            j2 = i2 * 3 + npcCombatModelArray2[((loginTimer / GameData.npcCombatModel[character.npcId]) | 0) % 8];
        }

        for (let k2 = 0; k2 < 12; k2++) {
            let l2 = npcAnimationArray[l1][k2];
            let k3 = GameData.npcSprite[character.npcId][l2];

            if (k3 >= 0) {
                let i4 = 0;
                let j4 = 0;
                let k4 = j2;

                if (flag && i2 >= 1 && i2 <= 3 && GameData.animationHasF[k3] === 1) {
                    k4 += 15;
                }

                if (i2 !== 5 || GameData.animationHasA[k3] === 1) {
                    let l4 = k4 + GameData.animationNumber[k3];
                    i4 = ((i4 * w) / this.surface.spriteWidthFull[l4]) | 0;
                    j4 = ((j4 * h) / this.surface.spriteHeightFull[l4]) | 0;
                    let i5 = ((w * this.surface.spriteWidthFull[l4]) / this.surface.spriteWidthFull[GameData.animationNumber[k3]]) | 0;
                    i4 -= ((i5 - w) / 2) | 0;
                    let col = GameData.animationCharacterColour[k3];
                    let skincol = 0;

                    if (col === 1) {
                        col = GameData.npcColourHair[character.npcId];
                        skincol = GameData.npcColourSkin[character.npcId];
                    } else if (col === 2) {
                        col = GameData.npcColourTop[character.npcId];
                        skincol = GameData.npcColourSkin[character.npcId];
                    } else if (col === 3) {
                        col = GameData.npcColorBottom[character.npcId];
                        skincol = GameData.npcColourSkin[character.npcId];
                    }

                    this.surface._spriteClipping_from9(x + i4, y + j4, i5, h, l4, col, skincol, tx, flag);
                }
            }
        }

        if (character.messageTimeout > 0) {
            this.receivedMessageMidPoint[this.receivedMessagesCount] = (this.surface.textWidth(character.message, 1) / 2) | 0;

            if (this.receivedMessageMidPoint[this.receivedMessagesCount] > 150) {
                this.receivedMessageMidPoint[this.receivedMessagesCount] = 150;
            }

            this.receivedMessageHeight[this.receivedMessagesCount] = ((this.surface.textWidth(character.message, 1) / 300) | 0) * this.surface.textHeight(1);
            this.receivedMessageX[this.receivedMessagesCount] = x + ((w / 2) | 0);
            this.receivedMessageY[this.receivedMessagesCount] = y;
            this.receivedMessages[this.receivedMessagesCount++] = character.message;
        }

        if (character.animationCurrent === 8 || character.animationCurrent === 9 || character.combatTimer !== 0) {
            if (character.combatTimer > 0) {
                let i3 = x;

                if (character.animationCurrent === 8) {
                    i3 -= ((20 * ty) / 100) | 0;
                } else if (character.animationCurrent === 9) {
                    i3 += ((20 * ty) / 100) | 0;
                }

                let l3 = ((character.healthCurrent * 30) / character.healthMax) | 0;
                this.healthBarX[this.healthBarCount] = i3 + ((w / 2) | 0);
                this.healthBarY[this.healthBarCount] = y;
                this.healthBarMissing[this.healthBarCount++] = l3;
            }

            if (character.combatTimer > 150) {
                let j3 = x;

                if (character.animationCurrent === 8) {
                    j3 -= ((10 * ty) / 100) | 0;
                } else if (character.animationCurrent === 9) {
                    j3 += ((10 * ty) / 100) | 0;
                }

                this.surface._drawSprite_from3((j3 + ((w / 2) | 0)) - 12, (y + ((h / 2) | 0)) - 12, this.spriteMedia + 12);
                this.surface.drawStringCenter(character.damageTaken.toString(), (j3 + ((w / 2) | 0)) - 1, y + ((h / 2) | 0) + 5, 3, 0xffffff);
            }
        }
    }

    walkToWallObject(i, j, k) {
        if (k === 0) {
            this._walkToActionSource_from8(this.localRegionX, this.localRegionY, i, j - 1, i, j, false, true);
            return;
        }

        if (k === 1) {
            this._walkToActionSource_from8(this.localRegionX, this.localRegionY, i - 1, j, i, j, false, true);
            return;
        } else {
            this._walkToActionSource_from8(this.localRegionX, this.localRegionY, i, j, i, j, true, true);
            return;
        }
    }

    async loadGameConfig() {
        let buff = await readDataFile('config' + VERSION.CONFIG + '.jag', 'Configuration', 10);

        if (buff === null) {
            this.errorLoadingData = true;
            return;
        }

        GameData.loadData(buff, this.members);

        let abyte1 = await readDataFile('filter' + VERSION.FILTER + '.jag', 'Chat system', 15);

        if (abyte1 === null) {
            this.errorLoadingData = true;
            return;
        } else {
            let buffragments = Utility.loadData('fragmentsenc.txt', 0, abyte1);
            let buffbandenc = Utility.loadData('badenc.txt', 0, abyte1);
            let buffhostenc = Utility.loadData('hostenc.txt', 0, abyte1);
            let bufftldlist = Utility.loadData('tldlist.txt', 0, abyte1);
            WordFilter.loadFilters(new GameBuffer(buffragments), new GameBuffer(buffbandenc), new GameBuffer(buffhostenc), new GameBuffer(bufftldlist));
            return;
        }
    }

    addNpc(serverIndex, x, y, sprite, type) {
        if (this.npcsServer[serverIndex] === null) {
            this.npcsServer[serverIndex] = new GameCharacter();
            this.npcsServer[serverIndex].serverIndex = serverIndex;
        }

        let character = this.npcsServer[serverIndex];
        let foundNpc = false;

        for (let i = 0; i < this.npcCacheCount; i++) {
            if (this.npcsCache[i].serverIndex !== serverIndex) {
                continue;
            }

            foundNpc = true;
            break;
        }

        if (foundNpc) {
            character.npcId = type;
            character.animationNext = sprite;
            let waypointIdx = character.waypointCurrent;

            if (x !== character.waypointsX[waypointIdx] || y !== character.waypointsY[waypointIdx]) {
                character.waypointCurrent = waypointIdx = (waypointIdx + 1) % 10;
                character.waypointsX[waypointIdx] = x;
                character.waypointsY[waypointIdx] = y;
            }
        } else {
            character.serverIndex = serverIndex;
            character.movingStep = 0;
            character.waypointCurrent = 0;
            character.waypointsX[0] = character.currentX = x;
            character.waypointsY[0] = character.currentY = y;
            character.npcId = type;
            character.animationNext = character.animationCurrent = sprite;
            character.stepCount = 0;
        }

        this.npcs[this.npcCount++] = character;
        return character;
    }

    resetLoginVars() {
        this.systemUpdate = 0;
        this.loginScreen = 0;
        this.loggedIn = 0;
        this.logoutTimeout = 0;
    }

    drawDialogBank() {
        let dialogWidth = 408;
        let dialogHeight = 334;

        if (this.bankActivePage > 0 && this.bankItemCount <= 48) {
            this.bankActivePage = 0;
        }

        if (this.bankActivePage > 1 && this.bankItemCount <= 96) {
            this.bankActivePage = 1;
        }

        if (this.bankActivePage > 2 && this.bankItemCount <= 144) {
            this.bankActivePage = 2;
        }

        if (this.bankSelectedItemSlot >= this.bankItemCount || this.bankSelectedItemSlot < 0) {
            this.bankSelectedItemSlot = -1;
        }

        if (this.bankSelectedItemSlot !== -1 && this.bankItems[this.bankSelectedItemSlot] !== this.bankSelectedItem) {
            this.bankSelectedItemSlot = -1;
            this.bankSelectedItem = -2;
        }

        if (this.mouseButtonClick !== 0) {
            this.mouseButtonClick = 0;

            let mouseX = this.mouseX - (((this.gameWidth / 2) | 0) - ((dialogWidth / 2) | 0));
            let mouseY = this.mouseY - (((this.gameHeight / 2) | 0) - ((dialogHeight / 2) | 0));
            //let mouseX = this.mouseX - (256 - dialogWidth / 2);
            //let mouseY = this.mouseY - (170 - dialogHeight / 2);

            if (mouseX >= 0 && mouseY >= 12 && mouseX < 408 && mouseY < 280) {
                let i1 = this.bankActivePage * 48;

                for (let l1 = 0; l1 < 6; l1++) {
                    for (let j2 = 0; j2 < 8; j2++) {
                        let l6 = 7 + j2 * 49;
                        let j7 = 28 + l1 * 34;

                        if (mouseX > l6 && mouseX < l6 + 49 && mouseY > j7 && mouseY < j7 + 34 && i1 < this.bankItemCount && this.bankItems[i1] !== -1) {
                            this.bankSelectedItem = this.bankItems[i1];
                            this.bankSelectedItemSlot = i1;
                        }

                        i1++;
                    }
                }

                mouseX = 256 - ((dialogWidth / 2) | 0);
                mouseY = 170 - ((dialogHeight / 2) | 0);

                let slot = 0;

                if (this.bankSelectedItemSlot < 0) {
                    slot = -1;
                } else {
                    slot = this.bankItems[this.bankSelectedItemSlot];
                }

                if (slot !== -1) {
                    let j1 = this.bankItemsCount[this.bankSelectedItemSlot];

                    if (GameData.itemStackable[slot] === 1 && j1 > 1) {
                        j1 = 1;
                    }

                    if (j1 >= 1 && this.mouseX >= mouseX + 220 && this.mouseY >= mouseY + 238 && this.mouseX < mouseX + 250 && this.mouseY <= mouseY + 249) {
                        this.clientStream.newPacket(C_OPCODES.BANK_WITHDRAW);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(1);
                        this.clientStream.putInt(0x12345678);
                        this.clientStream.sendPacket();
                    }

                    if (j1 >= 5 && this.mouseX >= mouseX + 250 && this.mouseY >= mouseY + 238 && this.mouseX < mouseX + 280 && this.mouseY <= mouseY + 249) {
                        this.clientStream.newPacket(C_OPCODES.BANK_WITHDRAW);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(5);
                        this.clientStream.putInt(0x12345678);
                        this.clientStream.sendPacket();
                    }

                    if (j1 >= 25 && this.mouseX >= mouseX + 280 && this.mouseY >= mouseY + 238 && this.mouseX < mouseX + 305 && this.mouseY <= mouseY + 249) {
                        this.clientStream.newPacket(C_OPCODES.BANK_WITHDRAW);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(25);
                        this.clientStream.putInt(0x12345678);
                        this.clientStream.sendPacket();
                    }

                    if (j1 >= 100 && this.mouseX >= mouseX + 305 && this.mouseY >= mouseY + 238 && this.mouseX < mouseX + 335 && this.mouseY <= mouseY + 249) {
                        this.clientStream.newPacket(C_OPCODES.BANK_WITHDRAW);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(100);
                        this.clientStream.putInt(0x12345678);
                        this.clientStream.sendPacket();
                    }

                    if (j1 >= 500 && this.mouseX >= mouseX + 335 && this.mouseY >= mouseY + 238 && this.mouseX < mouseX + 368 && this.mouseY <= mouseY + 249) {
                        this.clientStream.newPacket(C_OPCODES.BANK_WITHDRAW);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(500);
                        this.clientStream.putInt(0x12345678);
                        this.clientStream.sendPacket();
                    }

                    if (j1 >= 2500 && this.mouseX >= mouseX + 370 && this.mouseY >= mouseY + 238 && this.mouseX < mouseX + 400 && this.mouseY <= mouseY + 249) {
                        this.clientStream.newPacket(C_OPCODES.BANK_WITHDRAW);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(2500);
                        this.clientStream.putInt(0x12345678);
                        this.clientStream.sendPacket();
                    }

                    if (this.getInventoryCount(slot) >= 1 && this.mouseX >= mouseX + 220 && this.mouseY >= mouseY + 263 && this.mouseX < mouseX + 250 && this.mouseY <= mouseY + 274) {
                        this.clientStream.newPacket(C_OPCODES.BANK_DEPOSIT);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(1);
                        this.clientStream.putInt(0x87654321);
                        this.clientStream.sendPacket();
                    }

                    if (this.getInventoryCount(slot) >= 5 && this.mouseX >= mouseX + 250 && this.mouseY >= mouseY + 263 && this.mouseX < mouseX + 280 && this.mouseY <= mouseY + 274) {
                        this.clientStream.newPacket(C_OPCODES.BANK_DEPOSIT);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(5);
                        this.clientStream.putInt(0x87654321);
                        this.clientStream.sendPacket();
                    }
                    if (this.getInventoryCount(slot) >= 25 && this.mouseX >= mouseX + 280 && this.mouseY >= mouseY + 263 && this.mouseX < mouseX + 305 && this.mouseY <= mouseY + 274) {
                        this.clientStream.newPacket(C_OPCODES.BANK_DEPOSIT);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(25);
                        this.clientStream.putInt(0x87654321);
                        this.clientStream.sendPacket();
                    }

                    if (this.getInventoryCount(slot) >= 100 && this.mouseX >= mouseX + 305 && this.mouseY >= mouseY + 263 && this.mouseX < mouseX + 335 && this.mouseY <= mouseY + 274) {
                        this.clientStream.newPacket(C_OPCODES.BANK_DEPOSIT);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(100);
                        this.clientStream.putInt(0x87654321);
                        this.clientStream.sendPacket();
                    }
                    if (this.getInventoryCount(slot) >= 500 && this.mouseX >= mouseX + 335 && this.mouseY >= mouseY + 263 && this.mouseX < mouseX + 368 && this.mouseY <= mouseY + 274) {
                        this.clientStream.newPacket(C_OPCODES.BANK_DEPOSIT);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(500);
                        this.clientStream.putInt(0x87654321);
                        this.clientStream.sendPacket();
                    }

                    if (this.getInventoryCount(slot) >= 2500 && this.mouseX >= mouseX + 370 && this.mouseY >= mouseY + 263 && this.mouseX < mouseX + 400 && this.mouseY <= mouseY + 274) {
                        this.clientStream.newPacket(C_OPCODES.BANK_DEPOSIT);
                        this.clientStream.putShort(slot);
                        this.clientStream.putShort(2500);
                        this.clientStream.putInt(0x87654321);
                        this.clientStream.sendPacket();
                    }
                }
            } else if (this.bankItemCount > 48 && mouseX >= 50 && mouseX <= 115 && mouseY <= 12) {
                this.bankActivePage = 0;
            } else if (this.bankItemCount > 48 && mouseX >= 115 && mouseX <= 180 && mouseY <= 12) {
                this.bankActivePage = 1;
            } else if (this.bankItemCount > 96 && mouseX >= 180 && mouseX <= 245 && mouseY <= 12) {
                this.bankActivePage = 2;
            } else if (this.bankItemCount > 144 && mouseX >= 245 && mouseX <= 310 && mouseY <= 12) {
                this.bankActivePage = 3;
            } else {
                this.clientStream.newPacket(C_OPCODES.BANK_CLOSE);
                this.clientStream.sendPacket();
                this.showDialogBank = false;
                return;
            }
        }

        let x = ((this.gameWidth / 2) | 0) - ((dialogWidth / 2) | 0);
        let y = ((this.gameHeight / 2) | 0) - ((dialogHeight / 2) | 0);
        //let x = 256 - dialogWidth / 2;
        //let y = 170 - dialogHeight / 2;

        this.surface.drawBox(x, y, 408, 12, 192);
        this.surface.drawBoxAlpha(x, y + 12, 408, 17, 0x989898, 160);
        this.surface.drawBoxAlpha(x, y + 29, 8, 204, 0x989898, 160);
        this.surface.drawBoxAlpha(x + 399, y + 29, 9, 204, 0x989898, 160);
        this.surface.drawBoxAlpha(x, y + 233, 408, 47, 0x989898, 160);
        this.surface.drawString('Bank', x + 1, y + 10, 1, 0xffffff);

        let xOff = 50;

        if (this.bankItemCount > 48) {
            let l2 = 0xffffff;

            if (this.bankActivePage === 0) {
                l2 = 0xff0000;
            } else if (this.mouseX > x + xOff && this.mouseY >= y && this.mouseX < x + xOff + 65 && this.mouseY < y + 12) {
                l2 = 0xffff00;
            }

            this.surface.drawString('<page 1>', x + xOff, y + 10, 1, l2);
            xOff += 65;
            l2 = 0xffffff;

            if (this.bankActivePage === 1) {
                l2 = 0xff0000;
            } else if (this.mouseX > x + xOff && this.mouseY >= y && this.mouseX < x + xOff + 65 && this.mouseY < y + 12) {
                l2 = 0xffff00;
            }

            this.surface.drawString('<page 2>', x + xOff, y + 10, 1, l2);
            xOff += 65;
        }

        if (this.bankItemCount > 96) {
            let i3 = 0xffffff;
            if (this.bankActivePage === 2) {
                i3 = 0xff0000;
            } else if (this.mouseX > x + xOff && this.mouseY >= y && this.mouseX < x + xOff + 65 && this.mouseY < y + 12) {
                i3 = 0xffff00;
            }

            this.surface.drawString('<page 3>', x + xOff, y + 10, 1, i3);
            xOff += 65;
        }

        if (this.bankItemCount > 144) {
            let j3 = 0xffffff;

            if (this.bankActivePage === 3) {
                j3 = 0xff0000;
            } else if (this.mouseX > x + xOff && this.mouseY >= y && this.mouseX < x + xOff + 65 && this.mouseY < y + 12) {
                j3 = 0xffff00;
            }

            this.surface.drawString('<page 4>', x + xOff, y + 10, 1, j3);
            xOff += 65;
        }

        let colour = 0xffffff;

        if (this.mouseX > x + 320 && this.mouseY >= y && this.mouseX < x + 408 && this.mouseY < y + 12) {
            colour = 0xff0000;
        }

        this.surface.drawStringRight('Close window', x + 406, y + 10, 1, colour);
        this.surface.drawString('Number in bank in green', x + 7, y + 24, 1, 65280);
        this.surface.drawString('Number held in blue', x + 289, y + 24, 1, 65535);

        let k7 = this.bankActivePage * 48;

        for (let i8 = 0; i8 < 6; i8++) {
            for (let j8 = 0; j8 < 8; j8++) {
                let l8 = x + 7 + j8 * 49;
                let i9 = y + 28 + i8 * 34;

                if (this.bankSelectedItemSlot === k7) {
                    this.surface.drawBoxAlpha(l8, i9, 49, 34, 0xff0000, 160);
                } else {
                    this.surface.drawBoxAlpha(l8, i9, 49, 34, 0xd0d0d0, 160);
                }

                this.surface.drawBoxEdge(l8, i9, 50, 35, 0);

                if (k7 < this.bankItemCount && this.bankItems[k7] !== -1) {
                    this.surface._spriteClipping_from9(l8, i9, 48, 32, this.spriteItem + GameData.itemPicture[this.bankItems[k7]], GameData.itemMask[this.bankItems[k7]], 0, 0, false);
                    this.surface.drawString(this.bankItemsCount[k7].toString(), l8 + 1, i9 + 10, 1, 65280);
                    this.surface.drawStringRight(this.getInventoryCount(this.bankItems[k7]).toString(), l8 + 47, i9 + 29, 1, 65535);
                }

                k7++;
            }
        }

        this.surface.drawLineHoriz(x + 5, y + 256, 398, 0);

        if (this.bankSelectedItemSlot === -1) {
            this.surface.drawStringCenter('Select an object to withdraw or deposit', x + 204, y + 248, 3, 0xffff00);
            return;
        }

        let itemType = 0;

        if (this.bankSelectedItemSlot < 0) {
            itemType = -1;
        } else {
            itemType = this.bankItems[this.bankSelectedItemSlot];
        }

        if (itemType !== -1) {
            let itemCount = this.bankItemsCount[this.bankSelectedItemSlot];

            if (GameData.itemStackable[itemType] === 1 && itemCount > 1) {
                itemCount = 1;
            }

            if (itemCount > 0) {
                this.surface.drawString('Withdraw ' + GameData.itemName[itemType], x + 2, y + 248, 1, 0xffffff);
                colour = 0xffffff;

                if (this.mouseX >= x + 220 && this.mouseY >= y + 238 && this.mouseX < x + 250 && this.mouseY <= y + 249) {
                    colour = 0xff0000;
                }

                this.surface.drawString('One', x + 222, y + 248, 1, colour);

                if (itemCount >= 5) {
                    colour = 0xffffff;

                    if (this.mouseX >= x + 250 && this.mouseY >= y + 238 && this.mouseX < x + 280 && this.mouseY <= y + 249) {
                        colour = 0xff0000;
                    }

                    this.surface.drawString('Five', x + 252, y + 248, 1, colour);
                }

                if (itemCount >= 25) {
                    colour = 0xffffff;

                    if (this.mouseX >= x + 280 && this.mouseY >= y + 238 && this.mouseX < x + 305 && this.mouseY <= y + 249) {
                        colour = 0xff0000;
                    }

                    this.surface.drawString('25', x + 282, y + 248, 1, colour);
                }

                if (itemCount >= 100) {
                    colour = 0xffffff;

                    if (this.mouseX >= x + 305 && this.mouseY >= y + 238 && this.mouseX < x + 335 && this.mouseY <= y + 249) {
                        colour = 0xff0000;
                    }

                    this.surface.drawString('100', x + 307, y + 248, 1, colour);
                }

                if (itemCount >= 500) {
                    colour = 0xffffff;

                    if (this.mouseX >= x + 335 && this.mouseY >= y + 238 && this.mouseX < x + 368 && this.mouseY <= y + 249) {
                        colour = 0xff0000;
                    }

                    this.surface.drawString('500', x + 337, y + 248, 1, colour);
                }

                if (itemCount >= 2500) {
                    colour = 0xffffff;

                    if (this.mouseX >= x + 370 && this.mouseY >= y + 238 && this.mouseX < x + 400 && this.mouseY <= y + 249) {
                        colour = 0xff0000;
                    }

                    this.surface.drawString('2500', x + 370, y + 248, 1, colour);
                }
            }

            if (this.getInventoryCount(itemType) > 0) {
                this.surface.drawString('Deposit ' + GameData.itemName[itemType], x + 2, y + 273, 1, 0xffffff);
                colour = 0xffffff;

                if (this.mouseX >= x + 220 && this.mouseY >= y + 263 && this.mouseX < x + 250 && this.mouseY <= y + 274) {
                    colour = 0xff0000;
                }

                this.surface.drawString('One', x + 222, y + 273, 1, colour);

                if (this.getInventoryCount(itemType) >= 5) {
                    colour = 0xffffff;

                    if (this.mouseX >= x + 250 && this.mouseY >= y + 263 && this.mouseX < x + 280 && this.mouseY <= y + 274) {
                        colour = 0xff0000;
                    }

                    this.surface.drawString('Five', x + 252, y + 273, 1, colour);
                }

                if (this.getInventoryCount(itemType) >= 25) {
                    colour = 0xffffff;

                    if (this.mouseX >= x + 280 && this.mouseY >= y + 263 && this.mouseX < x + 305 && this.mouseY <= y + 274) {
                        colour = 0xff0000;
                    }

                    this.surface.drawString('25', x + 282, y + 273, 1, colour);
                }

                if (this.getInventoryCount(itemType) >= 100) {
                    colour = 0xffffff;

                    if (this.mouseX >= x + 305 && this.mouseY >= y + 263 && this.mouseX < x + 335 && this.mouseY <= y + 274) {
                        colour = 0xff0000;
                    }

                    this.surface.drawString('100', x + 307, y + 273, 1, colour);
                }

                if (this.getInventoryCount(itemType) >= 500) {
                    colour = 0xffffff;

                    if (this.mouseX >= x + 335 && this.mouseY >= y + 263 && this.mouseX < x + 368 && this.mouseY <= y + 274) {
                        colour = 0xff0000;
                    }

                    this.surface.drawString('500', x + 337, y + 273, 1, colour);
                }

                if (this.getInventoryCount(itemType) >= 2500) {
                    colour = 0xffffff;

                    if (this.mouseX >= x + 370 && this.mouseY >= y + 263 && this.mouseX < x + 400 && this.mouseY <= y + 274) {
                        colour = 0xff0000;
                    }

                    this.surface.drawString('2500', x + 370, y + 273, 1, colour);
                }
            }
        }
    }

    drawDialogDuel() {
        if (this.mouseButtonClick !== 0 && this.mouseButtonItemCountIncrement === 0) {
            this.mouseButtonItemCountIncrement = 1;
        }

        if (this.mouseButtonItemCountIncrement > 0) {
            let mouseX = this.mouseX - 22;
            let mouseY = this.mouseY - 36;

            if (mouseX >= 0 && mouseY >= 0 && mouseX < 468 && mouseY < 262) {
                if (mouseX > 216 && mouseY > 30 && mouseX < 462 && mouseY < 235) {
                    let slot = ((((mouseX - 217) | 0) / 49) | 0) + (((mouseY - 31) / 34) | 0) * 5;
                    if (slot >= 0 && slot < this.inventoryItemsCount) {
                        let sendUpdate = false;
                        let l1 = 0;
                        let item = this.inventoryItemId[slot];

                        for (let k3 = 0; k3 < this.duelOfferItemCount; k3++) {
                            if (this.duelOfferItemId[k3] === item) {
                                if (GameData.itemStackable[item] === 0) {
                                    for (let i4 = 0; i4 < this.mouseButtonItemCountIncrement; i4++) {
                                        if (this.duelOfferItemStack[k3] < this.inventoryItemStackCount[slot]) {
                                            this.duelOfferItemStack[k3]++;
                                        }

                                        sendUpdate = true;
                                    }
                                } else {
                                    l1++;
                                }
                            }
                        }

                        if (this.getInventoryCount(item) <= l1) {
                            sendUpdate = true;
                        }

                        if (GameData.itemSpecial[item] === 1) {
                            this.showMessage('This object cannot be added to a duel offer', 3);
                            sendUpdate = true;
                        }

                        if (!sendUpdate && this.duelOfferItemCount < 8) {
                            this.duelOfferItemId[this.duelOfferItemCount] = item;
                            this.duelOfferItemStack[this.duelOfferItemCount] = 1;
                            this.duelOfferItemCount++;
                            sendUpdate = true;
                        }

                        if (sendUpdate) {
                            this.clientStream.newPacket(C_OPCODES.DUEL_ITEM_UPDATE);
                            this.clientStream.putByte(this.duelOfferItemCount);

                            for (let j4 = 0; j4 < this.duelOfferItemCount; j4++) {
                                this.clientStream.putShort(this.duelOfferItemId[j4]);
                                this.clientStream.putInt(this.duelOfferItemStack[j4]);
                            }

                            this.clientStream.sendPacket();
                            this.duelOfferOpponentAccepted = false;
                            this.duelOfferAccepted = false;
                        }
                    }
                }

                if (mouseX > 8 && mouseY > 30 && mouseX < 205 && mouseY < 129) {
                    let slot = (((mouseX - 9) / 49) | 0) + (((mouseY - 31) / 34) | 0) * 4;

                    if (slot >= 0 && slot < this.duelOfferItemCount) {
                        let j1 = this.duelOfferItemId[slot];
                        for (let i2 = 0; i2 < this.mouseButtonItemCountIncrement; i2++) {
                            if (GameData.itemStackable[j1] === 0 && this.duelOfferItemStack[slot] > 1) {
                                this.duelOfferItemStack[slot]--;
                                continue;
                            }

                            this.duelOfferItemCount--;
                            this.mouseButtonDownTime = 0;

                            for (let l2 = slot; l2 < this.duelOfferItemCount; l2++) {
                                this.duelOfferItemId[l2] = this.duelOfferItemId[l2 + 1];
                                this.duelOfferItemStack[l2] = this.duelOfferItemStack[l2 + 1];
                            }

                            break;
                        }

                        this.clientStream.newPacket(C_OPCODES.DUEL_ITEM_UPDATE);
                        this.clientStream.putByte(this.duelOfferItemCount);

                        for (let i3 = 0; i3 < this.duelOfferItemCount; i3++) {
                            this.clientStream.putShort(this.duelOfferItemId[i3]);
                            this.clientStream.putInt(this.duelOfferItemStack[i3]);
                        }

                        this.clientStream.sendPacket();
                        this.duelOfferOpponentAccepted = false;
                        this.duelOfferAccepted = false;
                    }
                }

                let flag = false;

                if (mouseX >= 93 && mouseY >= 221 && mouseX <= 104 && mouseY <= 232) {
                    this.duelSettingsRetreat = !this.duelSettingsRetreat;
                    flag = true;
                }

                if (mouseX >= 93 && mouseY >= 240 && mouseX <= 104 && mouseY <= 251) {
                    this.duelSettingsMagic = !this.duelSettingsMagic;
                    flag = true;
                }

                if (mouseX >= 191 && mouseY >= 221 && mouseX <= 202 && mouseY <= 232) {
                    this.duelSettingsPrayer = !this.duelSettingsPrayer;
                    flag = true;
                }

                if (mouseX >= 191 && mouseY >= 240 && mouseX <= 202 && mouseY <= 251) {
                    this.duelSettingsWeapons = !this.duelSettingsWeapons;
                    flag = true;
                }

                if (flag) {
                    this.clientStream.newPacket(C_OPCODES.DUEL_SETTINGS);
                    this.clientStream.putByte(this.duelSettingsRetreat ? 1 : 0);
                    this.clientStream.putByte(this.duelSettingsMagic ? 1 : 0);
                    this.clientStream.putByte(this.duelSettingsPrayer ? 1 : 0);
                    this.clientStream.putByte(this.duelSettingsWeapons ? 1 : 0);
                    this.clientStream.sendPacket();
                    this.duelOfferOpponentAccepted = false;
                    this.duelOfferAccepted = false;
                }

                if (mouseX >= 217 && mouseY >= 238 && mouseX <= 286 && mouseY <= 259) {
                    this.duelOfferAccepted = true;
                    this.clientStream.newPacket(C_OPCODES.DUEL_ACCEPT);
                    this.clientStream.sendPacket();
                }

                if (mouseX >= 394 && mouseY >= 238 && mouseX < 463 && mouseY < 259) {
                    this.showDialogDuel = false;
                    this.clientStream.newPacket(C_OPCODES.DUEL_DECLINE);
                    this.clientStream.sendPacket();
                }
            } else if (this.mouseButtonClick !== 0) {
                this.showDialogDuel = false;
                this.clientStream.newPacket(C_OPCODES.DUEL_DECLINE);
                this.clientStream.sendPacket();
            }

            this.mouseButtonClick = 0;
            this.mouseButtonItemCountIncrement = 0;
        }

        if (!this.showDialogDuel) {
            return;
        }

        //let dialogX = this.gameWidth / 2 - 468 / 2 + 22;
        //let dialogY = this.gameHeight / 2 - 262 / 2 + 22;
        let dialogX = 22;
        let dialogY = 36;

        this.surface.drawBox(dialogX, dialogY, 468, 12, 0xc90b1d);
        this.surface.drawBoxAlpha(dialogX, dialogY + 12, 468, 18, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX, dialogY + 30, 8, 248, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 205, dialogY + 30, 11, 248, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 462, dialogY + 30, 6, 248, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 8, dialogY + 99, 197, 24, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 8, dialogY + 192, 197, 23, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 8, dialogY + 258, 197, 20, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 216, dialogY + 235, 246, 43, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 8, dialogY + 30, 197, 69, 0xd0d0d0, 160);
        this.surface.drawBoxAlpha(dialogX + 8, dialogY + 123, 197, 69, 0xd0d0d0, 160);
        this.surface.drawBoxAlpha(dialogX + 8, dialogY + 215, 197, 43, 0xd0d0d0, 160);
        this.surface.drawBoxAlpha(dialogX + 216, dialogY + 30, 246, 205, 0xd0d0d0, 160);

        for (let j2 = 0; j2 < 3; j2++) {
            this.surface.drawLineHoriz(dialogX + 8, dialogY + 30 + j2 * 34, 197, 0);
        }

        for (let j3 = 0; j3 < 3; j3++) {
            this.surface.drawLineHoriz(dialogX + 8, dialogY + 123 + j3 * 34, 197, 0);
        }

        for (let l3 = 0; l3 < 7; l3++) {
            this.surface.drawLineHoriz(dialogX + 216, dialogY + 30 + l3 * 34, 246, 0);
        }

        for (let k4 = 0; k4 < 6; k4++) {
            if (k4 < 5) {
                this.surface.drawLineVert(dialogX + 8 + k4 * 49, dialogY + 30, 69, 0);
            }

            if (k4 < 5) {
                this.surface.drawLineVert(dialogX + 8 + k4 * 49, dialogY + 123, 69, 0);
            }

            this.surface.drawLineVert(dialogX + 216 + k4 * 49, dialogY + 30, 205, 0);
        }

        this.surface.drawLineHoriz(dialogX + 8, dialogY + 215, 197, 0);
        this.surface.drawLineHoriz(dialogX + 8, dialogY + 257, 197, 0);
        this.surface.drawLineVert(dialogX + 8, dialogY + 215, 43, 0);
        this.surface.drawLineVert(dialogX + 204, dialogY + 215, 43, 0);
        this.surface.drawString('Preparing to duel with: ' + this.duelOpponentName, dialogX + 1, dialogY + 10, 1, 0xffffff);
        this.surface.drawString('Your Stake', dialogX + 9, dialogY + 27, 4, 0xffffff);
        this.surface.drawString('Opponent\'s Stake', dialogX + 9, dialogY + 120, 4, 0xffffff);
        this.surface.drawString('Duel Options', dialogX + 9, dialogY + 212, 4, 0xffffff);
        this.surface.drawString('Your Inventory', dialogX + 216, dialogY + 27, 4, 0xffffff);
        this.surface.drawString('No retreating', dialogX + 8 + 1, dialogY + 215 + 16, 3, 0xffff00);
        this.surface.drawString('No magic', dialogX + 8 + 1, dialogY + 215 + 35, 3, 0xffff00);
        this.surface.drawString('No prayer', dialogX + 8 + 102, dialogY + 215 + 16, 3, 0xffff00);
        this.surface.drawString('No weapons', dialogX + 8 + 102, dialogY + 215 + 35, 3, 0xffff00);
        this.surface.drawBoxEdge(dialogX + 93, dialogY + 215 + 6, 11, 11, 0xffff00);

        if (this.duelSettingsRetreat) {
            this.surface.drawBox(dialogX + 95, dialogY + 215 + 8, 7, 7, 0xffff00);
        }

        this.surface.drawBoxEdge(dialogX + 93, dialogY + 215 + 25, 11, 11, 0xffff00);

        if (this.duelSettingsMagic) {
            this.surface.drawBox(dialogX + 95, dialogY + 215 + 27, 7, 7, 0xffff00);
        }

        this.surface.drawBoxEdge(dialogX + 191, dialogY + 215 + 6, 11, 11, 0xffff00);

        if (this.duelSettingsPrayer) {
            this.surface.drawBox(dialogX + 193, dialogY + 215 + 8, 7, 7, 0xffff00);
        }

        this.surface.drawBoxEdge(dialogX + 191, dialogY + 215 + 25, 11, 11, 0xffff00);

        if (this.duelSettingsWeapons) {
            this.surface.drawBox(dialogX + 193, dialogY + 215 + 27, 7, 7, 0xffff00);
        }

        if (!this.duelOfferAccepted) {
            this.surface._drawSprite_from3(dialogX + 217, dialogY + 238, this.spriteMedia + 25);
        }

        this.surface._drawSprite_from3(dialogX + 394, dialogY + 238, this.spriteMedia + 26);

        if (this.duelOfferOpponentAccepted) {
            this.surface.drawStringCenter('Other player', dialogX + 341, dialogY + 246, 1, 0xffffff);
            this.surface.drawStringCenter('has accepted', dialogX + 341, dialogY + 256, 1, 0xffffff);
        }

        if (this.duelOfferAccepted) {
            this.surface.drawStringCenter('Waiting for', dialogX + 217 + 35, dialogY + 246, 1, 0xffffff);
            this.surface.drawStringCenter('other player', dialogX + 217 + 35, dialogY + 256, 1, 0xffffff);
        }

        for (let i = 0; i < inventoryItemsCount; i++) {
            let x = 217 + dialogX + (i % 5) * 49;
            let y = 31 + dialogY + ((i / 5) | 0) * 34;
            this.surface._spriteClipping_from9(x, y, 48, 32, this.spriteItem + GameData.itemPicture[this.inventoryItemId[i]], GameData.itemMask[this.inventoryItemId[i]], 0, 0, false);

            if (GameData.itemStackable[inventoryItemId[i]] === 0) {
                this.surface.drawString(inventoryItemStackCount[i].toString(), x + 1, y + 10, 1, 0xffff00);
            }
        }

        for (let i = 0; i < this.duelOfferItemCount; i++) {
            let x = 9 + dialogX + (i % 4) * 49;
            let y = 31 + dialogY + ((i / 4) | 0) * 34;

            this.surface._spriteClipping_from9(x, y, 48, 32, this.spriteItem + GameData.itemPicture[this.duelOfferItemId[i]], GameData.itemMask[this.duelOfferItemId[i]], 0, 0, false);

            if (GameData.itemStackable[this.duelOfferItemId[i]] === 0) {
                this.surface.drawString(String.valueOf(this.duelOfferItemStack[i]), x + 1, y + 10, 1, 0xffff00);
            }

            if (this.mouseX > x && this.mouseX < x + 48 && this.mouseY > y && this.mouseY < y + 32) {
                this.surface.drawString(GameData.itemName[this.duelOfferItemId[i]] + ': @whi@' + GameData.itemDescription[this.duelOfferItemId[i]], dialogX + 8, dialogY + 273, 1, 0xffff00);
            }
        }

        for (let i = 0; i < this.duelOfferOpponentItemCount; i++) {
            let x = 9 + dialogX + (i % 4) * 49;
            let y = 124 + dialogY + ((i / 4) | 0) * 34;

            this.surface._spriteClipping_from9(x, y, 48, 32, this.spriteItem + GameData.itemPicture[this.duelOfferOpponentItemId[i]], GameData.itemMask[this.duelOfferOpponentItemId[i]], 0, 0, false);

            if (GameData.itemStackable[this.duelOfferOpponentItemId[i]] === 0) {
                this.surface.drawString(this.duelOfferOpponentItemStack[i].toString(), x + 1, y + 10, 1, 0xffff00);
            }

            if (this.mouseX > x && this.mouseX < x + 48 && this.mouseY > y && this.mouseY < y + 32) {
                this.surface.drawString(GameData.itemName[this.duelOfferOpponentItemId[i]] + ': @whi@' + GameData.itemDescription[this.duelOfferOpponentItemId[i]], dialogX + 8, dialogY + 273, 1, 0xffff00);
            }
        }
    }

    loadNextRegion(lx, ly) {
        if (this.deathScreenTimeout !== 0) {
            this.world.playerAlive = false;
            return false;
        }

        this.loadingArea = false;
        lx += this.planeWidth;
        ly += this.planeHeight;

        if (lastHeightOffset === this.planeIndex && lx > localLowerX && lx < localUpperX && ly > localLowerY && ly < localUpperY) {
            this.world.playerAlive = true;
            return false;
        }

        this.surface.drawStringCenter('Loading... Please wait', 256, 192, 1, 0xffffff);
        this.drawChatMessageTabs();
        this.surface.draw(this.graphics, 0, 0);

        let ax = regionX;
        let ay = regionY;
        let sectionX = ((lx + 24) / 48) | 0;
        let sectionY = ((ly + 24) / 48) | 0;

        this.lastHeightOffset = this.planeIndex;
        this.regionX = sectionX * 48 - 48;
        this.regionY = sectionY * 48 - 48;
        this.localLowerX = sectionX * 48 - 32;
        this.localLowerY = sectionY * 48 - 32;
        this.localUpperX = sectionX * 48 + 32;
        this.localUpperY = sectionY * 48 + 32;

        this.world.loadSection(lx, ly, this.lastHeightOffset);

        regionX -= this.planeWidth;
        regionY -= this.planeHeight;

        let offsetX = regionX - ax;
        let offsetY = regionY - ay;

        for (let objIdx = 0; objIdx < this.objectCount; objIdx++) {
            this.objectX[objIdx] -= offsetX;
            this.objectY[objIdx] -= offsetY;

            let objx = this.objectX[objIdx];
            let objy = this.objectY[objIdx];
            let objid = this.objectId[objIdx];

            let gameModel = this.objectModel[objIdx];

            try {
                let objType = objectDirection[objIdx];
                let objW = 0;
                let objH = 0;

                if (objType === 0 || objType === 4) {
                    objW = GameData.objectWidth[objid];
                    objH = GameData.objectHeight[objid];
                } else {
                    objH = GameData.objectWidth[objid];
                    objW = GameData.objectHeight[objid];
                }

                let j6 = (((objx + objx + objW) * this.magicLoc) / 2) | 0;
                let k6 = (((objy + objy + objH) * this.magicLoc) / 2) | 0;

                if (objx >= 0 && objy >= 0 && objx < 96 && objy < 96) {
                    this.scene.addModel(gameModel);
                    gameModel.place(j6, -this.world.getElevation(j6, k6), k6);
                    this.world.removeObject2(objx, objy, objid);

                    if (objid === 74) {
                        gameModel.translate(0, -480, 0);
                    }
                }
            } catch (e) {
                console.log('Loc Error: ' + e.message);
                console.error(e);
            }
        }

        for (let k2 = 0; k2 < this.wallObjectCount; k2++) {
            this.wallObjectX[k2] -= offsetX;
            this.wallObjectY[k2] -= offsetY;
            let i3 = this.wallObjectX[k2];
            let l3 = this.wallObjectY[k2];
            let j4 = this.wallObjectId[k2];
            let i5 = this.wallObjectDirection[k2];

            try {
                this.world.setObjectAdjacency(i3, l3, i5, j4);
                let gameModel_1 = createModel(i3, l3, i5, j4, k2);
                this.wallObjectModel[k2] = gameModel_1;
            } catch (e) {
                console.log('Bound Error: ' + e.message);
                console.error(e);
            }
        }

        for (let j3 = 0; j3 < this.groundItemCount; j3++) {
            this.groundItemX[j3] -= offsetX;
            this.groundItemY[j3] -= offsetY;
        }

        for (let i4 = 0; i4 < this.playerCount; i4++) {
            let character = this.players[i4];
            character.currentX -= offsetX * this.magicLoc;
            character.currentY -= offsetY * this.magicLoc;

            for (let j5 = 0; j5 <= character.waypointCurrent; j5++) {
                character.waypointsX[j5] -= offsetX * this.magicLoc;
                character.waypointsY[j5] -= offsetY * this.magicLoc;
            }

        }

        for (let k4 = 0; k4 < this.npcCount; k4++) {
            let character_1 = this.npcs[k4];
            character_1.currentX -= offsetX * this.magicLoc;
            character_1.currentY -= offsetY * this.magicLoc;

            for (let l5 = 0; l5 <= character_1.waypointCurrent; l5++) {
                character_1.waypointsX[l5] -= offsetX * this.magicLoc;
                character_1.waypointsY[l5] -= offsetY * this.magicLoc;
            }
        }

        this.world.playerAlive = true;

        return true;
    }

    drawPlayer(x, y, w, h, id, tx, ty) {
        let character = this.players[id];

        // this means the character is invisible! MOD!!!
        if (character.colourBottom === 255)  {
            return;
        }

        let l1 = character.animationCurrent + (this.cameraRotation + 16) / 32 & 7;
        let flag = false;
        let i2 = l1;

        if (i2 === 5) {
            i2 = 3;
            flag = true;
        } else if (i2 === 6) {
            i2 = 2;
            flag = true;
        } else if (i2 === 7) {
            i2 = 1;
            flag = true;
        }

        let j2 = i2 * 3 + this.npcWalkModel[((character.stepCount / 6) | 0) % 4];

        if (character.animationCurrent === 8) {
            i2 = 5;
            l1 = 2;
            flag = false;
            x -= ((5 * ty) / 100) | 0;
            j2 = i2 * 3 + this.npcCombatModelArray1[((this.loginTimer / 5) | 0) % 8];
        } else if (character.animationCurrent === 9) {
            i2 = 5;
            l1 = 2;
            flag = true;
            x += ((5 * ty) / 100) | 0;
            j2 = i2 * 3 + this.npcCombatModelArray2[((this.loginTimer / 6) | 0) % 8];
        }

        for (let k2 = 0; k2 < 12; k2++) {
            let l2 = this.npcAnimationArray[l1][k2];
            let l3 = character.equippedItem[l2] - 1;

            if (l3 >= 0) {
                let k4 = 0;
                let i5 = 0;
                let j5 = j2;

                if (flag && i2 >= 1 && i2 <= 3) {
                    if (GameData.animationHasF[l3] === 1) {
                        j5 += 15;
                    } else if (l2 === 4 && i2 === 1) {
                        k4 = -22;
                        i5 = -3;
                        j5 = i2 * 3 + this.npcWalkModel[(2 + ((character.stepCount / 6) | 0)) % 4];
                    } else if (l2 === 4 && i2 === 2) {
                        k4 = 0;
                        i5 = -8;
                        j5 = i2 * 3 + this.npcWalkModel[(2 + ((character.stepCount / 6) | 0)) % 4];
                    } else if (l2 === 4 && i2 === 3) {
                        k4 = 26;
                        i5 = -5;
                        j5 = i2 * 3 + this.npcWalkModel[(2 + ((character.stepCount / 6) | 0)) % 4];
                    } else if (l2 === 3 && i2 === 1) {
                        k4 = 22;
                        i5 = 3;
                        j5 = i2 * 3 + this.npcWalkModel[(2 + ((character.stepCount / 6) | 0)) % 4];
                    } else if (l2 === 3 && i2 === 2) {
                        k4 = 0;
                        i5 = 8;
                        j5 = i2 * 3 + this.npcWalkModel[(2 + ((character.stepCount / 6) | 0)) % 4];
                    } else if (l2 === 3 && i2 === 3) {
                        k4 = -26;
                        i5 = 5;
                        j5 = i2 * 3 + this.npcWalkModel[(2 + ((character.stepCount / 6) | 0)) % 4];
                    }
                }

                if (i2 !== 5 || GameData.animationHasA[l3] === 1) {
                    let k5 = j5 + GameData.animationNumber[l3];

                    k4 = ((k4 * w) / this.surface.spriteWidthFull[k5]) | 0;
                    i5 = ((i5 * h) / this.surface.spriteHeightFull[k5]) | 0;

                    let l5 = ((w * this.surface.spriteWidthFull[k5]) / this.surface.spriteWidthFull[GameData.animationNumber[l3]]) | 0;

                    k4 -= ((l5 - w) / 2) | 0;

                    let i6 = GameData.animationCharacterColour[l3];
                    let j6 = this.characterSkinColours[character.colourSkin];

                    if (i6 === 1) {
                        i6 = this.characterHairColours[character.colourHair];
                    } else if (i6 === 2) {
                        i6 = this.characterTopBottomColours[character.colourTop];
                    } else if (i6 === 3) {
                        i6 = this.characterTopBottomColours[character.colourBottom];
                    }

                    this.surface._spriteClipping_from9(x + k4, y + i5, l5, h, k5, i6, j6, tx, flag);
                }
            }
        }

        if (character.messageTimeout > 0) {
            this.receivedMessageMidPoint[this.receivedMessagesCount] = (this.surface.textWidth(character.message, 1) / 2) | 0;

            if (this.receivedMessageMidPoint[this.receivedMessagesCount] > 150) {
                this.receivedMessageMidPoint[this.receivedMessagesCount] = 150;
            }

            this.receivedMessageHeight[this.receivedMessagesCount] = ((this.surface.textWidth(character.message, 1) / 300) | 0) * this.surface.textHeight(1);
            this.receivedMessageX[this.receivedMessagesCount] = x + ((w / 2) | 0);
            this.receivedMessageY[this.receivedMessagesCount] = y;
            this.receivedMessages[this.receivedMessagesCount++] = character.message;
        }

        if (character.bubbleTimeout > 0) {
            this.actionBubbleX[this.itemsAboveHeadCount] = x + ((w / 2) | 0);
            this.actionBubbleY[this.itemsAboveHeadCount] = y;
            this.actionBubbleScale[this.itemsAboveHeadCount] = ty;
            this.actionBubbleItem[this.itemsAboveHeadCount++] = character.bubbleItem;
        }

        if (character.animationCurrent === 8 || character.animationCurrent === 9 || character.combatTimer !== 0) {
            if (character.combatTimer > 0) {
                let i3 = x;

                if (character.animationCurrent === 8) {
                    i3 -= ((20 * ty) / 100) | 0;
                } else if (character.animationCurrent === 9) {
                    i3 += ((20 * ty) / 100) | 0;
                }

                let i4 = ((character.healthCurrent * 30) / character.healthMax) | 0;

                this.healthBarX[this.healthBarCount] = i3 + ((w / 2) | 0);
                this.healthBarY[this.healthBarCount] = y;
                this.healthBarMissing[this.healthBarCount++] = i4;
            }

            if (character.combatTimer > 150) {
                let j3 = x;

                if (character.animationCurrent === 8) {
                    j3 -= ((10 * ty) / 100) | 0;
                } else if (character.animationCurrent === 9) {
                    j3 += ((10 * ty) / 100) | 0;
                }

                this.surface._drawSprite_from3((j3 + ((w / 2) | 0)) - 12, (y + ((h / 2) | 0)) - 12, this.spriteMedia + 11);
                this.surface.drawStringCenter(character.damageTaken.toString(), (j3 + ((w / 2) | 0)) - 1, y + ((h / 2) | 0) + 5, 3, 0xffffff);
            }
        }

        if (character.skullVisible === 1 && character.bubbleTimeout === 0) {
            let k3 = tx + x + ((w / 2) | 0);

            if (character.animationCurrent === 8) {
                k3 -= ((20 * ty) / 100) | 0;
            } else if (character.animationCurrent === 9) {
                k3 += ((20 * ty) / 100) | 0;
            }

            let j4 = ((16 * ty) / 100) | 0;
            let l4 = ((16 * ty) / 100) | 0;

            this.surface._spriteClipping_from9(k3 - ((j4 / 2) | 0), y - ((l4 / 2) | 0) - (((10 * ty) / 100) | 0), j4, l4, this.spriteMedia + 13);
        }
    }

    async loadMedia() {
        let media = await readDataFile('media' + VERSION.MEDIA + '.jag', '2d graphics', 20);

        if (media === null) {
            this.errorLoadingData = true;
            return;
        }

        let buff = Utility.loadData('index.dat', 0, media);

        this.surface.parseSprite(this.spriteMedia, Utility.loadData('inv1.dat', 0, media), buff, 1);
        this.surface.parseSprite(this.spriteMedia + 1, Utility.loadData('inv2.dat', 0, media), buff, 6);
        this.surface.parseSprite(this.spriteMedia + 9, Utility.loadData('bubble.dat', 0, media), buff, 1);
        this.surface.parseSprite(this.spriteMedia + 10, Utility.loadData('runescape.dat', 0, media), buff, 1);
        this.surface.parseSprite(this.spriteMedia + 11, Utility.loadData('splat.dat', 0, media), buff, 3);
        this.surface.parseSprite(this.spriteMedia + 14, Utility.loadData('icon.dat', 0, media), buff, 8);
        this.surface.parseSprite(this.spriteMedia + 22, Utility.loadData('hbar.dat', 0, media), buff, 1);
        this.surface.parseSprite(this.spriteMedia + 23, Utility.loadData('hbar2.dat', 0, media), buff, 1);
        this.surface.parseSprite(this.spriteMedia + 24, Utility.loadData('compass.dat', 0, media), buff, 1);
        this.surface.parseSprite(this.spriteMedia + 25, Utility.loadData('buttons.dat', 0, media), buff, 2);
        this.surface.parseSprite(this.spriteUtil, Utility.loadData('scrollbar.dat', 0, media), buff, 2);
        this.surface.parseSprite(this.spriteUtil + 2, Utility.loadData('corners.dat', 0, media), buff, 4);
        this.surface.parseSprite(this.spriteUtil + 6, Utility.loadData('arrows.dat', 0, media), buff, 2);
        this.surface.parseSprite(this.spriteProjectile, Utility.loadData('projectile.dat', 0, media), buff, GameData.projectileSprite);

        let i = GameData.itemSpriteCount;

        for (let j = 1; i > 0; j++) {
            let k = i;
            i -= 30;

            if (k > 30) {
                k = 30;
            }

            this.surface.parseSprite(this.spriteItem + (j - 1) * 30, Utility.loadData('objects' + j + '.dat', 0, media), buff, k);
        }

        this.surface.loadSprite(this.spriteMedia);
        this.surface.loadSprite(this.spriteMedia + 9);

        for (let l = 11; l <= 26; l++) {
            this.surface.loadSprite(this.spriteMedia + l);
        }

        for (let i1 = 0; i1 < GameData.projectileSprite; i1++) {
            this.surface.loadSprite(this.spriteProjectile + i1);
        }

        for (let j1 = 0; j1 < GameData.itemSpriteCount; j1++) {
            this.surface.loadSprite(this.spriteItem + j1);
        }
    }

    drawChatMessageTabs() {
        this.surface.drawSprite(0, this.gameHeight - 4, this.spriteMedia + 23);

        let col = Surface.rgbToLong(200, 200, 255);

        if (this.messageTabSelected === 0) {
            col = Surface.rgbToLong(255, 200, 50);
        }

        if (this.messageTabFlashAll % 30 > 15) {
            col = Surface.rgbToLong(255, 50, 50);
        }

        this.surface.drawStringCenter('All messages', 54, this.gameHeight + 6, 0, col);
        col = Surface.rgbToLong(200, 200, 255);

        if (this.messageTabSelected === 1) {
            col = Surface.rgbToLong(255, 200, 50);
        }

        if (this.messageTabFlashHistory % 30 > 15) {
            col = Surface.rgbToLong(255, 50, 50);
        }

        this.surface.drawStringCenter('Chat history', 155, this.gameHeight + 6, 0, col);
        col = Surface.rgbToLong(200, 200, 255);

        if (this.messageTabSelected === 2) {
            col = Surface.rgbToLong(255, 200, 50);
        }

        if (this.messtageTabFlashQuest % 30 > 15) {
            col = Surface.rgbToLong(255, 50, 50);
        }

        this.surface.drawStringCenter('Quest history', 255, this.gameHeight + 6, 0, col);
        col = Surface.rgbToLong(200, 200, 255);

        if (this.messageTabSelected === 3) {
            col = Surface.rgbToLong(255, 200, 50);
        }

        if (this.messageTabFlashPrivate % 30 > 15) {
            col = Surface.rgbToLong(255, 50, 50);
        }

        this.surface.drawStringCenter('Private history', 355, this.gameHeight + 6, 0, col);
        this.surface.drawStringCenter('Report abuse', 457, this.gameHeight + 6, 0, 0xffffff);
    }

    async startGame() {
        let totalExp = 0;

        for (let level = 0; level < 99; level++) {
            let level_1 = level + 1;
            let exp = (level_1 + 300 * Math.pow(2, level_1 / 7)) | 0;
            totalExp += exp;
            this.experienceArray[level] = totalExp & 0xffffffc;
        }

        this.port = 43594;
        this.maxReadTries = 1000;
        this.clientVersion = VERSIONS.CLIENT;

        await this.loadGameConfig();

        if (this.errorLoadingData) {
            return;
        }

        this.spriteMedia = 2000;
        this.spriteUtil = spriteMedia + 100;
        this.spriteItem = spriteUtil + 50;
        this.spriteLogo = spriteItem + 1000;
        this.spriteProjectile = spriteLogo + 10;
        this.spriteTexture = spriteProjectile + 50;
        this.spriteTextureWorld = spriteTexture + 10;

        this.graphics = this.getGraphics();

        this.setTargetFps(50);

        this.surface = new SurfaceSprite(this.gameWidth, this.gameHeight + 12, 4000, this);
        this.surface.mudclientref = this;
        this.surface.setBounds(0, 0, this.gameWidth, this.gameHeight + 12);

        Panel.drawBackgroundArrow = false;
        Panel.baseSpriteStart = this.spriteUtil;

        this.panelMagic = new Panel(this.surface, 5);

        let x = this.surface.width2 - 199;
        let y = 36;

        this.controlListMagic = this.panelMagic.addTextListInteractive(x, y + 24, 196, 90, 1, 500, true);
        this.panelSocialList = new Panel(this.surface, 5);
        this.controlListSocialPlayers = this.panelSocialList.addTextListInteractive(x, y + 40, 196, 126, 1, 500, true);
        this.panelQuestList = new Panel(this.surface, 5);
        this.controlListQuest = this.panelQuestList.addTextListInteractive(x, y + 24, 196, 251, 1, 500, true);

        await this.loadMedia();

        if (this.errorLoadingData) {
            return;
        }

        await this.loadEntities();

        if (this.errorLoadingData) {
            return;
        }

        this.scene = new Scene(this.surface, 15000, 15000, 1000);
        this.scene.setBounds((this.gameWidth / 2) | 0, (this.gameHeight / 2) | 0, (this.gameWidth / 2) | 0, (this.gameHeight / 2) | 0, this.gameWidth, this.const_9);
        this.scene.clipFar3d = 2400;
        this.scene.clipFar2d = 2400;
        this.scene.fogZFalloff = 1;
        this.scene.fogZDistance = 2300;
        this.scene.setLight(-50, -10, -50);
        this.world = new World(this.scene, this.surface);
        this.world.baseMediaSprite = this.spriteMedia;

        await loadTextures();

        if (this.errorLoadingData) {
            return;
        }

        await loadModels();

        if (this.errorLoadingData) {
            return;
        }

        await loadMaps();

        if (this.errorLoadingData) {
            return;
        }

        if (this.members) {
            loadSounds();
        }

        if (!this.errorLoadingData) {
            this.showLoadingProgress(100, 'Starting game...');
            this.createMessageTabPanel();
            this.createLoginPanels();
            this.createAppearancePanel();
            this.resetLoginScreenVariables();
            this.renderLoginScreenViewports();
        }
    }

    drawUiTabMagic(nomenus) {
        let uiX = this.surface.width2 - 199;
        let uiY = 36;
        this.surface._drawSprite_from3(uiX - 49, 3, this.spriteMedia + 4);
        let uiWidth = 196;
        let uiHeight = 182;
        let l = 0 ;
        let k = l = Surface.rgbToLong(160, 160, 160);

        if (this.tabMagicPrayer === 0) {
            k = Surface.rgbToLong(220, 220, 220);
        } else {
            l = Surface.rgbToLong(220, 220, 220);
        }

        this.surface.drawBoxAlpha(uiX, uiY, (uiWidth / 2) | 0, 24, k, 128);
        this.surface.drawBoxAlpha(uiX + ((uiWidth / 2) | 0), uiY, (uiWidth / 2) | 0, 24, l, 128);
        this.surface.drawBoxAlpha(uiX, uiY + 24, uiWidth, 90, Surface.rgbToLong(220, 220, 220), 128);
        this.surface.drawBoxAlpha(uiX, uiY + 24 + 90, uiWidth, uiHeight - 90 - 24, Surface.rgbToLong(160, 160, 160), 128);
        this.surface.drawLineHoriz(uiX, uiY + 24, uiWidth, 0);
        this.surface.drawLineVert(uiX + ((uiWidth / 2) | 0), uiY, 24, 0);
        this.surface.drawLineHoriz(uiX, uiY + 113, uiWidth, 0);
        this.surface.drawStringCenter('Magic', uiX + ((uiWidth / 4) | 0), uiY + 16, 4, 0);
        this.surface.drawStringCenter('Prayers', uiX + ((uiWidth / 4) | 0) + ((uiWidth / 2) | 0), uiY + 16, 4, 0);

        if (this.tabMagicPrayer === 0) {
            this.panelMagic.clearList(this.controlListMagic);

            let i1 = 0;

            for (let spell = 0; spell < GameData.spellCount; spell++) {
                let s = '@yel@';

                for (let rune = 0; rune < GameData.spellRunesRequired[spell]; rune++) {
                    let k4 = GameData.spellRunesId[spell][rune];

                    if (this.hasInventoryItems(k4, GameData.spellRunesCount[spell][rune])) {
                        continue;
                    }

                    s = '@whi@';
                    break;
                }

                let l4 = this.playerStatCurrent[6];

                if (GameData.spellLevel[spell] > l4) {
                    s = '@bla@';
                }

                this.panelMagic.addListEntry(this.controlListMagic, i1++, s + 'Level ' + GameData.spellLevel[spell] + ': ' + GameData.spellName[spell]);
            }

            this.panelMagic.drawPanel();

            let i3 = panelMagic.getListEntryIndex(this.controlListMagic);

            if (i3 !== -1) {
                this.surface.drawString('Level ' + GameData.spellLevel[i3] + ': ' + GameData.spellName[i3], uiX + 2, uiY + 124, 1, 0xffff00);
                this.surface.drawString(GameData.spellDescription[i3], uiX + 2, uiY + 136, 0, 0xffffff);

                for (let i4 = 0; i4 < GameData.spellRunesRequired[i3]; i4++) {
                    let i5 = GameData.spellRunesId[i3][i4];
                    this.surface._drawSprite_from3(uiX + 2 + i4 * 44, uiY + 150, this.spriteItem + GameData.itemPicture[i5]);
                    let j5 = this.getInventoryCount(i5);
                    let k5 = GameData.spellRunesCount[i3][i4];
                    let s2 = '@red@';

                    if (this.hasInventoryItems(i5, k5)) {
                        s2 = '@gre@';
                    }

                    this.surface.drawString(s2 + j5 + '/' + k5, uiX + 2 + i4 * 44, uiY + 150, 1, 0xffffff);
                }

            } else {
                this.surface.drawString('Point at a spell for a description', uiX + 2, uiY + 124, 1, 0);
            }
        }

        if (this.tabMagicPrayer === 1) {
            this.panelMagic.clearList(controlListMagic);
            let j1 = 0;

            for (let j2 = 0; j2 < GameData.prayerCount; j2++) {
                let s1 = '@whi@';

                if (GameData.prayerLevel[j2] > this.playerStatBase[5]) {
                    s1 = '@bla@';
                }

                if (this.prayerOn[j2]) {
                    s1 = '@gre@';
                }

                this.panelMagic.addListEntry(this.controlListMagic, j1++, s1 + 'Level ' + GameData.prayerLevel[j2] + ': ' + GameData.prayerName[j2]);
            }

            this.panelMagic.drawPanel();

            let j3 = this.panelMagic.getListEntryIndex(this.controlListMagic);

            if (j3 !== -1) {
                this.surface.drawStringCenter('Level ' + GameData.prayerLevel[j3] + ': ' + GameData.prayerName[j3], uiX + ((uiWidth / 2) | 0), uiY + 130, 1, 0xffff00);
                this.surface.drawStringCenter(GameData.prayerDescription[j3], uiX + ((uiWidth / 2) | 0), uiY + 145, 0, 0xffffff);
                this.surface.drawStringCenter('Drain rate: ' + GameData.prayerDrain[j3], uiX + ((uiWidth / 2) | 0), uiY + 160, 1, 0);
            } else {
                this.surface.drawString('Point at a prayer for a description', uiX + 2, uiY + 124, 1, 0);
            }
        }

        if (!nomenus) {
            return;
        }

        let mouseX = this.mouseX - (this.surface.width2 - 199);
        let mouseY = this.mouseY - 36;

        if (mouseX >= 0 && mouseY >= 0 && mouseX < 196 && mouseY < 182) {
            this.panelMagic.handleMouse(mouseX + (this.surface.width2 - 199), mouseY + 36, this.lastMouseButtonDown, this.mouseButtonDown);

            if (mouseY <= 24 && this.mouseButtonClick === 1) {
                if (mouseX < 98 && this.tabMagicPrayer === 1) {
                    this.tabMagicPrayer = 0;
                    this.panelMagic.resetListProps(this.controlListMagic);
                } else if (mouseX > 98 && tabMagicPrayer === 0) {
                    this.tabMagicPrayer = 1;
                    this.panelMagic.resetListProps(this.controlListMagic);
                }
            }

            if (this.mouseButtonClick === 1 && tabMagicPrayer === 0) {
                let idx = panelMagic.getListEntryIndex(controlListMagic);

                if (idx !== -1) {
                    let k2 = this.playerStatCurrent[6];

                    if (GameData.spellLevel[idx] > k2) {
                        this.showMessage('Your magic ability is not high enough for this spell', 3);
                    } else {
                        let k3 = 0;

                        for (k3 = 0; k3 < GameData.spellRunesRequired[idx]; k3++) {
                            let j4 = GameData.spellRunesId[idx][k3];

                            if (this.hasInventoryItems(j4, GameData.spellRunesCount[idx][k3])) {
                                continue;
                            }

                            this.showMessage('You don\'t have all the reagents you need for this spell', 3);
                            k3 = -1;
                            break;
                        }

                        if (k3 === GameData.spellRunesRequired[idx]) {
                            this.selectedSpell = idx;
                            this.selectedItemInventoryIndex = -1;
                        }
                    }
                }
            }

            if (this.mouseButtonClick === 1 && this.tabMagicPrayer === 1) {
                let l1 = this.panelMagic.getListEntryIndex(controlListMagic);

                if (l1 !== -1) {
                    let l2 = this.playerStatBase[5];

                    if (GameData.prayerLevel[l1] > l2) {
                        this.showMessage('Your prayer ability is not high enough for this prayer', 3);
                    } else if (this.playerStatCurrent[5] === 0) {
                        this.showMessage('You have run out of prayer points. Return to a church to recharge', 3);
                    } else if (this.prayerOn[l1]) {
                        this.clientStream.newPacket(C_OPCODES.PRAYER_OFF);
                        this.clientStream.putByte(l1);
                        this.clientStream.sendPacket();
                        this.prayerOn[l1] = false;
                        this.playSoundFile('prayeroff');
                    } else {
                        this.clientStream.newPacket(C_OPCODES.PRAYER_ON);
                        this.clientStream.putByte(l1);
                        this.clientStream.sendPacket();
                        this.prayerOn[l1] = true;
                        this.playSoundFile('prayeron');
                    }
                }
            }

            this.mouseButtonClick = 0;
        }
    }

    drawDialogShop() {
        if (this.mouseButtonClick !== 0) {
            this.mouseButtonClick = 0;

            let mouseX = this.mouseX - 52;
            let mouseY = this.mouseY - 44;

            if (mouseX >= 0 && mouseY >= 12 && mouseX < 408 && mouseY < 246) {
                let itemIndex = 0;

                for (let row = 0; row < 5; row++) {
                    for (let col = 0; col < 8; col++) {
                        let slotX = 7 + col * 49;
                        let slotY = 28 + row * 34;

                        if (mouseX > slotX && mouseX < slotX + 49 && mouseY > slotY && mouseY < slotY + 34 && this.shopItem[itemIndex] !== -1) {
                            this.shopSelectedItemIndex = itemIndex;
                            this.shopSelectedItemType = this.shopItem[itemIndex];
                        }

                        itemIndex++;
                    }

                }

                if (this.shopSelectedItemIndex >= 0) {
                    let itemType = this.shopItem[this.shopSelectedItemIndex];

                    if (itemType !== -1) {
                        if (this.shopItemCount[this.shopSelectedItemIndex] > 0 && mouseX > 298 && mouseY >= 204 && mouseX < 408 && mouseY <= 215) {
                            let priceMod = this.shopBuyPriceMod + this.shopItemPrice[this.shopSelectedItemIndex];

                            if (priceMod < 10) {
                                priceMod = 10;
                            }

                            let itemPrice = ((priceMod * GameData.itemBasePrice[itemType]) / 100) | 0;

                            this.clientStream.newPacket(C_OPCODES.SHOP_BUY);
                            this.clientStream.putShort(this.shopItem[this.shopSelectedItemIndex]);
                            this.clientStream.putInt(itemPrice);
                            this.clientStream.sendPacket();
                        }

                        if (this.getInventoryCount(itemType) > 0 && mouseX > 2 && mouseY >= 229 && mouseX < 112 && mouseY <= 240) {
                            let priceMod = this.shopSellPriceMod + this.shopItemPrice[this.shopSelectedItemIndex];

                            if (priceMod < 10) {
                                priceMod = 10;
                            }

                            let itemPrice = ((priceMod * GameData.itemBasePrice[itemType]) / 100) | 0;

                            this.clientStream.newPacket(C_OPCODES.SHOP_SELL);
                            this.clientStream.putShort(this.shopItem[this.shopSelectedItemIndex]);
                            this.clientStream.putInt(itemPrice);
                            this.clientStream.sendPacket();
                        }
                    }
                }
            } else {
                this.clientStream.newPacket(C_OPCODES.SHOP_CLOSE);
                this.clientStream.sendPacket();
                this.showDialogShop = false;
                return;
            }
        }

        let dialogX = 52;
        let dialogY = 44;

        this.surface.drawBox(dialogX, dialogY, 408, 12, 192);
        this.surface.drawBoxAlpha(dialogX, dialogY + 12, 408, 17, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX, dialogY + 29, 8, 170, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX + 399, dialogY + 29, 9, 170, 0x989898, 160);
        this.surface.drawBoxAlpha(dialogX, dialogY + 199, 408, 47, 0x989898, 160);
        this.surface.drawString('Buying and selling items', dialogX + 1, dialogY + 10, 1, 0xffffff);
        let colour = 0xffffff;

        if (this.mouseX > dialogX + 320 && this.mouseY >= dialogY && this.mouseX < dialogX + 408 && this.mouseY < dialogY + 12) {
            colour = 0xff0000;
        }

        this.surface.drawStringRight('Close window', dialogX + 406, dialogY + 10, 1, colour);
        this.surface.drawString('Shops stock in green', dialogX + 2, dialogY + 24, 1, 65280);
        this.surface.drawString('Number you own in blue', dialogX + 135, dialogY + 24, 1, 65535);
        this.surface.drawString('Your money: ' + getInventoryCount(10) + 'gp', dialogX + 280, dialogY + 24, 1, 0xffff00);
        let itemIndex = 0;

        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 8; col++) {
                let slotX = dialogX + 7 + col * 49;
                let slotY = dialogY + 28 + row * 34;

                if (this.shopSelectedItemIndex === itemIndex) {
                    this.surface.drawBoxAlpha(slotX, slotY, 49, 34, 0xff0000, 160);
                } else {
                    this.surface.drawBoxAlpha(slotX, slotY, 49, 34, 0xd0d0d0, 160);
                }

                this.surface.drawBoxEdge(slotX, slotY, 50, 35, 0);

                if (this.shopItem[itemIndex] !== -1) {
                    this.surface.spriteClipping(slotX, slotY, 48, 32, this.spriteItem + GameData.itemPicture[this.shopItem[itemIndex]], GameData.itemMask[this.shopItem[itemIndex]], 0, 0, false);
                    this.surface.drawString(this.shopItemCount[itemIndex].toString(), slotX + 1, slotY + 10, 1, 65280);
                    this.surface.drawStringRight(this.getInventoryCount(this.shopItem[itemIndex]).toString(), slotX + 47, slotY + 10, 1, 65535);
                }

                itemIndex++;
            }

        }

        this.surface.drawLineHoriz(dialogX + 5, dialogY + 222, 398, 0);

        if (this.shopSelectedItemIndex === -1) {
            this.surface.drawStringCenter('Select an object to buy or sell', dialogX + 204, dialogY + 214, 3, 0xffff00);
            return;
        }

        let selectedItemType = this.shopItem[this.shopSelectedItemIndex];

        if (selectedItemType !== -1) {
            if (this.shopItemCount[this.shopSelectedItemIndex] > 0) {
                let priceMod = shopBuyPriceMod + shopItemPrice[shopSelectedItemIndex];

                if (priceMod < 10) {
                    priceMod = 10;
                }

                let itemPrice = ((priceMod * GameData.itemBasePrice[selectedItemType]) / 100) | 0;
                this.surface.drawString('Buy a new ' + GameData.itemName[selectedItemType] + ' for ' + itemPrice + 'gp', dialogX + 2, dialogY + 214, 1, 0xffff00);

                colour = 0xffffff;
                if (this.mouseX > dialogX + 298 && this.mouseY >= dialogY + 204 && this.mouseX < dialogX + 408 && this.mouseY <= dialogY + 215) {
                    colour = 0xff0000;
                }

                this.surface.drawStringRight('Click here to buy', dialogX + 405, dialogY + 214, 3, colour);
            } else {
                this.surface.drawStringCenter('This item is not currently available to buy', dialogX + 204, dialogY + 214, 3, 0xffff00);
            }

            if (this.getInventoryCount(selectedItemType) > 0) {
                let priceMod = this.shopSellPriceMod + this.shopItemPrice[this.shopSelectedItemIndex];

                if (priceMod < 10) {
                    priceMod = 10;
                }

                let itemPrice = ((priceMod * GameData.itemBasePrice[selectedItemType]) / 100) | 0;

                this.surface.drawStringRight('Sell your ' + GameData.itemName[selectedItemType] + ' for ' + itemPrice + 'gp', dialogX + 405, dialogY + 239, 1, 0xffff00);

                colour = 0xffffff;

                if (this.mouseX > dialogX + 2 && this.mouseY >= dialogY + 229 && this.mouseX < dialogX + 112 && this.mouseY <= dialogY + 240) {
                    colour = 0xff0000;
                }

                this.surface.drawString('Click here to sell', dialogX + 2, dialogY + 239, 3, colour);
                return;
            }

            this.surface.drawStringCenter('You do not have any of this item to sell', dialogX + 204, dialogY + 239, 3, 0xffff00);
        }
    }

    hasInventoryItems(id, mincount) {
        if (id === 31 && (this.isItemEquipped(197) || this.isItemEquipped(615) || this.isItemEquipped(682))) {
            return true;
        }

        if (id === 32 && (this.isItemEquipped(102) || this.isItemEquipped(616) || this.isItemEquipped(683))) {
            return true;
        }

        if (id === 33 && (this.isItemEquipped(101) || this.isItemEquipped(617) || this.isItemEquipped(684))) {
            return true;
        }

        if (id === 34 && (this.isItemEquipped(103) || this.isItemEquipped(618) || this.isItemEquipped(685))) {
            return true;
        }

        return this.getInventoryCount(id) >= mincount;
    }

    getHostnameIP(i) {
        return Utility.ipToString(i);
    }

    cantLogout() {
        this.logoutTimeout = 0;
        this.showMessage('@cya@Sorry, you can\'t logout at the moment', 3);
    }

    drawGame() {
        if (this.deathScreenTimeout !== 0) {
            this.surface.fadeToBlack();
            this.surface.drawStringCenter('Oh dear! You are dead...', (this.gameWidth / 2) | 0, (this.gameHeight / 2) | 0, 7, 0xff0000);
            this.drawChatMessageTabs();
            this.surface.draw(this.graphics, 0, 0);

            return;
        }

        if (this.showAppearanceChange) {
            this.drawAppearancePanelCharacterSprites();
            return;
        }

        if (this.isSleeping) {
            this.surface.fadeToBlack();

            if (Math.random() < 0.14999999999999999) {
                this.surface.drawStringCenter('ZZZ', (Math.random() * 80) | 0, (Math.random() * 334) | 0, 5, (Math.random() * 16777215) | 0);
            }

            if (Math.random() < 0.14999999999999999) {
                this.surface.drawStringCenter('ZZZ', 512 - ((Math.random() * 80) | 0), (Math.random() * 334) | 0, 5, (Math.random() * 16777215) | 0);
            }

            this.surface.drawBox(((this.gameWidth / 2) | 0) - 100, 160, 200, 40, 0);
            this.surface.drawStringCenter('You are sleeping', (this.gameWidth / 2) | 0, 50, 7, 0xffff00);
            this.surface.drawStringCenter('Fatigue: ' + (((this.fatigueSleeping * 100) / 750) | 0) + '%', (this.gameWidth / 2) | 0, 90, 7, 0xffff00);
            this.surface.drawStringCenter('When you want to wake up just use your', (this.gameWidth / 2) | 0, 140, 5, 0xffffff);
            this.surface.drawStringCenter('keyboard to type the word in the box below', (this.gameWidth / 2) | 0, 160, 5, 0xffffff);
            this.surface.drawStringCenter(this.inputTextCurrent + '*', (this.gameWidth / 2) | 0, 180, 5, 65535);

            if (this.sleepingStatusText === null) {
                this.surface.drawSprite(((this.gameWidth / 2) | 0) - 127, 230, this.spriteTexture + 1);
            } else {
                this.surface.drawStringCenter(this.sleepingStatusText, (this.gameWidth / 2) | 0, 260, 5, 0xff0000);
            }

            this.surface.drawBoxEdge(((this.gameWidth / 2) | 0) - 128, 229, 257, 42, 0xffffff);
            this.drawChatMessageTabs();
            this.surface.drawStringCenter('If you can\'t read the word', (this.gameWidth / 2) | 0, 290, 1, 0xffffff);
            this.surface.drawStringCenter('@yel@click here@whi@ to get a different one', (this.gameWidth / 2) | 0, 305, 1, 0xffffff);
            this.surface.draw(this.graphics, 0, 0);

            return;
        }

        if (!this.world.playerAlive) {
            return;
        }

        for (let i = 0; i < 64; i++) {
            this.scene.removeModel(this.world.roofModels[this.lastHeightOffset][i]);

            if (lastHeightOffset === 0) {
                this.scene.removeModel(this.world.wallModels[1][i]);
                this.scene.removeModel(this.world.roofModels[1][i]);
                this.scene.removeModel(this.world.wallModels[2][i]);
                this.scene.removeModel(this.world.roofModels[2][i]);
            }

            this.fogOfWar = true;

            if (lastHeightOffset === 0 && (this.world.objectAdjacency.get((this.localPlayer.currentX / 128) | 0, (this.localPlayer.currentY / 128) | 0) & 128) === 0) {
                this.scene.addModel(this.world.roofModels[this.lastHeightOffset][i]);

                if (lastHeightOffset === 0) {
                    this.scene.addModel(this.world.wallModels[1][i]);
                    this.scene.addModel(this.world.roofModels[1][i]);
                    this.scene.addModel(this.world.wallModels[2][i]);
                    this.scene.addModel(this.world.roofModels[2][i]);
                }

                this.fogOfWar = false;
            }
        }

        if (this.objectAnimationNumberFireLightningSpell !== this.lastObjectAnimationNumberFireLightningSpell) {
            this.lastObjectAnimationNumberFireLightningSpell = this.objectAnimationNumberFireLightningSpell;

            for (let j = 0; j < this.objectCount; j++) {
                if (this.objectId[j] === 97) {
                    this.updateObjectAnimation(j, 'firea' + (this.objectAnimationNumberFireLightningSpell + 1));
                }

                if (this.objectId[j] === 274) {
                    this.updateObjectAnimation(j, 'fireplacea' + (this.objectAnimationNumberFireLightningSpell + 1));
                }

                if (this.objectId[j] === 1031) {
                    this.updateObjectAnimation(j, 'lightning' + (this.objectAnimationNumberFireLightningSpell + 1));
                }

                if (this.objectId[j] === 1036) {
                    this.updateObjectAnimation(j, 'firespell' + (this.objectAnimationNumberFireLightningSpell + 1));
                }

                if (this.objectId[j] === 1147) {
                    this.updateObjectAnimation(j, 'spellcharge' + (this.objectAnimationNumberFireLightningSpell + 1));
                }
            }
        }

        if (this.objectAnimationNumberTorch !== this.lastObjectAnimationNumberTorch) {
            this.lastObjectAnimationNumberTorch = this.objectAnimationNumberTorch;

            for (let k = 0; k < this.objectCount; k++) {
                if (this.objectId[k] === 51) {
                    this.updateObjectAnimation(k, 'torcha' + (this.objectAnimationNumberTorch + 1));
                }

                if (this.objectId[k] === 143) {
                    this.updateObjectAnimation(k, 'skulltorcha' + (this.objectAnimationNumberTorch + 1));
                }
            }
        }

        if (this.objectAnimationNumberClaw !== lastObjectAnimationNumberClaw) {
            this.lastObjectAnimationNumberClaw = this.objectAnimationNumberClaw;

            for (let l = 0; l < this.objectCount; l++) {
                if (this.objectId[l] === 1142) {
                    this.updateObjectAnimation(l, 'clawspell' + (this.objectAnimationNumberClaw + 1));
                }
            }

        }

        this.scene.reduceSprites(this.spriteCount);
        this.spriteCount = 0;

        for (let i = 0; i < this.playerCount; i++) {
            let character = this.players[i];

            if (character.colourBottom !== 255) {
                let x = character.currentX;
                let y = character.currentY;
                let elev = -this.world.getElevation(x, y);
                let id = this.scene.addSprite(5000 + i, x, elev, y, 145, 220, i + 10000);
                this.spriteCount++;

                if (character === this.localPlayer) {
                    this.scene.setLocalPlayer(id);
                }

                if (character.animationCurrent === 8) {
                    this.scene.setSpriteTranslateX(id, -30);
                }

                if (character.animationCurrent === 9) {
                    this.scene.setSpriteTranslateX(id, 30);
                }
            }
        }

        for (let i = 0; i < playerCount; i++) {
            let player = players[i];

            if (player.projectileRange > 0) {
                let character = null;

                if (player.attackingNpcServerIndex !== -1) {
                    character = this.npcsServer[player.attackingNpcServerIndex];
                } else if (player.attackingPlayerServerIndex !== -1) {
                    character = this.playerServer[player.attackingPlayerServerIndex];
                }

                if (character !== null) {
                    let sx = player.currentX;
                    let sy = player.currentY;
                    let selev = -this.world.getElevation(sx, sy) - 110;
                    let dx = character.currentX;
                    let dy = character.currentY;
                    let delev = -((this.world.getElevation(dx, dy) - GameData.npcHeight[character.npcId] / 2) | 0);
                    let rx = ((sx * player.projectileRange + dx * (projectileMaxRange - player.projectileRange)) / this.projectileMaxRange) | 0;
                    let rz = ((selev * player.projectileRange + delev * (projectileMaxRange - player.projectileRange)) / this.projectileMaxRange) | 0;
                    let ry = ((sy * player.projectileRange + dy * (projectileMaxRange - player.projectileRange)) / this.projectileMaxRange) | 0;

                    this.scene.addSprite(this.spriteProjectile + player.incomingProjectileSprite, rx, rz, ry, 32, 32, 0);
                    this.spriteCount++;
                }
            }
        }

        for (let i = 0; i < this.npcCount; i++) {
            let character_3 = this.npcs[i];
            let i3 = character_3.currentX;
            let j4 = character_3.currentY;
            let i7 = -this.world.getElevation(i3, j4);
            let i9 = this.scene.addSprite(20000 + i, i3, i7, j4, GameData.npcWidth[character_3.npcId], GameData.npcHeight[character_3.npcId], i + 30000);

            this.spriteCount++;

            if (character_3.animationCurrent === 8) {
                this.scene.setSpriteTranslateX(i9, -30);
            }

            if (character_3.animationCurrent === 9) {
                this.scene.setSpriteTranslateX(i9, 30);
            }
        }

        for (let i = 0; i < this.groundItemCount; i++) {
            let x = this.groundItemX[i] * this.magicLoc + 64;
            let y = this.groundItemY[i] * this.magicLoc + 64;

            this.scene.addSprite(40000 + this.groundItemId[i], x, -this.world.getElevation(x, y) - this.groundItemZ[i], y, 96, 64, i + 20000);
            this.spriteCount++;
        }

        for (let i = 0; i < this.teleportBubbleCount; i++) {
            let l4 = this.teleportBubbleX[i] * this.magicLoc + 64;
            let j7 = this.teleportBubbleY[i] * this.magicLoc + 64;
            let j9 = this.teleportBubbleType[i];

            if (j9 === 0) {
                this.scene.addSprite(50000 + i, l4, -this.world.getElevation(l4, j7), j7, 128, 256, i + 50000);
                this.spriteCount++;
            }

            if (j9 === 1) {
                this.scene.addSprite(50000 + i, l4, -this.world.getElevation(l4, j7), j7, 128, 64, i + 50000);
                this.spriteCount++;
            }
        }

        this.surface.interlace = false;
        this.surface.blackScreen();
        this.surface.interlace = this.interlace;

        if (this.lastHeightOffset === 3) {
            let i5 = 40 + ((Math.random() * 3) | 0);
            let k7 = 40 + ((Math.random() * 7) | 0);
            this.scene.setLight(i5, k7, -50, -10, -50);
        }

        this.itemsAboveHeadCount = 0;
        this.receivedMessagesCount = 0;
        this.healthBarCount = 0;

        if (this.cameraAutoAngleDebug) {
            if (this.optionCameraModeAuto && !this.fogOfWar) {
                let j5 = cameraAngle;

                this.autorotateCamera();

                if (cameraAngle !== j5) {
                    cameraAutoRotatePlayerX = this.localPlayer.currentX;
                    cameraAutoRotatePlayerY = this.localPlayer.currentY;
                }
            }

            this.scene.clipFar3d = 3000;
            this.scene.clipFar2d = 3000;
            this.scene.fogZFalloff = 1;
            this.scene.fogZDistance = 2800;
            this.cameraRotation = this.cameraAngle * 32;

            let x = cameraAutoRotatePlayerX + cameraRotationX;
            let y = cameraAutoRotatePlayerY + cameraRotationY;

            this.scene.setCamera(x, -this.world.getElevation(x, y), y, 912, cameraRotation * 4, 0, 2000);
        } else {
            if (this.optionCameraModeAuto && !this.fogOfWar) {
                this.autorotateCamera();
            }

            if (!this.interlace) {
                this.scene.clipFar3d = 2400;
                this.scene.clipFar2d = 2400;
                this.scene.fogZFalloff = 1;
                this.scene.fogZDistance = 2300;
            } else {
                this.scene.clipFar3d = 2200;
                this.scene.clipFar2d = 2200;
                this.scene.fogZFalloff = 1;
                this.scene.fogZDistance = 2100;
            }

            let x = cameraAutoRotatePlayerX + cameraRotationX;
            let y = cameraAutoRotatePlayerY + cameraRotationY;

            this.scene.setCamera(x, -this.world.getElevation(x, y), y, 912, this.cameraRotation * 4, 0, this.cameraZoom * 2);
        }

        this.scene.render();
        this.drawAboveHeadStuff();

        if (this.mouseClickXStep > 0) {
            this.surface.drawSprite(this.mouseClickXX - 8, this.mouseClickXY - 8, this.spriteMedia + 14 + (((24 - this.mouseClickXStep) / 6) | 0));
        }

        if (this.mouseClickXStep < 0) {
            this.surface.drawSprite(this.mouseClickXX - 8, this.mouseClickXY - 8, this.spriteMedia + 18 + (((24 + this.mouseClickXStep) / 6) | 0));
        }

        if (this.systemUpdate !== 0) {
            let i6 = ((this.systemUpdate / 50) | 0);
            let j8 = (i6 / 60) | 0;
            i6 %= 60;

            if (i6 < 10) {
                this.surface.drawStringCenter('System update in: ' + j8 + ':0' + i6, 256, this.gameHeight - 7, 1, 0xffff00);
            } else {
                this.surface.drawStringCenter('System update in: ' + j8 + ':' + i6, 256, this.gameHeight - 7, 1, 0xffff00);
            }
        }

        if (!tjos/loadingArea) {
            let j6 = 2203 - (this.localRegionY + this.planeHeight + this.regionY);

            if (this.localRegionX + this.planeWidth + this.regionX >= 2640) {
                j6 = -50;
            }

            if (j6 > 0) {
                let wildlvl = 1 + ((j6 / 6) | 0);
                this.surface.drawSprite(453, this.gameHeight - 56, spriteMedia + 13);
                this.surface.drawStringCenter('Wilderness', 465, this.gameHeight - 20, 1, 0xffff00);
                this.surface.drawStringCenter('Level: ' + wildlvl, 465, this.gameHeight - 7, 1, 0xffff00);

                if (this.showUiWildWarn === 0) {
                    this.showUiWildWarn = 2;
                }
            }

            if (this.showUiWildWarn === 0 && j6 > -10 && j6 <= 0) {
                this.showUiWildWarn = 1;
            }
        }

        if (this.messageTabSelected === 0) {
            for (let k6 = 0; k6 < 5; k6++)
                if (this.messageHistoryTimeout[k6] > 0) {
                    let s = this.messageHistory[k6];
                    this.surface.drawstring(s, 7, this.gameHeight - 18 - k6 * 12, 1, 0xffff00);
                }

        }

        this.panelMessageTabs.hide(this.controlTextListChat);
        this.panelMessageTabs.hide(this.controlTextListQuest);
        this.panelMessageTabs.hide(this.controlTextListPrivate);

        if (this.messageTabSelected === 1) {
            this.panelMessageTabs.show(this.controlTextListChat);
        } else if (this.messageTabSelected === 2)
            this.panelMessageTabs.show(this.controlTextListQuest);
        else if (messageTabSelected === 3) {
            this.panelMessageTabs.show(this.controlTextListPrivate);
        }

        Panel.textListEntryHeightMod = 2;
        this.panelMessageTabs.drawPanel();
        Panel.textListEntryHeightMod = 0;
        this.surface.drawSpriteAlpha(this.surface.width2 - 3 - 197, 3, spriteMedia, 128);
        this.drawUi();
        this.surface.loggedIn = false;
        this.drawChatMessageTabs();
        this.surface.draw(this.graphics, 0, 0);
    }
}

mudclient.regionPlayerSendCount = 0;

module.exports = mudclient;