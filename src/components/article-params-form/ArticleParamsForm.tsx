import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { FormEvent, MouseEventHandler, ReactElement, useRef, useState } from 'react';
import { Select } from '../select';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { Option  } from '../select/Option';
import { Text } from '../text';
import { OptionType } from 'src/constants/articleProps';




import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { RadioGroup } from '../radio-group';
import { appStateProprs } from 'src/index';

type TArticleParamsForm = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
	fontSizeOption: OptionType;
	onChange?: (option: appStateProprs) => void;
}

//пропы - состояние статьи и функции изменения состояний
export const ArticleParamsForm = (props: TArticleParamsForm) => {
	const {fontFamilyOption, fontColor, contentWidth, backgroundColor, fontSizeOption, onChange} = props;
//завести состояние открытия
	const [isOpen, setFormIsOpen] = useState(false);
	const [openClass, setOpenClass] = useState(styles.container);

	const [fontFamily, setFontFamily] = useState(fontFamilyOptions[0]);
	const [fontSize, setFontSize] = useState(fontSizeOptions[0]);
	const [fontColor1, setFontColor] = useState(fontSizeOptions[0]);
	const [backgroundColor1, setBackgroundColor] = useState(fontSizeOptions[0]);
	const [contentWidth1, setContentWidth] = useState(fontSizeOptions[0]);

	const rootRef = useRef<HTMLDivElement>(null);

	function handleClick(status: boolean) {
		!status? setFormIsOpen(false) : setFormIsOpen(true);
		status? setOpenClass(styles.container_open) : setOpenClass(styles.container);
	}

	function optionChange() {
		setFontFamily(fontFamilyOption)
		console.log('change')
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const appState = {
			fontFamilyOption: fontFamily,
			fontColor: fontColor1,
			contentWidth: contentWidth1,
			backgroundColor: backgroundColor1,
			fontSizeOption: fontSize
		}

		onChange(appState);
	}

	const handleReset = (e: FormEvent) => {
		e.preventDefault();
		setFontFamily(defaultArticleState.fontFamilyOption)
	}
//завести состояние выбанных селектов
// на форме обработчик события вызывающий изменения статьи
// обработчик на изменение пропсов

 useOutsideClickClose({isOpen, onChange: handleClick, rootRef})

	return (
		<div ref={rootRef}>
			<ArrowButton onClose={handleClick} isOpen={isOpen} /> {/*пробросить состояние открытия и функцию изменения состояния */}
			<aside className={`${openClass} ${styles.container}`}>
				<Separator />
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
				 <Text as='h2' size={31} weight={800} uppercase dynamicLite>
				задайте параметры
				</Text>
				<Select selected={fontFamily} options={fontFamilyOptions} title='шрифт' onChange={optionChange}/>
				{/* <RadioGroup selected={fontSizeOption} name={'fontSize'} options={fontSizeOptions} title={'Размер шрифта'} />
				<Select selected={fontColor} options={fontColors} title={'цвет шрифта'}/>
				<Separator />
				<Select selected={backgroundColor} options={backgroundColors} title='цвет фона'/>
				<Select selected={contentWidth} options={contentWidthArr} title={'ширина контента'}/> */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset'/>
						<Button title='Применить' type='submit'/>
					</div>
				</form>
			</aside>
		</div>
	);
};
