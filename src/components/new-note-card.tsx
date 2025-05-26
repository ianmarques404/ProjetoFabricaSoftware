import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (title: string, content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnBoarding, setShouldShowOnBoarding] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault()
        const fakeFormEvent = { preventDefault: () => {} } as FormEvent
        handleSaveNote(fakeFormEvent)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [title, content]) // garante acesso aos valores atualizados

  function handleStartEditor() {
    setShouldShowOnBoarding(false)
  }

  function handleTitleChanged(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)

    if (event.target.value == '') {
      setShouldShowOnBoarding(true)
    }
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value == '') {
      setShouldShowOnBoarding(true)
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if (title == '' || content == '') {
      return
    }

    onNoteCreated(title, content)

    setTitle('')
    setContent('')
    setShouldShowOnBoarding(true)

    toast.success('Tarefa criada com sucesso!')
  }

  function handleDisableTyping() {
    setShouldShowOnBoarding(true)
    setTitle('')
    setContent('')
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      alert('Infelizmente seu navegador não suporta essa API de gravação.')
      return
    }

    setIsRecording(true)
    setShouldShowOnBoarding(false)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)

    if (speechRecognition != null) {
      speechRecognition.stop()
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='flex flex-col rounded-md bg-slate-700 p-5 gap-3 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        <span className='text-lg font-medium text-slate-200'>
          Criar nova terfa 👆
        </span>
        <p className='text-sm leading-6 text-slate-400'>
          Crie suas atividades com praticidade utilizando áudio ou escrevendo manualmente.
        </p>
        <span className='text-lg font-medium text-slate-300'>
          Tipos de progresso:
        </span>
        <div>
          <p className='text-sm leading-6 text-slate-300'>Pendente ❌</p>
          <p className='text-sm leading-6 text-slate-300'>Em andamento ⌛</p>
          <p className='text-sm leading-6 text-slate-300'>Concluído ✅</p>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50' />
        <Dialog.Content className='fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden' >
          <Dialog.Close
            className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'
            onClick={handleDisableTyping}
          >
            <X className='size-5' />
          </Dialog.Close>

          <form className='flex-1 flex flex-col'>
            <div className='flex flex-1 flex-col gap-6 p-5 '>
              <input
                type="text"
                placeholder="Digite o título..."
                className="w-full bg-transparent text-xl font-semibold outline-none placeholder:text-slate-500"
                onChange={handleTitleChanged}
                value={title}
              />

              {shouldShowOnBoarding ? (
                <p className='text-sm leading-6 text-slate-400'>
                  Comece <button type='button' onClick={handleStartRecording} className='font-me text-lime-400 hover:underline'> gravando um texto com sua voz </button> ou se preferir, também pode <button type='button' onClick={handleStartEditor} className='font-me text-lime-400 hover:underline'>digitar manualmente</button>.
                </p>
              ) : (
                <textarea
                  autoFocus
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                  onChange={handleContentChanged}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button
                type='button'
                onClick={handleStopRecording}
                className='w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100'
              >
                <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                Gravando! (Clique p/ interromper)
              </button>
            ) : (
              <button
                type='button'
                onClick={handleSaveNote}
                className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500'
              >
                Salvar tarefa
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
