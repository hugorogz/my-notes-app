import React from 'react';
import { Button, Modal } from '@mui/material';
import styles from '../styles/DeleteNoteConfirm.module.scss';


type DeleteNoteConfirmProps = {
    isOpen: boolean;
    handleCancel: () => void;
    handleDelete: () => void;
};

const DeleteNoteConfirm = ({
    isOpen,
    handleCancel,
    handleDelete,
}: DeleteNoteConfirmProps) => {
    return <Modal
        open={isOpen}
        onClose={handleCancel}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"// from MUI docs
    >
        <div className={styles.deleteConfirm} style={{ width: 600 }}>
            <h2 id="parent-modal-title">Delete Note?</h2>

            <p id="parent-modal-description">
                Are you sure you want to delete this note?
            </p>
            <Button 
                size="small" 
                onClick={handleCancel}
                style={{ border: '1px solid blue', marginRight: '1rem' }}
            >
                Cancel
            </Button>
            <Button 
                size="small" 
                onClick={() => handleDelete()}
                style={{ color: 'red', border: '1px solid red' }}
            >
                Delete
            </Button>
        </div>
    </Modal>
};

export default DeleteNoteConfirm;
