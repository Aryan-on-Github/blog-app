function Button({ // they are default properties assigned to button . they can be overridden by user if required
    children, //text
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '', 
    ...props  //Collects any extra props you pass. For example: <Button onClick={handleClick} disabled>Click</Button>
}) {

    return(
        <button className={`px-4 py-2 rounded-lg  ${bgColor} ${textColor} ${className}`} {...props}>{children}</button>
    );

}

export default Button;