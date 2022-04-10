import {useEffect,useState} from 'react';

const PREFIX = 'whatsapp-clone-'

// const useLocalStorage = (key:string | any,initialValue?:Function | string | undefined | any)  :[string | any, (value: string | undefined| any) => void | any] => {
    const useLocalStorage = (key: any,initialValue?: any)  :[any, (value: any) => void | any ]=> {
    const prefixedKey = PREFIX + key
    const [value,setValue] = useState<any>(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if(jsonValue != null) return JSON.parse(jsonValue)
        if(typeof initialValue === 'function'){
            return initialValue();
        }else{
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(prefixedKey,JSON.stringify(value))
    },[prefixedKey,value])

    return [value,setValue]
}
export default useLocalStorage