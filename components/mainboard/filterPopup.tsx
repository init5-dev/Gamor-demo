import { useState, useEffect, MouseEvent } from "react";
import Select from "react-select";
import { SingleValue, ActionMeta } from "react-select";
import { ISelectOption } from '@/libs/interfaces'
import { Multiply } from "styled-icons/fa-solid";
import styles from "./styles.module.css"

export default function FilterPopup(
    { states, languages, defaultLanguage, defaultState, onEdit, onClose }:
        {
            states: ISelectOption[], languages: ISelectOption[], defaultLanguage: ISelectOption, defaultState: ISelectOption
            onEdit: (state: string | undefined, language: string | undefined) => void | undefined,
            onClose: (e: MouseEvent<HTMLElement>) => void | undefined
        }) {

    const [open, setOpen] = useState(true);
    const [stateVal, setStateVal] = useState(defaultState.label)
    const [langVal, setLangVal] = useState(defaultLanguage.label)

    function selectState(newValue: SingleValue<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) {
        if (newValue) {
            onEdit(newValue.label, undefined)
            setStateVal(newValue.label)
        }
    }

    function selectLang(newValue: SingleValue<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) {
        if (newValue) {
            onEdit(undefined, newValue.label)
            setLangVal(newValue.label)
        } 
    }

    return (
        <div className={styles.filterPopup}>
            <button className={styles.closeBtn} onClick={onClose}>
                <Multiply size={16} style={{color: `var(--black)`}} />
            </button>
            <div className={styles.filterSelectGroup}>
                <div>
                    <h2>Filter your search</h2>
                </div>
                <div>
                    <label>State</label>
                    <Select
                        id='state-select'
                        options={states}
                        placeholder={defaultState.label}
                        defaultValue={{label:stateVal, value:stateVal}}
                        onChange={selectState}
                        className={styles.searchBox}
                    />
                    <label>Language</label>
                    <Select
                        id='language-select'
                        options={languages}
                        defaultValue={{label:langVal, value:langVal}}
                        placeholder={defaultState.label}
                        onChange={selectLang}
                        className={styles.searchBox}
                    />
                </div>
            </div>
        </div>
    );
};