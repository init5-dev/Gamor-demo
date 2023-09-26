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
    const [stateVal, setStateVal] = useState("all")
    const [langVal, setLangVal] = useState("all")

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
                <Multiply size={16} color="#000" />
            </button>
            <div className={styles.filterSelectGroup}>
                <div>
                    <h2>Filtros</h2>
                </div>
                <div>
                    <Select
                        id='state-select'
                        options={states}
                        placeholder={defaultState.label}
                        value={{label:stateVal, value:stateVal}}
                        onChange={selectState}
                    />
                    <Select
                        id='language-select'
                        options={languages}
                        value={{label:langVal, value:langVal}}
                        placeholder={defaultState.label}
                        onChange={selectLang}
                    />
                </div>
            </div>
        </div>
    );
};