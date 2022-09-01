import WisebookSuccessIcon from '@public/wisebook-success-icon.svg';
import WisebookErrorIcon from '@public/wisebook-error-icon.svg';
import WisebookInfoIcon from '@public/wisebook-info-icon.svg';
import WisebookWarningIcon from '@public/wisebook-warning-icon.svg';

import { WisebookToastContainer } from "./styles";

import type { IconProps } from 'react-toastify';

export function WisebookToast(){

    function renderToastIcon({ type }: IconProps): React.ReactNode{
		if(type == 'success'){
			return <WisebookSuccessIcon 
				className="toast-icon"
			/>;
		}

		if(type == 'error'){
			return <WisebookErrorIcon 
				className="toast-icon"
			/>;
		}

		if(type == 'warning'){
			return <WisebookWarningIcon 
				className="toast-icon"
			/>;
		}

		return <WisebookInfoIcon
			className="toast-icon"
		/>;
	}

    return (
        <WisebookToastContainer
            icon={renderToastIcon}
            position="top-right"
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            closeOnClick
        />
    );
}