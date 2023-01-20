import { Check } from "phosphor-react";

export function NewHabitForm(){
    return(
        <form className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>


            <input 
                type="text"
                id="title"
                placeholder="ex.: Exercicios, Dormir 8hrs, etc..."
                autoFocus
                className="rounded-lg p-4 mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
            />

            <label className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <button className="mt-4 p-4 flex items-center justify-center font-semibold bg-green-600  rounded-lg hover:bg-green-500">
                <Check size={20} weight="bold" />
                Confirmar
            </button>

        </form>
    )
}