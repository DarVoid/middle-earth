#[macro_use] extern crate rocket;
	
use rocket::serde::{Serialize, Deserialize, json::Json};
use chrono::{DateTime, Utc};
use rocket::State;

#[derive(Serialize, Deserialize, Clone)]
#[serde(crate = "rocket::serde")]
struct Ticket {
    id: String,
    date: DateTime<Utc>,
}

struct Store {
    tickets: Vec<Ticket>,
}

impl Store {
    fn new() -> Self {
        Self {
            tickets: vec![],
        }
    }
}

#[get("/ticket")]
fn ticket() -> Json<Ticket> {
    Json(Ticket {
        id: "234678972368".into(),
        date: Utc::now(),
    })
}

#[post("/tickets", data = "<ticket>")]
fn new(ticket: Json<Ticket>, store: &State<Store>) {
    &store.tickets.push(ticket.0.clone());
}

#[get("/")]
fn index() -> &'static str {
    "Hello world!"
}

#[launch]
fn rocket() -> _ {
    let store = Store::new();

    rocket::build()
        .manage(store)
        .mount("/", routes![
            index,
            ticket,
        ])
}
