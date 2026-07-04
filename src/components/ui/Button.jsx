function Button({children, type="button"}){

    return(
        <button
        type={type}
        className="
            w-full
            bg-orange-500
            hover:bg-orange-600
            text-white
            p-3
            rounder-xl
            font-semibold ">

            {children}
        </button>

    );

}

export default Button;