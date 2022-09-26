import { useMemo, useState } from "react";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { ActionButton } from "../ActionButton";

import { colors } from "@styles/base/colors";

import { DeleteNotebookDialog } from "./styles";

type NotebookDeleteButtonProps = {
    id: string,
    name: string,
};

export function NotebookDeleteButton({
    id, name
}: NotebookDeleteButtonProps){
    const [open, setOpen] = useState(false);

    const DeleteButton = useMemo(() => {
        return (
            <ActionButton
                icon={solid('trash')}
                iconColor={colors.white}
                backgroundColor={colors.red_error}
                tooltipText="Deletar Caderno"
            />
        );
    }, [colors]);

    return (
        <DeleteNotebookDialog
            open={open}
            onOpenChange={setOpen}
            trigger={DeleteButton}
            title={`Tem certeza que deseja deletar "${name}?"`}
            cancel="Não"
            action="Sim"
        />
    );
}