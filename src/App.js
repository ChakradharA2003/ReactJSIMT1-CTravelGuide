import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelGuide from './components/TravelGuide/index'
import './App.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

// Replace your code here
class App extends Component {
  state = {
    apiStatus: apiConstants.initial,
    travelGuides: [],
  }

  componentDidMount() {
    this.getTravelGuideDetails()
  }

  getTravelGuideDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data.packages)
    const caseConvertedData = data.packages.map(pack => ({
      id: pack.id,
      description: pack.description,
      name: pack.name,
      imageUrl: pack.image_url,
    }))
    this.setState({
      travelGuides: caseConvertedData,
      apiStatus: apiConstants.success,
    })
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {travelGuides} = this.state
    return (
      <ul className="travel-guides-list">
        {travelGuides.map(each => (
          <TravelGuide key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.loadingView()
      case apiConstants.success:
        return this.successView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="heading">Travel Guide</h1>
        {this.renderView()}
      </div>
    )
  }
}

export default App
