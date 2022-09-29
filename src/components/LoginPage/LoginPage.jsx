import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../redux/slices/authSlice";



export default function LoginPage() {
    const { userName, password } = useSelector(state => state.user);
    const dispatch = useDispatch();


    const [inletLogin, setInletLogin] = useState('admin');
    const [inletPassword, setInletPassword] = useState('admin');
    // const [auth, setAuth] = useState(false);
    const [error, setError] = useState(false);


    let errorMessage = 'Неверный логин или пароль';

    function checkLogin(login,
        password,
        inletLogin,
        setInletLogin,
        inletPassword,
        setInletPassword,
        setAuth,
        dispatch) {

        if (login === inletLogin && password === inletPassword) {
            console.log('logIN');
            dispatch(setAuth("contentPage"));
            return;
        } else {
            setError(true);

            setTimeout(() => {
                setInletLogin('');
                setInletPassword('');
                setError(false);
            }, 1000)
        }
    }

    return (
        <div className={"flex h-screen justify-center items-center flex-col lg:justify-start"}>
            <div className="absolute text-5xl font-extrabold ">
                {error ? errorMessage : ''}
            </div>
            <div className={`flex flex-col border-[14px] justify-center items-center
             border-blue-water shadow-sm w-[80%] h-[40%] mt-32 rounded-xl 
             md:border-[8px] md:justify-start
             lg:w-[40%] lg:border-[4px]
             `}>
                <span className={`mx-auto text-blue-water font-extrabold text-6xl md:text-4xl mt-8 mb-[5rem] 
                lg:text-2xl lg:mb-[3rem]
                `}>Autorization</span>

                <span className = {`flex flex-col mb-[5rem]
                 md:flex-row md:items-center md:mb-[2rem] md:w-full md:justify-between`}>
                    <span className="font-bold text-6xl md:text-4xl md:ml-[2rem] lg:text-2xl">
                        login
                    </span>
                    <input className={`border-blue-water border-[10px]  mt-[3rem] h-[5rem]  rounded-xl
                     md:text-4xl md:mt-[0] md:basis-[60%] md:mr-[2rem] md:border-[8px]
                     lg:text-2xl lg:h-[3rem] lg:border-[4px]
                     `}
                      value={inletLogin} onChange={(e) => setInletLogin(e.target.value)} />
                </span>

                <span className = {`flex flex-col mb-[5rem]
                md:flex-row md:items-center md:mb-[2rem] md:w-full md:justify-between
                
                `}>
                    <span className={`font-bold text-6xl md:text-4xl md:ml-[2rem] lg:text-2xl`}>
                        password
                    </span>
                    <input className={`border-blue-water border-[10px]  mt-[3rem] h-[5rem] rounded-xl text-5xl
                     md:text-4xl md:mt-[0] md:basis-[60%] md:mr-[2rem] md:border-[8px]
                     lg:text-2xl lg:h-[3rem] lg:border-[4px] lg:w-[1rem]
                    `} value={inletPassword} onChange={(e) => setInletPassword(e.target.value)} />
                </span>
                <span className = {" mx-auto w-[75%] h-[12%] md:w-[50%]"}>
                    <button className = {`font-extrabold text-6xl bg-orange w-full h-full rounded-3xl
                     md:text-4xl md:rounded-xl
                     lg:text-2xl
                     `}
                      onClick={() => checkLogin(userName, password, inletLogin, setInletLogin, inletPassword, setInletPassword, setAuth, dispatch)}>
                        Submit
                    </button>

                </span>
            </div>
        </div>
    )

}
