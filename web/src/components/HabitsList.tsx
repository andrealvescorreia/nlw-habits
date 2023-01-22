import * as Checkbox from "@radix-ui/react-checkbox";
import dayjs from "dayjs";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";


interface HabitsListProps {
   date: Date
   onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
   possibleHabits: Array<
      { id: string; title: string; createdAt: string }
   >
   completedHabits: string[]
}

export function HabitsList({ date, onCompletedChanged }: HabitsListProps) {

   const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

   useEffect(() => {
      api.get('day', {
         params: {
            date: date.toISOString()
         }
      }).then(response => {
         setHabitsInfo(response.data)
      })

   }, [])

   const isDateInPast = dayjs(date)
                       .endOf('day')
                       .isBefore(new Date())

   async function handleToggleHabit(habitId: string){
      await api.patch(`habits/${habitId}/toggle`)
      const isHabitAlreadyComplete = habitsInfo!.completedHabits.includes(habitId)
      
      let completedHabits: string[] = []

      if(isHabitAlreadyComplete){
         // desmarca
         completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)// remove da lista
         
      }else{
         // marca
         completedHabits = [...habitsInfo!.completedHabits, habitId]// adiciona a lista
      }
      // atualiza o estado (para mostrar vizualmente)
      setHabitsInfo({
         possibleHabits: habitsInfo!.possibleHabits,
         completedHabits
      })
      
      onCompletedChanged(completedHabits.length)

   }

   return (
      <div className="mt-6 flex flex-col gap-3">
         {habitsInfo?.possibleHabits.map(habit => {
            return (
               <Checkbox.Root
                  key={habit.id}
                  checked={habitsInfo.completedHabits.includes(habit.id)}// deixa o habito vizualmente marcado, caso foi concluido
                  onCheckedChange={() => handleToggleHabit(habit.id)}
                  disabled={isDateInPast}// impossibilita marcar/desmarcar habitos de dias que ja passaram.
                  className='flex items-center gap-3 group'
                  // No tailwind, o 'group' faz com que todos os elementos dentro de outro (Checkbox.Root) possam herdar atributos de estilização. 
                  // Nesse caso queremos o 'data-state' em específico, pois ele indica se o checkbox está "checked" ou "unchecked".
               >
                  <div /* quadradinho do checkbox*/
                     className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 
                             group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'//quando "checked", fundo verde
                  >
                     <Checkbox.Indicator /* (marcado)*/ >
                        <Check size={20} className="text-white" />
                     </Checkbox.Indicator>
                  </div>

                  <span className='font-semibold text-xl text-white leading-tight 
                          group-data-[state=checked]:line-through
                        group-data-[state=checked]:text-zinc-400'//quando checked, texto fica rasurado.
                  >
                     {habit.title}
                  </span>
               </Checkbox.Root>
            )
         })}

      </div>
   )
}