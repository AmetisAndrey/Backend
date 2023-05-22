


interface INavItems{
    name: string
}


const NavItems:React.FC<INavItems> = ({name})  => {

    return (
        <div className="text-red-700 cursor-pointer">{name}</div>
    )
}


export default NavItems;