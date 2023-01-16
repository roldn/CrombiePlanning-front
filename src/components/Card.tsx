import { FiboCards } from '../types/FiboCards';

type Cards = {
  fiboCards: FiboCards[];
  roomId: string;
  clientId: string;
  handleCardSelect: (card: string, roomId: string, clientId: string) => void;
};

const Cards: React.FC<Cards> = ({
  fiboCards,
  roomId,
  clientId,
  handleCardSelect
}) => {
  return (
    <div className='card-container'>
      {fiboCards.map(fibo => (
        <div
          onClick={() => handleCardSelect(fibo.card, roomId, clientId)}
          className={fibo.checked ? 'card-checked' : 'card'}
          key={fibo.card}>
          {fibo.card}
        </div>
      ))}
    </div>
  );
};

export default Cards;
