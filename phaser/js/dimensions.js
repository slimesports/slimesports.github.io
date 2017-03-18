var dimensions = {
    screen: {
        height: 400,
        width: 800
    },
    game: {
        gravity: 2000,
        restitution: 0.1
    },
    ball: {
        diameter: 25,
        radius: 12.5,
        top: 200,
        left: 200
    },
    court: {
        height: 80,
        width: 800,
        top: 320, // screen.height - court.height
        left: 0,
        color: 0x888888
    },
    leftGoaltending: {
        height: 5,
        width: 85,
        top: 322, // screen.height - court.height + 2
        left: 0,
        color: 0xFFFFFF
    },
    rightGoaltending: {
        height: 5,
        width: 85,
        top: 322, // screen.height - court.height + 2
        left: 715, // dimensions.court.width - dimensions.goaltending.width
        color: 0xFFFFFF
    },
    halfcourt: {
        height: 7,
        width: 7,
        top: 322, // screen.height - court.height + 2
        left: 397, // (screen.width / 2) - (halfcourt.width / 2)
        color: 0xFFFFFF
    },
    slime: {
        radius: 40,
        left: 100,
        top: 300,
        gravity: 1000
    },
    backboard: {
        height: 80, // 60
        width: 7, // 5
        top: 200,
        left: 24 // rim.left - backboard.width / 2
    },
    rim: {
        height: 5, // 3
        width: 55, // 41
        top: 215, // 160
        left: 27
    },
    net: {
        height: 25,
        width: 50
    }
};