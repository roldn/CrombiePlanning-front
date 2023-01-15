import { useState } from "react";

const useToggle = ():any => {
    const [open, setOpen] = useState<boolean>(false);

    const openDrawer = () => {setOpen(true);};
    const closeDrawer = () => {setOpen(false);};

    return ({open, openDrawer, closeDrawer})
}
 
export default useToggle;