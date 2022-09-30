use std::{collections::HashMap, iter::Map};
use wasm_bindgen::prelude::*;

use crate::{get_neighbors, log, log_label, log_labelf, log_usize, world::World};

#[wasm_bindgen]
struct Astar {
    start: usize,
    end: usize,
    open: Vec<usize>,
    came_from: HashMap<usize, usize>,
    gscore: Vec<f64>,
    fscore: Vec<f64>,
    latest: isize,
}

#[wasm_bindgen]
impl Astar {
    pub fn new(world: &World) -> Self {
        let start = world.start;
        let end = world.end;
        let mut gscore = vec![f64::MAX; world.get_world().len()];
        gscore[start] = 0f64;
        let mut fscore = vec![f64::MAX; world.get_world().len()];
        fscore[start] = Astar::h(world, start, end);

        Self {
            open: vec![start],
            came_from: HashMap::new(),
            gscore,
            fscore,
            start,
            end,
            latest: -1,
        }
    }

    pub fn do_path(&mut self, world: &mut World) -> bool {
        let idx = self.came_from.get(&(self.latest as usize)).unwrap();
        world.set_path(*idx);
        self.latest = *idx as isize;
        return *idx == self.start;
    }

    pub fn tick(&mut self, world: &mut World) -> bool {
        if self.open.len() == 0 {
            return true;
        }

        let current = find_min_index(&self.open, &self.fscore);
        if current == self.end {
            if (self.latest == -1) {
                self.latest = current as isize;
            }
            return self.do_path(world);
        }

        if let Some(idx) = self.open.iter().position(|val| *val == current) {
            self.open.remove(idx);
        }
        world.set_closed(current);

        for n in get_neighbors(world, current) {
            let tentative_gscore = self.gscore[current] + 1f64;

            if tentative_gscore < self.gscore[n] {
                // This path to neighbor is better than any previous one. Record it!
                self.came_from.insert(n, current);
                self.gscore[n] = tentative_gscore;
                self.fscore[n] = tentative_gscore + Astar::h(world, n, self.end);
                if let None = self.open.iter().find(|x| **x == n) {
                    self.open.push(n);
                    world.set_open(n);
                }
            }
        }

        return false;
    }

    fn h(world: &World, start: usize, end: usize) -> f64 {
        world.dist(start, end)
    }
}
fn find_min_index(set: &Vec<usize>, vals: &Vec<f64>) -> usize {
    let mut min_idx = set[0];
    for idx in set.iter() {
        if vals[*idx] < vals[min_idx] {
            min_idx = *idx;
        }
    }

    min_idx
}
