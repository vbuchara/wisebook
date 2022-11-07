import type { CadernoModel, PaginaModel } from "@database-model";
import { lastNumbersRegex, getLastNumber } from './getLastNumber';

export function incrementEntityNumber<
    EntityType extends PaginaModel | CadernoModel
>(entity: EntityType, startingBy?: number): EntityType{
    const newEntity = { ...entity };

    if('nome' in newEntity){
        const countNumber: number | undefined = getLastNumber(newEntity.nome);

        if(!countNumber){
            newEntity.nome = startingBy 
                ? `${newEntity.nome} ${startingBy + 1}`
                : `${newEntity.nome} 1`;
            return newEntity;
        };

        newEntity.nome = newEntity.nome.replace(
            lastNumbersRegex, 
            `${startingBy ? startingBy + 1 : Number(countNumber) + 1}`
        );
    }

    if('numero_pagina' in newEntity){
        newEntity.numero_pagina = startingBy
            ? newEntity.numero_pagina + (startingBy + 1)
            : newEntity.numero_pagina + 1;
    }
    
    return newEntity;
}