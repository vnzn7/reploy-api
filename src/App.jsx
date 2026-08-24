import { useEffect, useState } from 'react'

function App() {
  const [tarefas, setTarefas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=30')
      .then((resposta) => resposta.json())
      .then((dados) => setTarefas(dados))
      .catch(() => setErro('Não foi possível carregar as tarefas.'))
      .finally(() => setCarregando(false))
  }, [])

  return (
    <main className="bg-light min-vh-100 py-4 py-md-5">
      <div className="container">
        <header className="bg-primary text-white rounded-3 p-4 p-md-5 mb-4 shadow-sm">
          <span className="badge text-bg-light text-primary mb-3">JSONPlaceholder</span>
          <h1 className="display-6 fw-bold mb-2">Minhas tarefas</h1>
          <p className="lead mb-0">Tarefas carregadas diretamente de uma API.</p>
        </header>

        <section className="card border-0 shadow-sm">
          <div className="card-body p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
              <h2 className="h4 mb-0">Lista de tarefas</h2>
              {!carregando && !erro && (
                <span className="badge rounded-pill text-bg-secondary">{tarefas.length} itens</span>
              )}
            </div>

            {carregando && (
              <div className="text-center py-5" role="status">
                <div className="spinner-border text-primary mb-3" aria-hidden="true" />
                <p className="text-body-secondary mb-0">Carregando tarefas...</p>
              </div>
            )}

            {erro && <div className="alert alert-danger mb-0">{erro}</div>}

            {!carregando && !erro && (
              <ul className="list-group list-group-flush">
                {tarefas.map((item) => (
                  <li key={item.id} className="list-group-item px-0 d-flex justify-content-between align-items-center gap-3">
                    <span className={item.completed ? 'text-decoration-line-through text-body-secondary' : ''}>
                      {item.title}
                    </span>
                    <span className={`badge ${item.completed ? 'text-bg-success' : 'text-bg-warning'}`}>
                      {item.completed ? 'Concluída' : 'Pendente'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
