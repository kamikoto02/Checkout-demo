import React from 'react';

const SuccessfulModal = ({onClose}) => {
    return (
        <div>
            <h3>Your order has been successfully submitted!</h3>
            <button onClick={() => onClose()}>Close</button>
        </div>
    );
};

export default SuccessfulModal;