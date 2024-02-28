function left () {
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P16, speed)
    pins.analogWritePin(AnalogPin.P15, 0)
}
function stopdrive () {
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P16, 0)
    pins.analogWritePin(AnalogPin.P15, 0)
}
function backward () {
    pins.analogWritePin(AnalogPin.P14, 0)
    pins.analogWritePin(AnalogPin.P13, speed)
    pins.analogWritePin(AnalogPin.P16, 0)
    pins.analogWritePin(AnalogPin.P15, speed)
}
function forward () {
    pins.analogWritePin(AnalogPin.P14, speed)
    pins.analogWritePin(AnalogPin.P13, 0)
    pins.analogWritePin(AnalogPin.P16, speed)
    pins.analogWritePin(AnalogPin.P15, 0)
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    stop = !(stop)
})
function getShowDist () {
    distance = (makerbit.getUltrasonicDistance(DistanceUnit.CM) + makerbit.getUltrasonicDistance(DistanceUnit.CM)) / 2
    OLED12864_I2C.showString(
    0,
    0,
    "     ",
    1
    )
    OLED12864_I2C.showNumber(
    0,
    0,
    distance,
    1
    )
}
let distance = 0
let speed = 0
let stop = false
makerbit.connectUltrasonicDistanceSensor(DigitalPin.P12, DigitalPin.P9)
led.enable(false)
OLED12864_I2C.init(60)
OLED12864_I2C.clear()
OLED12864_I2C.zoom(true)
stop = true
let state = 1
let minDist = 8
let maxDist = 10
speed = 500
basic.forever(function () {
    getShowDist()
    if (stop) {
        stopdrive()
    } else if (state == 1) {
        if (distance <= minDist) {
            stopdrive()
            state = 2
        } else {
            forward()
        }
    } else if (state == 2) {
        if (distance >= maxDist) {
            stopdrive()
            state = 3
        } else {
            backward()
        }
    } else if (state == 3) {
        left()
        basic.pause(500)
        state = 1
    } else {
        state = 1
    }
})
