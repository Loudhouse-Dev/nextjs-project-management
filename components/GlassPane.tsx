import clsx from 'clsx';
import React, { ReactNode } from 'react';

type GlassPaneProps = React.PropsWithChildren<{
	className: React.ReactNode;
}>;

const GlassPane = ({ children, className }: GlassPaneProps) => {
	return <div className={clsx('glass-effect rounded-lg shadow-2xl', className)}>{children}</div>;
};

export default GlassPane;
