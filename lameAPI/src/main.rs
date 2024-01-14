mod store;

#[macro_use] extern crate rocket;

use rocket::serde::json::Json;
use chrono::Utc;
use rocket::http::ext::IntoCollection;
use rocket::State;
use crate::store::Store;
use crate::store::ticket::Ticket;

#[get("/tickets")]
fn tickets(store: &State<Store>) -> Json<Vec<Ticket>> {
    let ticket_store = store.tickets.lock().unwrap();
    Json(ticket_store.to_vec())
}

#[get("/tickets/<id>")]
fn ticket(id: &str, store: &State<Store>) -> Json<Ticket> {
    let ticket_store = store.tickets.lock().unwrap();
    let tickets: Vec<Ticket> = ticket_store.iter()
        .filter(|ticket| ticket.id == id)
        .cloned().collect();
    Json(tickets.first().unwrap().clone())
}

#[post("/tickets", data = "<ticket>")]
fn new(ticket: Json<Ticket>, store: &State<Store>) {
    let mut ticket_store = store.tickets.lock().unwrap();
    ticket_store.push(ticket.0)
}

#[get("/")]
fn index() -> &'static str {
    "Hello world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .manage(Store::new())
        .mount("/", routes![
            index,
            ticket,
            tickets,
            new,
        ])
}
