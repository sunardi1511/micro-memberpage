import React from 'react'
import { Link } from 'react-router-dom';


import { ReactComponent as IConPlay } from "../assets/images/icon-play.svg";


const ListClassItem = ({ data }) => {
  return (
    <div className='w-1/4 px-4'>
      <div className='item relative'>
        <figure className='item-image'>
          <IConPlay />
          <img className='w-full h-full' src={data?.thumbnail ?? ""} alt={data?.name ?? ""} />
        </figure>
        <div className='item-meta'>
          <h4 className='text-lg text-gray-900'>{data?.name ?? ""}</h4>
          <h5 className='text-sm text-gray-600'>{data?.level ?? ""}</h5>
        </div>
        <div>
          <Link className='link-wrapped' to={`/courses/${data?.id}`} ></Link>
        </div>
      </div>
    </div>
  )
}

export default ListClassItem