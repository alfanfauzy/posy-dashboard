import React from 'react'
import Logo from 'src/assets/icons/logo'

interface AtomsLogoProps {
  onClick?: () => void
}

const AtomsLogo = ({ onClick }: AtomsLogoProps) => (
  <div
    role="presentation"
    onClick={onClick}
    className="flex cursor-default items-center justify-center gap-[10px]"
  >
    <Logo />
    <p className="whitespace-nowrap text-2xl font-bold text-[#2F265B]">
      Posy Resto
    </p>
  </div>
)

export default AtomsLogo
