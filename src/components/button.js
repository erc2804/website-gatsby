import React from "react"

const Button = ({ variant = 'primary', additionalClasses, onClick = () => {}, children }) => {
    const baseClasses = 'px-3 py-2 rounded-3xl transition-all'
    const variantClasses = variant === 'primary' ? 'bg-brand-green-medium-lvl shadow-sm lg:hover:shadow-lg' : ''

    const buttonClasses = `${baseClasses} ${variantClasses} ${additionalClasses}`

    return (
        <button className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
