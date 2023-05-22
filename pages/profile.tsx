import useUser from "@/hooks/useUser"
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"

const avatarDefaut = [
    "/images/avatar2.png",
    "/images/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png"
]

interface IUser{
    name: string
}

const Profile:React.FC<IUser> = () =>{    
    let randomImg = avatarDefaut[
        Math.floor(Math.random() * 2)
    ]

    const {data, error, isLoading}: any = useUser()

    const router = useRouter()


    const push = () => {
        router.push("/")
    }

    return(
         <>
        
        <div className="text-white h-full flex justify-center items-center">
            <div className="flex-col flex">
                <h2 className="text-center mb-10  text-700">Your account</h2>
                <div className="flex items-center justify-center gap-5">
                   <div className="flex flex-col m-auto w-60 h-60 border shadow-md hover:border-green-600" onClick={push}>
                        <div className="flex items-center justify-center h-[150px] w-[150px] mr-auto ml-auto mt-10">
                            <img src={isLoading ? null :randomImg} alt=""  className="w-max h-max object-contain rounded-[50px] overflow-hidden mr-auto ml-auto"/>
                        </div>
                        <div className="mt-[15px]">
                            <h2 className="text-green-600 text-center mb-5 mt-15 hover:text-purple-800 transition cursor-pointer">{data?.name}</h2>
                        </div>
                   </div> 
                </div>
            </div>
        </div>
        </>
    )   
}

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context)
    if (!session){
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            }
        }
    }
    
    return {props: {}}
}

export default Profile; 