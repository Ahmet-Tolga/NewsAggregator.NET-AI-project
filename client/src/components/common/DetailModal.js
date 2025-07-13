import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { closeModalAction, openModalAction } from '../../redux/actions/DetailModalActions';
import '../../styles/DetailModal.css';

function DetailModal() {
    const description = useSelector((state => state.SelectedNewReducer)); 

    const modalState = useSelector((state => state.detailModalReducer));
    const dispatch = useDispatch();

    const toggle = () => dispatch(modalState ? closeModalAction() : openModalAction());

    return (
        <div>
            <Button color="primary" onClick={toggle} className="modal-trigger-button">
                HABER DETAYI
            </Button>

            <Modal isOpen={modalState} toggle={toggle} className="custom-modal-dialog">
                <ModalHeader toggle={toggle} className="custom-modal-header">
                    DETAYLAR
                </ModalHeader>
                <ModalBody className="custom-modal-body">
                    {description || 'Haber detayı bulunamadı.'}
                </ModalBody>
                <ModalFooter className="custom-modal-footer">
                    <Button color="primary" onClick={toggle} className="btn-modal-primary">
                        Tamam
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle} className="btn-modal-secondary">
                        İptal
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DetailModal;