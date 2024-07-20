import React from 'react';
type Props = {};

const App = (props: Props) => {
  console.log(process.env.NODE_ENV);

  return (
    <div>
      App
      <br />
      <h1>{process.env.APP_URL}</h1>
    </div>
  );
};

export default App;
