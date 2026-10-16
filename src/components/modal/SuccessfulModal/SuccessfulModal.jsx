import React from 'react';

const SuccessfulModal = ({onClose}) => {
    return (
        <div>
            <h3>Bestillingen din er sendt inn!</h3>
            <button onClick={() => onClose()}>Close</button>
        </div>
    );
};

export default SuccessfulModal;