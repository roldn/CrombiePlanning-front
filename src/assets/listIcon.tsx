import { SVGProps } from 'react';

const ListIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill='none'
    color='black'
    viewBox='0 0 24 24'
    xmlns='http://www.w3.org/2000/svg'
    {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M6.759 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3h-12Zm-1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-12a1 1 0 0 1-1-1V5Zm3 2a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2h-8Zm0 4a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-8Zm-1 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z'
      fill='currentColor'
    />
  </svg>
);

export default ListIcon;
