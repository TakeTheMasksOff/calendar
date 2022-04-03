import React, { useState } from "react";
import "./styles.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
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
				const data = await res.json();
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
			<div style={{ padding: "15px" }}>
				<label htmlFor="date">Date</label>
				<input name="date" value={dateInput} placeholder="YYYY-MM-DD" onChange={handleDateChange} />
				<label htmlFor="start-time">Start time</label>
				<input name="start-time" value={startTimeInput} placeholder="HH:MM" onChange={handleStartTimeChange} />
				<label htmlFor="name">Event name</label>
				<input name="name" value={nameInput} placeholder="event name" onChange={handleNameChange} />
				<select onChange={selectEventType}>
					<option value=""></option>
					<option value="educational">educational</option>
					<option value="social">social</option>
					<option value="recreational">recreational</option>
					<option value="event">event</option>
				</select>
				<button onClick={addEvent}>add smth</button>
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
				{/* <FullCalendar
				defaultView="dayGridMonth"
				// themeSystem="Simplex"
				// header={{
				//   left: "prev,next",
				//   center: "title",
				//   right: "dayGridMonth,timeGridWeek,timeGridDay",
				// }}
				plugins={[dayGridPlugin]}
				events={events}
				displayEventEnd="true"
				eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
			/> */}
			</div>
		</>
	);
}
