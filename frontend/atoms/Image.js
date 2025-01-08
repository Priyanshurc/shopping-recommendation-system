import React from 'react'

const Image = ({ imgSrc, imgAlt, width, height, className }) => {
  return (
    <img src={imgSrc} alt={imgAlt} width={width} height={height} className={className} />
  )
}

export default Image
