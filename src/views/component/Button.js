import React from 'react'
import { Button } from 'reactstrap'

const ButtonComponent = ({
 children,
 onClick,
 className,
 color,
 style,
 ...restProps
}) => (
 <Button
   color={color}
   style={style}
   className={className}
   onClick={onClick}
   {...restProps}
 >
   {children}
 </Button>
)
export default ButtonComponent