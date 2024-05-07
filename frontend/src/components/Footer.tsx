
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: 'Destinations',
    links: [
      { title: "France", href: "#a" },
      { title: "UAE", href: "#b" },
      { title: "Canada", href: "#c" },
      { title: "Germany", href: "#d" }
    ],
  },
  {
    title: "Activities",
    links: [
      { title: "Multi Activity", href: "#wwe" },
      { title: "Sailing", href: "#2" },
      { title: "Cruising", href: "#w" },
      { title: "Northern Lights", href: "#h" },
    ],
  },
  {
    title: "Travel Blogs",
    links: [
      { title: "Paris Travel Blog", href: "#wq" },
      { title: "Bali Travel Blog", href: "#q" },
      { title: "New York Travel Blog", href: "#m" },
      { title: "Ibiza Travel Blog", href: "#md" },
    ],
  },
  {
    title: "About Us",
    links: [
      { title: "Careers", href: "#dd" },
      { title: "Our story", href: "#ss" },
      { title: "Our blogs", href: "#ww" },
      { title: "Our blog", href: "#ff" },
    ],
  },
]

const Footer = () => {
  return (
    <footer className='border-t border-green-700 mt-12 py-[5.6rem] bg-blue-700 text-white text-sm'>
      <div className='container flex gap-32 justify-between mx-auto flex-col lg:flex-row'>
        <div>
          <div className='flex flex-row lg:flex-col justify-between h-full'>
            <h1 className='text-grey font-semibold text-lg'>Duplex</h1>
            <div className='mt-auto flex items-center gap-4'>
              <FaXTwitter />
              <FaYoutube />
              <FaInstagram />
            </div>
          </div>
        </div>

        <div className='flex flex-wrap md:flex-row gap-2'>
          {footerLinks.map((column) => (
            <div key={column.title} className='min-w-[13rem] mt-10 lg:mt-0'>
              <h3 className='mb-3 font-bold text-xl'>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href} className='[&_a]:last:mb-0'>
                    <Link className='text-grey mb-3 block hover:text-off-white transition-colors' to={link.href}>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer