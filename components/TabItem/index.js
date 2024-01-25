import './index.css'

const TabItem = props => {
  const {tabDetails, isActive, onTabChange} = props
  const {tabId, displayText} = tabDetails
  const btnClassName = isActive ? 'tab-btn active-tab' : 'tab-btn'

  const onClicked = () => {
    onTabChange(tabId)
  }

  return (
    <li className="list-item">
      <button type="button" className={btnClassName} onClick={onClicked}>
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
