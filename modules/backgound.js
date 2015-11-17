ModConf.Background = {

    subscribe: function() {
        var me = this;
        return {
            "request:background.sayHi": me.sayHi
        };
    },

    constructor: function() {
        var me = this,
            bgItem, bgCtx;

        me.fps = 120;

        bgItem = new AnimationItem({
            image: me.createBgPattern(),
            x: AnimationManager.width/2,
            y: AnimationManager.height/2
        });

        bgCtx = bgItem.image.getContext("2d");

        bgItem.animationFunction = function() {
            me.redrawPattern(bgCtx, this.localTime);
        };

        me.item = bgItem;
        AnimationManager.addItem(me.item);
    },

    sayHi: function (someText) {
        console.log("Hi, its event testing, with arguments " + someText);
    },

    start: function(){
        var me = this;
        me.item.play();
    },

    createBgPattern: function(){
        var me = this,
            canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");

        canvas.width = AnimationManager.width;
        canvas.height = AnimationManager.height;
        me.redrawPattern(ctx, 0);
        return canvas;
    },

    redrawPattern: function(ctx, time) {
        var me = this,
            pattern = ResourceManager.graphics["sky"].image,
            frameHeight = pattern.height,
            frameWidth = pattern.width,
            sceneHeight = ctx.canvas.height,
            sceneWidth = ctx.canvas.width,
            r = Math.floor(sceneHeight / frameHeight),
            c = Math.floor(sceneWidth / frameWidth),
            n;

        n = Math.round((time * me.fps / 1000) % frameHeight) || 0;

        for (var i = -1; i <= r; i++) {
            for (var j = 0; j <= c; j++) {
                ctx.drawImage(pattern, j * frameWidth, i * frameHeight + n);
            }
        }
    }
};

ModuleLoader.registerModule("Background", ModConf.Background);