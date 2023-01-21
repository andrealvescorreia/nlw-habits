import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

export function CheckBox(){
    return(
        <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root
                className='flex items-center gap-3 group'
                // No tailwind, o 'group' faz com que todos os elementos dentro de outro (Checkbox.Root) possam herdar atributos de estilização. 
                // Nesse caso queremos o 'data-state' em específico, pois ele indica se o checkbox está "checked" ou "unchecked".
            >   
                <div 
                    /* quadradinho do checkbox*/ 
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
                    Beber 5L de Pinga
                </span>

            </Checkbox.Root>
        </div>
    )
}