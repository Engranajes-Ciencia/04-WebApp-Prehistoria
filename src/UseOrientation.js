//src/UseOrientation.js
import { useEffect, useState } from "react";

export function UseOrientation() {
    const getOrientation = () =>
        window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';

    const [orientation, setOrientation]= useState(getOrientation());

    useEffect (() => {
        const HandleResize = () => setOrientation (getOrientation());

        window.addEventListener('resize', HandleResize);
        return() => window.removeEventListener('resize', HandleResize);
    },[]);
    return orientation;
}