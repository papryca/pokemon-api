import { Modal } from '@mui/material';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import styles from '../list-item/list-item.module.scss'
import React from "react";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const ModalComponent:React.FC<ModalComponentProps> = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className={styles.modal}
    >
      <div className={styles.container}>
        <div className={styles.cross}>
          <CloseTwoToneIcon
            fontSize="large"
            className={styles.close}
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default ModalComponent;
