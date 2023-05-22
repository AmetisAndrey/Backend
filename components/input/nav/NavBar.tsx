import NavItems from "./NavItems";
import useUser from "@/hooks/useUser"
import UserMenu from "./UserMenu";
import { useState } from "react";
const avatarDefaut = [
    "/images/avatar2.png",
    "/images/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
]


const NavBar = () => {
    const [visible, setVisible] = useState(false)




    let randomImg = avatarDefaut[
        Math.floor(Math.random() * 2)
    ]

    const {data, error, isLoading}: any = useUser()

    function PressClick () {
        setVisible(!visible)
    }


    return (
        <nav className="w-full fixed z-50">
            <div className="p-10 flex items-center bg-yellow-100">
                <img src="/images/logo.png" alt="" className="w-20 h-20"/>
                <div className="lg:flex flex-row ml-20 gap-10 hidden ">
                    <NavItems name="Главная"/>
                    <NavItems name="Фильмы"/>
                    <NavItems name="Популярное"/>
                    <NavItems name="Избранное"/>
                    <NavItems name="Профиль"/>
                </div>
                <div className="lg:hidden relative">
                    <p className="text-black ">Меню</p>
                    <div className="bg-white absolute top-6 left-0 p-5 flex flex-col">
                        <div className="flex flex-col gap-5">
                            <div className="text-purple-600 text-center">Главная</div>
                            <div className="text-purple-600 text-center">Фильмы</div>
                            <div className="text-purple-600 text-center">Популярное</div>
                            <div className="text-purple-600 text-center">Избранное</div>
                            <div className="text-purple-600 text-center">Профиль</div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5 align-center ml-auto" onClick={() => {
                    PressClick()
                }}>
                    <div className="flex relative align-center gap-4">
                        <div className="rounded-md w-14 h-14">
                            <img src={isLoading ? null: randomImg} alt="" />
                        </div>
                        <UserMenu hidden={visible}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}


export default NavBar;