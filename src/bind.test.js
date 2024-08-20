// sum.test.js
import {expect, test} from 'vitest'
import {Binder} from './bind.ts'


let data = [
    {id: 1, name: "Adrian"},
    {id: 2, name: "Bob"},
    {id: 3, name: "Alice"},
    {id: 4, name: "Jenny"},
    {id: 5, name: "Adrian"},
]

let newData = [
    {id: 1, name: "Adrian"},
    {id: 2, name: "Bob"},
    {id: 5, name: "Julia"},
    {id: 6, name: "Tintin"},
]

test('update data by id', () => {
    let binder = new Binder(data);

    let {enteredData, updatedData, removedData} = binder.updateData(newData, (d) => d.id)

    expect(enteredData).toEqual([{id: 6, name: "Tintin"}]);
    expect(updatedData).toEqual([
        {id: 1, name: 'Adrian'},
        {id: 2, name: 'Bob'},
        {id: 5, name: 'Julia'}
    ])
    expect(removedData).toEqual([{id: 3, name: 'Alice'}, {id: 4, name: 'Jenny'}])
})

test('update data by datum', () => {
    let binder = new Binder(data);

    let {enteredData, updatedData, removedData} = binder.updateData(newData, (d, i) => d)

    console.log(enteredData, updatedData, removedData)

    expect(enteredData).toEqual([]);
    expect(updatedData).toEqual([
        {id: 1, name: 'Adrian'},
        {id: 2, name: 'Bob'},
        {id: 5, name: 'Julia'}
    ])
    expect(removedData).toEqual([{id: 3, name: 'Alice'}, {id: 4, name: 'Jenny'}])
})