import {expect, test} from 'vitest'
import {Rect} from './marks'



class Test {
    x: number
    y: number

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

test('test stuff', () => {

    let x = new Test( ...{y: 10, x: 20 });

    console.log(x)

})