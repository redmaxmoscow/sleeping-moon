function rand( max, min ) {
    return Math.floor( Math.random() * (max - min) + min );
}

function getPositionAtCenter(element) {
    const {top, left, width, height} = element.getBoundingClientRect();

    return {
        x: left + width / 2,
        y: top + height / 2
    };
}

function getDistanceBetweenElements(a, b) {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);

    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

function toggleClass(element, className, force = null) {
    force === null
        ? element.classList.toggle(className)
        : element.classList.toggle(className, force);
}


document.addEventListener("DOMContentLoaded", () => {
    let stars = document.getElementsByClassName("star");
    let moon = document.querySelector(".moon");

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let starsBlinkSpeed = ( localStorage.getItem("starBlinkSpeed") !== null )
        ? parseInt(localStorage.getItem("starBlinkSpeed"), 10)
        : 300;
    let backgroundTopGradientColor = ( localStorage.getItem("backgroundTopGradientColor") !== null )
        ? localStorage.getItem("backgroundTopGradientColor")
        : "#978aff";
    let backgroundBottomGradientColor = ( localStorage.getItem("backgroundBottomGradientColor") !== null )
        ? localStorage.getItem("backgroundBottomGradientColor")
        : "#102675";



    /*set positions of the stars*/
    for ( let item of stars ) {
        item.style.left = (rand(windowWidth - item.width.baseVal.value * 2, item.width.baseVal.value * 2 ) - item.width.baseVal.value) + 'px';
        item.style.top = (rand(windowHeight - item.height.baseVal.value * 2, item.height.baseVal.value * 2 ) - item.height.baseVal.value * 2) + 'px';

        if ( getDistanceBetweenElements(item, moon) < 200.0) {
            item.parentNode.removeChild(item);
        }
    }

    /*remove stars that crosses another ones*/
    for ( let i = 0; i < stars.length; i++ ) {
        for ( let j = i + 1; j < stars.length - 1; j++ ) {

            if ( getDistanceBetweenElements(stars[i], stars[j]) < 100.0) {
                stars[j].parentNode.removeChild(stars[j]);
            }

        }
    }

    /* stars animation*/
    setInterval( () => {
        let randomTick = rand(stars.length, 0);

        toggleClass(stars[randomTick], "zoom", true);

        setTimeout( () => {
            toggleClass(stars[randomTick], "zoom", false);
        }, starsBlinkSpeed );

    }, 2000)


    /* audio segment*/
    let audio = document.querySelector(".audio-element");

    audio.play();
    setInterval( () => {
        audio.play();
    }, Math.round(audio.duration) );

    /* set the colors if the page was reloaded*/
    document.body.style.background = `linear-gradient(
			    ${backgroundTopGradientColor},
			    ${backgroundBottomGradientColor}
			) no-repeat`;
})