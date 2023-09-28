'use client'

import { Category } from '@/libs/category'
import styles from './styles.module.css'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'styled-icons/fa-solid'

export default function CategoryBlock({ category }: { category: Category }) {

    const solidBgStyle = {
        backgroundColor: `rgb(240, 240, 240)`,
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
    const [imgStyle, setImgStyle] = useState<React.CSSProperties>(mobile ? imageBgStyle : solidBgStyle)

    function handleMouseEnter() {
        setImgStyle(imageBgStyle)
        setFocused(true)
    }

    function handleMouseLeave() {
        setImgStyle(solidBgStyle)
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

        const handleWindowResize = () => {
            if (window.innerWidth <= 540) {
                setMobile(true)
                setImgStyle(imageBgStyle)
                console.log('Es móvil')
            } else {
                console.log('Es desktop')
                setMobile(false)
                setImgStyle(solidBgStyle)
            }
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <div
            className={focused || mobile ? styles.categoryBlockFocused : styles.categoryBlock}
            style={imgStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={focused || mobile ? styles.overlay : styles.clean}>
                <p className={styles.id}>{category.id}</p>
                <p className={styles.name}>{category.name}</p>
                <button>
                    <ArrowRight
                        size={16}
                        color={focused || mobile  ? "white" : "black"}
                    />
                </button>
            </div>
        </div>
    )
}