import React from 'react'
import Logo from 'src/assets/icons/logo'

interface AtomsLogoProps {
  onClick?: () => void
}

const AtomsLogo = ({ onClick }: AtomsLogoProps) => (
  <div
    role="presentation"
    onClick={onClick}
    className="flex cursor-default items-center justify-center gap-3"
  >
    <Logo />
    <p className="text-3xl font-bold text-red-accent">Monu</p>
  </div>
)

export default AtomsLogo
