import Image from 'next/image';
import warwickTechCrewLogo from '@/assets/organisations/warwick-tech-crew.png';
import warwickSuLogo from '@/assets/organisations/warwick-su.svg';
import warwickPresentsLogo from '@/assets/organisations/warwick-presents.png';
import Link from 'next/link';
import { FiInstagram } from 'react-icons/fi';
import { FaDiscord } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-secondary mt-auto px-4 pt-6 pb-8 text-sm">
      <div className="flex gap-2 justify-center items-center mb-6 font-bold uppercase">
        <Link href="/">WSAF</Link>
        <span className="font-light"> • </span>
        <Link href="/team">Team</Link>
        <span className="font-light"> • </span>
        <Link href="/history">History</Link>
      </div>

      <div className="m-2">
        <h3 className="font-bold">Delivery Partners</h3>
        <p className="font-light">
          WSAF would not be possible without the generous support of our
          delivery partners:
        </p>
        <div className="flex justify-center items-center gap-4 mt-1">
          <a href="https://www.warwicktechcrew.co.uk/" target="_blank">
            <Image
              src={warwickTechCrewLogo}
              alt="Warwick Tech Crew logo"
              className="h-12 sm:h-16 w-auto"
            />
          </a>
          <a
            href="https://warwick.ac.uk/students/warwickpresents/"
            target="_blank"
          >
            <Image
              src={warwickPresentsLogo}
              alt="Warwick Presents logo"
              className="h-8 sm:h-10 w-auto"
            />
          </a>
          <a href="https://www.warwicksu.com/" target="_blank">
            <Image
              src={warwickSuLogo}
              alt="Warwick SU logo"
              className="h-9 sm:h-14 w-auto"
            />
          </a>
        </div>
      </div>
      <p className="font-light mt-8">
        Copyright © Warwick Student Arts Festival 2024
      </p>

      <p className="font-bold text-xs">
        <a
          href="https://github.com/WarwickStudentArtsFestival/WSAF24-Website"
          target="_blank"
        >
          Source Code
        </a>
        <span className="font-light mx-1">•</span>
        <a href="/privacy">Privacy Policy</a>
      </p>

      <p className="font-bold mt-2 flex gap-2 justify-center">
        <a href="mailto:info@wsaf.org.uk" target="_blank">
          info@wsaf.org.uk
        </a>
        <span className="font-light">•</span>
        <a
          href="/instagram"
          target="_blank"
          className="flex items-center justify-center"
        >
          <FiInstagram className="inline mr-0.5 mt-0.5" />
          @wsaf24
        </a>
        <span className="font-light">•</span>
        <a
          href="/discord"
          target="_blank"
          className="flex items-center justify-center"
        >
          <FaDiscord className="inline mr-0.5" />
          Discord
        </a>
      </p>
    </footer>
  );
}
