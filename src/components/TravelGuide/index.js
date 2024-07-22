import './index.css'

const TravelGuide = props => {
  const {details} = props
  const {name, imageUrl, description} = details
  return (
    <li className="guide-list">
      <img src={imageUrl} alt={name} className="guide-image" />
      <h1 className="name">{name}</h1>
      <p className="description">{description}</p>
    </li>
  )
}
export default TravelGuide
