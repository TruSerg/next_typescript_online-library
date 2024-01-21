'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mui/joy';

const GoToPreviousPageButton = () => {
	const router = useRouter();

	return <Button onClick={() => router.back()}>Go back</Button>;
};

export default GoToPreviousPageButton;
