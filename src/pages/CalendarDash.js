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
      const newDates = dates.map((date) => {
         if (date._id === clickedEvent) {
            return { ...date, color: color };
         }
         return date;
      });
      post('/projects/dates', { id: clickedEvent, color: color })
         .then((response) => {
            console.log('tried closing');
            console.log(response);
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
         <h1>CalendarDash</h1>
         {clickedEvent && (
            <>
               <button onClick={handlePickerClose}>X</button>
               <SketchPicker color={color} onChange={(color) => handleColor(color.hex)} />
            </>
         )}
         {dates.length && (
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
         )}
      </div>
   );
};

export default CalendarDash;
