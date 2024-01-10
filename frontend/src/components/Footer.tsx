
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-blue-600 py-10'>
        <div className="container mx-auto flex items-center justify-between">
            <div className='text-white'>
                <h4 className='text-[2rem]'>Duplex</h4>
                <p>Hard Work. Easy Money</p>
                <ul className="flex items-center gap-4">
                    <li><FaFacebookSquare /></li>
                    <li> <FaInstagramSquare /> </li>
                    <li> <FaSquareXTwitter /> </li>
                </ul>
            </div>

            <div>

            </div>


            <div></div>
        </div>
    </div>
  )
}

export default Footer