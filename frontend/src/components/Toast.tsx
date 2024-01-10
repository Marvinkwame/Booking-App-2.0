import React from 'react'

type ToastProps ={
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {

    const styles = type === "SUCCESS" ? 
    "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md" 
    : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md" 

    React.useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000)

        return () => {
            clearTimeout(timer);
        }
    }, [onClose])


  return (
    <div className={styles}>
        <div className="flex items-center justify-center">
            <span className='text-lg font-semibold'>{message}</span>
        </div>
    </div>
  )
}

export default Toast