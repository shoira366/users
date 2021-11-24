import { useEffect, useState } from "react";
import { createContext } from "react";

let Context = createContext()

function Provider({ children }) {
    let [lang, setLang] = useState(window.localStorage.getItem('language') || 'uz')

    useEffect(()=>{
        window.localStorage.setItem('language', lang)
    }, [lang])

    return (
        <Context.Provider value={{ lang, setLang }}>{children}</Context.Provider>
    )

}

export { Context, Provider }