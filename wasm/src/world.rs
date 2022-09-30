use std::cell::Cell;

use wasm_bindgen::prelude::*;

use crate::{log, log_u32};

#[repr(C)]
#[wasm_bindgen]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cells {
    Empty = 0,
    Path = 1,
    Wall = 2,
    Start = 3,
    End = 4,
    Open = 5,
    Closed = 6,
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct World {
    width: usize,
    height: usize,
    start: usize,
    end: usize,
    cells: Vec<u8>,
}

#[wasm_bindgen]
impl World {
    pub fn new(
        width: usize,
        height: usize,
        start_x: usize,
        start_y: usize,
        end_x: usize,
        end_y: usize,
    ) -> Self {
        console_error_panic_hook::set_once();

        let mut cells = vec![Cells::Empty as u8; (width * height) as usize];
        let start = (start_y * width + start_x) as usize;
        let end = (end_y * width + end_x) as usize;

        cells[start] = Cells::Start as u8;
        cells[end] = Cells::End as u8;
        Self {
            width,
            height,
            cells,
            start,
            end,
        }
    }

    pub fn set_start(&mut self, idx: usize) {
        self.cells[self.start] = Cells::Empty as u8;
        self.cells[idx] = Cells::Start as u8;
        self.start = idx;
    }

    #[wasm_bindgen]
    pub fn get_width(&self) -> usize {
        self.width
    }

    #[wasm_bindgen]
    pub fn get_height(&self) -> usize {
        self.height
    }

    #[wasm_bindgen]
    pub fn get_world(&self) -> Vec<u8> {
        self.cells.clone()
    }
}
