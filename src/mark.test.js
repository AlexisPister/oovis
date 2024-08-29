import {expect, test} from 'vitest'
import {Rect} from './marks'


test('retrieve rect attributes', () => {

    let rect = new Rect(10, d => d * 30, 100, 300, {fill: "red"});
    // console.log(rect.getChildClassProperties());
    console.log(rect.datumToMark(20));
})