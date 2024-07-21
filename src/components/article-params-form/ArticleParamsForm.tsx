import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { FormEvent, useRef, useState } from 'react';
import { Select } from '../select';
import { backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { Text } from '../text';
import { OptionType } from 'src/constants/articleProps';


import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { AppStateProprs } from 'src/constants/articleProps';
import clsx from 'clsx';
import { useClose } from '../hooks/useClose';

type TArticleParamsForm = {
	FormStateOptions: AppStateProprs;
	onChange: (option: AppStateProprs) => void;
}

export const ArticleParamsForm = (props: TArticleParamsForm) => {

	const {onChange, FormStateOptions} = props;
	const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
	const [formState, setFormState] = useState<AppStateProprs>(FormStateOptions);
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

	const closeForm = () => {
		handleClick(false)
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		onChange(formState);
	}

	const handleReset = (e: FormEvent) => {
		e.preventDefault();

		onChange(defaultArticleState);
		setFormState(defaultArticleState);
	}

	useClose({isOpen: formIsOpen, onClose: closeForm, rootRef: rootRef})

	return (
		<div ref={rootRef} >
			<ArrowButton onClose={handleClick} isOpen={formIsOpen} />
			<aside className={clsx(styles.container, formIsOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset} style={{background: FormStateOptions.backgroundColor.value}}>
				 <Text as='h2' size={31} weight={800} uppercase dynamicLite>
				задайте параметры
				</Text>
				<Select selected={formState.fontFamilyOption} options={fontFamilyOptions} title='шрифт' onChange={changeForm('fontFamilyOption')}/>
				<RadioGroup selected={formState.fontSizeOption} name={'fontSize'} options={fontSizeOptions} title={'Размер шрифта'} onChange={changeForm('fontSizeOption')}/>
				<Select selected={formState.fontColor} options={fontColors} title={'цвет шрифта'} onChange={changeForm('fontColor')}/>
				<Separator />
				<Select selected={formState.backgroundColor} options={backgroundColors} title='цвет фона' onChange={changeForm('backgroundColor')}/>
				<Select selected={formState.contentWidth} options={contentWidthArr} title={'ширина контента'} onChange={changeForm('contentWidth')}/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset'/>
						<Button title='Применить' type='submit'/>
					</div>
				</form>
			</aside>
		</div>
	);
};
