import React, { Children, useEffect, useState, useRef } from 'react';
import propTypes from "prop-types";

const Select = ({
    labelNmae,
    id,
    name,
    value,
    classname,
    children,
    onClick,
    fallBackText
}) => {

    const [toggle, setToggle] = useState(() => false)
    const SelectWrapper = useRef(null)

    const items = Children.toArray(children)

    const toggleSelect = () => {
        setToggle(() => !toggle)
    }

    const clickOutside = (event) => {
        if (SelectWrapper && !SelectWrapper.current.contains(event.target)) 
            setToggle(false)
        
    }

    useEffect(() => {
        window.addEventListener("mousedown", clickOutside)
        return () => {
            window.removeEventListener("mousedown", clickOutside)

        }
    }, [])

    const selected = items.find(item => item.props.value === value)

    return (
        <div className='flex flex-col mb-4'>
            {labelNmae && (
                <label htmlFor='' className='show text-lg mb-2 text-gray-900'>
                    {labelNmae}
                </label>
            )}

            <div className='relative' ref={SelectWrapper} onClick={toggleSelect}>
                <div className={['flex justify-between cursor-pointer bg-white focus:outline-none transition-all duration-200 border px-4 py-3 w-full',
                    toggle ? "border-teal-500" : "border-gray-600", classname].join(" ")}>
                    <span className={value === "" ? "text-gray-500" : ""}>
                        {selected?.props.children ?? fallBackText}
                    </span>
                    <div className="transition-all duration-200 border-gray-400 border-r-2 border-b-2 transform rotate-45 translate-y-1 w-2 h-2">

                    </div>
                    <div className={["absolute left-0 bg-white border border-gray-600 py-3 w-full",
                        toggle ? "" : "hidden"].join(" ")}>
                        {items.map((item, index) => {
                            return  (
                            <div key={index} className='cursor-pointer px-4 py-1 bg-white hover:bg-gray-400 transition-all duration-200'
                            onClick={ () => onClick({target: {name: name, value: item.props.value}})}>
                                {item.props.children}
                            </div>
                            )
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

Select.propTypes = {
    onClick: propTypes.func.isRequired,
    value: propTypes.oneOfType.apply([propTypes.string, propTypes.number]).isRequired,
    name: propTypes.string.isRequired,
    fallBackText: propTypes.string,

    labelNmae: propTypes.string,
    id: propTypes.string,
    classname: propTypes.string,

}


export default Select