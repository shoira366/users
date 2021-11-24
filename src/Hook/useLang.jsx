import { useContext } from "react";
import { Context } from "../Context/Context";

function useLang(){
    let {lang, setLang} = useContext(Context)

    return [lang, setLang]
}

export default useLang