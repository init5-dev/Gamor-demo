'use client'

import { Category } from '@/libs/category'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'styled-icons/fa-solid'

export default function CategoryBlock({ category }: { category: Category }) {

    const solidBgStyle = {
        backgroundColor: `var(--block)`,
        height: `100%`,
        width: `100%`,
        backgroundSize: `cover`,
        backgroundRepeat: `none`
    }

    const imageBgStyle = {
        backgroundImage: `url('${category.imgPath}')`,
        height: `100%`,
        width: `100%`,
        backgroundSize: `cover`,
        backgroundRepeat: `none`
    }

    const [mobile, setMobile] = useState(false)
    const [focused, setFocused] = useState(false)
    const [imgStyle, setImgStyle] = useState<React.CSSProperties>(solidBgStyle)

    function handleMouseEnter() {
        if (!mobile) {
            setImgStyle(imageBgStyle)
        }
        
        setFocused(true)
    }

    function handleMouseLeave() {
        if (!mobile) {
            setImgStyle(solidBgStyle)
        }
        
        setFocused(false)
    }

    useEffect(() => {

        if (window.innerWidth <= 540) {
            setMobile(true)
            setImgStyle(imageBgStyle)
            console.log('Es móvil')
        } else {
            console.log('Es desktop')
            setMobile(false)
            setImgStyle(solidBgStyle)
        }
    }, []);

    return (
        <div
            className={focused || mobile ? styles.categoryBlockFocused : styles.categoryBlock}
            style={imgStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={focused || mobile ? styles.overlay : styles.clean}>
                <p className={styles.id} style={
                            focused || mobile  ? {color: "white"} : {color: "var(--darkgrey)"} 
                        }>{category.id}</p>
                <p className={styles.name} style={
                            focused || mobile  ? {color: "white"} : {color: "var(--dark)"} 
                        }>{category.name}</p>
                <button>
                    <ArrowRight
                        size={16}
                        style={
                            focused || mobile  ? {color: "white"} : {color: "var(--dark)"} 
                        }
                    />
                </button>
            </div>
        </div>
    )
}