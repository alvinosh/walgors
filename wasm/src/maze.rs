use wasm_bindgen::prelude::*;

use crate::get_neighbors_maze;
use crate::random;
use crate::remove_wall;
use crate::world::Cells;
use crate::world::World;
use std::collections::HashSet;
use std::collections::VecDeque;

#[wasm_bindgen]
pub struct Maze {
    current: usize,
    stack: VecDeque<usize>,
    visited: HashSet<usize>,
}

#[wasm_bindgen]
impl Maze {
    pub fn new(world: &mut World) -> Self {
        let stack = VecDeque::from([world.start]);
        let mut visited = HashSet::new();
        visited.insert(world.start);

        world.fill(Cells::Wall);

        Self {
            current: world.start,
            stack,
            visited,
        }
    }

    pub fn tick(&mut self, world: &mut World) -> bool {
        if let Some(cell_idx) = self.stack.pop_back() {
            self.current = cell_idx;

            let mut nbors = get_neighbors_maze(world, cell_idx);

            loop {
                if nbors.len() == 0 {
                    break;
                }

                let rnd_idx = (random() * nbors.len() as f64).floor() as usize;
                let n = nbors[rnd_idx];

                if !self.visited.contains(&n) {
                    self.stack.push_back(cell_idx);
                    remove_wall(world, cell_idx, n);
                    self.visited.insert(n);
                    self.stack.push_back(n);
                    break;
                } else {
                    if let Some(idx) = nbors.iter().position(|val| *val == n) {
                        nbors.remove(idx);
                    }
                }
            }
        } else {
            return true;
        }
        return false;
    }
}
