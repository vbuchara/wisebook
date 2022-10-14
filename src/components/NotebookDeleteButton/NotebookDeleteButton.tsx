import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ref, remove } from "@firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

import { ActionButton } from "../ActionButton";

import { auth, database } from "src/config/firebase";
import { DatabaseModelsEnum } from "src/config/enums/DatabaseEnums";

import { colors } from "@styles/base/colors";

import { DeleteNotebookDialog } from "./styles";

type NotebookDeleteButtonProps = {
    id: string,
    name: string,
    isSelected: boolean
};

export function NotebookDeleteButton({
    id, name, isSelected
}: NotebookDeleteButtonProps){
    const deleteProcessRef = useRef(false);
    
    const [user, loading, error] = useAuthState(auth); 

    const [open, setOpen] = useState(false);

    const cadernoRef = useMemo(() => {
        if(!user || loading || error) return;

        const cadernoPath = DatabaseModelsEnum.USUARIOS + user.uid
            + DatabaseModelsEnum.CADERNOS + id;

        const cadernoRef = ref(database, cadernoPath);

        return cadernoRef;
    }, [id, loading, user, error]);

    const handleDeleteNotebook = useCallback(async() => {
        if(!cadernoRef || deleteProcessRef.current) return;

        if(isSelected){
            toast.error(`"${name}" está atualmente selecionado!`, {
                autoClose: 4 * 1000
            });
            return;
        }

        deleteProcessRef.current = true;
        await remove(cadernoRef);
        deleteProcessRef.current = false;

        toast.success(`"${name}" deletado com sucesso!`, {
            autoClose: 4 * 1000
        });

    }, [cadernoRef, isSelected]);

    const DeleteButton = useMemo(() => forwardRef<HTMLButtonElement>((props, ref) => {
        return (
            <ActionButton
                {...props}
                icon={solid('trash')}
                iconColor={colors.white}
                backgroundColor={colors.red_error}
                tooltipText="Deletar Caderno"
                tooltipTextColor={colors.red_error}
            />
        );
    }), []);

    return (
        <DeleteNotebookDialog
            open={open}
            onOpenChange={setOpen}
            trigger={<DeleteButton />}
            title={`Tem certeza que deseja deletar "${name}?"`}
            cancel="Não"
            action="Sim"
            onActionClick={handleDeleteNotebook}
        />
    );
}