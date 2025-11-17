import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
    return (
      <footer className='flex justify-center items-center p-8' style={{ backgroundColor: '#404040' }}>
        <Link href="/">
          <Image 
            src="/Apply Digital Logo.svg" 
            alt="Apply Digital Logo" 
            width={200} 
            height={80}
            className="object-contain cursor-pointer"
          />
        </Link>
      </footer>
    )
  }

