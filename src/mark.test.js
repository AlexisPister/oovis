// sum.test.js
import {expect, test} from 'vitest'
import {Rect} from './marks'


test('retrieve rect attributes', () => {

    let rect = new Rect(10, 20, 100, 300);
    console.log(rect.getChildClassProperties());
})