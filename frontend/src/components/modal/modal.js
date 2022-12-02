import './modal.css'

const Modal = ({ title, children, canCancel, canConfirm, onCancel, onConfirm, confirmText }) => {
	return (
		<div className="modal">
			<header className="modal__header">
				<h1>{title}</h1>
			</header>
			<section className="modal__content">{children}</section>
			<section className="modal__actions">
				{canCancel && <button onClick={onCancel}>Cancel</button>}
				{canConfirm && <button onClick={onConfirm}>{confirmText}</button>}
			</section>
		</div>
	)
}

export default Modal
