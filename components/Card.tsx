import clsx from 'clsx';

type CardProps = React.PropsWithChildren<{
	className: React.ReactNode;
}>;

const Card = ({ className, children }: CardProps) => {
	return (
		<div className={clsx('rounded-xl px-10 py-4 drop-shadow-xl bg-slate-800', className)}>
			{children}
		</div>
	);
};

export default Card;
