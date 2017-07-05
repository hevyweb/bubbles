$('document').ready(function(){
    $('body').click(function(e){
        var bub = new bubble();
        bub.init();
    });
});

var bubble = function(){
    return {
        bubble: null,

        init: function(){
            var self = this;
            var randomSize = 4*Math.floor(Math.random()*20);
            var bubble = this.gen().appendTo('body').click(function(e){
                e.stopPropagation();
                self.pop(e);
            });
            var bubbleJar = bubble.parent();
            var randomTop = 500;
            var randomLeft = bubbleJar.width() * 0.1 + parseInt(bubbleJar.width() * 0.8 * Math.random());

            bubble.css({
                'width': randomSize,
                'height': randomSize,
                'top': randomTop,
                'left': randomLeft
            });
            this.float();
        },

        gen: function(){
            this.bubble = $('<div />').addClass('bubble');
            return this.bubble;
        },

        float: function(){
            var bubbleJar = this.bubble.parent();
            var self = this;
            this.bubble.animate({
                'top': bubbleJar.height() * 0.1,
                'height': '+=60',
                'width': '+=60'
            }, {
                duration: 4000,
                queue: false,
                easing: 'easeInSine',
                complete: function () {
                    self.pop();
                }
            });
            this.horizontalFloat();
        },

        horizontalFloat: function(){
            var self = this;
            this.bubble.animate({//parallel animation
                'left': '+=30'
            },{
                duration: 1000,
                queue: false,
                easing: 'easeInOutCubic',
                complete: function () {
                    self.bubble.animate({
                        'left': '-=60'
                    }, {
                        duration: 2000,
                        queue: false,
                        easing: 'easeInOutCubic',
                        complete: function () {
                            self.horizontalFloat();
                        }
                    })
                }
            });
        },

        pop: function(e){

            var self = this;
            var newSize = parseInt(self.bubble.width()*1.5);
            var left = this.bubble.offset().left - self.bubble.width()*0.25;
            var top =  this.bubble.offset().top - self.bubble.width()*0.25;
            this.bubble.stop().animate({
                opacity: 0.3,
                width: newSize,
                height: newSize,
                left: left,
                top: top
            }, 200, function(){
                this.remove();
            });
        }
    }
};