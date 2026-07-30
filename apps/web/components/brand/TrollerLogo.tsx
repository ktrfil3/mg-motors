import Image from 'next/image'

interface MGMotorsLogoProps {
  className?: string
  variant?: 'light' | 'dark'
}

export function TrollerLogo({ className = 'h-10 w-auto' }: MGMotorsLogoProps) {
  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      <div className="relative w-10 h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/assets/logo-mg.png"
          alt="MG Motors Venezuela Logo"
          width={44}
          height={44}
          className="object-contain w-full h-full drop-shadow-md"
          priority
        />
      </div>
      <div className="flex flex-col justify-center leading-none">
        <span className="font-display font-black text-white text-lg tracking-wider">
          MG MOTORS
        </span>
        <span className="font-condensed font-semibold text-[10px] text-accent tracking-[0.28em] -mt-0.5 uppercase">
          VENEZUELA
        </span>
      </div>
    </div>
  )
}
