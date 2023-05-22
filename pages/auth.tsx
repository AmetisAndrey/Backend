import Input  from "@/components/input/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState} from "react";
import {FaVk} from "react-icons/fa"
import {AiFillGithub} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import Link from "next/link";
const Auth = () => {
    const [swipelog, setSwipelog] = useState("login")

    const [passwordShow, setPasswordShow] = useState(false)

    const Togglepassword = () =>{
        
        setPasswordShow(!passwordShow)
    }

    const formchange = () => {
        setSwipelog(i => i === "login" ? "register" : "login")
    }
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    
    const login = useCallback(async function () {
        try{
            await signIn(
                "credentials",
                {email, password, callbackUrl: "/profile"}
    )
        }

        catch(error){
            console.log(error)
        }
    }, [email, password])
    
    const register = useCallback(async function () {
        try{
            await axios.post("/api/register", {email, password, name});
            }
    

        catch(error){
            console.log(error)
        }
    }, [email, password, name])
    return(
        <div className="relative w-full h-full bg-[url('../public/images/video-bg.jpg')] bg-cover bg-fixed bg-no-repeat bg-center">
            <div className="h-full w-full bg-black bg-opacity-30">
                <div className="p-10"><img className="h-20" src="/images/logo.png" alt="" /></div>
                <div className="flex justify-center">
                    <div className="bg-opacity-60 p-14 self-center  bg-blue-700 mt-5 rounded-md max-w-md w-2/5">
                        <h2 className="text-yellow-black-400 text-4xl mb-10 font-bold">{swipelog === "login" ? "Войти": "Зарегистрироваться"}</h2>
                        <div className="flex flex-col gap-5"> 
                        {swipelog === "register" && 
                            <Input label="Логин" id="login" onChange={(e:any) =>{setName(e.target.value)}} value={name}/>
                        }
                            <Input label="Почта" id="mail" onChange={(e:any) => {setEmail(e.target.value)}} value={email}/>
                            <Input label="Пароль" type={passwordShow ? "text" : "password"} id="password" onChange={(e:any) => {setPassword(e.target.value)}} value={password}/>
                            <button  className=" hover:text-white transition text-xl" onClick={Togglepassword}>Показать пароль</button>
                        </div>
                        <button className="bg-yellow-500 cursor-pointer p-2 text-white mt-5 w-full rounded-md hover:bg-white hover:text-black transition" onClick={swipelog === "login" ? login : register}>{swipelog === "login" ? "Войти" : "Зарегистрироваться"}</button>
                        <div className="mt-8 text-yellow-400 mb-2">Способы авторизации</div>
                        <p className="text-yellow-600 mt-10">{swipelog  === "login"? "Впервые на сайте?": "Уже есть аккаунт?" } <span className= "text-white transition cursor-pointer hover:text-yellow-300 hover:border-b-2 hover:border-red-500" onClick={formchange}>{swipelog ==="login" ? "Зарегистрироваться": 
                        "Войти"}</span></p>
                        <div className="flex align-center justify-center mt-5 gap-10">
                            <div className="w-[55px] h-[55px] rounded-full cursor-pointer transition hover:opacity-70 bg-blue-700 flex justify-center items-center" onClick={() => signIn("vk", {callbackUrl:"/profile"})}>
                                <FaVk size={40} fill="white" />
                                
                            </div>
                            <div className="w-[55px] h-[55px] rounded-full cursor-pointer transition hover:opacity-70  bg-white flex justify-center items-center" onClick={() => signIn("github", {callbackUrl:"/profile"})}>
                            <AiFillGithub size={40} fill="black"/>
                            </div>
                            <div className="w-[55px] h-[55px] rounded-full cursor-pointer transition hover:opacity-70  bg-white flex justify-center items-center" onClick={() => signIn("google", {callbackUrl:"/profile"})}>
                            <FcGoogle size={40} fill="black"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}


export default Auth;