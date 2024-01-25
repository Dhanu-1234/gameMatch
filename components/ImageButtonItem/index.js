import './index.css'

const ImageButtonItem = props => {
  const {imageDetails, onThumbnailClicked} = props
  const {id, thumbnailUrl} = imageDetails

  const onClicked = () => {
    onThumbnailClicked(id)
  }

  return (
    <li className="list-item">
      <button type="button" className="img-btn" onClick={onClicked}>
        <img
          src={thumbnailUrl}
          alt="thumbnail"
          className="thumbnail-img-styles"
        />
      </button>
    </li>
  )
}

export default ImageButtonItem
