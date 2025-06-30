import * as Dialog from '@radix-ui/react-dialog';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';
import { useState } from 'react';

interface NoteCardProps {
    note: {
        id: string;
        title: string;
        date: string;
        content: string;
        status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO';
    };
    onNoteDeleted: (id: string) => void;
    onNoteUpdated: (id: string, title: string, content: string, status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO') => void;
}

export function NoteCard({ note, onNoteDeleted, onNoteUpdated }: NoteCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedContent, setEditedContent] = useState(note.content);
    const [editedStatus, setEditedStatus] = useState(note.status);

    return (
        <Dialog.Root>
            <Dialog.Trigger className="text-left rounded-md flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
                <div className="flex items-center justify-between w-full relative">
                    <p className="text-lg leading-6 text-slate-200">{note.title}</p>
                    
                    {/* <button
                        type="button"
                        className="absolute right-0 bg-red-500 text-white text-xs py-1 px-2 rounded-md hover:bg-red-600"
                        onClick={() => onNoteDeleted(note.id)}
                    >
                        APAGAR
                    </button> */}
                </div>
                <span className="text-sm font-medium text-slate-300 first-letter:uppercase">
                    {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
                </span>
                <span
                    className={`px-2 py-1 rounded-md text-xs font-bold ${note.status === 'PENDENTE' ? 'bg-red-500' :
                        note.status === 'EM_ANDAMENTO' ? 'bg-yellow-500' :
                            'bg-green-500'
                        }`} // Informações estão salvas assim dentro do banco de dados, arrumar posteriormente
                >
                    {note.status}
                </span>
                <p className="text-sm leading-6 text-slate-400">{note.content}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
                    <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                        <X className="size-5" />
                    </Dialog.Close>
                    <div className="flex flex-1 flex-col gap-6 p-5">
                        {isEditing ? (
                            <div className="flex flex-col gap-2">
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    className="bg-slate-700 text-white px-3 py-1 rounded-md outline-none"
                                />
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    className="bg-slate-700 text-white px-3 py-2 rounded-md outline-none"
                                />
                                <select
                                    value={editedStatus}
                                    onChange={(e) => setEditedStatus(e.target.value as 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO')}
                                    className="bg-slate-800 text-white px-3 py-2 rounded-md"
                                >
                                    <option value="PENDENTE">Pendente ❌</option>
                                    <option value="EM_ANDAMENTO">Em andamento ⏳</option>
                                    <option value="CONCLUIDO">Concluído ✅</option>
                                </select>
                                <button
                                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                                    onClick={() => {
                                        onNoteUpdated(note.id, editedTitle, editedContent, editedStatus as 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO');
                                        setIsEditing(false);
                                    }}
                                >
                                    Salvar ✅
                                </button>
                            </div>
                        ) : (
                            <>
                                <p className="text-lg leading-6 text-slate-200">{note.title}</p>
                                <span className="text-sm font-medium text-slate-300 first-letter:uppercase">
                                    {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
                                </span>
                                <span
                                    className={`px-2 py-1 rounded-md text-xs font-bold ${note.status === 'PENDENTE' ? 'bg-red-500' :
                                        note.status === 'EM_ANDAMENTO' ? 'bg-yellow-500' :
                                            'bg-green-500'
                                        }`}
                                >
                                    {note.status}
                                </span>
                                <p className="text-sm leading-6 text-slate-400">{note.content}</p>
                                <button
                                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 text-sm"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Editar ✏️
                                </button>
                            </>
                        )}
                    </div>

                    <button
                        type="button"
                        className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
                        onClick={() => onNoteDeleted(note.id)}
                    >
                        Deseja <span className="text-red-400 group-hover:underline outline-none">apagar essa tarefa</span>?
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}