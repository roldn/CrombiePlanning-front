import { useState } from 'react';

const useToggle = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (value: boolean | null = null) => {
    if (value === null) {
      setOpen(!open);
    } else {
      setOpen(value);
    }
  };

  return { open, toggleDrawer };
};

export default useToggle;
