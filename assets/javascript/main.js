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
    let clouds = document.getElementsByClassName("cloud");

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

    for (let item of stars) {
        item.style.fill = `#cdcc00`;
    }

    document.querySelector(".moon").style.fill = `#7dcfc9`;
    document.querySelector(".cls-2").style.fill = `#299496`;
    let insideHoles = document.getElementsByClassName("cls-3");

    for (let item of insideHoles) {
        item.style.fill = `#51a09a`;
        item.style.stroke = `#51a09a`;
    }

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


    /*set the clouds position*/
    for ( let item of clouds ) {
        item.style.left = rand( ( windowWidth + item.width.baseVal.value ) * 0.5 + ( windowWidth + item.width.baseVal.value ), windowWidth + item.width.baseVal.value ) + 'px';
        item.style.top = (rand(windowHeight - item.height.baseVal.value, item.height.baseVal.value )  )+ 'px';
        item.style.margin = rand(item.width.baseVal.value, 0) + 'px';
    }


    setInterval( () => {
        for ( let item of clouds ) {
            if (parseInt(item.style.left, 10) < -( item.width.baseVal.value ) ) {
                item.style.left = rand( ( windowWidth + item.width.baseVal.value ) * 0.5 + ( windowWidth + item.width.baseVal.value ), windowWidth + item.width.baseVal.value ) + 'px';
            }
            item.style.left = ( parseInt(item.style.left, 10) - 1 ) + 'px';
        }
    }, 10)

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