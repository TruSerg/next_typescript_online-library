import { FC } from 'react';
import moment from 'moment';
import 'moment/locale/ru';

interface DateComponentProps {
	date: string;
	dateFormat: string;
}

const DateComponent: FC<DateComponentProps> = ({ date, dateFormat }) => {
	return <p>{moment(date).locale('ru').format(dateFormat)}</p>;
};

export default DateComponent;
