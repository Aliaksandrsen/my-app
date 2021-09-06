import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import Counter from './features/counter/Counter';

import './App.css';

// const App: React.FC = () => {
//   return (
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <Counter />
//     <p>
//       Edit <code>src/App.tsx</code> and save to reload.
//     </p>
//     <span>
//       <span>Learn </span>
//       <a
//         className="App-link"
//         href="https://reactjs.org/"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         React
//       </a>
//       <span>, </span>
//       <a
//         className="App-link"
//         href="https://redux.js.org/"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Redux
//       </a>
//       <span>, </span>
//       <a
//         className="App-link"
//         href="https://redux-toolkit.js.org/"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Redux Toolkit
//       </a>
//       ,<span> and </span>
//       <a
//         className="App-link"
//         href="https://react-redux.js.org/"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         React Redux
//       </a>
//     </span>
//   </header>
// </div>

//   );
// };

type Item = {
  id: string;
  title: string;
  body: string;
};

type Error = {
  message: string;
};

const App: React.FC = () => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    // throw new Error('error');
    fetch('https://jsonplaceholder.typicode.com/users/1/posts')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // Ошибка рендаринга не ловится!
        (err) => {
          setIsLoaded(false);
          setError(err);
          console.log('2then', err);
        }
      )
      // Ошибка рендаринга ловится
      .catch((err) => {
        setIsLoaded(false);
        setError(err);
        console.log('catch', err);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
    // eslint-disable-next-line no-else-return
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  }
  throw new Error('error'); // ошибку выбрасываем при рендере компонента (это ошибка рендера (не сетевая))
  return (
    <ul>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <li>
            {item.title} <br />
            {item.body}
          </li>
          <br />
        </React.Fragment>
      ))}
    </ul>
  );
};

export default App;
