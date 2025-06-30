// src/App.tsx
import { ChangeEvent, useState, useEffect } from 'react'; // Importar useEffect
import { NoteCard } from './components/Note-card';
import { NewNoteCard } from './components/new-note-card';
import { toast } from 'sonner';

interface Note {
  id: string;
  title: string;
  date: string; // A data virá como string do backend (ISO 8601)
  content: string;
  status: 'Pendente' | 'Em andamento' | 'Concluido';
}

export function App() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'Todas' | 'Pendente' | 'Em andamento' | 'Concluido'>('Todas');
  const [notes, setNotes] = useState<Note[]>([]); // Inicie vazio, os dados virão do backend

  // **URL base da sua API Spring Boot**
  const API_BASE_URL = 'http://localhost:8080/api/notes';

  // --- Função para buscar todas as notas do backend ---
  useEffect(() => {
    fetchNotes();
  }, []); // O array vazio [] garante que esta função seja executada apenas uma vez após a montagem inicial

  async function fetchNotes() {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) { // Verifica se a resposta foi bem-sucedida (status 2xx)
        throw new Error('Falha ao carregar as notas do servidor.');
      }
      const data: Note[] = await response.json();
      setNotes(data); // O backend já retorna a data como string no formato ISO, que o NoteCard pode usar.
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
      toast.error('Erro ao carregar as notas do servidor. Verifique se o backend está rodando.');
    }
  }

  // --- Função para criar uma nova nota ---
  async function onNoteCreated(title: string, content: string, status: 'Pendente' | 'Em andamento' | 'Concluido') {
    if (title.trim() === '' || content.trim() === '') {
      toast.error('Título e conteúdo são obrigatórios!');
      return;
    }

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Informa ao backend que estamos enviando JSON
        },
        body: JSON.stringify({// data não é necessária, é adicionada dentro do Java Spring Boot
          title,
          content,
          status: status.toUpperCase() // **IMPORTANTE**: Envia o status em MAIÚSCULAS para corresponder ao ENUM do Java (PENDENTE, EM_ANDAMENTO, CONCLUIDO)
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao criar a nota.');
      }
      const newNote: Note = await response.json(); // O backend retorna a nota recém-criada (com ID e data)
      setNotes(prevNotes => [newNote, ...prevNotes]); // Adiciona a nova nota ao topo da lista no estado
      toast.success('Tarefa criada com sucesso!');
    } catch (error) {
      console.error("Erro ao criar nota:", error);
      toast.error('Erro ao criar a tarefa.');
    }
  }

  // --- Função para apagar uma nota ---
  async function onNoteDeleted(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao apagar a nota.');
      }

      // Se a exclusão no backend for bem-sucedida, remove do estado local
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      toast.info('Tarefa apagada.');
    } catch (error) {
      console.error("Erro ao apagar nota:", error);
      toast.error('Erro ao apagar a tarefa.');
    }
  }

  // --- Função para atualizar uma nota ---
  async function onNoteUpdated(id: string, updatedTitle: string, updatedContent: string, updatedStatus: 'Pendente' | 'Em andamento' | 'Concluido') {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTitle,
          content: updatedContent,
          status: updatedStatus.toUpperCase() // Envia o status em MAIÚSCULAS para o ENUM do Java
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar a nota.');
      }

      const updatedNoteFromServer: Note = await response.json(); // O backend retorna a nota atualizada
      setNotes(prevNotes => prevNotes.map(note =>
        note.id === id ? updatedNoteFromServer : note // Substitui a nota antiga pela nova (atualizada)
      ));
      toast.success('Tarefa atualizada com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar nota:", error);
      toast.error('Erro ao atualizar a tarefa.');
    }
  }

  // Manipular busca (permanece igual)
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  // Filtragem por título, conteúdo e status (ajuste para status em maiúsculas)
  const filteredNotes = notes.filter(note =>
    (filterStatus === 'Todas' || note.status.toUpperCase() === filterStatus.toUpperCase()) &&
    (search === '' || note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      {/* ... O restante do seu JSX permanece o mesmo ... */}
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas tarefas aqui..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
          value={search} // Adicionado value para controle do input
        />
      </form>

      <div className="h-px bg-slate-700" />

      {/* Filtro de seleção */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as 'Todas' | 'Pendente' | 'Em andamento' | 'Concluido')}
        className="bg-slate-800 text-white text-sm outline-none border border-slate-600 rounded-md px-3 py-2 hover:border-slate-300 focus:border-slate-500"
      >
        <option className="bg-slate-700 text-white py-2" value="Todas">Todas as tarefas</option>
        <option className="bg-slate-700 text-white py-2" value="Pendente">Pendentes ❌</option>
        <option className="bg-slate-700 text-white py-2" value="Em andamento">Em andamento ⏳</option>
        <option className="bg-slate-700 text-white py-2" value="Concluido">Concluídas ✅</option>
      </select>

      {/* Lista de tarefas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map(note => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} onNoteUpdated={onNoteUpdated} />
        ))}
      </div>
    </div>
  );
}