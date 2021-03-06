import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import './main.scss' // webpack must be configured to do this

export default class DemoApp extends React.Component {

    state = {
        events: ""
    }

    componentDidMount = () => {
        this.sortAppts()
    }

    sortAppts = () => {
        var apptArray = []
        var event = ""
        for (var i = 0; i < this.props.appointments.length; i++) {

            event = {
                title: this.props.appointments[i].time,
                date: this.props.appointments[i].date
            }

            apptArray.push(event)

        }
        // setTimeout(() => {
            this.setState({
                events: apptArray
            })
        // }, 1000)
    }

    render() {
        return (
            <div className="card" style={{height: '420px', width: '400px'}}>
            <FullCalendar
                defaultView="dayGridMonth" 
                plugins={[dayGridPlugin]}
                // plugins={calendarPlugins}
                weekends={true}
                events={this.state.events}
            />
            </div>
        )
    }

}
