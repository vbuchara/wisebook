import { forwardRef, useMemo, useState } from "react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { toast } from "react-toastify";
import { ref, remove } from "@firebase/database";

import { database } from 'src/config/firebase';

import { ActionButton } from "src/components/ActionButton";
import { DeleteNotebookDialog } from "src/components/NotebookDeleteButton/styles";

import { colors } from "@styles/base/colors";

import { 
    NotebookPageControlContainer 
} from "../styles";

import type { Dispatch, SetStateAction } from 'react';

type NotebookPageControlProps = {
    refPagePath: string,
    notebookPagesQuantity: number,
    pageNumberSelected: number,
    setPageNumberSelected: Dispatch<SetStateAction<number>>,
};

export function NotebookPageControl({
    refPagePath,
    notebookPagesQuantity,
    pageNumberSelected,
    setPageNumberSelected
}: NotebookPageControlProps){

    const [open, setOpen] = useState(false);

    async function handlePageDelete(){
        if(notebookPagesQuantity === 1) {
            toast.error("Esta é a unica pagina deste caderno!", {
                autoClose: 4 * 1000
            });

            return;
        }

        setPageNumberSelected(
            (pageNumberSelected === 1) ? pageNumberSelected : pageNumberSelected - 1
        );
        await remove(ref(database, refPagePath));

        toast.success(`Página ${pageNumberSelected} deletada com sucesso`);
    }

    const DeletePageButton = useMemo(() => forwardRef<HTMLButtonElement>((props, ref) => {
        return (
            <ActionButton
                {...props}
                icon={solid('trash')}
                iconColor={colors.white}
                backgroundColor={colors.red_error}
                tooltipText="Deletar Página"
                tooltipTextColor={colors.red_error}
            />
        );
    }), []);

    return (
        <NotebookPageControlContainer>
            <DeleteNotebookDialog
                open={open}
                onOpenChange={setOpen}
                trigger={<DeletePageButton/>}
                title="Tem certeza que deseja deletar esta página?"
                cancel="Não"
                action="Sim"
                onActionClick={handlePageDelete}
            />
            <ActionButton
                icon={solid('gear')}
                tooltipText="Configurar Página"
            />
        </NotebookPageControlContainer>
    );
}