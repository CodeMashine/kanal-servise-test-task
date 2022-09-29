import React, { useState, useEffect } from "react" ;

import { useSelector , useDispatch } from "react-redux" ;

import { setAuth }  from "../../redux/slices/authSlice" ;

import logo3 from "../../images/logo3.svg" ;

import outIcon from "../../images/out_icon_1.svg" ;

import logo1 from "../../images/logo 1.svg" ;


export default function Header() {
    const isAuth = useSelector(state => state.isAuth);
    let { userName } = useSelector(state => state.user);
    const dispatch = useDispatch() ;
    
    function screenSize () {
        // return true ;
        if (window.innerWidth <= 768) {
            return true ;
        }

        return false ;
    }
    
    const [ isSmall ] = useState(screenSize()) ;

    console.log(isSmall) ;

    let quit;

    if (isAuth === "contentPage") {
        quit = <div className="flex flex-row items-center ml-auto pr-20 md:h-[50%] md:pr-[10]">
            <div className="font-bold text-2xl pr-5 md:visible invisible">
                {userName}
            </div>
        <button className = "w-full h-full" onClick= { ()=>dispatch( setAuth("loginPage")) }>
            <img className = "w-full h-full" src={outIcon} alt="logo" />  
        </button>
        </div>
    }

    
    let logoMin = <img className={"w-full h-full"} src={logo1} alt="logo" /> ; 

    let logoMax = <img className={"w-full h-full"} src={logo3} alt="logo" />
    
    
    return (
        <div className={"w-full bg-orange h-[20%] md:h-[8%] lg:h-[5rem] flex flex-row items-center sticky"} >
            <div className={"pl-12 md:ml-[2rem] h-[60%] lg:pl-[3rem]"}>
                {isSmall? logoMin:logoMax}
            </div>
                {quit}
        </div>

    )
}