import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { FormEvent, useRef, useState } from 'react';
import { Select } from '../select';
import { backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { Text } from '../text';
import { OptionType } from 'src/constants/articleProps';


import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { RadioGroup } from '../radio-group';
import { appStateProprs } from 'src/constants/articleProps';
import clsx from 'clsx';

type TArticleParamsForm = {
	FormStateOptions: appStateProprs;
	onChange: (option: appStateProprs) => void;
}

export const ArticleParamsForm = (props: TArticleParamsForm) => {

	const {onChange, FormStateOptions} = props;
	const [FormIsOpen, setFormIsOpen] = useState<boolean>(false);
	const [FormState, setFormState] = useState<appStateProprs>(FormStateOptions);
	const rootRef = useRef<HTMLDivElement>(null);

	const changeForm = (optionName: string) => {
		return (option: OptionType) => {
			setFormState((currentFormState) => ({...currentFormState, [optionName]: option}));
		}
	}

	const handleClick = (status: boolean) => {
		!status? setFormIsOpen(false) : setFormIsOpen(true);
		setFormState(FormStateOptions);
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		onChange(FormState);
	}

	const handleReset = (e: FormEvent) => {
		e.preventDefault();

		onChange(defaultArticleState);
		setFormState(defaultArticleState);
	}

 	useOutsideClickClose({isOpen: FormIsOpen, onChange: handleClick, rootRef})

	return (
		<div ref={rootRef}>
			<ArrowButton onClose={handleClick} isOpen={FormIsOpen} />
			<aside className={clsx(FormIsOpen && styles.container_open, styles.container)}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
				 <Text as='h2' size={31} weight={800} uppercase dynamicLite>
				задайте параметры
				</Text>
				<Select selected={FormState.fontFamilyOption} options={fontFamilyOptions} title='шрифт' onChange={changeForm('fontFamilyOption')}/>
				<RadioGroup selected={FormState.fontSizeOption} name={'fontSize'} options={fontSizeOptions} title={'Размер шрифта'} onChange={changeForm('fontSizeOption')}/>
				<Select selected={FormState.fontColor} options={fontColors} title={'цвет шрифта'} onChange={changeForm('fontColor')}/>
				<Separator />
				<Select selected={FormState.backgroundColor} options={backgroundColors} title='цвет фона' onChange={changeForm('backgroundColor')}/>
				<Select selected={FormState.contentWidth} options={contentWidthArr} title={'ширина контента'} onChange={changeForm('contentWidth')}/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset'/>
						<Button title='Применить' type='submit'/>
					</div>
				</form>
			</aside>
		</div>
	);
};
