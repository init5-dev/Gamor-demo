'use client'

import styles from './styles.module.css'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { Equalizer } from '@styled-icons/remix-line/'
import { MouseEvent } from 'react'
import { Room, Game } from '@/libs/gameroom'
import Select from 'react-select'
import { SingleValue, ActionMeta } from 'react-select'

interface ISelectOption {
    label: string
    value: string
}

export default function MainBoard({ rooms }: { rooms: Room[] }) {

    const [platform, setPlatform] = useState('Party')
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState<Room[]>(rooms)
    const [games, setGames] = useState<ISelectOption[]>([])

    useEffect(
        () => {
            const games: ISelectOption[] = []
            rooms.forEach(
                (room) => games.push(
                    {
                        label: room.game.name,
                        value: room.game.name
                    }
                )
            )
            setGames(games.sort(
                (a, b) => {
                    if(a.label < b.label) { return -1; }
                    if(a.label > b.label) { return 1; }
                    return 0;
                }
            ))
        },
        [rooms]
    )

    function searchGame() {
        console.log("SEARCH: " + JSON.stringify(search))

        if (search.length > 1) {
            const res = rooms.filter(
                (room) => room.game.name.includes(search) // && room.game.category === platform
            )
            setSearchResults(res)

            console.log("RESULT: " + JSON.stringify(res))
        }
    }

    function selectPlatform(e: MouseEvent<HTMLElement>) {
        setPlatform(e.currentTarget.innerText)
    }

    function handleChange(newValue: SingleValue<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) {

        if (!newValue) {
            return
        }

        setSearch(newValue.label)

        console.log(search.length)
    }

    return (
        <div className={styles.mainBoard}>
            <div className={styles.boardSection}>
                <div className={styles.lemma}>
                    <p>start <span className={styles.resalted}>streaming</span> games differently</p>
                </div>
                <div className={styles.notice}>
                    <p>gamor no has <span className={styles.underlined}>stream party</span> platform</p>
                </div>
                <div className={styles.access}>
                    <button className={styles.btnRoundWhite}>Create account</button>
                    <button className={styles.link}>Sign in</button>
                </div>
            </div>
            <div className={styles.boardSectionWithBg}>
                <div className={styles.bgImage}>
                    <div className={styles.ad}>
                        <p className={styles.adTitle}>CoD New Season</p>
                        <p className={styles.adSubtitle}>Join Live Stream</p>
                    </div>
                    <div>
                        {/*<CountDown />*/}
                    </div>
                </div>
            </div>
            <div className={styles.boardSection}>
                <div>
                    <div>
                        <span className={styles.stepNum}>01.</span>
                        <span className={styles.stepCont}><strong>Choose</strong> Platform</span>
                    </div>
                    <div className={styles.tabsPane}>
                        <button className={styles.tab + (platform === 'Party' ? ' ' + styles.tabActive : '')} onClick={selectPlatform}>Party</button>
                        <button className={styles.tab + (platform === 'Match' ? ' ' + styles.tabActive : '')} onClick={selectPlatform}>Match</button>
                        <button className={styles.tab + (platform === 'Streams' ? ' ' + styles.tabActive : '')} onClick={selectPlatform}>Streams</button>
                    </div>
                </div>
                <div>
                    <div>
                        <span className={styles.stepNum}>02.</span>
                        <span className={styles.stepCont}><strong>Searching</strong> Game</span>
                    </div>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchHeader}>
                            <Select id='searchbox' options={games} className={styles.searchBox} placeholder={games && games.length ? games[0].label : ''} onChange={handleChange} />
                            <div className={styles.filtersContainer}>
                                <button onClick={searchGame}>
                                    <Equalizer className={styles.filterBtn} width={24} height={24} color='black' />
                                </button>
                            </div>
                        </div>
                        <div className={styles.gamesList}>
                            {
                                searchResults && searchResults.map(
                                    (room, i) => <div key={room.name} className={styles.gamesListRow}>
                                        <span className={styles.roomNumber}>{i}</span>
                                        <strong className={styles.roomName}>{room.name}</strong>
                                        {
                                            room.members.map(
                                                (member) => <Image className={styles.listAvatar} key={member} src={`/users/${member}.png`} width={24} height={24} alt={`Avatar de ${member}`} />
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            <button className={styles.btnRectDark} onClick={() => { }}>Search Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}