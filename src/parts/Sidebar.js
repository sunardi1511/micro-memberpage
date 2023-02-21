import React from 'react'

import { ReactComponent as DefaultUSer } from '../assets/images/default-avatar.svg';

import { Link, useMatch, useMatches, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({ pathName }) => {

  const history = useNavigate()


  const getNavLinkClass = (path) => {
    return pathName === path ? "active text-white bg-indigo-900" : "text-indigo-500"
  }

  const users = useSelector(state => state.users)

  const logout = () => {
    history("/login");
    localStorage.removeItem("BWAMICRO:token")
  }

  return (
    <aside className='bg-indigo-900 max-h-screen h-screen overflow-y-auto' style={{ width: 280 }}>
      <div className='max-h-screen h-screen fixed bg-indigo-900 flex flex-col content-between'
        style={{ width: 280 }}>
        <div className='flex flex-col text-center mt-8 h-full'>
          <div className='border border-indigo-500 mx-auto p-2 inline-flex rounded-full overflow-hidden justify-center items-center' style={{ width: 100, height: 100 }}>
            {
              users?.avatar ? <img src={users?.avatar} alt={users?.name} />
                : <DefaultUSer className='fill-indigo-500 ' style={{ width: 90, height: 90 }}>

                </DefaultUSer>
            }
          </div>

          <h6 className='text-white text-xl'>
            {users?.name ?? "Username"}
          </h6>

          <span className='text-indigo-500 text-sm'>
            {users?.profession ?? "Profession"}
          </span>

          <ul className='main-menu mt-12'>
            <li>
              <Link className={["nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                getNavLinkClass("/")].join(" ")} to="/">
                My Class
              </Link>
            </li>
            <li>
              <a target="_blank" rel='noopener noreferrer' className={["nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left text-indigo-500",
              ].join(" ")} href={`${process.env.REACT_APP_FRONTPAGE_URL}/library`}>
                Library
              </a>
            </li>
            <li>
              <Link className={["nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                getNavLinkClass("/transactions")].join(" ")} to="/transactions">
                Transactions
              </Link>
            </li>
            <li>
              <Link className={["nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left",
                getNavLinkClass("/settings")].join(" ")} to="/settings">
                Settings
              </Link>
            </li>
          </ul>
          <div className='flex-1'>

          </div>
          <ul className='main-menu my-12'>
            <li>
              <button className={["nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left text-indigo-500",
              ].join(" ")}
                onClick={logout}>
                Log Out
              </button>
            </li>
          </ul>

        </div>
      </div>
    </aside>
  )
}

export default Sidebar