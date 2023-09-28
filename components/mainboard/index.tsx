'use client'

import styles from './styles.module.css'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { Equalizer } from '@styled-icons/remix-line/'
import { MouseEvent } from 'react'
import { Room, Game } from '@/libs/gameroom'
import Select from 'react-select'
import { ISelectOption } from '@/libs/interfaces'
import { SingleValue, ActionMeta, InputActionMeta } from 'react-select'
import FilterPopup from './filterPopup'
import Link from 'next/link'
import Clock from './clock'
import UserBall from './userball'
import { useUser } from '@clerk/nextjs'
import Alert from './alert'

const roomStates = ['active', 'inactive', 'all']
const defState = { label: 'all', value: 'all' }
const availableLangs = ['en', 'es', 'ch', 'fr', 'it', 'all']
const defLang = { label: 'all', value: 'all' }

export default function MainBoard({ rooms }: { rooms: Room[] }) {

    const [platform, setPlatform] = useState('Party')
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState<Room[]>([])
    const [game, setGame] = useState<string>('')
    const [games, setGames] = useState<ISelectOption[]>([])
    const [showFilter, setShowFilter] = useState(false)
    const [state, setState] = useState<string>("all")
    const [states, setStates] = useState<ISelectOption[]>([])
    const [language, setLanguage] = useState<string>("all")
    const [languages, setLanguages] = useState<ISelectOption[]>([])
    const [added, setAdded] = useState<boolean>(false)
    const [joinedRoom, setJoinedRoom] = useState<Room[] | null>(null)
    const [imgPath, setImgPath] = useState('')

    const [attention, setAttention] = useState({
        active: false,
        message: ''
    })

    const [imgStyle, setImgStyle] = useState<React.CSSProperties>(
        {
            backgroundImage: `url('../../public/media/call-of-duty-cover-portrait.jpg')`,
            height: `100%`,
            width: `100%`,
            backgroundSize: `cover`,
            backgroundRepeat: `none`,
            padding: `32px`,
        }
    )

    const { isLoaded, isSignedIn, user } = useUser();

    useEffect(
        () => {
            const games: ISelectOption[] = []

            rooms.forEach(
                (room) => {
                    games.push(
                        {
                            label: room.game.name,
                            value: room.game.name
                        }
                    )
                }
            )
            setGames(games.sort(
                (a, b) => {
                    if (a.label < b.label) { return -1; }
                    if (a.label > b.label) { return 1; }
                    return 0;
                }
            ))

            const states: ISelectOption[] = []
            const languages: ISelectOption[] = []

            for (let item of roomStates) {
                states.push({
                    label: item,
                    value: item
                })
            }

            for (let item of availableLangs) {
                languages.push({
                    label: item,
                    value: item
                })
            }

            setStates(states)
            setLanguages(languages)
            setImgPath('/media/' + games[0].label + '.jpg')
            setGame(games[0].label)
        },
        []
    )

    useEffect(
        () => {
            updateImgStyle()
        },
        [imgPath]
    )

    function updateImgStyle() {
        const imgstyle: React.CSSProperties = {
            backgroundImage: `url('${imgPath}')`,
            height: `100%`,
            width: `100%`,
            backgroundSize: `cover`,
            backgroundRepeat: `none`,
            padding: `32px`,
        }
        setImgStyle(imgstyle)
        console.log('IMAGE PATH: ' + imgPath)
    }

    function searchGame() {
        console.log("SEARCH: " + JSON.stringify(search))

        if (search.length) {
            const res = rooms.filter(
                (room) => (room.game.name.includes(search) || search.trim() === "") && room.platform === platform && (room.state === state || state === "all") && (room.language === language || language === "all")
            )
            setSearchResults(res)
            console.log("STATE: " + state)
            console.log("LANG: " + language)
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
        setImgPath('/media/' + newValue.label + '.jpg')
        updateImgStyle()
        setGame(newValue.label)
        setSearchResults([])

    }

    function handleInputChange(newValue: string, actionMeta: InputActionMeta) {
        if (!newValue) {
            return
        }
        setSearch(newValue)
        const tmp = "" + imgPath
        setImgPath('/media/' + newValue + '.jpg')
        updateImgStyle()
        setGame(newValue)
        setSearchResults([])
    }

    function addUser(e: React.MouseEvent<HTMLElement>) {

        if (!isSignedIn) {
            setAttention({
                active: true,
                message: 'Please log in to join',
            })
            return
        }

        if (joinedRoom) {
            if (joinedRoom[0].name.indexOf(e.currentTarget.id) < 0) {
                return
            }

            if (e.currentTarget.textContent === '-' && joinedRoom[0]?.game.name === game) {
                setAdded(false)
                setJoinedRoom(null)
                setAttention({
                    active: true,
                    message: 'Bye!'
                })
                return
            }
        }

        const roomToJoin = rooms.filter(
            (room) => {
                console.log("room.name: " + room.name)
                console.log("e.currentTarget.id: " + e.currentTarget.id)
                return room.name.indexOf(e.currentTarget.id) > -1
            }
        )
        console.log(roomToJoin)
        setJoinedRoom(roomToJoin)

        if (roomToJoin.length) {
            setAdded(true)
            e.currentTarget.textContent = '-'
            setAttention({
                active: true,
                message: 'You have joined ' + roomToJoin[0].name
            })
            return
        }
    }

    function getFilters(stateArg: string | undefined = undefined, languageArg: string | undefined = undefined) {
        if (stateArg) {
            setState(stateArg)
        }
        if (languageArg) {
            setLanguage(languageArg)
        }
    }

    return (
        <div className={styles.mainBoard}>
            {
                attention.active && <Alert message={attention.message} onClose={() => setAttention({ active: false, message: '' })} />
            }
            <div className={styles.boardSection}>
                <div className={styles.lemma}>
                    <p>start <span className={styles.resalted}>streaming</span> games differently</p>
                </div>
                <div className={styles.notice}>
                    <p>gamor now has <span className={styles.underlined}>stream party</span> platform</p>
                </div>
                <div className={styles.access}>
                    <button className={styles.btnRoundWhite}>
                        <Link href='/sign-up'>Create account</Link>
                    </button>
                    <button className={styles.link}>
                        <Link href='/sign-in'>Sign in</Link>
                    </button>
                </div>
            </div>
            <div className={styles.boardSectionWithBg}>
                <div className={styles.bgImage} style={imgStyle}>
                    <div className={styles.ad}>
                        <p className={styles.adTitle}>{game}</p>
                        <p className={styles.adSubtitle}>Join Live Stream</p>
                    </div>
                    <div className={styles.clockSection}>
                        {
                            isLoaded && isSignedIn && user && <div className={styles.userBallSection}>
                                {
                                    joinedRoom && <UserBall added={added && joinedRoom[0]?.game.name === game} />
                                }
                            </div>
                        }
                        <Clock />
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
                            <Select id='searchbox' options={games} className={styles.searchBox} placeholder={games && games.length ? games[0].label : ''} onChange={handleChange} onInputChange={handleInputChange} />
                            <div className={styles.filtersContainer}>
                                <button onClick={() => { setShowFilter(!showFilter) }}>
                                    <Equalizer className={styles.filterBtn} width={24} height={24} style={{ color: `val(--black)` }} />
                                </button>
                            </div>
                        </div>
                        {
                            showFilter && <FilterPopup
                                languages={languages}
                                states={states}
                                defaultLanguage={{label:language, value:language}}
                                defaultState={{label:state, value: state}}
                                onEdit={getFilters}
                                onClose={() => setShowFilter(false)}
                            />
                        }
                        <div className={styles.gamesList}>
                            {
                                searchResults.length ? searchResults.map(
                                    (room, i) => <div key={room.name} className={styles.gamesListRow}>
                                        <span className={styles.roomNumber}>{i}</span>
                                        <strong className={styles.roomName}>{room.name}</strong>
                                        {
                                            room.members.map(
                                                (member) => <Image className={styles.listAvatar} key={member} src={`/users/${member}.png`} width={24} height={24} alt={`Avatar de ${member}`} />
                                            )
                                        }
                                        <button id={room.name} className={styles.btnAdd} onClick={addUser}>{joinedRoom ? (joinedRoom[0]?.game.name === game ? '-' : '+') : '+'}</button>
                                    </div>
                                ) : <div className={styles.nothingHere}>Nothing here!</div>
                            }
                        </div>
                        <div>
                            <button
                                className={search ? styles.btnRectDark : styles.btnRectDarkDisabled}
                                disabled={search ? false : true}
                                onClick={searchGame}
                            >
                                Search Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}