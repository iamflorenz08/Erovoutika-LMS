import { useState, useEffect, ChangeEvent, RefObject } from 'react'

const useDropDown = (state: boolean, ref: RefObject<HTMLElement>) => {
    const [toggle, setToggle] = useState<boolean>(state)

    useEffect(() => {

        const handleDocumentClick = (event: MouseEvent) => {
            if (toggle && ref.current && !ref.current.contains(event.target as Node)) {
                setToggle(false);
            }
        };
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };

    }, [ref, toggle]);

    return [toggle, setToggle] as const
}

export default useDropDown