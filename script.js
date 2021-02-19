"use strict";

window.addEventListener("DOMContentLoaded", initColorPicker);

let baseColor;
let harmony;

const colorPicker = document.querySelector(".js-color-picker");
const colorHarmonies = document.querySelectorAll('.js-color-harmony input[name="color-harmony"]');

function initColorPicker() {
    baseColor = userChangedColor(colorPicker.value);
    colorPicker.addEventListener("input", userChangedColor);

    // Todo
    // colorHarmonies.forEach((colorHarmony) => {
    //     colorHarmony.addEventListener("click", userChangedHarmony);
    // });
}

function userChangedColor() {
    baseColor = convertColor(colorPicker.value);
    harmony = document.querySelector('.js-color-harmony input[name="color-harmony"]:checked').value;

    const colorPalette = getHarmonyColors(baseColor, harmony);

    console.log(colorPalette);

    colorPalette.forEach(showColor);
}

function userChangedHarmony() {
    baseColor = convertColor(colorPicker.value);
    harmony = document.querySelector('.js-color-harmony input[name="color-harmony"]:checked').value;

    const harmonyColors = getHarmonyColors(baseColor, harmony);

    showColor(baseColor);
}

function convertColor(baseColor) {
    const color = {
        hex: baseColor,
        rgb: convertHexToRgb(baseColor),
        hsl: convertHexToHsl(baseColor),
    };

    return color;
}

function convertHexToRgb(hexColor) {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    return { r, g, b };
}

function convertRgbToHex(rgbObject) {
    const red = rgbObject.r.toString(16).padStart(2, "0");
    const green = rgbObject.g.toString(16).padStart(2, "0");
    const blue = rgbObject.b.toString(16).padStart(2, "0");

    return `#${red}${green}${blue}`;
}

function convertHexToHsl(hexColor) {
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
        h = 0;
    } else if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
    } else if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
    } else if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) {
        h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / Math.min(l, 1 - l);
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    h = h.toFixed(0);
    s = s.toFixed(0);
    l = l.toFixed(0);

    return { h, s, l };
}

function convertHslToRgb(hslObject) {
    let h = hslObject.h;
    let s = hslObject.s / 100;
    let l = hslObject.l / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;
    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
}

function getHarmonyColors(baseColor, harmony) {
    let colorPalette;

    switch (harmony) {
        case "analogous":
            colorPalette = calculateAnalogousColors(baseColor);
            break;

        case "monochromatic":
            colorPalette = calculateMonochromaticColors(baseColor);
            break;

        case "triad":
            colorPalette = calculateTriadColors(baseColor);
            break;

        case "complementary":
            colorPalette = calculateComplementaryColors(baseColor);
            break;

        case "compound":
            colorPalette = calculateCompoundColors(baseColor);
            break;

        case "shades":
            colorPalette = calculateShadeColors(baseColor);
            break;

        default:
            console.log("I don't know this color harmony 😔");
    }

    colorPalette.splice(2, 0, baseColor);

    return colorPalette;
}

function calculateAnalogousColors(baseColor) {
    console.log("calculateAnalogousColors");
    const analogousColors = [];

    for (let i = 1; i < 6; i++) {
        if (i !== 3) {
            const baseColorHslClone = Object.assign({}, baseColor.hsl);
            const hslNumber = parseInt(baseColorHslClone.h) - 90 + 30 * i;

            console.log(hslNumber);

            console.log("HSLNumber", hslNumber);
            if (hslNumber > 360) {
                console.log("Should be: ", hslNumber % 360);
                baseColorHslClone.h = Math.abs(hslNumber % 360);
            } else if (hslNumber < 0) {
                baseColorHslClone.h = 360 - Math.abs(hslNumber);
                console.log("Test:", 360 - hslNumber);
            } else {
                console.log("Is correct: ", hslNumber);
                baseColorHslClone.h = hslNumber;
            }

            console.log(" ");

            const newColorRgb = convertHslToRgb(baseColorHslClone);
            const newColorHex = convertRgbToHex(newColorRgb);

            const color = {
                hex: newColorHex,
                rgb: newColorRgb,
                hsl: baseColorHslClone,
            };

            analogousColors.push(color);
        }
    }

    return analogousColors;
}

function calculateMonochromaticColors(baseColor) {
    console.log("calculateMonochromaticColors");
}

function calculateTriadColors(baseColor) {
    console.log("calculateTriadColors");
}

function calculateComplementaryColors(baseColor) {
    console.log("calculateComplementaryColors");
}

function calculateCompoundColors(baseColor) {
    console.log("calculateCompoundColors");
}

function calculateShadeColors(baseColor) {
    console.log("calculateShadeColors");
}

function showColor(color, index) {
    showColorBox(color, index);
    showHexColor(color, index);
    showRgbColor(color, index);
    showHslColor(color, index);
}

function showColorBox(color, index) {
    document.querySelector(`.c-color-palette__color:nth-child(${index + 1}) .js-color-box`).style.backgroundColor = color.hex;
}

function showHexColor(color, index) {
    document.querySelector(`.c-color-palette__color:nth-child(${index + 1}) .js-color-hex`).textContent = color.hex.toUpperCase();
}

function showRgbColor(color, index) {
    document.querySelector(`.c-color-palette__color:nth-child(${index + 1}) .js-color-rgb`).textContent = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
}

function showHslColor(color, index) {
    document.querySelector(`.c-color-palette__color:nth-child(${index + 1}) .js-color-hsl`).textContent = `${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%`;
}
