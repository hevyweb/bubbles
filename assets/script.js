var bub;
$('document').ready(function(){
    $('body').mousedown(function(e){
        bub = new bubble();
        bub.init(e);
    });
});

var bubble = function(){
    return {
        bubble: null,

        init: function(e){
            e.stopPropagation();
            this.gen().appendTo(e.delegateTarget);
            this.blow(e.pageX, e.pageY);
        },

        gen: function(){
            var self = this;
            this.bubble = $('<div />').addClass('bubble')
                .mousedown(function(e){
                    e.stopPropagation();
                    self.pop(e);
                }).mouseup(function(e){
                    e.stopPropagation();
                    self.bubble.float();
                });
            return this.bubble;
        },

        float: function(){
            var bubbleJar = this.bubble.parent();
            var self = this;
            this.bubble.stop().animate({
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

        blow: function(x, y){
            var self = this;
            this.bubble.css({
                'top': parseInt(y - this.bubble.height()/2),
                'left': parseInt(x - this.bubble.width()/2)
            }).animate({
                'top': '-=30',
                'left': '-=30',
                'width': '+=80',
                'height': '+=80'
            }, {
                duration: 5000,
                easing: 'linear',
                complete: function () {
                    self.pop();
                }
            });
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

        pop: function(){
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
                delete self;
            });
        }
    }
};