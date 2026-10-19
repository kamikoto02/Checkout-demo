import React from 'react';

const SuccessfulModal = ({onClose}) => {
    return (
        <div>
            <h3>Noen gikk galt!</h3>
            <button onClick={() => onClose()}>Close</button>
        </div>
    );
};

export default SuccessfulModal;