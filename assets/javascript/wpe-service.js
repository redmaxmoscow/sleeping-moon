function makeRGBFromWPEFormat( color ) {
    color = color.value.split(' ');

    return color.map( c => {
        return Math.ceil( c * 255 );
    })
}

let backgroundBottomGradientColor = "#102675";
let backgroundTopGradientColor = "#978aff";
let starBlinkSpeed = 300;


window.wallpaperPropertyListener = {
    applyUserProperties: function(properties) {
        if (properties.backgroundbottomgradientcolor) {
            // Convert the custom color to 0 - 255 range for CSS usage
            let customColor = makeRGBFromWPEFormat(properties.backgroundbottomgradientcolor);

            localStorage.setItem("backgroundBottomGradientColor", `rgb(${customColor})`);
        }
        if (properties.backgroundtopgradientcolor) {
            // Convert the custom color to 0 - 255 range for CSS usage
            let customColor = makeRGBFromWPEFormat(properties.backgroundtopgradientcolor);

            localStorage.setItem("backgroundTopGradientColor", `rgb(${customColor})`);
        }
        if (properties.mooncolor) {
            // Convert the custom color to 0 - 255 range for CSS usage
            let customColor = makeRGBFromWPEFormat(properties.mooncolor);

            document.querySelector(".moon").style.fill = `rgb(${customColor})`;
        }
        if (properties.mooneye) {
            // Convert the custom color to 0 - 255 range for CSS usage
            let customColor = makeRGBFromWPEFormat(properties.mooneye);

            document.querySelector(".cls-2").style.fill = `rgb(${customColor})`;
        }
        if (properties.moonholes) {
            // Convert the custom color to 0 - 255 range for CSS usage
            let customColor = makeRGBFromWPEFormat(properties.moonholes);

            let insideHoles = document.getElementsByClassName("cls-3");

            for (let item of insideHoles) {
                item.style.fill = `rgb(${customColor})`;
                item.style.stroke = `rgb(${customColor})`;
            }
        }
        if (properties.starscolor) {
            // Convert the custom color to 0 - 255 range for CSS usage
            let customColor = makeRGBFromWPEFormat(properties.starscolor);

            let stars = document.getElementsByClassName("star");

            for (let item of stars) {
                item.style.fill = `rgb(${customColor})`;
            }
        }
        if (properties.musicvolume) {
            let audio = document.querySelector(".audio-element");

            audio.volume = properties.musicvolume.value * 0.01;
        }
        if (properties.starblinkspeed) {
            localStorage.setItem("starBlinkSpeed", properties.starblinkspeed.value);
        }


        document.body.style.background = `linear-gradient(
			    ${localStorage.getItem("backgroundTopGradientColor")},
			    ${localStorage.getItem("backgroundBottomGradientColor")}
		) no-repeat`;
    },
};
