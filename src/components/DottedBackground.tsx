import React from 'react'
import clsx from 'clsx'

interface DottedBackgroundProps {
  children: React.ReactNode
  className?: string
}

const DottedBackground = ({ children, className }: DottedBackgroundProps) => {
  return <div className={clsx(className, 'background')}>{children}</div>
}

export default DottedBackground
