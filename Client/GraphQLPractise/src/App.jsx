import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ApolloClient , InMemoryCache ,useQuery,gql} from '@apollo/client';
import './App.css'


const query = gql`
query GetDataUser{
  getTodos {
    id,
    completed,
    title,
    user {id,
      name,
    }
  }
}
`;
function App() {
  const { data, loading } = useQuery(query);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      <table>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo?.user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App
