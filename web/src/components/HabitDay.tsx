import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';
import { Check } from 'phosphor-react';
import { CheckBox } from './CheckBox';
import dayjs from 'dayjs';

// Properties
interface HabitProps{
    date: Date
    amount?: number // total de habitos disponiveis para um dado dia
    completed?: number // quantos desses foram completos
}

// PRECISA começar com Maiusculo!
export function HabitDay({completed = 0, amount = 0, date}: HabitProps){
   const completedPercentage = amount > 0 ? Math.round( (completed / amount) * 100) : 0
   
   const dayAndMonth = dayjs(date).format('DD/MM')
   const dayOfWeek = dayjs(date).format('dddd') // ex: 'terça-feira'
    return (
        <Popover.Root>
            <Popover.Trigger 
            className={clsx('w-10 h-10 border-2 rounded-lg', {
                ' bg-zinc-900  border-zinc-800': completedPercentage === 0,
                ' bg-violet-900  border-violet-700': completedPercentage > 0 && completedPercentage < 20,
                ' bg-violet-800  border-violet-600': completedPercentage >= 20 && completedPercentage < 40,
                ' bg-violet-700  border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
                ' bg-violet-600  border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
                ' bg-violet-500  border-violet-400': completedPercentage >= 80
            })}
            />
            
            <Popover.Portal>
                <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
                    <Popover.Arrow height={8} width={16} className="fill-zinc-900"/>
                
                    <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
                    <span className='font-extrabold mt-1 text-3xl leading-tight'>{dayAndMonth}</span>
                    <ProgressBar progress={completedPercentage}/>

                    <CheckBox />
                    <CheckBox />
                    <CheckBox />

                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>

    )
}