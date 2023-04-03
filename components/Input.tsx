import clsx from 'clsx';

type InputProps = React.PropsWithChildren<{
	className: React.ReactNode;
}>;

const Input = ({ className, ...props }: InputProps) => {
	return (
		<input
			className={clsx('bg-slate-500  px-6 py-2 text-lg rounded-sm w-full', className)}
			{...props}
		/>
	);
};

export default Input;
