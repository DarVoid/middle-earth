pub mod ticket;

use std::sync::Mutex;
use crate::store::ticket::Ticket;

pub struct Store {
    pub tickets: Mutex<Vec<Ticket>>,
}

impl Store {
    pub fn new() -> Self {
        Self {
            tickets: Mutex::new(vec![]),
        }
    }
}
