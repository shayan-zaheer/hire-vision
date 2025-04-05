import Image from "next/image"

function Navbar() {
  return (
    <div className="sticky top-4 px-8 py-4 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg font-ubuntu mx-8 flex sm:justify-between text-gray-300 z-50 justify-center">
        <Image src={"/hire-vision.png"} alt={"Hire Vision"} width={70} height={5} />
        <ul className="hidden lg:flex gap-x-16 items-center justify-center">
            <li>Home</li>
            <li>Services</li>
            <li>Achievement</li>
            <li>About Us</li>
        </ul>
        <div className="hidden md:flex space-x-4">
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full">Sign Up</button>
            <button className="px-8 py-3 bg-purple-700 rounded-full">Log In</button>
        </div>
    </div>
  )
}

export default Navbar