let basicShader;
let shaderTexture;
let randT, colorFreq, rseed;
let dir = 1;
let targetDir = 1;
let transitionStartTime = 0;
let transitionDuration = 10000;

let mousePressedTime = 0;
let mousePressPosition = [0, 0];
let mousePressedFlag = false;
let numColors = 2;
const maxColors = 4;

const maxShaderDrops = 50;
let colorDrops = [];
let paletteColors = [];

let tex, cols, grid, clearVal;
let chro, pg;
let orr;
let speed = 0.5;
let aniBri = 0.001;

let isPlaying = false;


// let contH2 = 1.0;
// let contL2 = 1;
// let contHh2 = 1;
// let contLl2 = 1;

let contH = 1.1;
let contL = 0.9;
let contHh = 1.3;
let contLl = 0.7;

let contH1 = 1.1;
let contL1 = 0.9;
let contHh1 = 1.2;
let contLl1 = 0.8;

let contH2 = 1.1;
let contL2 = 0.9;
let contHh2 = 1.2;
let contLl2 = 0.8;

let contLl3 = 0.5;
let contL3 = 0.9;
let contH3 = 1.1;
let contHh3 = 1.3;

let contLl4 = 0.4;
let contL4 = 0.9;
let contH4 = 1.1;
let contHh4 = 1.3;

let contLl5 = 0.4;
let contL5 = 0.9;
let contH5 = 1.1;
let contHh5 = 1.3;

let contLl6 = 0.4;
let contL6 = 0.9;
let contH6 = 1.1;
let contHh6 = 1.3;

let contLl7 = 0.4;
let contL7 = 0.9;
let contH7 = 1.1;
let contHh7 = 1.3;

let contLl8 = 0.4;
let contL8 = 0.9;
let contH8 = 1.1;
let contHh8 = 1.3;

let contLl9 = 0.4;
let contL9 = 0.9;
let contH9 = 1.1;
let contHh9 = 1.4;

let contLl10 = 0.4;
let contL10 = 0.9;
let contH10 = 1.1;
let contHh10 = 1.3;




const colorPalettes = [
    [ //////0
        [0.129 * contLl, 0.145 * contLl, 0.171 * contLl],
        [0.204 * contL, 0.227 * contL, 0.251 * contL],
        [0.424 * contH, 0.459 * contH, 0.490 * contH],
        [0.678 * contHh, 0.710 * contHh, 0.741 * contHh]
    ],
    [ //////1
        [0.039 * contLl1, 0.035 * contLl1, 0.031 * contLl1],
        [0.133 * contL1, 0.200 * contL1, 0.231 * contL1],
        [0.776 * contH1, 0.675 * contH1, 0.561 * contH1],
        [0.918 * contHh1, 0.878 * contHh1, 0.835 * contHh1]
    ],
    [ /////2
        [0.078 * contLl2, 0.212 * contLl2, 0.259 * contLl2],
        [0.059 * contL2, 0.545 * contL2, 0.553 * contL2],
        [0.925 * contH2, 0.604 * contH2, 0.161 * contH2],
        [0.855 * contHh2, 0.824 * contHh2, 0.847 * contHh2]
    ],
    [ ////3
        [0.090 * contLl3, 0.102 * contLl3, 0.129 * contLl3],
        [0.380 * contL3, 0.439 * contL3, 0.451 * contL3],
        [0.478 * contH3, 0.576 * contH3, 0.675 * contH3],
        [0.573 * contHh3, 0.737 * contHh3, 0.918 * contHh3]
    ],
    [ ////////4
        [0.027 * contLl4, 0.310 * contLl4, 0.341 * contLl4],
        [0.027 * contL4, 0.443 * contL4, 0.529 * contL4],
        [0.455 * contH4, 0.647 * contH4, 0.498 * contH4],
        [0.620 * contHh4, 0.808 * contHh4, 0.604 * contHh4]
    ],
    [ /////5
        [0.074 * contLl5, 0.235 * contLl5, 0.333 * contLl5],
        [0.220 * contL5, 0.435 * contL5, 0.643 * contL5],
        [0.349 * contH5, 0.647 * contH5, 0.847 * contH5],
        [0.518 * contHh5, 0.824 * contHh5, 0.961 * contHh5]
    ],
    [ ////////6
        [0.271 * contLl6, 0.216 * contLl6, 0.314 * contLl6],
        [0.451 * contL5, 0.392 * contL5, 0.541 * contL5],
        [0.596 * contH5, 0.510 * contH5, 0.675 * contH5],
        [0.639 * contHh5, 0.576 * contHh5, 0.749 * contHh5]
    ],
    [ //////////7
        [0.133 * contLl6, 0.341 * contLl6, 0.478 * contLl6],
        [0.220 * contL5, 0.639 * contL5, 0.647 * contL5],
        [0.341 * contH5, 0.800 * contH5, 0.600 * contH5],
        [0.502 * contHh5, 0.929 * contHh5, 0.600 * contHh5]
    ],
    [ //////8
        [0.200 * 1.2 * contLl6, 0.220 * 1.2 * contLl6, 0.180 * 1.2 * contLl6], // Forest green
        [0.310 * 1.2 * contL5, 0.341 * 1.2 * contL5, 0.290 * 1.2 * contL5], // Sage
        [0.459 * 1.2 * contH5, 0.490 * 1.2 * contH5, 0.439 * 1.2 * contH5], // Olive
        [0.600 * 1.2 * contHh5, 0.639 * 1.2 * contHh5, 0.588 * 1.2 * contHh5] // Pale green
    ],
    [ //////9
        [0.129 * contLl9, 0.098 * contLl9, 0.078 * contLl9], // Dark chocolate
        [0.251 * contL9, 0.180 * contL9, 0.141 * contL9], // Rust
        [0.459 * contH9, 0.349 * contH9, 0.290 * contH9], // Terracotta
        [0.678 * contHh9, 0.549 * contHh9, 0.478 * contHh9] // Clay
    ],
    [ //////10
        [0.180 * contLl6, 0.055 * contLl6, 0.008 * contLl6], // #2E0E02
        [0.345 * contL5, 0.098 * contL5, 0.031 * contL5], // #581908
        [0.596 * contH5, 0.212 * contH5, 0.157 * contH5], // #983628
        [0.886 * contHh5, 0.682 * contHh5, 0.867 * contHh5] // #E2AEDD
    ]
];

let selectedPaletteIndex;
let currentHashSeed;
let seeed;
let randBuf, randomCanvas

function preload() {
    basicShader = loadShader('shader.vert', 'shaderEski.frag');

}

function drawRandomTexture(w, h) {
    randomCanvas = createImage(w, h);
    randomCanvas.loadPixels();
    for (let i = 0; i < randomCanvas.width; i++) {
        for (let j = 0; j < randomCanvas.height; j++) {
            randomCanvas.set(i, j, color(random(255)));
        }
    }
    randomCanvas.updatePixels();
    // randomSeed(rSeed)
}

function hashStringToNumber(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function generateRandomHash(length = 12) {
    const chars = 'abcdef0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function setup() {
    pixelDensity(1);
    let w = window.innerWidth;
    let h = window.innerHeight;

    let canvas = createCanvas(w, h, WEBGL);
    noStroke();

    shaderTexture = createGraphics(w, h, WEBGL);
    shaderTexture.noStroke();
    shaderTexture.pixelDensity(1);

    randBuf = createGraphics(1000, 1000);

    pg = createGraphics(w, h);
    pg.noStroke();
    pg.pixelDensity(1);

    currentHashSeed = generateRandomHash();

    drawRandomTexture(w, h)

    // randomSeed(678972981321);
    // noiseSeed(678972981321);

    selectedPaletteIndex = floor(random(colorPalettes.length));

    clearVal = random([4.0, 5.0, 6.0, 7.0, 9.0, 10.0]);
    colorFreq = random(1, 6).toFixed(2);

    // colorFreq.toFixed(2);

    speed = random(0.2, 1.0).toFixed(2);
    orr = random([0.0, 0.5, 1.0, 1.5, 0.0]);

    // selectedPaletteIndex = 10 /// 8+ 9+ 10+ 11+ 

    if (typeof $layer !== 'undefined') {
        $layer.registerCanvas(canvas.elt)
            .params({
                customization_level: 'VIEWER',
                kind: 'HASH',
                id: 'seed',
                name: 'Seed Hash',
                default: currentHashSeed,
                minLength: 6,
                maxLength: 64
            }, {
                customization_level: 'VIEWER',
                kind: 'NUMBER',
                id: 'colorF',
                name: 'Color Frequency',
                default: colorFreq,
                min: 1,
                max: 6,
                step: 0.001,
            }, {
                customization_level: 'VIEWER',
                kind: 'NUMBER',
                id: 'colorP',
                name: 'Color Palette',
                default: selectedPaletteIndex,
                min: 0,
                max: colorPalettes.length - 1,
                step: 1
            }, {
                customization_level: 'VIEWER',
                kind: 'NUMBER',
                id: 'detail',
                name: 'Detail',
                default: clearVal,
                min: 1,
                max: 10,
                step: 1,
            }, {
                customization_level: 'VIEWER',
                kind: 'NUMBER',
                id: 'speed',
                name: 'speed',
                default: speed,
                min: 0.2,
                max: 1.0,
                step: 0.05
            }, {
                customization_level: 'VIEWER',
                kind: 'LIST',
                id: 'orientation',
                name: 'orientation',
                // Ensure we produce a valid string from orr, e.g. "1.0" or "0.5"
                default: orr.toFixed(1),
                options: [{
                        value: '0.0',
                        label: 'left'
                    },
                    {
                        value: '1.0',
                        label: 'right'
                    },
                    {
                        value: '0.5',
                        label: 'down'
                    },
                    {
                        value: '1.5',
                        label: 'up'
                    }
                ]
            })
            .then(({
                seed,
                colorP: cp,
                colorF: cf,
                detail: dt,
                speed: sp,
                orientation: oriVal
            }) => {
                currentHashSeed = seed;
                let numericSeed = hashStringToNumber(seed);
                // numericSeed = 678972981321
                randomizeVariables(numericSeed);

                selectedPaletteIndex = cp;
                colorFreq = cf;
                clearVal = dt;
                speed = sp;
                orr = parseFloat(oriVal);

                if (!$layer.controlled) {
                    isPlaying = true;
                    loop();
                } else {
                    isPlaying = false;
                    noLoop();
                }
            });

        globalThis.addEventListener('layer:paramchange', (event) => {
            const {
                id,
                value
            } = event.detail;
            if (id === 'colorF') {
                colorFreq = value;
            } else if (id === 'colorP') {
                selectedPaletteIndex = value;
            } else if (id === 'detail') {
                clearVal = value;
            } else if (id === 'seed') {
                currentHashSeed = value;
                let numericSeed = hashStringToNumber(value);
                randomizeVariables(numericSeed);
            } else if (id === 'speed') {
                speed = value;
            } else if (id === 'orientation') {
                orr = parseFloat(value);
            }
        });

        globalThis.addEventListener('layer:play', () => {
            isPlaying = true;
            loop();
        });

        globalThis.addEventListener('layer:pause', () => {
            isPlaying = false;
            noLoop();
        });

        globalThis.addEventListener('layer:reset', () => {
            let numericSeed = hashStringToNumber(currentHashSeed);
            randomizeVariables(numericSeed);
            if (!$layer.controlled) {
                isPlaying = true;
                loop();
            } else {
                isPlaying = false;
                noLoop();
            }
        });
    } else {
        let numericSeed = hashStringToNumber(currentHashSeed);
        // numericSeed = 678972981321
        console.log("numericSeed", numericSeed);

        randomizeVariables(numericSeed);
        isPlaying = true;
        loop();
    }
}

function randomizeVariables(numericSeed) {
    randomSeed(numericSeed);
    noiseSeed(numericSeed);

    randT = random(1);
    rseed = random(1);
    if (colorFreq === undefined) colorFreq = random(1, 6).toFixed(2);
    if (selectedPaletteIndex === undefined) selectedPaletteIndex = floor(random(colorPalettes.length));
    tex = random([1.0, 2.0, 2.0]);

    if (selectedPaletteIndex == 6 || selectedPaletteIndex == 7) {
        tex = 2.0;
    }
    cols = random([0.0, 1.0, 2.0, 3.0, 4.0, 5.0]);
    grid = random([1.0, 1.0, 1.0, 2.0, 2.0]);
    if (clearVal === undefined) {
        clearVal = random([4.0, 5.0, 6.0, 7.0, 9.0, 10.0]);
    }
    chro = random([0.3, 0.4, 0.5, 0.6, 0.7, 0.8]);
    dir = random([-1, 1]);

    if (orr === undefined) orr = random([0.0, 0.5, 1.0, 1.5, 0.0]); // No changes here
    if (speed === undefined) speed = random(0.2, 1.0).toFixed(2);


    // tex = 1.0
    // colorFreq = 1.0
    // clearVal = 15.0
    // // speed = 0.777
    // grid = 1.0
    // chro = 0.3
    // aniBri = 0.001
    // dir = 1.0

}

function draw() {
    basicShader.setUniform('u_cols', cols);
    basicShader.setUniform('u_pixelDensity', pixelDensity());
    basicShader.setUniform('img', shaderTexture);
    basicShader.setUniform('randomTex', randomCanvas);
    basicShader.setUniform('u_resolution', [width, height]);
    basicShader.setUniform('u_time', millis() / 1000.0);
    basicShader.setUniform('u_speed', speed);
    basicShader.setUniform('u_windSpeed', 1.0);
    basicShader.setUniform('u_mouse', [mouseX, height - mouseY]);
    basicShader.setUniform('u_middle', [width, height]);
    basicShader.setUniform('u_t', randT);
    basicShader.setUniform('u_colorFreq', colorFreq);
    basicShader.setUniform('u_randomSeed', rseed);
    basicShader.setUniform('u_dir', dir);
    basicShader.setUniform('u_tex', tex);
    basicShader.setUniform('u_grid', grid);
    basicShader.setUniform('u_clear', clearVal);
    basicShader.setUniform('u_mousePressTime', mousePressedTime);
    basicShader.setUniform('u_mousePressPosition', mousePressPosition);
    basicShader.setUniform('u_mousePressed', mousePressedFlag ? 1.0 : 0.0);
    basicShader.setUniform('u_numColors', numColors);
    basicShader.setUniform('u_chro', chro);
    basicShader.setUniform('u_bri', aniBri);

    let selectedPalette = colorPalettes[selectedPaletteIndex];

    basicShader.setUniform('u_col1', selectedPalette[0]);
    basicShader.setUniform('u_col2', selectedPalette[1]);
    basicShader.setUniform('u_col3', selectedPalette[2]);
    basicShader.setUniform('u_col4', selectedPalette[3]);

    shaderTexture.shader(basicShader);
    shaderTexture.rect(0, 0, width, height);

    push()
    rotate((PI * orr));
    translate(-width / 2, -height / 2);
    image(shaderTexture, 0, 0);
    pop()


    // pg.noFill()
    // pg.fill(255, 0, 0)
    // pg.textSize(20)
    // pg.text("tex: " + tex, 100, 75)
    // pg.text("clear: " + clearVal, 100, 100)
    // pg.text("colorFreq: " + colorFreq, 100, 50)
    // pg.text("speed: " + speed, 100, 125)
    // pg.text("grid: " + grid, 100, 150)
    // pg.text("chro: " + chro, 100, 175)
    // pg.text("colPal: " + selectedPaletteIndex, 100, 200)
    // translate(-width / 2, -height / 2);
    // image(pg, width / 2, height / 2)
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight, WEBGL);
    shaderTexture.resizeCanvas(window.innerWidth, window.innerHeight, WEBGL);
}