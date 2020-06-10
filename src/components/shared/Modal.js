import React from 'react';

const Modal = ({ children, confirmable, confirmText, onDismiss, title }) => {
    if (!onDismiss) onDismiss = () => {};
    return ( 
        <div className="modal-container">
            <div className="modal">
                <header>
                    <h1>{ title || 'modal' }</h1>
                </header>
                <section className="body">
                    { children }
                </section>
                <section className="actions">
                    <button onClick={() => onDismiss(false)}>{ confirmable ? 'cancel' : 'close' }</button>
                    { confirmable && 
                        <button onClick={() => onDismiss(true)}>{ confirmText || 'confirm' }</button> }
                </section>
            </div>
        </div>
     );
}
 
export default Modal;