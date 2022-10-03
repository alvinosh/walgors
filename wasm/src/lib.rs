use std::vec;

use wasm_bindgen::prelude::*;
use world::{Cells, World};

mod astar;
mod world;

pub struct Coord {
    pub x: usize,
    pub y: usize,
}

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    pub fn log(s: &str);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    pub fn log_label(s: &str, a: usize);
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    pub fn log_labeli(s: &str, a: isize);
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    pub fn log_labelf(s: &str, a: f64);
    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    pub fn log_usize(a: usize);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    pub fn log_many(a: &str, b: &str);
}

pub fn get_idx(world: &World, coords: &Coord) -> Option<usize> {
    let idx = coords.y * world.width + coords.x;
    if idx < world.get_world().len() {
        Some(idx)
    } else {
        None
    }
}

pub fn get_neighbors(world: &World, idx: usize) -> Vec<usize> {
    let coords = get_coords(world, idx);

    let mut output = vec![];
    for x in -1..=1 {
        for y in -1..=1 {
            let cx = coords.x as isize + x as isize;
            let cy = coords.y as isize + y as isize;

            if x == 0 && y == 0 {
                continue;
            };

            if (y as i32).abs() == (x as i32).abs() {
                continue;
            }

            if cx < 0 || cx >= world.width as isize || cy < 0 || cy >= world.height as isize {
                continue;
            }

            let coord = Coord {
                x: cx as usize,
                y: cy as usize,
            };

            if let Some(val) = get_idx(world, &coord) {
                if world.get_world()[val] != Cells::Wall as u8 {
                    output.push(val)
                }
            }
        }
    }

    return output;
}

pub fn get_coords(world: &World, pos: usize) -> Coord {
    let x = pos % world.width;
    let y = (pos - x) / world.width;

    Coord { x, y }
}
