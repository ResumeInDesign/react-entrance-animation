import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StaggeredMotion, spring } from 'react-motion'
import styled from 'styled-components'
import { Waves } from './partials'

const WaveContainer = styled.div.attrs(({ progress }) => ({
  style: {
    bottom: `${progress}vh`
  }
}))`
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
`
const EmptySpace = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
`
const FilledSpace = styled.div`
  background-color: ${props => props.color};
  height: 100vh;
  width: 100%;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`
const LoadingText = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    color: white;
    text-shadow: ${({ color }) =>
    `3px 3px 0 ${color}, -1px -1px 0 ${color}, 1px -1px 0 ${color}, -1px 1px 0 ${color}, 1px 1px 0 ${color}`};
    font-size: 161px;
    z-index:1;
}
`

const getInitStyles = speed =>
  Array.from({ length: 102 - speed * speed }).map((_, key, arr) => ({
    progress: -key - (100 - arr.length)
  }))

const getStyles = (prevStyles, speed) =>
  getInitStyles(speed).map((_, key) => ({
    progress: spring(getProgress(prevStyles, key), {
      stiffness: 250,
      damping: 30
    })
  }))

const getProgress = (prevStyles, key) =>
  key === 0 ? 0 : prevStyles[key - 1].progress

class EntranceAnimation extends Component {
  state = {
    showContent: false,
    isLoading: true
  }

  render() {
    const { color, loadingSpeed, wavesSpeed } = this.props
    return (
      <StaggeredMotion
        defaultStyles={getInitStyles(loadingSpeed)}
        styles={prevStyles => getStyles(prevStyles, loadingSpeed)}
      >
        {styles => (
          <Wrapper>
            <LoadingText color={color}>{`${Math.floor(
              Math.ceil(styles[styles.length - 1].progress) + 100
            )}%`}</LoadingText>
            <WaveContainer
              progress={styles[styles.length - 1].progress}
              bgColor={'#fff'}
            >
              <Waves color={color} speed={wavesSpeed} />
              <FilledSpace color={color} />
            </WaveContainer>
            <EmptySpace />
          </Wrapper>
        )}
      </StaggeredMotion>
    )
  }
}

EntranceAnimation.propTypes = {
  color: PropTypes.string,

  loadingSpeed: PropTypes.oneOf(Array.from(Array(10).keys()).map(i => i + 1)),
  wavesSpeed: (props, propName, componentName) => {
    const value = props[propName]
    if (isNaN(value) || value < 0) {
      return new Error(
        `Invalid value "${value}" for prop "${propName}" provided to "${componentName}", it needs to be a positive number`
      )
    }
  }
}

EntranceAnimation.defaultProps = {
  color: '#2E7CBD',
  loadingSpeed: 9,
  wavesSpeed: 4
}

export default EntranceAnimation
