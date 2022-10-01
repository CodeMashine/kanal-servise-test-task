import React, { useState ,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, getPost, getImages } from "../../redux/slices/contentSlice";

export default function ContentPage() {
    const dispatch = useDispatch();

    function screenSize () {
        // return true ;
        if (window.innerWidth <= 375) {
            return true ;
        }

        return false ;
    }
    
    const [ isSmall ] = useState(screenSize()) ;




    const data = useSelector(state => state.content);

    useEffect(() => {
        dispatch(getUsers());
    }
        , [dispatch]);

    
    
        useEffect(() => {
        if (data.statusUsers === "resolved" && data.statusPosts === "none") {
            dispatch(getPost());
        }
        if (data.statusUsers ==="resolved" && data.statusImages === "none") {
            dispatch(getImages());
        }
    })


    function findPost(id, posts = data.posts) {
        return posts.find(post => post.userId === id);
    }

    function findImage(id, images = data.images) {
        return images.find(image => image.albumId === id);

    }

    let output = false;
    // md:space-x-[2rem]

    if ((data.statusUsers && data.statusImages === "resolved") && data.statusPosts === "resolved") {
        output = <div className = {`mt-[4rem] flex flex-row flex-wrap justify-evenly
        md:justify-evenly lg:w-[70%] lg:mt-[2rem]`}>
            {data.users.map((user, num) => {
                const post = findPost(user.userId);
                const image = findImage(user.userId);
                return (<div className={`w-[95%] h-[35rem] mb-[2rem] flex flex-col border-[14px] border-blue-water rounded-xl
                 md:w-[45%] md:h-[40rem] md:border-[8px]
                 lg:flex-row lg:flex-wrap lg:h-[25rem] lg:w-[49%] lg:border-[4px]
                
                
                `} key={`user ${num}`}>
                        
                        
                       { isSmall? '' : <div className = {`md:w-[45%] md:mt-[2rem] md:ml-[2rem]
                        lg:w-[30%] lg:ml-[1rem] lg:h-[35%] lg:mt-[1.5rem]
                                               `}>
                            <img className = "w-full h-full" src={image.url} alt={image.title} />
                        </div>}


                        <div className = {`flex flex-col mt-[2rem] ml-[2rem] mb-[4rem] text-5xl 
                        md:mb-[1rem] md:text-xl  font-bold md:font-extrabold
                        lg:w-[55%] lg:text-base
                        `}>
                            <p className = "mb-[5rem] md:mb-[1rem]">Author : {user.userName} </p>
                            <p>Company : {user.companyName} </p>
                        </div>
                    {/* </div> */}
                <div className = {`ml-[2rem] text-5xl font-bold 
                md:text-xl md:font-extrabold
                lg:text-base lg:ml-[1rem] lg:pr-[1rem]
                
                `}> 
                    <p className = "  "> Title : {post.title}</p>
                    {isSmall ? '' : <p className = "md:mt-[1rem]" >{post.body}</p>}
                </div>
                </div>)
            })}
        </div>
    }



    return (
        <div className=" w-full flex justify-center">
            {output}
        </div>
    )

}