import { useState } from 'react';

import { log } from '../../log.js';

function HistoryItem({ count }) {
  log('<HistoryItem /> rendered', 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? 'selected' : undefined}>
      {count}
    </li>
  );
}

export default function CounterHistory({ history }) {
  log('<CounterHistory /> rendered', 2);

  /*it's preferable to use keys related to specific values, not the index*/
  /*because index of corresponding element may change during addition of new elements*/
  return (
    <ol>
      {history.map((count, index) => (
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  );
}
