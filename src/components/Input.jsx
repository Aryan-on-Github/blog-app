//forwardRef just provides access to functionalities related to input field like focusing(see on chatgpt for more)
//Unlike props, the special ref does not get passed down automatically. React reserves it for DOM or class components.
//So if you build a custom component like <Input />, by default, the ref won’t reach the <input> inside it.
//👉 That’s where forwardRef comes in.
//When you wrap a component with forwardRef, React allows the parent’s ref to be forwarded to some inner element.

// when we use it somewhere a parent comppnent where it is just a child like in app.jsx, forwardRef connects outside (parent) with inside (DOM element). 

// it will be like this : 
// function App() {
//   const inputRef = useRef(null); // outside reference

//   return (
//     <div>
//       {/* outside passes ref down */}
//       <Input ref={inputRef} label="Name" />

//       {/* button outside but can control inside */} **************this is important*****************
//       <button onClick={() => inputRef.current.focus()}>
//         Focus the Input
//       </button>
//     </div>
//   );
// }
import { forwardRef} from "react";
import { useId } from "react";
// the ref in your Input component is just being passed forward so that if someday you want to control that <input> (like focus, clear value, scroll into view, etc.), you’ll be able to.

const Input = forwardRef(function Input({
    label,//text field
    type = "text",
    className = '', //any other class name elements
    ...props //any other classes/props like disabled,, etc   
    }    
,ref)
{
    const id = useId()
    return(
        <div className="w-full">
            {label && <label //only show label if a label exists
                className='inline-block mb-1 pl-1' 
                htmlFor={id}> {/*when label is clicked, it will focus on input field with same id*/} 
                {label}
                </label>}
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref} // ref can be used when required
            {...props}
            id={id} /*when label is clicked, it will focus on input field with same id*/
            />
        </div>
    )

})
export default Input;