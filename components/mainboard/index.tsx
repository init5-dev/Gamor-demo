'use client'

import styles from './styles.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { User, Game } from '@/libs/interfaces'
import { Equalizer } from '@styled-icons/remix-line/'
import { MouseEvent } from 'react'
import data from '@/app/data/games.json'

export default function MainBoard() {

    const [fsOpened, setFsOpened] = useState(false)
    const [gamesList, setGamesList] = useState<Game[]>([])
    const [keys, setKeys] = useState<string[]>([])
    const [platform, setPlatform] = useState('Party')


    useEffect(
        () => {
            /*getData().then(
                (data) => {
                    const games: Game[] = []

                    for (let i=0; i<data.length; i++) {

                        const item = data[i]

                        if (!item) {
                            continue
                        }

                        const users: User[] = []

                        for (let u of item.users) {
                            const user = new User(u.name, u.username)
                            users.push(user)
                        }

                        const game = new Game(item.title, item.type, item.platform, users )
                    }

                    setGamesList(games)
                }
            )*/
            setGamesList([...data])

            console.log(JSON.stringify(gamesList))
        },
        []
    )

    function searchGame(gameTitle: string) {
        //pass
    }

    function selectPlatform(e: MouseEvent<HTMLElement>) {
        //alert(e.currentTarget.innerText)
        setPlatform(e.currentTarget.innerText)
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
                            <input type='text' className={styles.searchBox} placeholder='COD Warzone' />
                            <div className={styles.filtersContainer}>
                                <button onClick={() => setFsOpened(!fsOpened)}>
                                    <Equalizer className={styles.filterBtn} width={24} height={24} color='black' />
                                </button>
                            </div>
                        </div>
                        {
                            fsOpened && <div className={styles.filtersSelector}>

                            </div>
                        }
                        <div className={styles.gamesList}>
                            {
                                gamesList && gamesList.map(
                                    (game) => <div key={game.title} className={styles.gamesListRow}>
                                        {
                                            game.users.map(
                                                (user) => <Image key={user.username} src={`/users/${user.username}.png`} width={32} height={32} alt={`Avatar de ${user.name}`} />
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