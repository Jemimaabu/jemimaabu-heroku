//Make sure the page always starts at the beginning 
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

$(document).ready(function() {
    //Hide overflow till animations are done
    $("body").addClass("overflow-hidden");
    setTimeout(function(){ 
        $("body").removeClass("overflow-hidden");
    }, 1000 * 14);
    setTimeout(function() {
        $(".skip-animation").css("display","none")
    }, 1000 * 10);

    function skipAnimation() {
        $(".animate").removeClass("animate");
        $("body").removeClass("overflow-hidden");
        $(".skip-animation").css("display","none")
    }

    $(".skip-animation").click(() => {
        skipAnimation();
    });

    //End animation on menu links. If not, the animation repeats after hover. Probably a better way to do this though. Research it? Lol, nah.
    setTimeout(function(){ $(".page-links a").addClass("end-animation")}, 1000 * 13);

    //Function to control page scroll (actually worked better than I expected whoopwhoop)
    function scrollTo(link, page) {
        var pageLinks = ".page-links " + link + "";
        $(pageLinks).click(function(event) {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: $(page).offset().top,
                scrollLeft: $(page).offset().left
            }, 500);
        });
    }

    scrollTo(".home-link", ".home-section");
    scrollTo(".about-link", ".about-section");
    scrollTo(".work-link", ".work-section");
    scrollTo(".contact-link", ".contact-section");
    scrollTo(".projects-link", ".projects-section");

    //Switch between page layout
    $(".portrait").click(function(event) {
        event.preventDefault();
        $(".section-wrapper").addClass("portrait");
        $(".menu").addClass("portrait");
        $("body").css("overflow", "hidden auto");
    });

    $(".landscape").click(function(event) {
        event.preventDefault();
        $(".section-wrapper").removeClass("portrait");
        $(".menu").removeClass("portrait")
        $("body").css("overflow", "auto hidden");
    });

    // ----------------------------------------------------------------------
    // About Section
    // ----------------------------------------------------------------------
    
    //Code for this was adapted from Rob Glazebrook's pen on Codepen https://codepen.io/rglazebrook/pen/zLGxe
    const container = $(".bouncing");
    
    function rand(min,max,isInt) {
        var min = min || 0, 
            max = max || 1, 
            isInt = isInt || false,
            num = Math.random()*(max - min) + min;
        return (isInt) ? Math.round(num) : num;
    }

    function addBall() {
        var newBall = $("<ball />").appendTo(container);
        var size = rand(10,150);
        newBall.css({
            "position":"absolute",
            "width": size+"px",
            "height": size+"px",
            "opacity": rand(.1, .9),
            "background-color": "rgb("+rand(0,255,true)+","+rand(0,255,true)+","+rand(0,255,true)+")",
            "top": rand(0,container.height() - size),
            "left": rand(0,container.width() - size)
        }).attr({
            "data-dX":rand(-10,10),
            "data-dY":rand(1,10)
        });
    }

    function moveBall() {
        var maxX = container.width(),
            maxY = container.height();
        $("ball", container).each(function(i,b) {
          var ball = $(b),
              pos = ball.position(),
              x = pos.left,
              y = pos.top,
              dX = parseFloat(ball.attr("data-dX")),
              dY = parseFloat(ball.attr("data-dY")),
              size = ball.height();
          if(x+dX+size > maxX || x+dX < 0) ball.attr("data-dX",(dX=-dX)); 
          if(y+dY+size > maxY || y+dY < 0) ball.attr("data-dY",(dY=-dY)); 
          ball.css({"top":y+dY,"left":x+dX});
        });
    }
    
    window.setInterval(moveBall,50);

    $(".clear-ball").click(function() {
        container.empty();
    });

    var facts = [
        "I'm 21 years old.", 
        "At some point in my life, I had 5 cats (preparation for my future as a cat lady) and their names were Dawn, Dusk, Sunset, Sky and Nightfall.", 
        "I'm a Systems Engineering student at the University of Lagos.", 
        "I live in Lagos, Nigeria.", 
        "My favorite color is black (until the day that a darker color is invented).", 
        "I can touch my nose with my tongue.",
        "I can say the alphabet backwards. Not like perfectly but still.",
        "My favorite ice cream flavor is Cookies n' Cream.",
        "I sing in the shower. And out of it. Everywhere. I sing everywhere.",
        "I practiced yoga for 2 years (then took a hiatus because school).",
        "I taught ballet for 9 months (even though I had no training whatsoever prior to that but YouTube I guess).",
        "I taught art to children for 2 years (it was mostly paper folding, a lot of which I just Googled).",
        "I've been learning French on Duolingo for about 2 years and I finished the course once (so like I can translate an entire paragraph written in French, provided it's at elementary level).",
        "My guilty pleasure is reading trashy fanfiction (not on Wattpad though, I do have standards).",
        "I've worked over 8 jobs in the past 5 years (ranging from furniture salesperson to yoga instructor).",
        "I taught myself how to build websites 2 years ago (and look at me now, not too shabby eh).",
        "My major goal right now is to get an apartment, a cat and fairy lights, in that order.",
        "If I wasn't a Jemima, I might have liked to be a Kalila.",
        "I have a (chopped-off) 6th finger on both hands.",
        "I'm a terrible chess player, a mediocre Scrabble player and a vicious Monopoly winner (if you don't want to lose, try not being poor lol).",
        "I have a new favorite song every day.",
        "I like the idea of swimming but the action itself just seems like stress.",
        "My favorite movie genre is rom-coms and my favorite rom-com is About Time.",
        "If I were a color, I'd either be #FFF8E7 or #101D69.",
        "If I wasn't a developer, I'd like to own a bookshop (not that two are mutually exclusive).",
        "In my spare time, I like to binge watch slice-of-life and/or comedy anime.",
        "If I'm not watching anime, I'm probably reading mystery novels.",
        "Most of my exercise these days is gotten by performing elaborate dance routines in my room.",
    ];

    //Get random fact from facts array
    function factGenerator() {
        var index = Math.floor(Math.random()*facts.length);
        var fact = facts[index];
        facts.splice(index, 1); 
        
        if(facts.length == 0 ) {
           return ($(".about-section .fact").html("And that's all, folks!"))
        };

        return ($(".about-section .fact").html(fact))
    }
    
    $(".about-section").mousedown(function() {
        addBall();
        factGenerator();
        $(".about-section .content").removeClass("hidden");
        $(".about-section .intro").html("");
    });

    $("#about a").click((e) => {
        e.preventDefault();
        addBall();
        factGenerator();
        $(".about-section .content").removeClass("hidden");
        $(".about-section .intro").html("");
    });
    
    // ----------------------------------------------------------------------
    // Work Section
    // ----------------------------------------------------------------------
    /*
    Black and neon color scheme
    Carousel for Works done and Works Written
    Timeline Hover element (not displayed in mobile) */

    
    //Code adapted from Maria's pen on Codepen https://codepen.io/Shorina/pen/egJmeY

    var work = $(".work-section");
    var workLeft = work.offset().left;
    var workTop = work.offset().top;
    var workWidth = work.width();
    var workHeight = work.height();
    var scrollLock = false;
    var scrollTimer = null;

    //Generate new lines and remove random ones to maintain length
    function lines(){
        var lines = $(".line");
        if (lines.length) {
            for (var i = 0; i < lines.length - 1; i++) {
                lines[i].remove();
            }
        };
    
        for (i=0; i < workHeight/5; i++){
            var div = $("<div />").appendTo($(".work-section"));
            var className = "line line-"+ i + "";
            var time = Math.random() * 5;
            div.addClass(className);
            div.css({
                "top":i*10 + "px",
                "animation": "lines " + time + "s infinite",
            })
        }

    }

    //Set timeout function to remove lines and stop windows scroll from drawing any more lines with scrollLock
    function drawLines(){ 
        scrollTimer = null;

        lines();
        setTimeout(function(){ 
            $(".line").remove();
            $(".work-section .content").removeClass("hidden");
            $(".work-section").addClass("background");
        }, 1000 * 2, scrollLock = true);
    }

    //Use scrolltimer to prevent overloading of scrolling function and use scrolllock to stop function
    function drawLinesOnScroll() {
        $(window).scroll(function () {
            var windowScrollLeft = $(this).scrollLeft();
            var windowScrollTop = $(this).scrollTop();
            //So this 'resets' the scrollTimer to 0 if the page is scrolled
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            };
    
            //If scrollLock is false, then it drawsLines after 200ms
            if (!scrollLock) {
                //Detect if the width of the body is wider than a section i.e. in portrait and if scrollPoint has been reached, then call drawLine function. Might be a cleaner way to do this but it's nearly midnight so I'm not tryna figure that out now.
                //12:04am 25th December, 2018 
                //Works in landscape but not in portrait, merry christmas to me.
                //Should probably just rework the whole method. Might not be as complicated as I think it is.
                //12:11am 25th December, 2018
                //Okay I'm going to bed. This is a problem for future Jemima. Lol, enjoy.
                if (($(document).width() > workWidth*1.5 && windowScrollLeft > workLeft-(workWidth/2)) || ($(document).height() > workHeight*1.5 && windowScrollTop > workTop - (workHeight/2))) {
                    scrollTimer = setTimeout(drawLines, 100);
                }
            };
        })
    }

    $(window).width() > 992 && drawLinesOnScroll();

    //Handle Work Slideshow
    var slideIndex = 1;
    showWorksDone(slideIndex);
    showWorksWritten(slideIndex);

    // Next/previous controls
    $(".works-done #previous-button").click(function() {
        showWorksDone(slideIndex += -1);
    });
    $(".works-done #next-button").click(function() {
        showWorksDone(slideIndex += 1);
    });
    $(".works-written #previous-button").click(function() {
        showWorksWritten(slideIndex += -1);
    });
    $(".works-written #next-button").click(function() {
        showWorksWritten(slideIndex += 1);
    });

    function showSlides(n, slideName) {
        const slides = $(slideName);
        if (n > slides.length) {slideIndex = 1};
        if (n < 1) {slideIndex = slides.length};
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.visibility = "hidden";
        };
        slides[slideIndex-1].style.visibility = "visible";
    }

    function showWorksDone(n) {
        showSlides(n, ".works-done .work");
        setTimeout(function(){ 
            $(".works-done .static")[0].style.display = "none";
            }, 500,
            $(".works-done .static")[0].style.display = "block",
        );
    }

    function showWorksWritten(n) {
        showSlides(n, ".works-written .work");
    }

    //Using links for accessibility purposes so prevent redirect on click
    $(".timeline a").click((e) => { 
        e.preventDefault(); 
     });

    // ----------------------------------------------------------------------
    // Contact Section
    // ----------------------------------------------------------------------
    
    $("form :input").focus(function() {
        $("label[for='" + this.id + "']").addClass("labelfocus");
      }).blur(function() {
        if( !$(this).val() ) {
            $("label").removeClass("labelfocus");
        };
    });
});