import React from 'react'
import styles from './style.module.css'
const IconButton = ({active, onMouseDown,children}) => {
    return (
        <button className={styles.iconButton} onMouseDown={(e)=>onMouseDown(e)} style={{color:active?"rgba(41,98,255)":"rgba(55,65,81)"}}>
            {children}
        </button>
    )
}

export default IconButton
