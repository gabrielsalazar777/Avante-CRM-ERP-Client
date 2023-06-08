import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { get, post } from '../services/authService';
import { SketchPicker } from 'react-color';

const CalendarDash = () => {
   const [dates, setDates] = useState([]);
   const [color, setColor] = useState();
   const [clickedEvent, setClickedEvent] = useState();

   const getDates = () => {
      get('/projects/dates')
         .then((response) => {
            setDates(response.data);
         })
         .catch((err) => console.log(err));
   };

   const handleColor = (newColor) => {
      setColor(newColor);
   };

   const handleEventClick = (e) => {
      setClickedEvent(e.event.id);
      setColor(e.event.extendedProps.color);
   };

   const handlePickerClose = () => {
      // const newDates = dates.map((date) => {
      //    if (date._id === clickedEvent) {
      //       return { ...date, color: color };
      //    }
      //    return date;
      // });
      post('/projects/dates', { id: clickedEvent, color: color })
         .then(() => {
            getDates();
         })
         .then(() => {
            setClickedEvent(null);
         });
      // setDates(newDates);
   };

   useEffect(() => {
      getDates();
   }, []);

   return (
      <div className="container">
         <div className="row d-flex align-items-center space-above">
            <div className="col-8">
               {dates.length ? (
                  <FullCalendar
                     className="calendar"
                     plugins={[dayGridPlugin]}
                     events={dates.map((date) => ({
                        id: date._id.toString(),
                        title: date.name,
                        start: new Date(date.startDate),
                        end: new Date(date.endDate),
                        color: date.color,
                        extendedProps: { color: date.color },
                     }))}
                     displayEventTime={false}
                     eventClick={handleEventClick}
                  />
               ) : (
                  <p>
                     Please create projects and attach dates to see projects on the
                     calendar.
                  </p>
               )}
            </div>
            <div className="col-4 d-flex justify-content-center">
               {clickedEvent && (
                  <div>
                     <button onClick={handlePickerClose}>X</button>
                     <SketchPicker
                        color={color}
                        onChange={(color) => handleColor(color.hex)}
                     />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default CalendarDash;
