import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('day');
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Design Review',
      start: new Date().setHours(9, 0),
      end: new Date().setHours(10, 0),
      category: 'marketing'
    },
    {
      id: 2,
      title: 'Team Meeting',
      start: new Date().setHours(14, 0),
      end: new Date().setHours(15, 30),
      category: 'development'
    }
  ]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (view === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (view === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const handleTimeSlotClick = (hour) => {
    setSelectedTimeSlot(hour);
    setShowEventModal(true);
  };

  const formatTime = (hour) => {
    return hour === 0 ? '12 AM' : 
           hour < 12 ? `${hour} AM` : 
           hour === 12 ? '12 PM' : 
           `${hour - 12} PM`;
  };

  const getEventPosition = (event) => {
    const startHour = new Date(event.start).getHours();
    const startMinutes = new Date(event.start).getMinutes();
    const endHour = new Date(event.end).getHours();
    const endMinutes = new Date(event.end).getMinutes();
    
    const top = (startHour + startMinutes / 60) * 60;
    const height = ((endHour + endMinutes / 60) - (startHour + startMinutes / 60)) * 60;
    
    return { top, height };
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="calendar-navigation">
          <button className="nav-btn" onClick={() => navigateDate('prev')}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <h3>{currentDate.toLocaleDateString('en-US', { 
            month: 'long',
            year: 'numeric',
            day: view === 'month' ? undefined : 'numeric'
          })}</h3>
          <button className="nav-btn" onClick={() => navigateDate('next')}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <div className="view-options">
          <button 
            className={`view-btn ${view === 'day' ? 'active' : ''}`}
            onClick={() => setView('day')}
          >
            Day
          </button>
          <button 
            className={`view-btn ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
          >
            Week
          </button>
          <button 
            className={`view-btn ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
          >
            Month
          </button>
        </div>
      </div>

      <div className="time-grid">
        {Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="time-slot" onClick={() => handleTimeSlotClick(i)}>
            <div className="time-label">
              {formatTime(i)}
            </div>
            <div className="time-content">
              {events.map(event => {
                const eventDate = new Date(event.start);
                if (eventDate.getHours() === i) {
                  const { top, height } = getEventPosition(event);
                  return (
                    <div
                      key={event.id}
                      className={`event-card ${event.category}`}
                      style={{
                        top: `${top}%`,
                        height: `${height}%`
                      }}
                    >
                      <span className="event-time">
                        {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <h4>{event.title}</h4>
                      <span className="event-category">{event.category}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>

      {showEventModal && (
        <div className="event-modal">
          <div className="modal-content">
            <h3>Create New Event</h3>
            <button className="close-btn" onClick={() => setShowEventModal(false)}>
              <i className="fas fa-times"></i>
            </button>
            <form>
              <div className="form-group">
                <label>Title</label>
                <input type="text" placeholder="Event title" />
              </div>
              <div className="form-group">
                <label>Time</label>
                <div className="time-inputs">
                  <input type="time" />
                  <span>to</span>
                  <input type="time" />
                </div>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select>
                  <option value="marketing">Marketing</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowEventModal(false)}>Cancel</button>
                <button type="submit">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
