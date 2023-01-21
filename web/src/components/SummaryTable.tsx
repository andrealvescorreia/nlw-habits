// Tabela com um resumo dos habitos, ou seja, com os quadradinhos e suas cores que dependem da porcentagem de sucesso daquele dia que ele representa

import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDaysSize = 18 * 7 // 18 semanas
const amountOfDaysToFill = minimumSummaryDaysSize - summaryDates.length

// no typescript, 'type' e 'interface' funcionam de forma parecida.
type Summary = {
   id: string;
   date: string;
   amount: number;
   completed: number;
}[]

export function SummaryTable() {

   const [summary, setSummary] = useState<Summary>([])

   // gabiarra que devs de React usam para fazer apenas uma chamada a API (pois por padrão o react faria uma chamada toda vez que o conteudo muda)
   useEffect(()=>{
      api.get('summary').then(response =>{
         console.log(response.data)
         setSummary(response.data)
      })
   }, [])// esse '[]' vazio faz parte da gambiarra!


   return (// w-full : ocupar a largura toda
      <div className="w-full flex">
         <div className="grid grid-rows-7 grid-flow-row gap-3">
            {weekDays.map((weekDay, i) => {// as chaver {} possibilitam rodar um codigo js nesse html
               return (
                  <div
                     key={`${weekDay}-${i}`}
                     className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center">
                     {weekDay}
                  </div>
               )
            })}
         </div>

         <div className="grid grid-rows-7 grid-flow-col gap-3">
            {summaryDates.map(date => {
               const dayInSummary = summary.find(day =>{
                  return dayjs(date).isSame(day.date, 'day')//o 'day' diz para o dayjs que nao precisa comparar hora, minuto, segundo e milesimo, apenas anos, mes, e DIA.
               })


               return (
                  <HabitDay
                     date = {date}
                     key={date.toString()}
                     amount={dayInSummary?.amount}
                     completed={dayInSummary?.completed}
                  />
               )
            })}

            {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
               return (
                  <div
                     key={i}
                     className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                  />
               )
            })}

         </div>
      </div>

   )
}