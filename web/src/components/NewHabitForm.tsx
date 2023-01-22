import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const daysOfTheWeek = [
   'Domingo',
   'Segunda-feira',
   'Terça-feira',
   'Quarta-feira',
   'Quinta-feira',
   'Sexta-feira',
   'Sábado'
]


export function NewHabitForm() {
   const [title, setTitle] = useState('')// title: nome do habito que o usuario digitou (ex: caminhar)
   const [weekDays, setWeekDays] = useState<number[]>([])// weekDays: dias que o usuario selecionou (ex: 0 = Domingo, 3 = Quarta)

   async function createNewHabit(event: FormEvent) {
      event.preventDefault()// por padrão o formulariio redireciona o usuario. Essa linha de codigo impede isso.
      if (!title || !weekDays) {
         alert('Campo em falta')
         return
      }

      await api.post('habits', {
         title,
         weekDays
      })
      alert('Hábito criado com sucesso!')

      setTitle('')
      setWeekDays([])
   }
   function handleToggleWeekDay(weekDayIndex: number) {

      if (weekDays.includes(weekDayIndex)) {
         // desmarcar (remove de weekDays)
         setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
      } else {
         // marcar (adiciona a weekDays)
         setWeekDays((prevState) => [...prevState, weekDayIndex])// "...spread operator"
      }

   }


   return (
      <form
         onSubmit={createNewHabit}
         className="w-full flex flex-col mt-6"
      >
         <label htmlFor="title" className="font-semibold leading-tight">
            Qual seu comprometimento?
         </label>

         <input
            type="text"
            id="title"
            placeholder="ex.: Exercicios, Dormir 8hrs, etc..."
            autoFocus
            className="rounded-lg p-4 mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
            value={title}
            onChange={event => setTitle(event.target.value)}
         />

         <label className="font-semibold leading-tight mt-4">
            Qual a recorrência?
         </label>

         <div className="gap-2 mt-3 flex flex-col">

            {daysOfTheWeek.map((weekDay, index) => {
               return (
                  <Checkbox.Root
                     className='flex items-center gap-3 group'
                     key={weekDay}
                     checked={weekDays.includes(index)}
                     onCheckedChange={() => {
                        handleToggleWeekDay(index)
                     }}
                  >
                     <div
                        className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 transition-all 
                                        group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'
                     >

                        <Checkbox.Indicator>
                           <Check size={20} className="text-white" />
                        </Checkbox.Indicator>

                     </div>

                     <span className='text-base text-white leading-tight'>
                        {weekDay}
                     </span>

                  </Checkbox.Root>
               )
            })}


         </div>

         <button className="mt-4 p-4 flex items-center justify-center font-semibold bg-green-600  rounded-lg hover:bg-green-500 transition-colors">
            <Check size={20} weight="bold" />
            Confirmar
         </button>

      </form>
   )
}