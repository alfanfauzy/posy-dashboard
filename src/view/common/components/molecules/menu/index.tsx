import {Subjects} from '@/view/auth/types';
import {useAppDispatch} from '@/view/common/store/hooks';
import {setOpenDrawer} from '@/view/common/store/slices/auth';
import {logEvent} from '@/view/common/utils/UtilsAnalytics';
import {CheckPermission} from '@/view/common/utils/UtilsCheckPermission';
import {useRouter} from 'next/router';
import React from 'react';
import {Menu, MenuItem, SubMenu} from 'react-pro-sidebar';

type MoleculesMenuProps = {
	item: {
		title: string;
		path: string;
		icon: JSX.Element;
		subMenu?: Array<{title: string; path: string; permission: Array<Subjects>}>;
	};
	collapse: boolean;
};

const MoleculesMenu = ({item, collapse}: MoleculesMenuProps) => {
	const dispatch = useAppDispatch();
	const {pathname, push, asPath} = useRouter();

	const linkTo = (path: string) => {
		const actionPath = path?.split('/')?.join('')?.split('-')?.join('');

		push(`/${path}`);
		dispatch(setOpenDrawer(false));
		logEvent({
			category: 'sidebar',
			action: `sidebar_${actionPath}_click`,
		});
	};

	const [, firstPath] = asPath.split('/');

	return (
		<Menu
			key={item.path}
			className={`w-full py-0.5 ${!collapse ? 'px-3' : ''}`}
		>
			{Array.isArray(item.subMenu) && item.subMenu.length > 0 && (
				<SubMenu
					label={item.title}
					icon={item.icon}
					className="pl-1 text-m-semibold"
					defaultOpen={firstPath === item.title.toLocaleLowerCase()}
				>
					{item.subMenu.map(
						el =>
							CheckPermission(el.permission) && (
								<MenuItem
									key={el.title}
									onClick={() => linkTo(el.path)}
									className={`my-0.5 text-m-regular transition-all duration-300 ease-in-out first:mt-2 ${
										pathname.indexOf(el.path) !== -1
											? 'rounded-lg bg-[#F2F1F9]'
											: 'hover:rounded-lg hover:bg-[#F2F1F9]'
									}`}
								>
									<p>{el.title}</p>
								</MenuItem>
							),
					)}
				</SubMenu>
			)}
			{!Array.isArray(item.subMenu) && (
				<MenuItem
					className={`py-0.5 pl-1 text-m-semibold transition-all duration-300 ease-in-out ${
						pathname.indexOf(item.path) !== -1
							? 'rounded-lg bg-[#F2F1F9]'
							: 'hover:rounded-lg hover:bg-[#F2F1F9]'
					}`}
					icon={item.icon}
					onClick={() => linkTo(item.path)}
				>
					<p>{item.title}</p>
				</MenuItem>
			)}
		</Menu>
	);
};

export default MoleculesMenu;
