// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    allAppointmentsList: [],
    filteredAppointmentsList: [],
    title: '',
    date: '',
    isStarredSelected: false,
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isFavorite: false,
    }

    this.setState(prevState => ({
      isStarredSelected: false,
      allAppointmentsList: [...prevState.allAppointmentsList, newAppointment],
      filteredAppointmentsList: [
        ...prevState.allAppointmentsList,
        newAppointment,
      ],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  toggleIsFavorite = id => {
    const {isStarredSelected, allAppointmentsList} = this.state

    let modifiedAppointments = allAppointmentsList.map(eachAppointment => {
      if (id === eachAppointment.id) {
        return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
      }
      return eachAppointment
    })

    this.setState({
      allAppointmentsList: modifiedAppointments,
    })

    if (isStarredSelected) {
      modifiedAppointments = modifiedAppointments.filter(
        eachAppointment => eachAppointment.isFavorite,
      )
    }

    this.setState({
      filteredAppointmentsList: modifiedAppointments,
    })
  }

  onClickStarred = () => {
    const {isStarredSelected, allAppointmentsList} = this.state

    let filteredItems = allAppointmentsList

    if (!isStarredSelected) {
      // If starred selected
      filteredItems = allAppointmentsList.filter(
        eachAppointment => eachAppointment.isFavorite,
      )
    }

    this.setState({
      isStarredSelected: !isStarredSelected,
      filteredAppointmentsList: filteredItems,
    })
  }

  render() {
    const {
      filteredAppointmentsList,
      title,
      date,
      isStarredSelected,
    } = this.state

    const activeBtnClassName = isStarredSelected ? 'active-btn' : ''

    return (
      <div className="appointments-app-container">
        <div className="appointments-card-container">
          <div className="first-part-container">
            <div className="input-container">
              <h1 className="heading">Add Appointment</h1>
              <form
                className="appointment-form-container"
                onSubmit={this.onAddAppointment}
              >
                <label htmlFor="name-input" className="name-input">
                  TITLE
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={this.onChangeTitle}
                  className="input"
                  id="name-input"
                  placeholder="title"
                />
                <label htmlFor="date-input" className="name-input">
                  DATE
                </label>
                <input
                  type="date"
                  className="input"
                  id="date-input"
                  value={date}
                  onChange={this.onChangeDate}
                  placeholder="date"
                />
                <div>
                  <button type="submit" className="button">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="horizontal-line" />

          <div className="appointments-bottom-container">
            <div className="heading-container">
              <h1 className="bottom-heading">Appointments</h1>
              <button
                type="button"
                className={`starred-btn ${activeBtnClassName}`}
                onClick={this.onClickStarred}
              >
                Starred
              </button>
            </div>

            <ul className="appointment-table">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsFavorite={this.toggleIsFavorite}
                  //   deleteIsNotStarred={this.deleteIsNotStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
