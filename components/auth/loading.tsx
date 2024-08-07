import Image from "next/image";
import img from "@/public/logo.png"
export const Loading = () =>{
    return (
        <div className="h-full w-full flex flex-col justify-center items-center">
           <Image src={img}
           alt="Logo"
           width={200}
           height={200}
           className="animate-pulse duration-700"
           />
        </div>
    )
}