import { ReactNode, FC } from 'react';

import style from './styles.module.scss';

interface ContainerProps {
	children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
	return <div className={style.container}>{children}</div>;
};

export default Container;
