import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  //Crie duas cosnt para guardar e carregar tarefas
  const [tarefas, setTarefas] = useState([])
  const [carregando, setCarregando] = useState(true)

  //useeffect com fetch (requisições assíncronas) para carregar as tarefas do backend
  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/todos?_limit=30')
      .then((resposta) => resposta.json())
      .then((dados) => {
        setTarefas(dados);
        setCarregando(false)})
  }, []);

  return (
    <>
    
    <div>
      <div>
        <h2>Tarefas vindas da API</h2>

        <p>Consumindo dados de JSONPlaceholder via fetch e useEffect</p>
        {carregando ? (
          <div>Carregando...</div>
        ) : (
          <ul>
            {tarefas.map((item) => (
              <li key={item.id}>{item.title}
              {item.completed ? ' (Concluída)' : ' (Pendente)'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    <div className="App">
      </div>

    </>
  )
}

export default App
