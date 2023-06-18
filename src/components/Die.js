import React from 'react'
import PropTypes from 'prop-types'

export default function Die({ isHeld, holdDice, value }) {
  const styles = {
    backgroundColor: isHeld ? '#59E391' : 'white'
  }
  return (
    <button
      type="button"
      className="die-face"
      style={styles}
      onClick={holdDice}
    >
      <div className="die-num">{value}</div>
    </button>
  )
}

Die.propTypes = {
  isHeld: PropTypes.bool.isRequired,
  holdDice: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}
