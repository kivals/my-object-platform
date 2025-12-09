'use client';

import React, { type ReactNode, useEffect, useRef, useState } from 'react';

import { Icon } from '@/ui/Icon';
import { SectionCard } from '@/ui/SectionCard';

import { cn } from '@/utils/cn';

interface IDropdownProps {
	visibleContent: ReactNode;
	dropdownContent?: ReactNode;
	onDropdownClick?: () => void;
	needToClose?: boolean;
}

export function DropdownSection({
	visibleContent,
	dropdownContent,
	onDropdownClick,
	needToClose
}: IDropdownProps) {
	const [isDropdown, setIsDropdown] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	//todo hack переделать без useEffect
	useEffect(() => {
		if (contentRef.current) {
			const h = contentRef.current.scrollHeight;
			contentRef.current.parentElement?.style.setProperty('--target-height', `${h}px`);
		}
	}, [isDropdown, dropdownContent]);

	useEffect(() => {
		if (needToClose) return setIsDropdown(false);
	}, [needToClose]);

	const handeDropdown = () => {
		if (!isDropdown && onDropdownClick) onDropdownClick();
		setIsDropdown(o => !o);
	};

	return (
		<SectionCard classNames='px-0 py-0'>
			<div>
				<SectionCard classNames='shadow-xs'>
					<div
						className='cursor-pointer flex gap-x-3.5 justify-between items-center'
						onClick={handeDropdown}
					>
						{visibleContent}
						<div>
							<Icon
								classNames={cn('rotate-0 transition', isDropdown && 'rotate-180')}
								icon='ChevronDown'
								size={24}
							/>
						</div>
					</div>
				</SectionCard>
				<SectionCard
					classNames={cn(
						'overflow-hidden transition-all duration-500 ease-in-out py-0 shadow-none bg-transparent',
						isDropdown ? 'animate-expand' : 'animate-collapse'
					)}
				>
					{dropdownContent && (
						<div ref={contentRef} className='flex justify-between gap-x-7 py-5 bg-transparent'>
							{dropdownContent}
						</div>
					)}
				</SectionCard>
			</div>
		</SectionCard>
	);
}
