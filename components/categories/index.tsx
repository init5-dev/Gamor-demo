import { useState } from "react"
import CategoryBlock from "./category-block"
import { Category } from "@/libs/category"
import styles from './styles.module.css'

export default function Categories({categories} : {categories:Category[]}) {

    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.title}><strong>Trending</strong> Categories</h2>
            <div className={styles.categories}>
                {
                    categories.map(
                        (category) => <CategoryBlock key={category.id} category={category} />
                    )
                }
            </div>
        </div>
    )
}
