import {Component} from 'react'
import TabItem from '../TabItem'
import ImageButtonItem from '../ImageButtonItem'
import './index.css'

class MatchGame extends Component {
  state = {
    activeTab: 'FRUIT',
    activeImageId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
    score: 0,
    time: 60,
    isGameRunning: true,
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onThumbnailClicked = id => {
    const {activeImageId} = this.state
    if (id === activeImageId) {
      this.setState(prevState => ({
        score: prevState.score + 1,
      }))
      this.getRandomImageUrl()
    } else {
      this.clearTimeInterval()
      this.setState({isGameRunning: false, time: 0})
    }
  }

  tick = () => {
    const {time} = this.state
    if (time !== 0) {
      this.setState(prevState => ({time: prevState.time - 1}))
    } else {
      this.timeIsUp()
    }
  }

  clearTimeInterval = () => {
    clearInterval(this.timerId)
  }

  getRandomImageUrl = () => {
    const {imagesList} = this.props
    const index = Math.ceil(Math.random() * imagesList.length - 1)
    console.log(index)
    const imgObj = imagesList[index]
    this.setState({activeImageId: imgObj.id})
  }

  onTabChange = tabId => {
    this.setState({activeTab: tabId})
  }

  timeIsUp = () => {
    this.clearTimeInterval(this.timerId)
    this.setState({isGameRunning: false, time: 0})
  }

  onPlayAgain = () => {
    this.setState({isGameRunning: true, score: 0, time: 60})
    this.timerId = setInterval(this.tick, 1000)
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {activeTab, activeImageId, score, time, isGameRunning} = this.state
    const randomImageList = imagesList.filter(
      eachObj => eachObj.id === activeImageId,
    )
    const {imageUrl} = randomImageList[0]
    const filteredList = imagesList.filter(
      eachObj => eachObj.category === activeTab,
    )
    return (
      <div className="app-container">
        <ul className="navbar">
          <li className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
              alt="website logo"
              className="logo-styles"
            />
          </li>
          <li className="score-timer-container">
            <p className="score-text">
              Score: <span className="highlighted-text">{score}</span>
            </p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
              className="timer-icon-styles"
            />
            <p className="highlighted-text remaining.time">{time} Sec</p>
          </li>
        </ul>
        <div className="content-container">
          {isGameRunning ? (
            <>
              <div className="img-container">
                <img src={imageUrl} alt="match" className="img-styles" />
              </div>
              <ul className="tabs-container">
                {tabsList.map(eachObj => (
                  <TabItem
                    key={eachObj.tabId}
                    tabDetails={eachObj}
                    isActive={eachObj.tabId === activeTab}
                    onTabChange={this.onTabChange}
                  />
                ))}
              </ul>
              <ul className="thumbnails-container">
                {filteredList.map(eachObj => (
                  <ImageButtonItem
                    key={eachObj.id}
                    imageDetails={eachObj}
                    onThumbnailClicked={this.onThumbnailClicked}
                  />
                ))}
              </ul>
            </>
          ) : (
            <div className="result-card">
              <div className="trophy-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                  alt="trophy"
                  className="trophy-styles"
                />
              </div>
              <p className="your-score-text">YOUR SCORE</p>
              <p className="result-score">{score}</p>
              <button
                type="button"
                className="play-again-btn"
                onClick={this.onPlayAgain}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                  className="reset-icon-styles"
                />
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
