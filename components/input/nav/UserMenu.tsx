import useUser from "@/hooks/useUser"
import {signOut} from "next-auth/react"


const avatarDefaut = [
    "/images/avatar2.png",
    "/images/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
]

interface IHidden{
    hidden: boolean
}

const UserMenu = ({hidden}: IHidden) => {

    let randomImg = avatarDefaut[
        Math.floor(Math.random() * 2)
    ]

    const {data, error, isLoading}: any = useUser()

    if (!hidden){
        return null
    }

    return(
        <div className="absolute right-0 top-[px] flex flex-col w-52 bg-yellow-500 p-5">
            <div className="flex flex-col gap-5">
                <div className="gap-5 flex align-center w-full">
                    <img src={isLoading? null :randomImg} alt="" className="rounded-md w-8"/>
                    <h3 className="text-blue-500 text-md">{data?.name}</h3>
                </div>
            </div>
            <div className="">
                <div className="cursor-pointer" onClick={() => {
                    signOut()            
                    }}>
                    Выход из аккаунта
                </div>
            </div>
        </div>
    )
}


export default UserMenu;