
import React, { 
    forwardRef, 
    useCallback, 
    useMemo,
    useState
} from "react";
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput } from "react-imask";
import { atom, useAtom } from 'jotai';
import { ref, set, update } from 'firebase/database';
import { toast } from "react-toastify";
import omitBy from 'lodash/omitBy';

import * as DefaultEntities from 'src/config/DefaultEntitiesConfig';
import { DatabaseModelsEnum } from 'src/config/enums/DatabaseEnums';
import { auth, database } from 'src/config/firebase';

import { ActionButton } from "../ActionButton";
import { ColorPicker } from "../ColorPicker";

import { 
    ButtonsDiv,
    CancelButton,
    SaveButton,
    Header,
    ConfigForm,
    ConfigFormLabel,
    ConfigModal
} from "./styles";

import type { 
    WithId, 
    CadernoModel, 
    PaginaModel,
    ConfiguracoesModel,
    UpdateBatch
} from "@database-model";
import type { FormEventHandler, FormEvent } from 'react';
import type { ValueOf } from "type-fest";

type NotebookConfigTypes = "Caderno" | "Página";

type ColorsConfiguracoesModel = Omit<ConfiguracoesModel, "tamanho_fonte">;

interface NotebookConfigModalProps {
    trigger: React.ReactNode,
    caderno: WithId<CadernoModel>,
    type: NotebookConfigTypes,
    pagina?: WithId<PaginaModel>
};

interface NotebookCadernoConfigModalProps extends NotebookConfigModalProps{
    type: "Caderno",
    pagina?: undefined
};

interface NotebookPaginaConfigModalProps extends NotebookConfigModalProps{
    type: "Página",
    pagina: WithId<PaginaModel>
}

const { DefaultConfiguracoes } = DefaultEntities;

const hexColorCodeRegex = /^#([0-9A-F]{3}){1,2}$/i;

export function NotebookConfigModal({
    trigger,
    caderno,
    type,
    pagina
}: NotebookCadernoConfigModalProps | NotebookPaginaConfigModalProps){
    const [open, setOpen] = useState(false);

    const config = useMemo(() => {
        if(type === "Página"){
            return pagina.configuracoes;
        }

        if(type === "Caderno"){
            return caderno.configuracoes;
        }
    }, [type, pagina?.id, caderno.id, pagina?.configuracoes, caderno.configuracoes]);

    const defaultConfig = useMemo(() => {
        if(type === "Caderno"){
            return DefaultConfiguracoes;
        }
 
        if(type === "Página"){
            return {
                ...DefaultConfiguracoes,
                ...caderno.configuracoes
            } satisfies Required<ConfiguracoesModel>;
        }

        return DefaultConfiguracoes;
    }, [config]) satisfies Required<ConfiguracoesModel>;

    const configFormAtom = useMemo(() => {
        return atom({
            ...config
        });
    }, [config]);
    const [configForm, setConfigForm] = useAtom(configFormAtom);

    const configModalTitleMap = useMemo(() => {
        return new Map<NotebookConfigTypes, string>([
            ["Caderno", `Configurando ${caderno.nome}`],
            ["Página", `Configurando ${caderno.nome} - Pag. ${pagina?.numero_pagina}`]
        ]);
    }, [type, caderno.nome, pagina?.numero_pagina]);

    function handleModalOnEscapeKeyDown(event: KeyboardEvent){
        event.preventDefault();
        
        if(!document.querySelector("[data-radix-popper-content-wrapper]")){
            setOpen(false);
        }
    }

    function handleCloseCancel(event: React.PointerEvent<HTMLButtonElement>){
        event.preventDefault();
        setOpen(false);
        setConfigForm({
            ...config
        });
    }

    async function handleSubmitConfigForm(
        event: FormEvent<HTMLFormElement>
    ){
        event.preventDefault();
        if(!auth.currentUser) return;
        
        let refPath = DatabaseModelsEnum.USUARIOS + auth.currentUser.uid
            + DatabaseModelsEnum.CADERNOS + caderno.id;
        
        if(type === "Página") {
            refPath = refPath + DatabaseModelsEnum.PAGINAS + pagina.id;
        }

        refPath = refPath + DatabaseModelsEnum.CONFIGURACOES;

        const configSet = omitBy(configForm, (value) => {
            return value === "";
        });

        await set(
            ref(database, refPath),
            configSet
        );
        toast.success("Configurações salvas com sucesso!", {
            autoClose: 4 * 1000
        });
    }

    const getConfig = useCallback(<T extends keyof ConfiguracoesModel>(
        attr: T
    ): Required<ConfiguracoesModel>[T] => {
        return configForm?.[attr]
            ? configForm[attr] as Required<ConfiguracoesModel>[T]
            : defaultConfig[attr];
    }, [configForm]);

    const setColor = useCallback((attr: keyof ColorsConfiguracoesModel): (
        color: string
    ) => void => {
        return (color) => setConfigForm((configForm) => {
            const newColor = color;
            const element = document.querySelector(`[name="${attr}"]`);
  
            if(element instanceof HTMLInputElement){
                const validity = !hexColorCodeRegex.test(newColor) && newColor
                    ? "Valor não é uma cor valida!"
                    : "";

                element.setCustomValidity(validity);
            }

            return {
                ...configForm,
                [attr]: color
            };
        });
    }, [configForm]);

    const colorInputsOnInput = useCallback((
        attr: keyof ColorsConfiguracoesModel
    ): FormEventHandler<HTMLInputElement> => {
        return (event) => {
            setColor(attr)(event.currentTarget.value);
        }
    }, [configForm]);
    
    return (
        <ConfigModal
            trigger={trigger}
            modalContentStyle={{
                width: "max-content"
            }}
            open={open}
            onOpenChange={setOpen}
            onEscapeKeyDown={handleModalOnEscapeKeyDown}
        >
            <Header>
                <h2>{configModalTitleMap.get(type)}</h2>
            </Header>
            <ConfigForm
                id={`config-form-${caderno.id}`}
                onSubmit={handleSubmitConfigForm}
            >
                <ConfigFormLabel
                    pickedColor={getConfig("cor_capa")}
                    isValid={hexColorCodeRegex.test(getConfig("cor_capa"))}
                    isDisabled={type === "Página"}
                >
                    <span>Cor da Capa</span>
                    <IMaskInput
                        name="cor_capa"
                        mask={/^(?:[#a-fA-F0-9]){0,7}$/}
                        className="color-input"
                        type="text"
                        size={8}
                        placeholder={`Padrão: ${defaultConfig.cor_capa}`}
                        value={configForm?.cor_capa ? configForm?.cor_capa : ""}
                        onInput={colorInputsOnInput("cor_capa")}
                        disabled={type === "Página"}
                    />
                    <ColorPicker
                        color={getConfig("cor_capa")}
                        setColor={setColor("cor_capa")}
                        tabIndex={
                            type === "Página"
                                ? -1
                                : undefined
                        }
                    />
                </ConfigFormLabel>
                <ConfigFormLabel
                    pickedColor={getConfig("cor_background")}
                    isValid={hexColorCodeRegex.test(getConfig("cor_background"))}
                >
                    <span>Cor da Página</span>
                    <IMaskInput
                        name="cor_background"
                        mask={/^(?:[#a-fA-F0-9]){0,7}$/}
                        className="color-input"
                        type="text"
                        size={8}
                        placeholder={`Padrão: ${defaultConfig.cor_background}`}
                        value={configForm?.cor_background ? configForm?.cor_background : ""}
                        onInput={colorInputsOnInput("cor_background")}
                    />
                    <ColorPicker
                        color={getConfig("cor_background")}
                        setColor={setColor("cor_background")}
                    />
                </ConfigFormLabel>
                <ConfigFormLabel
                    pickedColor={getConfig("cor_linhas")}
                    isValid={hexColorCodeRegex.test(getConfig("cor_linhas"))}
                >
                    <span>Cor das Linhas</span>
                    <IMaskInput
                        name="cor_linhas"
                        mask={/^(?:[#a-fA-F0-9]){0,7}$/}
                        className="color-input"
                        type="text"
                        size={8}
                        placeholder={`Padrão: ${defaultConfig.cor_linhas}`}
                        value={configForm?.cor_linhas ? configForm?.cor_linhas : ""}
                        onInput={colorInputsOnInput("cor_linhas")}
                    />
                    <ColorPicker
                        color={getConfig("cor_linhas")}
                        setColor={setColor("cor_linhas")}
                    />
                </ConfigFormLabel>
                <ConfigFormLabel
                    pickedColor={getConfig("cor_texto")}
                    isValid={hexColorCodeRegex.test(getConfig("cor_texto"))}
                >
                    <span>Cor do Texto</span>
                    <IMaskInput
                        name="cor_texto"
                        mask={/^(?:[#a-fA-F0-9]){0,7}$/}
                        className="color-input"
                        type="text"
                        size={8}
                        placeholder={`Padrão: ${defaultConfig.cor_texto}`}
                        value={configForm?.cor_texto ? configForm?.cor_texto : ""}
                        onInput={colorInputsOnInput("cor_texto")}
                    />
                    <ColorPicker
                        color={getConfig("cor_texto")}
                        setColor={setColor("cor_texto")}
                    />
                </ConfigFormLabel>
                <ConfigFormLabel>
                    <span>Tamanho da Fonte</span>
                    <IMaskInput
                        name="tamanho_fonte"
                        mask={/^0*(?:[1-9][0-9]?)$/}
                        size={8}
                        placeholder={`Padrão: ${defaultConfig.tamanho_fonte}`}
                        value={configForm?.tamanho_fonte ? String(configForm?.tamanho_fonte) : ""}
                    />
                </ConfigFormLabel>
                <ButtonsDiv>
                    <CancelButton
                        onClick={handleCloseCancel}
                    >
                        Cancelar
                    </CancelButton>
                    <SaveButton
                        type="submit"
                        form={`config-form-${caderno.id}`}
                    >
                        Salvar
                    </SaveButton>
                </ButtonsDiv>
            </ConfigForm>
        </ConfigModal>
    );
}

type NotebookCadernoConfigButtonTriggerProps = Omit<
    NotebookCadernoConfigModalProps,
    "trigger"
>;

type NotebookPaginaConfigButtonTriggerProps = Omit<
    NotebookPaginaConfigModalProps,
    "trigger"
>;

export function NotebookConfigButtonTrigger({
    caderno,
    ...props
}: NotebookCadernoConfigButtonTriggerProps | NotebookPaginaConfigButtonTriggerProps){
    const ModalTrigger = useMemo(() => {
        return forwardRef<HTMLButtonElement>((props, ref) => {
            return (
                <ActionButton
                    {...props}
                    icon={faGear}
                    tooltipText="Configurar Caderno"
                    ref={ref}
                />
            );
        });
    }, [caderno.id]);

    return (
        <NotebookConfigModal
            trigger={
                <ModalTrigger/>
            }
            caderno={caderno}
            {...props}
        />
    );
}