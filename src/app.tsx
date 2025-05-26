import { ChangeEvent, useState } from 'react';
import { NoteCard } from './components/note-card';
import { NewNoteCard } from './components/new-note-card';
import { toast } from 'sonner';

interface Note {
  id: string,
  title: string,
  date: Date,
  content: string
  status: 'Pendente' | 'Em andamento' | 'Concluido';
}

export function App() {
  //Estado para as buscas
  const [search, setSearch] = useState('')
  //Estado das notas
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  })

  function onNoteCreated(title: string, content: string, status: 'Pendente' | 'Em andamento' | 'Concluido') {
    if (title.trim() === '' || content.trim() === ''){
      toast.error('Título e conteúdo são obrigatórios');
      return
    }

    const newNote = {
      id: crypto.randomUUID(),
      title,
      date: new Date(),
      content,
      status, 
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)
    //JSON = JavaScrip Object Notation
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter(note => {
      return note.id != id
    })
    toast.info('Tarefa apagada.')

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
    
  }

  function handleSearch (event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearch(query)
  }

  const filteredNotes = search != ''
  ? notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase()))
  : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5' >
      <form className='w-full ' >
        <input
          type='text'
          placeholder='Busque em suas terefas aqui...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6' >
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map(note => {
          return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        })}
      </div>
    </div>
  )
}