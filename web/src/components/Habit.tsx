// Properties
interface HabitProps{
    completed: number
}

// PRECISA começar com Maiusculo!
export function Habit(props: HabitProps){
    return <div className="bg-zinc-600 w-20 h-20 text-white rounded m-2 flex items-center justify-center">{props.completed}</div>
}