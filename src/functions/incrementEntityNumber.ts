import type { CadernoModel, PaginaModel } from "@database-model";

export function incrementEntityNumber<
    EntityType extends PaginaModel | CadernoModel
>(entity: EntityType): EntityType{
    const newEntity = { ...entity };

    if('nome' in newEntity){
        const lastNumbersRegex = /[0-9]+$/mg;
        const countNumber: string | undefined = lastNumbersRegex.exec(newEntity.nome)?.pop();

        if(!countNumber){
            newEntity.nome = `${newEntity.nome} 1`;
            return newEntity;
        };

        newEntity.nome = newEntity.nome.replace(
            lastNumbersRegex, 
            `${Number(countNumber) + 1}`
        );
    }

    if('numero_pagina' in newEntity){
        newEntity.numero_pagina = newEntity.numero_pagina + 1;
    }

    return newEntity;
}