import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type TArrowButton = {
	isOpen: boolean;
	onClose: (status: boolean) => void;
}

export const ArrowButton = ({onClose, isOpen}: TArrowButton) => {

	const[containerState, setContainerState] = useState('')
	const[arrowState, setArrowState] = useState(styles.arrow);

	function onClick() {
		onClose(!isOpen);
		if(!isOpen) {
			setArrowState(styles.arrow_open);
			setContainerState(styles.container_open);
		} else {
			setArrowState(styles.arrow);
			setContainerState('');
		}
	}

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, containerState)}
			onClick={onClick}
			>
			<img src={arrow} alt='иконка стрелочки' className={arrowState} />
		</div>
	);
};
