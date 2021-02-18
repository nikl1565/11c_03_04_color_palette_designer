"use strict";

window.addEventListener("DOMContentLoaded", initColorPicker);

function initColorPicker() {
    const colorPicker = document.querySelector(".js-color-picker");
    userChangedColor(colorPicker.value);
    colorPicker.addEventListener("input", userChangedColor);
}

function userChangedColor(event) {
    const pickedColor = convertColor(event);

    showSelectedColor(pickedColor);
}

function convertColor(event) {
    let pickedColor;
    if (typeof event == "object") {
        pickedColor = event.target.value;
    } else {
        pickedColor = event;
    }

    const color = {
        hex: pickedColor,
        rgb: convertHexToRgb(pickedColor),
        hsl: convertHexToHsl(pickedColor),
    };

    return color;
}

function convertHexToRgb(hexColor) {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);

    return { r, g, b };
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

function showSelectedColor(color) {
    updateColorBox(color);
    updateHexColor(color);
    updateRgbColor(color);
    updateHslColor(color);
}

function updateColorBox(color) {
    const colorBox = document.querySelector(".js-color-box");
    colorBox.style.backgroundColor = color.hex;
}

function updateHexColor(color) {
    const colorHex = document.querySelector(".js-color-hex");
    colorHex.textContent = color.hex;
}

function updateRgbColor(color) {
    const colorRgb = document.querySelector(".js-color-rgb");
    colorRgb.textContent = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`;
}

function updateHslColor(color) {
    const colorHsl = document.querySelector(".js-color-hsl");
    colorHsl.textContent = `${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%`;
}
