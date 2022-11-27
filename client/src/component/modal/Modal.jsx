import style from './Modal.module.css';
import {ReactComponent as IconClose} from '../assets/close.svg';

const Modal = ({children, visible, handleVisible, subtitle=''}) => {
  const rootClasses = () => {
    return visible ? [style.modal, style.active].join(' ') : style.modal;
  };

  return (
    <div className={rootClasses()} onClick={handleVisible}>
        <div className={ subtitle ? [style.modal__content, style.create].join(' ') : style.modal__content}
             onClick={(e) => e.stopPropagation()}
        >
          {subtitle && <p>{subtitle}</p>}
          {children}
          <button
            className={style.modal__btn}
            onClick={handleVisible}
          >
            <IconClose className={style.modal__btn_close}/>
          </button>
      </div>
    </div>
  );
};
export default Modal;