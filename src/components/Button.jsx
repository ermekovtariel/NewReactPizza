import React from 'react'

function Button({onClick, classNAme, outline, children}) {
    return (
        <button
            onClick={onClick}
            className={classNames('button', className,{
                'button--outline':outline,
            })}>
            {children}
        </button>
    )
}

export default Button
