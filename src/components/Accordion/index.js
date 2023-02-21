import React, {useState} from 'react';

export {default as Item} from "./Item";

export {default as IconPlay} from "public/images/icon-play.svg"
export {default as IconLock} from "public/images/icon-lock.svg"


const Accordion = ({children}) => {

    const [Activ, setActiv] = useState(() => null)

    const toggle = (id) => {
        setActiv(prev => (prev === id ? null : id ))
    }

  return (
    <div className='accordion'>{children(Activ, toggle)}</div>
  )
}

export default Accordion