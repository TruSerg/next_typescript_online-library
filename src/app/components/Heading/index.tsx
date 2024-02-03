import { FC } from 'react';

interface HeadingProps {
	text: string;
	tag?: keyof JSX.IntrinsicElements;
	className?: string;
}

const Heading: FC<HeadingProps> = ({ text, tag, className }) => {
	const Tag = tag ?? 'h1';

	return (
		<>
			<Tag className={className}>{text}</Tag>;
		</>
	);
};

export default Heading;
