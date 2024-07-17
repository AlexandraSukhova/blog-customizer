import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { OptionType, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type appStateProprs = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
	fontSizeOption: OptionType;
}

const App = () => {
	const [appState, setAppState] = useState(defaultArticleState);

	const onChange = (proprs?: appStateProprs) => {
		if(proprs) {setAppState(proprs)}
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm {...appState} onChange={onChange}/> {/*сюда пропы для изменения*/}
			<Article /> {/*здесь просто юзаются значения*/}
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
