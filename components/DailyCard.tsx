import { useEffect, useState } from 'react'
import style from './DailyCard.module.css'
import axios from 'axios'
import { Icon } from '@iconify/react';
import bookmarkLine from '@iconify/icons-ri/bookmark-line';

export default function DailyCard() {
  const date = new Date()

  const [hitokoto, setHitokoto] = useState('')
  const [from, setFrom] = useState('')
  const [from_who, setFrom_who] = useState('')

  useEffect(() => {
    axios.get('https://v1.hitokoto.cn/')
      .then(res => {
        setHitokoto(res.data.hitokoto)
        setFrom(res.data.from)
        setFrom_who(res.data.from_who)
      })
  }, [])

  return (
    <div className={style.container}>
      <div className={style.date}>
        <h1 className={style.dateTitle}>
          {
            date.getDate().toString().length === 1
              ? `0${date.getDate()}`
              : date.getDate()
          }
        </h1>
        <p>{date.toDateString().split(' ')[1]}. {date.getFullYear()}</p>
      </div>
      <div className={style.desc}>
        <p className={style.hitokoto}>{hitokoto}</p>
        <div className={style.footer}>
          <p className={style.from}># {from} {from_who ? `《${from_who}》` : ''}</p>
          <Icon icon={bookmarkLine} className={style.icon}></Icon>
        </div>
      </div>
    </div>
  )
}