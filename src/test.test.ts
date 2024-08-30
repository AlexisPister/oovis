import {expect, test} from 'vitest'
import {Rect} from './marks'



class Test {
    x: number
    y: number

    constructor({x, y}, style) {
        this.x = x;
        this.y = y;
    }
}


function testArgs(...args) {
    for (let x of args) {
        console.log(x)
    }
}

function testObj(...{x, y, z}) {
    console.log(x, y, z)
}

test('test stuff', () => {

    let x = new Test( {y: 10, x: 20 }, {});
    console.log(x)


    // testArgs(10, 20 ,30)
    // testObj({x: 10, y: 20, width: 100}, {fill: "red"})
})