import { useState, CSSProperties } from "react";
import { appStateProprs, defaultArticleState } from "src/constants/articleProps";
import clsx from "clsx";
import { Article } from "../article";
import { ArticleParamsForm } from "../article-params-form";

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [appState, setAppState] = useState<appStateProprs>(defaultArticleState);

	const onChange = (proprs: appStateProprs) => {
		setAppState(proprs)
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
			<ArticleParamsForm FormStateOptions={appState} onChange={onChange}/>
			<Article />
		</main>
	);
};
