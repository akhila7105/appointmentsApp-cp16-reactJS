// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsFavorite} = props
  const {id, title, date, isFavorite} = appointmentDetails

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointments-row">
      <div className="title-date-container">
        <p className="title">{title}</p>
        <p className="date">Date: {date}</p>
      </div>
      <button
        data-testid="star"
        type="button"
        className="favorite-icon-container"
        onClick={onClickFavoriteIcon}
      >
        <img src={starImgUrl} className="favorite-icon" alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
