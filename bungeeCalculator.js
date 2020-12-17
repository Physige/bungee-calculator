var inputs = document.getElementsByTagName("input");

// answer list
var results = document.getElementById("results");

// sets gravity to 10 by default
var gravity = inputs[3].value = 10;

// does actual calculations
function calculate() {
    var mass = parseInt(inputs[0].value, 10);
    var length = parseInt(inputs[1].value, 10);
    var constant = parseInt(inputs[2].value, 10);
    var gravity = parseInt(inputs[3].value, 10);
    
    // amount bungee cord stretches
    var totalStretchLength = Math.round(stretchLength(mass, gravity, length, constant) * 100) / 100;

    // gets the total height fallen by adding the amount the bungee stretched and the length of the rope before it starts stretching
    var totalHeight = Math.round((totalStretchLength + length) * 100) / 100;

    // gets the total amount of potential gravitational energy (mgh) in the system
    var totalEnergy = Math.round(mass * gravity * totalHeight);

    // gets the tension of the bungee at the bottom with hooke's law (F = kx) x is the amount stretched NOT total fall length
    var totalTension = Math.round((constant * totalStretchLength) * 10) / 10;

    // gets the max acceleration when the bungee jumper is at the lowest point (F = ma); tension force subtracted by the gravitational force = mass * acc
    var maxAcc = Math.round(((totalTension - (mass * gravity)) / mass) * 100) / 100;

    // length of the bungee at fastest speed when stretched, to get total take this height + inital rope length, gotten by taking the force 
    // of gravity (mass * gravity), then using it in hooke's law (F = kx), so force of gravity / k gets us the fastest length
    var fastestHeight = (mass * gravity) / constant;

    // gets the elastic potential energy of the system when the bungee jumper is going the fastest; 1/2kx^2
    var potentialEnergy = (0.5 * constant * Math.pow(fastestHeight, 2))

    // gets the work lost energy when the bungee jumper is going the fastest; W = mass * distance of fastest speed * acceleration
    var workLost = mass * fastestHeight * maxAcc;
    
    // gets the kinetic energy of the system when the jumper is going the fastest; 1/2mv^2; however, in this case, gotten from taking 
    // totalEnergy minus potential energy minus work lost
    var kineticEnergy = totalEnergy - potentialEnergy - workLost;

    // solves for velocity; KE = 1/2mv^2
    var fastestSpeed = Math.round(Math.sqrt(kineticEnergy / (0.5 * mass)) * 100) / 100;

    // DEBUG
    console.log("//////////DEBUG//////////"+
                "\nTotal Bungee Rope Stretch Length (not total length; just length stretched): " + totalStretchLength + 
                "\nTotal Height Fallen (max length) : " + totalHeight +
                "\nTotal Energy : " + totalEnergy +
                "\nTension at bottom : " + totalTension +
                "\nMax Acceleration : " + maxAcc +
                "\nHeight (after the rope starts stretching) at which the jumper is moving the fastest : " + fastestHeight +
                "\nPotential Energy at the fastest point in jump : " + potentialEnergy +
                "\nKinetic Energy at the fastest point in jump : " + kineticEnergy +
                "\nWork Lost : " + workLost +
                "\nFastest Speed : " + fastestSpeed);
    
    // lists out answers
    results.innerHTML = ("<br>\Total Bungee Rope Stretch Length (not total length; just length stretched):<b>\ " + totalStretchLength + 
                        "</b><br>\Total Height Fallen (max length) :<b>\ " + totalHeight +
                        "</b><br>\Total Energy :<b>\ " + totalEnergy +
                        "</b><br>\Tension at bottom :<b>\ " + totalTension +
                        "</b><br>\Max Acceleration :<b>\ " + maxAcc +
                        "</b><br>\Height (after the rope starts stretching) at which the jumper is moving the fastest :<b>\ " + fastestHeight +
                        "</b><br>\Potential Energy at the fastest point in jump :<b>\ " + potentialEnergy +
                        "</b><br>\Kinetic Energy at the fastest point in jump :<b>\ " + kineticEnergy +
                        "</b><br>\Work Lost :<b>\ " + workLost +
                        "</b><br>\Fastest Speed :<b>\ " + fastestSpeed)
}

// gets total stretch by setting it as a quadratic
function stretchLength(mass, gravity, length, constant) {
    // simplified GPE = PEelastic
    var a = constant/2;
    var b = -1 * (mass * gravity);
    var c = b * length;
    
    return quadraticFormula(a, b, c);
}

// quadratic solver - credit Nina Scholz
function quadraticFormula(a, b, c) {
    return (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a);
}

// sets all input boxes to blank
function reset() {
    Object.keys(inputs).forEach(key => {
        inputs[key].value = "";
    });
}
