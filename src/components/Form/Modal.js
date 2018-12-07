import React from 'react';

const Modal = (props) => {
    return (
        <div id="modal">
            <div className="modal-block">
                <p className="modal-block_text">{props.data.text[props.data.status]}</p>
                <button onClick={e => props.close()} className="modal-block_close">ok</button>
            </div>
        </div>
    )
};

export default Modal;