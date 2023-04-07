'use client';
import { register, login } from '../lib/api';
import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from './Card';
import Button from './Button';
import Input from './Input';

const registerContent = {
	linkUrl: '/login',
	linkText: 'Already have an account?',
	header: 'Create new account',
	subheader: 'Just a few things to get started',
	buttonText: 'Register'
};

const loginContent = {
	linkUrl: '/register',
	linkText: "Don't have an account?",
	header: 'Welcome Back',
	subheader: 'Enter your credentials to access your account',
	buttonText: 'Log In'
};

//set initial state
const initial = { email: '', password: '', firstName: '', lastName: '' };

export default function AuthForm({ mode }: { mode: 'register' | 'login' }) {
	const [formState, setFormState] = useState({ ...initial });
	const [error, setError] = useState('');

	const router = useRouter();
	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			try {
				if (mode === 'register') {
					await register(formState);
				} else {
					await login(formState);
				}

				router.replace('/home');
			} catch (e) {
				setError(`Could not ${mode}`);
			} finally {
				setFormState({ ...initial });
			}
		},
		[formState.email, formState.password, formState.firstName, formState.lastName]
	);

	const content = mode === 'register' ? registerContent : loginContent;

	return (
		<Card className={undefined}>
			<div className="w-full">
				<div className="text-center">
					<h2 className="text-3xl mb-2 text-white">{content.header}</h2>
					<p className="tex-lg text-white">{content.subheader}</p>
				</div>
				<form onSubmit={handleSubmit} className="py-10 w-full">
					{mode === 'register' && (
						<div className="flex mb-8 justify-between">
							<div className="pr-2">
								<div className="text-lg mb-4 ml-2 text-white">First Name</div>
								<Input
									required
									placeholder="First Name"
									value={formState.firstName}
									className="px-6 py-2 text-lg w-full"
									onChange={(e) => setFormState((s) => ({ ...s, firstName: e.target.value }))}
								/>
							</div>
							<div className="pl-2">
								<div className="text-lg mb-4 ml-2 text-white">Last Name</div>
								<Input
									required
									placeholder="Last Name"
									value={formState.lastName}
									className="px-6 py-2 text-lg w-full"
									onChange={(e) => setFormState((s) => ({ ...s, lastName: e.target.value }))}
								/>
							</div>
						</div>
					)}
					<div className="mb-8">
						<div className="text-lg mb-4 ml-2 text-white">Email</div>
						<Input
							required
							type="email"
							placeholder="Email"
							value={formState.email}
							className="px-6 py-2 text-lg w-full"
							onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
						/>
					</div>
					<div className="mb-8">
						<div className="text-lg mb-4 ml-2 text-white">Password</div>
						<Input
							required
							value={formState.password}
							type="password"
							placeholder="Password"
							className="px-6 py-2 text-lg w-full"
							onChange={(e) => setFormState((s) => ({ ...s, password: e.target.value }))}
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<span>
								<Link href={content.linkUrl} className="text-slate-400 font-bold">
									{content.linkText}
								</Link>
							</span>
						</div>
						<div>
							<Button type="submit" intent="secondary">
								{content.buttonText}
							</Button>
						</div>
					</div>
				</form>
			</div>
		</Card>
	);
}
