import { User } from '../types/User';

type Votes = {
  users: User[] | undefined;
  reveal: boolean;
};

const Votes: React.FC<Votes> = ({ users, reveal }) => {
  return (
    <div className='card-voting-container'>
      {users?.length &&
        users.map(user => (
          <div key={user.clientId}>
            {reveal ? (
              <div
                className={
                  user.card
                    ? 'card-voted received-card'
                    : 'card-voted card-empty'
                }>
                {user.card}
              </div>
            ) : (
              <div
                className={
                  user.card ? 'card-voted back-card' : 'card-voted card-empty'
                }></div>
            )}
            <div className='user'>{user.username}</div>
          </div>
        ))}
    </div>
  );
};

export default Votes;
