import {bind} from "./src/bind.ts";
import {Rect} from "./src/marks";

let canvas = document.querySelector("canvas");

bind(
    canvas, [10, 20, 30],
    new Rect(10, 20, 30, 40),
    // new Circle()
);



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
