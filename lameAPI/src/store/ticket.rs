use chrono::{DateTime, Utc};
use rocket::serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "rocket::serde")]
pub struct Ticket {
    pub id: String,
    pub date: DateTime<Utc>,
}
