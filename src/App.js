import React, { useState } from "react";
import "./styles.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import events, { getDate } from "./events";

export default function App() {
	const [calendarEvents, setCalendarEvents] = useState([]);
	const [dateInput, setDateInput] = useState("");
	const [startTimeInput, setStartTimeInput] = useState("");
	const [nameInput, setNameInput] = useState("");

	const handleNameChange = (e) => {
		setNameInput(e.target.value);
	};
	const handleStartTimeChange = (e) => {
		setStartTimeInput(e.target.value);
	};
	const handleDateChange = (e) => {
		setDateInput(e.target.value);
	};
	const selectEventType = (e) => {
		if (e.target.value === "") return;

		let name = "";
		fetch(`https://scheduler-vjabrayilov.herokuapp.com/${e.target.value}`).then(async (res) => {
			if (res.status == 200) {
				const data = await res.text();
				console.log(data);
				setNameInput(data);
			}
		});
	};
	const addEvent = () => {
		setCalendarEvents([...calendarEvents, { id: 1, title: nameInput, start: dateInput + "T" + startTimeInput }]);
	};
	return (
		<>
			<div style={{ padding: "10px" }}>
				<label htmlFor="date">Date</label>
				<input
					style={{ marginLeft: "10px", marginRight: "30px" }}
					name="date"
					value={dateInput}
					placeholder="YYYY-MM-DD"
					onChange={handleDateChange}
				/>
				<label htmlFor="start-time">Start time</label>
				<input
					style={{ marginLeft: "10px" }}
					name="start-time"
					value={startTimeInput}
					placeholder="HH:MM"
					onChange={handleStartTimeChange}
				/>
			</div>
			<div style={{ padding: "10px" }}>
				<label htmlFor="name">Event name</label>
				<input
					style={{ marginLeft: "10px", marginRight: "30px", width: "345px" }}
					name="name"
					value={nameInput}
					placeholder="event name"
					onChange={handleNameChange}
				/>
				<label htmlFor="event-time">Event type</label>
				<select style={{ marginLeft: "10px" }} name="event-type" onChange={selectEventType}>
					<option value=""></option>
					<option value="educational">educational</option>
					<option value="social">social</option>
					<option value="recreational">recreational</option>
					<option value="event">event</option>
				</select>
			</div>
			<div style={{ padding: "10px" }}>
				<button onClick={addEvent}>Add event</button>
			</div>
			<div className="App">
				<FullCalendar
					defaultView="dayGridMonth"
					header={{
						left: "prev,next",
						center: "title",
						right: "dayGridMonth,timeGridWeek,timeGridDay",
					}}
					themeSystem="Simplex"
					plugins={[dayGridPlugin]}
					events={calendarEvents}
				/>
			</div>
		</>
	);
}
