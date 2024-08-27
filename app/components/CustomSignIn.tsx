import { SignInButton } from "@clerk/nextjs"
import React from "react"
import { Button } from "semantic-ui-react"

interface CustomSignInButtonProps {
  className?: string
  children?: React.ReactNode
}

const CustomSignInButton: React.FC<CustomSignInButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <SignInButton {...props}>
      <Button className="sidebar-toggle">Sign in</Button>
    </SignInButton>
  )
}

export default CustomSignInButton
