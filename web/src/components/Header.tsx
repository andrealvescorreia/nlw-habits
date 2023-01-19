import {Plus} from 'phosphor-react'// icone de +
import logoImage from '../assets/logo.svg'

export function Header(){
    return (

        <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
            <img src={logoImage} alt="Habits logo" />
            <button 
                type="button"
                className='border border-violet-500 font-semibold flex items-center gap-3 rounded-lg px-6 py-4 hover:border-violet-300' // px-6 é o padding horizontal (eixo x) de 6x4 = 24pixels. py-4 é padding lateral (eixo y) de 4x4 = 16pixels
                >
                <Plus size={20} className="text-violet-500" />
                Novo hábito
            </button>
        </div>
    )
}
