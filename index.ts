import {bind} from "./src/bind.ts";
import {Group, Line, Rect} from "./src/marks";

let canvas = document.querySelector("canvas");

let vis = bind(
    canvas, [10, 20, 30],
    new Rect({x: d => d * 5, y: 20, width:30, height:40}, {}),
    new Group(
        new Rect({x: 100 , y: d => d * 3, width: 10, height:10}),
        new Line( 10, 20, 100, d => d * 4)
    )
);

// let r = new Rect({x: 2, y: 20, width:30, height:40}, {})

vis.update([10, 20, 100]);


// let vis = bind(
//     canvas, [10, 20, 30],
//     new Rect(d => d * 4 , 20, 30, 40),
//     new Rect(d => d * 4 , 20, 30, 40).update(null, 20),
//     new Rect({x: d => d * 4 , y: 20}).update({z: 2000}),
//     new Group(
//         new Rect(),
//         new Line(),
//         new Text(),
//     ).on("mouseover", (d, mark) => {
//             mark.y = 20;
//             mark.rect.x = 20;
//
//         }, true),
//     new Nested(
//         d => d.x,
//         new Rect((d, parent) => )
//     )
//
//     [d => d.subArray,
//     new Rect()]
// );



// vis.update([20, 10, 1000])



// Rect(10, 20, 10);
// bind(canvas, [...],
//     Rect(10, 20, 40),
//     Circle(
//         x = d => d.x,
//         y = 20,
//         z = (enter, update) => {
//             return enter(x = 10, y = 20)
//         },
//         fill = (exit)
//     ),
//     Rect(
//         enter => {
//             {
//                 x = 10, y = 20
//             }
//         },
//         update => {
//             {
//                 y = 30
//             }
//         },
//         exit => {
//         }
//     ),
//     Group(
//         Rect(10, 20, 40),
//         Circle(20),
//     ),
//     (d => d.subArray,
//         Rect((d, parent) => 10, 20),
//     )
//     // Child(d => d.subArray,
//     //     Rect((d, parent) => 10, 20)
//     // )
// )
