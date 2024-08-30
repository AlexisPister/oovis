import {expect, test} from 'vitest'
import {Rect} from './marks'


test('retrieve rect attributes', () => {

    // let rect = new Rect(10, d => d * 30, 100, 300, {fill: "red"});
    let rect = new Rect({x: 10, y: d => d * 30, width: 100, height: 10}, {fill: "red"});
    // console.log(rect.getChildClassProperties());
    console.log(rect.datumToMark(20));
})