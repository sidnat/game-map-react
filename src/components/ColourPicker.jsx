import { useState } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

const ColourPicker = (props) => {
    const [state, setState] = useState({
        displayColorPicker: false,
        color: {
          r: '241',
          g: '112',
          b: '19',
          a: '1',
        },
      })

    const styles = reactCSS({
        'default': {
          color: {
            width: '36px',
            height: '14px',
            borderRadius: '2px',
            background: `rgba(${ state.color.r }, ${ state.color.g }, ${ state.color.b }, ${ state.color.a })`,
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          },
        },
      });

      const handleClick = () => {
        setState((prevState) => ({...prevState, displayColorPicker: !prevState.displayColorPicker }))
      };
    
      const handleClose = () => {
        setState((prevState) => ({...prevState, displayColorPicker: false }))
      };
    
      const handleChange = (color) => {
        // console.log(color)
        setState((prevState) => ({...prevState, color: color.rgb }))
      };

      return (
        <div>
          <div style={ styles.swatch } onClick={ handleClick }>
            <div style={ styles.color } />
          </div>
          { state.displayColorPicker ? <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ handleClose }/>
            <SketchPicker color={ state.color } onChange={ handleChange } />
          </div> : null }
  
        </div>
      )
}

export default ColourPicker