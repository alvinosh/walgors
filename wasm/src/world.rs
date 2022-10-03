use std::cell::Cell;

use wasm_bindgen::prelude::*;

use crate::get_coords;

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
    pub width: usize,
    pub height: usize,
    pub start: usize,
    pub end: usize,
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
        maze: bool,
    ) -> Self {
        console_error_panic_hook::set_once();

        let mut cells = vec![
            if maze {
                Cells::Wall as u8
            } else {
                Cells::Empty as u8
            };
            (width * height) as usize
        ];
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

    pub fn dist(&self, start: usize, end: usize) -> f64 {
        let s = get_coords(self, start);
        let e = get_coords(self, end);
        let dx = (e.x as f64 - s.x as f64).abs();
        let dy = (e.y as f64 - s.y as f64).abs();
        return (dx * dx + dy * dy).sqrt();
    }

    pub fn set_start(&mut self, idx: usize) {
        if idx != self.start && idx != self.end {
            self.cells[self.start] = Cells::Empty as u8;
            self.cells[idx] = Cells::Start as u8;
            self.start = idx;
        }
    }
    pub fn set_end(&mut self, idx: usize) {
        if idx != self.start && idx != self.end {
            self.cells[self.end] = Cells::Empty as u8;
            self.cells[idx] = Cells::End as u8;
            self.end = idx;
        }
    }
    pub fn set_empty(&mut self, idx: usize) {
        if idx != self.start && idx != self.end {
            self.cells[idx] = Cells::Empty as u8;
        }
    }

    pub fn set_wall(&mut self, idx: usize) {
        if idx != self.start && idx != self.end {
            self.cells[idx] = Cells::Wall as u8;
        }
    }
    pub fn set_open(&mut self, idx: usize) {
        if idx != self.start && idx != self.end {
            self.cells[idx] = Cells::Open as u8;
        }
    }

    pub fn set_closed(&mut self, idx: usize) {
        if idx != self.start && idx != self.end {
            self.cells[idx] = Cells::Closed as u8;
        }
    }

    pub fn set_path(&mut self, idx: usize) {
        if idx != self.start && idx != self.end {
            self.cells[idx] = Cells::Path as u8;
        }
    }

    pub fn clear(&mut self) {
        for cell in self.cells.iter_mut() {
            if *cell == Cells::Path as u8
                || *cell == Cells::Closed as u8
                || *cell == Cells::Open as u8
            {
                *cell = Cells::Empty as u8;
            }
        }
    }

    pub fn fill(&mut self, fill_cell: Cells) {
        for cell in self.cells.iter_mut() {
            if *cell != Cells::Start as u8 && *cell != Cells::End as u8 {
                *cell = fill_cell as u8;
            }
        }
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
